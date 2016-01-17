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
