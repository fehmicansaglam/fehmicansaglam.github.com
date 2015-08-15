---
title: "Connecting dots with Akka Streams"
layout: post
description: "reactive, reactive-streams, akka-stream"
---

## New kid in town

According to their site *Reactive Streams is an initiative to provide a standard for asynchronous stream processing with non-blocking back pressure*, and <a href="http://doc.akka.io/docs/akka-stream-and-http-experimental/1.0/scala/stream-index.html">Akka Streams</a> is one of the current <a href="http://www.reactive-streams.org/">Reactive Streams</a> implementations. In this article I am going to implement a common use case scenario using Akka Streams and hopefully provide a quick start for newcomers.

## A common use case

Today, applications need to interact with several external services and/or live together within a number of microservices. Data flows from one service to another with occasional modifications on its way. Defining these flows have become a quite common challenge nowadays.

In this scenario let us assume that we are reading a bulk of items from an internal microservice, making a request for each item to an external service, then sending an event to a stream (e.g. Kafka and Kinesis) for each item received from the external service. All services produce JSON and communicate using REST APIs. Each stage should support non-blocking back pressure.

Let me start with defining the models first to give you a better understanding of the flow. Internal microservice produces a collection of `ProducerItem`s at a time (e.g. Vector[ProducerItem]). Each `ProducerItem` has at least a `title` field which is going to be used to query the external service. For each query, external service returns an `ExternalItem`. In the last stages we convert the `ExternalItem` to `ConsumerItem` and send it to stream.

{% highlight scala %}
case class ProducerItem(title: String)
case class ExternalItem(title: String)
case class ConsumerItem(title: String)
{% endhighlight %}

In favor of simplicity I have omitted the fields except `title`. In a real scenario you will probably need many more fields and mapping rules between them.

### Defining a flow

Now it is time to define our data flow. If we look at the big picture, data will be produced as `Vector[ProducerItem]` at a `Source` and at the last stage it will be consumed as `ConsumerItem` at a `Sink`. Below is the type definition of this `Source` and `Sink`. For the time being just ignore the `ActorRef` type parameter.

{% highlight scala %}
val source: Source[Vector[ProducerItem], ActorRef] = ...
val sink: Sink[ConsumerItem, ActorRef] = ...
{% endhighlight %}

In the next step let us define a reusable `Flow` to communicate with the external service. This process consists of sending a query to the service and receiving an `ExternalItem` for each query. The `Flow` block I have provided below accepts a `String` query and returns an `ExternalItem` for each query.


{% highlight scala %}
val parallelism = 4
val externalRequestFlow = Flow[String].mapAsyncUnordered(parallelism) { query =>
  Http().singleRequest {
    HttpRequest(uri = Uri(...).withQuery("query" -> query))
  }
}.mapAsyncUnordered(parallelism) { response =>
  Unmarshal(response.entity).to[ExternalItem]
}
{% endhighlight %}

At this point, as a reference, I want to show spray-json integration for unmarshalling. First of all you need to add `"com.typesafe.akka" %% "akka-http-spray-json-experimental" % "1.0"` dependency to your build.sbt. After that you can provide JSON protocols for your models.

{% highlight scala %}
import spray.json._

object Protocols extends DefaultJsonProtocol {
  implicit val producerItemFormat = jsonFormat1(ProducerItem)
  implicit val externalItemFormat = jsonFormat1(ExternalItem)
  implicit val consumerItemFormat = jsonFormat1(ConsumerItem)
}
{% endhighlight %}

As we have the communication flow with the external service, we can connect the dots now. Our `Source` produces `Vector[ProducerItem]` at a time. We are going to `mapConcat` this collection in order to pass only one `ProducerItem` at a time to the next stage. Then we are going to filter some of the `ProducerItem`s, and then send the `title` of each `ProducerItem` to the next stage. After that we can connect this block to previously implemented `externalRequestFlow`.


{% highlight scala %}
source.mapConcat(identity).filter { producerItem =>
  // Filter some of the items here
}.map(_.title).via(externalRequestFlow).map { externalItem =>
  //Convert ExternalItem to ConsumerItem here
}.runWith(sink)
{% endhighlight %}

