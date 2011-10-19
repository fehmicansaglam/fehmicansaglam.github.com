---
layout: post
title: "Hyperlinks don't belong in some of your documentation"
---

My current writing side-project is a series of essays on MongoDB, tentatively titled *The MongoDB Collection*. I decided to approach it as something of a technical writing experiment. There's nothing exotic or particularly original, but I did try different techniques and approaches (for me), sometimes subtle. So far, I'm happy with the result (though, I'm taking a break since I've run out of material, a tell-tell sign that I need to focus more on coding).

If there's one thing I've learned though, it's that, within a specified context, hyperlinks are evil. First, let's paint broad strokes and define two types of technical documentation: reference and non-reference.

Reference material is often generated from class and method headers. It's a step up from having to wade though source code. This type of documentation heavily relies on hyperlinking, as it should. It's about presenting facts, in a robot-like manner and the relationship between different parts of the code. It's hard to screw this up, even with a complex api. Even so, not all reference documentation is created equal. From my experience with it a few years back, PostgreSQL stands out as an example of what good reference documentation should look like.

After you've gone through reference material, you tend to get into more conceptual or abstract documentation. Obviously, this is a gradient, not a well defined line. What's clear to me is that the things that define what reference material is (cold, factual, cross referenced) is exactly what you want to avoid for higher level documentation. For conceptual documentation, you want to tell a story, with a protagonist (my writing style tends to be told as if the reader and I are doing it together). I don't know anything about professional writing, but I do read a ton of fiction, and I think a toned down dramatic structure actually belongs in good technical documentation. It should almost border on entertaining.

As you attempt to tell a compelling story, nothing (short of maybe a banner ad), is more disruptive than a hyperlink. It breaks a flow that can never be recovered. That isn't to say that you should have no hyperlinks, and there's no problems with having hyperlinks outside of the main story (say, in a *related links* section), but they should be used sparingly.

Again, this isn't black and white. Most projects seem to mix reference and non-reference material, making hyperlinks unavoidable. [Redis](http://redis.io/commands) is a good example of great hybrid documentation (with little cross-referencing). Critics will say that Redis' API is simple, thus its documentation is simple. I think starting off with the assumption that complex projects require complex documentation is what simply false.

A good juxtaposition between great and horrible documentation are the [django docs](https://docs.djangoproject.com/en/1.3/) and the [ASP.NET website](http://www.asp.net/get-started). While django does use a fair number of hyperlinks (and I do think they should cut it down), their 4 part tutorial is, given its scope, a compelling and cohesive story. (Conversely, the "Intro to ASP.NET MVC 3" is pretty much a bunch of screenshots.)
