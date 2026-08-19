---
title: "Coding Agents and the Joy of Missing Out"
layout: post
description: "Tribal knowledge, specifications, coding agents, and the joy of missing out."
subtitle: "What if coding was never the problem in the first place?"
category: software-engineering
published: true
---

Not long ago, Fatih Arslan published a blog post[^1] announcing that he will be joining Cursor soon. That came partially as a surprise, since I almost envied his achievements at PlanetScale. But I was also aware of his recent comments on Cursor. Anyway, as an avid follower of his blog, which I strongly recommend, I obviously read the post ASAP.

In his detailed blog post, Fatih wrote the following about coding agents:

> Now speak to your friends. Check your teammates. Just observe how they work with Agents. Nobody writes the code anymore. Instead you’re basically planning, debating, implementing and reviewing with Agents.

When I first read this, I immediately felt a strong sense of FOMO and asked myself: why haven’t I seen this put into practice as completely as Fatih has? What am I missing? There have been a few times when I had huge success pair programming with a coding agent. I accomplished at least a week’s worth of work, perhaps in a day or two. But in my experience, that’s ridiculously rare, because I rarely know exactly what I need and what I will implement.

Marc Brooker is an engineer at AWS and works on agentic AI. He also happens to have a very nice blog and has several blog posts on the topic. I find the one titled *Agentic software development hypothesis*[^2] very relatable. (I also find the post quite funny. Anyone?)

> *Weak form*: Any coding task for which a complete specification is available will become trivial.
>
> *First objection*: Few meaningful tasks have a complete specification.

More often than not, I find myself creating specifications from code. In other words, the code is often the only source of truth. Sometimes I'm so perplexed by what I see in the code that, after staring at the screen for a few minutes, I go and find a person with at least five years of tenure to understand what the fuck they were thinking a billion years ago. This is tribal knowledge and is not documented except implicitly in the code.

That reminds me what Colin Breck wrote about writing things down.[^3]

I agree with almost 100% of what he wrote:

> I believe organizations that have a culture of writing—real writing about ideas, from primary sources—will outperform those that do not.

I even wrote down this note not long ago:

> If you haven't already transformed your culture to written communication and still rely on verbal communication along with tribal knowledge, you will lose the AI race. Your competition will outperform you.

But could we be wrong?

Fatih wrote about his time at a startup called Koding:

> But as with many things, the timing wasn't right. We were too early. Eventually the company closed.

If you can be early, then there is no technical blocker. It has always been like this. It has always been about execution. If it were not, then all engineers would have been rich and FIREd already.

Could we be looking at coding agents from a narrow, purely technical perspective? Perhaps relying on tribal knowledge is simply the way some companies operate. Perhaps we are underestimating the importance of actual execution and valuing code more than it deserves. Just as coding wasn't the problem at Koding (pun intended), maybe we will never be able to eliminate writing code entirely, despite what Fatih observed, and that may not be a problem at all. Because coding might not have been the problem in the first place.

Could this be the reason why we don't yet see AI's contribution to aggregate productivity numbers, as Chicago Fed President Austan Goolsbee explained?[^4]

> If the increase in productivity growth doesn't continue, "that would make a huge difference to all the narratives about AI and productivity growth and what it means for monetary policy and for the economy," Goolsbee said.

Nowadays, one more explanation also crosses my mind: *Bullshit Jobs*.[^5] But I hope not. More on that later.

And last but not least, I remember Hashimoto's legendary tweet,[^6] which I guess keeps me sane more than anything else.

Nonetheless, Fatih is rarely wrong, whereas I am almost never right. Is he wrong now? Maybe. Or maybe we're both right this time.

[^1]: [Fatih Arslan, *Joining Cursor*](https://arslan.io/2026/08/10/joining-cursor/)
[^2]: [Marc Brooker, *Agentic software development hypothesis*](https://brooker.co.za/blog/2026/05/20/hypothesis.html)
[^3]: [Colin Breck, *Adapting to AI: Write Things Down*](https://blog.colinbreck.com/adapting-to-ai-write-things-down/)
[^4]: [Yahoo Finance, *Fed's Goolsbee wants to see more data before deciding on September rate cut*](https://finance.yahoo.com/economy/policy/articles/fed-goolsbee-wants-see-more-163249754.html)
[^5]: [Wikipedia, *Bullshit Jobs*](https://en.wikipedia.org/wiki/Bullshit_Jobs)
[^6]: [Mitchell Hashimoto on X](https://x.com/mitchellh/status/2072738025344565262)