At the last steps above we convert each `ExternalItem` to a `ConsumerItem` and attach our `Sink` to the end of the flow. We have not implemented the `Source` and the `Sink` yet but we have completely defined our flow in a cool, declarative syntax.

### Implementing a Source using ActorPublisher

Akka Streams offer many ways to construct a `Source`. I am going to use `ActorPublisher` here because of its back pressure support.

Our source, which is named `Producer`, makes requests to the internal service and produces `Vector[ProducerItem]`. The sample API that I provided expects an `id` parameter to return items that are greater than that id. First request sends 0 for the id. Subsequent requests send the greatest id received in the previous batch.

Let us define a new model here to represent the API response. `lastId` is the greatest id in the response.

{% highlight scala %}
case class Result(lastId: Long, size: Int, items: Vector[ProducerItem])
{% endhighlight %}

Below is a sample implementation for our requirements.

{% highlight scala %}
class Producer extends ActorPublisher[Vector[ProducerItem]] with SprayJsonSupport {

  import context.dispatcher

  implicit val mat = ActorMaterializer()(context)

  override def receive: Receive = run(0)

  def run(id: Long): Receive = {
    case Request(_) =>
      context.become(requesting(id))

    case Cancel =>
      context.stop(self)
  }

  def requesting(id: Long): Receive = {
    //Making a request starting from id

    Http(context.system).singleRequest(HttpRequest(...)).flatMap { response =>
      Unmarshal(response.entity).to[Result]
    }.pipeTo(self)

    {
      case Result(lastId, size, items) =>
        onNext(items)

        if (lastId == 0) {
          //No items left.
          onCompleteThenStop()
        } else if (totalDemand > 0) {
          context.become(requesting(lastId))
        } else {
          context.become(run(lastId))
        }

      case Cancel =>
        context.stop(self)
    }
  }
}

object Producer {
  def props: Props = Props[Producer]
}
{% endhighlight %}

### Implementing a Sink using ActorSubscriber

Implementing a `Sink` is relatively easier in our case. Again I am going to use `ActorSubscriber` because of its back pressure support.

{% highlight scala %}
class Consumer extends ActorSubscriber {

  override protected def requestStrategy: RequestStrategy = WatermarkRequestStrategy(8)

  override def receive: Receive = {

    case OnNext(consumerItem: ConsumerItem) =>
      //Send consumerItem to Stream

    case OnComplete =>
      self ! PoisonPill
  }

}

object Consumer {
  def props: Props = Props[Consumer]
}
{% endhighlight %}

As we have a Source and a Sink now, we can assign them to our values:

{% highlight scala %}
val source: Source[Vector[ProducerItem], ActorRef] = Source.actorPublisher(Producer.props)
val sink: Sink[ConsumerItem, ActorRef] = Sink.actorSubscriber(Consumer.props)
{% endhighlight %}

## Error handling

I want to discuss about one last thing. When working with external services we need to be prepared for failures. I am going to provide an example for discarding failures and resuming the flow.

We may define the `externalRequestFlow` with a `resumingDecider` as given below:

{% highlight scala %}
val parallelism = 4
val externalRequestFlow = Flow[String].mapAsyncUnordered(parallelism) { query =>
  Http().singleRequest {
    HttpRequest(uri = Uri(...).withQuery("query" -> query))
  }
}.mapAsyncUnordered(parallelism) { response =>
  Unmarshal(response.entity).to[ExternalItem]
}.withAttributes(supervisionStrategy(resumingDecider))
{% endhighlight %}

Or we can add this attribute while we are connecting the blocks.

{% highlight scala %}
source.mapConcat(identity).filter { producerItem =>
  // Filter some of the items here
}.map(_.title)
.via(externalRequestFlow.withAttributes(supervisionStrategy(resumingDecider)))
.map { externalItem =>
  //Convert ExternalItem to ConsumerItem here
}.runWith(sink)
{% endhighlight %}
