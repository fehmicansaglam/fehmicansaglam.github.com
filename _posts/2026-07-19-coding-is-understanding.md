---
title: "Coding Is Understanding"
layout: post
description: "The path from friction to productive struggle to understanding."
subtitle: "Friction isn't always an obstacle."
category: software-engineering
---

I have a personal connection to coding since it has been both my craft and my hobby for decades. I occasionally suspect that I might have a bias and overestimate its value. This started a long time ago, but it has definitely accelerated in the age of LLMs. As a result, I have been reading, listening to, and watching what true experts have to say about coding. I stumbled upon a few thought-provoking comments that turned my intuition into a more concrete understanding. I’ll try to present a quick summary of that as I am too impatient to write long in-depth articles like those experts. 

To me, coding is a medium for conveying intent deterministically. Kent Beck recently described coding, more or less, as a tool for deeply understanding the problem domain. His explanation was in a broader software engineering context but I still find it quite relevant. For us builders, that idea is easy to grasp and agree with. However, expressing intent through natural language is inherently ambiguous and doesn’t require the same depth of understanding. As Dijkstra argued decades ago, natural language is “hopelessly inadequate” when we need to reason unambiguously about complex systems. 

My mother was my elementary school teacher as well for five years. She was really good at math and respected among her peers. From early on, when I was around six or seven years old, she kept telling me to draw a diagram to better understand the problem at hand. Back then, I didn’t really understand that this was actually about modeling a problem, much like in coding, where you need to build a mental model of the program.

LLMs dramatically reduce productive struggle. And productive struggle is how expertise forms. Used carelessly, AI can remove the very process through which engineers build deep mental models of a system. In my experience, you can already see this in software engineering. Engineers who just copy AI-generated code without mentally simulating its execution improve much more slowly than those who use AI to challenge, verify, and extend their own reasoning.

Friction, at times, is our best friend. When used appropriately, it fosters productive struggle.

I believe it was around 2013. While I was trying to become much more fluent in Scala, I ditched my IDE and used only a simple text editor that had no language support. By doing that, I even learned almost the entire standard library along with the syntax because I had to import packages manually.

In contrast, while I was implementing esctl in Go in 2023, a language I wasn’t yet very proficient in, I used ChatGPT to write almost all of the code. But then I realized that I wasn’t familiar enough with the codebase to make even simple changes, and my Go proficiency hadn’t improved one bit.

Then I deliberately stopped using LLMs and migrated to Neovim, which has excellent Go tooling, but I didn’t use any AI assistance for a few months. I was slow at the beginning, even with the simple syntax, but it took only days, not weeks, before I became very comfortable and could recognize what elegant Go code looks like.

Of course, my previous experience with other programming languages shortened the time it took to become proficient in a new one. But no matter what, we need productive struggle to learn, and we need some kind of friction to get there.

I understand why many people see coding as friction. However, I now see coding as a useful form of friction that builds a deeper understanding of the problem domain through productive struggle. Sometimes, the friction isn’t the obstacle. It’s your elementary school teacher.