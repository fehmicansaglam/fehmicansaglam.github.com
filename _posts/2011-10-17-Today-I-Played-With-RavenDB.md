---
layout: post
title: "Today I Played With RavenDB"
---

Today I decided to spend some time and get familiar with [RavenDB](http://ravendb.net/). RavenDB is a document database for .NET. Now, I'm a MonoDB user and I've made contributions to the project, so it wouldn't be unreasonable to call me biased. However, it also means that I know a thing or two about document databases and what's available out there for developers.

There are three non-technical aspects of RavenDB which are, each individually, a show stopper for me. First, it's .NET only, second, it's windows-only and third it requires a license for commercial use. Even when I was doing .NET development, I was pretty vocal against SQL Server for its similar limitations (and it isn't even .NET only). I just can't understand paying and locking yourself in when free and, at the very least, as-good solutions are available. But, I will say that, having no idea what the cost of RavenDB was, I was slightly put at ease with it's $600 price tag.

The flip side of RavenDB's .NET-onlyness is that it presents a very solid and intuitive interface to .NET developers, and it's easy to get up and running. Conversely, MongoDB is also easy to setup, but the .NET driver has always been a sore spot for me (I did do a lot of work on the NoRM driver back in the day, so I have a strong opinion about how MongoDB should expose itself in a .NET world). Now, RavenDB in .NET might feel better, but MongoDB is Ruby, Python or JavaScript (node), is in another league of simplicity and elegance. 

Where RavenDB wins for ease of development, it loses in performance. The simple insert and read tests that I did showed MongoDB way ahead, sometimes by a factor of 10. Maybe things change with different document composition (like larger documents), but I doubt it. And yes, I was writing to MongoDB with a commit to the journal file ({j: true}).

From what I understand, Raven has a pretty original approach to indexing. You essentially give it a query to run, and the results become the index. You can almost see it as a cache of the data that's constantly being updated. What's neater is that it'll automatically create indexes based on queries that you run. The downside is that your reads can be stale, though you have some control over this.

MongoDB uses a more traditional BTree index. This puts a higher load on memory, but provides greater flexibility (not sure if RavenDB has the concept of index-reuse which is possible with a MongoDB composite index) and, from my observation, better performance. 

In the NoSQL world, RavenDB is pretty unique for offering full transaction support, which is nice (i guess). It also has a nice web admin console (though it seemed light in more robust administrative tools). And being backed by Lucene gives it rich full text search capabilities (for now full text search seems like Raven's only feature that MongoDB lacks).

In the end, assuming you can get over being tied to Windows, being tied to .NET and paying for commercial use, Raven is definitely a step up in productivity and usability over SQL Server. Maybe this is blind bias speaking or simple familiarity, but there's something in my mind that draws a line between RavenDB and the more popular NoSQL solutions (MongoDB, CouchDB, Riak and Cassandra (Redis and Hadoop are more specialized solution)), which says that RavenDB is more geared towards smaller projects, say like your companies intranet.