---
permalink: "/2011/10/11/This-Blog-Is-Now-Hosted-On-Github"
layout: post
title: "This Blog Is Now Hosted On Github"
---

Over a year ago, I wrote my own crappy Rails blogging engine and started to use it to power my blog. Today, I moved everything to [github](http://github.com). I think it'll just be easier to write new posts and it'll make my content more accessible. It also better reflects my general attitude about blogs: less is more. 

Github users can create a new repository called `YOUR-GITHUB-NAME.github.com` and that'll be accessible at `http://YOUR-GITHUB-NAME.github.com`. For example, my repository is sitting at <http://github.com/karlseguin/karlseguin.github.com> and it's accessible at <http://karlseguin.github.com/>. By placing a CNAME file in my root with the contents of *openmymind.net* and pointing my domain to 207.97.227.245, things just work.

Your personal page, like a project page, is a special github project though. Every time you commit, github runs your project through [jekyll](https://github.com/mojombo/jekyll). Jekyll is a blog-aware site generator which supports templating and a few other nice features. With disqus handling comments, anything else is just, well, silly.

Extracting my existing content from mysql was pretty easy:

<pre data-language="ruby">
conn = Mysql.real_connect("localhost", "user", "pass", "db")
res = conn.query("select slug, title, summary, body, created_at, id from posts")
while row = res.fetch_row do
	file = Date.parse(row[4]).strftime("%Y-%-m-%-d") + '-' + row[0] + ".html"
	File.open(file, 'w') do |f|
		f.write("---\n")
		f.write("layout: post\n")
		f.write("title: \"" + row[1] + "\"\n")
		f.write("disqus_id: " + row[5] + "\n")
		f.write("---\n")
		f.write(row[3])
	end
end
res.free
conn.close
</pre>

Now, almost all of my links are still valid (/about turned to /about.html), and publishing a new post involves commit the file and pushing it to github.