title: Hexo技巧收集 - 不定期更新
date: 2016-01-17 17:08:34
tags: [Hexo,Tips]
categories: Hexo
description: 一些平时Hexo技巧的收集，不定期更新
---
### 不处理source目录的个别文件
有时候我们要写一些Demo一起放到博客上去，默认情况下，Hexo也会将这部分Demo进行处理，导致这些Demo页面渲染上了博客主题，如何不处理这些Demo页面呢? 

假设你的Source文件夹里面有个Demo目录，要忽略Demo目录下的所有html页面，可以通过在_config.yml设置skip_render来忽略的目录，具体如下：
```
skip_render: Demo/*.html
```
文件匹配是基于正则匹配的，更复杂的情况如下

1.单个文件夹下全部文件：skip_render: demo/*

2.单个文件夹下指定类型文件：skip_render: demo/*.html 

3.单个文件夹下全部文件以及子目录:skip_render: demo/** 

4.多个文件夹以及各种复杂情况：
```
skip_render:
    - 'demo/*.html'
    - 'demo/**'
```

### 根据内容修改主题模板
写博客的时候，我们偶尔会加上一些统一的备注或补充，比如转载请注明原文地址等等。看下面的例子，Hexo生成的新博客的默认内容是：
```
title: 标题
date: 2016-01-23 17:08:34
tags: [Hexo,Tips]
categories: Hexo
---
```
我们选中的主题会根据这个内容进行渲染，假设我们要在文章前开头注明一些额外信息，可以增加内容如下：
```
title: 标题
date: 2016-01-23 17:08:34
tags: [Hexo,Tips]
categories: Hexo
extraInfo: 这里是额外信息
---
```
然后找到我们主题目录下相关的模板文件，比如这里我们找到的一个swig文件内容如下：
```
<div class="post-body">
    ...
	<span itemprop="articleBody">{{ post.content }}</span>
    ...
</div>
```
上面是省略后的模板文件，然后我们可以依葫芦画瓢地添加上自己写的额外信息（如果还是不知道模板的语法，可以swig模板引擎的语法），修改如下：
```
<div class="post-body">
	{% if page.extraInfo %}
		<p>{{ page.extraInfo }}</p>
	{% endif %}
    ...
	<span itemprop="articleBody">{{ post.content }}</span>
    ...
</div>
```
增加了渲染extraInfo的代码，这里只是简单的进行了if判断，当然有更复杂的for，elseif等需求，大家可以查查相关的语法。
这样修改后，我们就可以定制我们的页面内容了。