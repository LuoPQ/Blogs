title: Javascript插件开发的一些感想和心得
date: 2016-02-04 00:36:40
tags: [javascript,插件编写]
categories: Javascript
description: 如果大家平时做过一些前端开发方面的工作，一定会有这样的体会：页面需要某种效果或者插件的时候，我们一般会有两种选择： 1、上网查找相关的JS插件，学习其用法;2、自己造轮子，开发插件。本文主要谈谈一些编写JS插件的感想和心得
---
### 起因
如果大家平时做过一些前端开发方面的工作，一定会有这样的体会：页面需要某种效果或者插件的时候，我们一般会有两种选择：
1、上网查找相关的JS插件，学习其用法
2、自己造轮子，开发插件。
#### 寻找存在的插件
第一种做法，上网查找JS插件
这种方式如果是有刚好符合项目需求的插件，那是非常幸运的事了。但是我相信大部分情况下，我们找到的插件会有下面的几个问题：
（1）UI定制：很多插件提供的UI和我们的项目设计风格完全不搭，可能写好的html和css不符合插件使用的方式，结果我们还要去修改html和css来适应插件的用法。
（2）学习成本：如果是比较复杂的插件，存在着一个学习成本的问题，要去学习这个插件怎么使用。
（3）插件不符合需求：我们找到的插件并不完全保证符合我们项目的需求，这个时候你可能要去修改它的代码来支持项目需求，这也是可能存在的问题
（4）插件功能太大而全：假设你的项目需要一个简单的轮播插件，结果找到一个很牛逼的轮播插件，各种酷炫的效果，而且刚好也能使用，但是这个插件的体积和一个js库的体积差不多，而如果自己写效果的话，其实只要几十行代码就可以搞定了，这时候引入这个插件是否太过多余了。
这是使用js插件可能存在的一些问题，当然具体情况具体分析，我也并非不使用已经写好的js插件，毕竟有些插件是经过了时间考验的，使用起来更有益于项目的进行。如果是下面几种情况，我会考虑使用已经存在的js插件：
（1）复杂的功能：比如文件上传，批量上传，进度显示等等，比如HTML编辑器
（2）项目工期紧急，对性能要求不高的场景
（3）js插件刚好符合项目的需求

#### 自己造轮子
第二种做法，自己造轮子开发插件
自己写插件主要有下面几个问题：
（1）开发插件需要时间，可能拖延项目工期，如果工期紧急不建议选用这种方式
（2）自己造的轮子未必有现有轮子的好用，要考虑到队友是否适用
（3）需要比较高的开发水平
如果平时项目不紧急的话，我会考虑自己造轮子，主要有几个好处：
（1）完全符合项目需求，这一条是显而易见的，因为完全针对项目来开发的插件
（2）知根知底，容易修改，插件完全是自己开发的，项目有什么需求变化完全可以灵活应对
（3）轻量级，因为我们不像其他开源插件要应对那么多种需求，所以我们自己的轮子也只需要符合自己的车，不需要很多变化，相对来说，变化少功能少，代码也会少。
（4）对个人能力是一个很大的锻炼，不要重复造轮子这是在程序员中广为流传的一句话，这也成为很多人偷懒的一个借口，但是我们不应该以此为借口来阻碍自己的前进的脚步。造过轮子的同学应该深有体会，造过一个轮子，远比你使用别人写的100个插件的收获还要多，我们的轮子可以不在项目中使用，但这是一种效率极高的学习方式，强烈推荐。

### 如何开发一个轻量级的适用性强的插件
怎么开发一个适应性强的且轻量的插件呢？所谓适用性强，简单地说就是有几点：
1、对UI限制越少越好，最好没有
2、不提供太多功能，只提供简单的api，让使用者易于扩展

我们举个例子，假设我们要开发一个jQuery分页插件，关于jQuery插件开发教程，请参考<a href="http://www.cnblogs.com/wayou/p/jquery_plugin_tutorial.html" target="_blank">jQuery插件开发</a>。

#### 确定需求
确定需求是开发插件的第一步。要开发一个轻量级的分页插件，我们还是用从插件最基本的需求开始说起，分页插件最基本的需求是什么呢，无非就是页码显示，页码之间的切换，所以，我们的插件要围绕着这基本需求开始，而暂时不要考虑其他可能存在的需求。

#### 确定插件html和css
确定好插件的需求后，第二步就是插件的UI，也就是html和css。
假设基本的ui如下：
![基本的分页UI](http://7xnjy3.com1.z0.glb.clouddn.com/jquery-pager-demo.png)
看到上面的基本ui，不知道大家会想到什么样的html结构。对于我们开发人员来说，html和css要越简单越好，所以最基本的html结构无非就是a标签和span标签的混合，有的同学可能会想到使用ul，li标签，但这其实增加的复杂度，得不偿失。我们编写html代码如下：
```
<div class="pager">
    <span class="flip noPage">上一页</span>
    <span class="curPage">1</span>
    <a page="1" href="javascript:;">2</a>
    <a page="2" href="javascript:;">3</a>
    <a page="3" href="javascript:;">4</a>
    <span>...</span> 
    <a href="javascript:;" page="8">9</a> 
    <a page="1" href="javascript:;" class="flip">下一页</a>
</div>
```
这是最基本html代码结构，包含了分页插件的容器div.pager，当前页span.curPage，其他页码a标签，上一页，下一页等按钮。
接着是css代码，主要当前页标签，其他页面标签，上一页下一页，鼠标悬停在按钮上等几种样式，编写如下：
```
.pager { display: inline-block; font: 12 px/21px "宋体"; margin-top: 20px; }
    .pager a, .pager .flip, .pager .curPage { border: 1px solid #e3e3e3; display: inline-block; height: 22px; line-height: 22px; text-align: center; }
    .pager a { background: none repeat scroll 0 0 #fff; color: #010101; text-decoration: none; width: 26px; }
        .pager a:hover { background: none repeat scroll 0 0 #f1f1f1; }
    .pager .noPage { color: #a4a4a4; }
    .pager .curPage { background: none repeat scroll 0 0 #49abde; color: #ffffff; width: 26px; }
    .pager .flip { width: 56px; }
```

#### 编写js代码
写好基本的html和css，接下来最关键的就是js代码了。首先我们搭建好jQuery插件开发的基本形式：
```
; (function ($, window, document, undefined) {
    "use strict";
    var defaults = {
        pageIndex: 0,
        pageSize: 6,
        itemCount: 50,
        maxButtonCount: 7,
        prevText: "上一页",
        nextText: "下一页",
        buildPageUrl: null,
        onPageChanged: null
    };   

    $.fn.pager = function (options) {
        options = $.extend(defaults, options || {});
    }
})(jQuery, window, document);
```
这里主要提供了一些可选参数的默认值，比如页码默认为0，每页数量6条等等。
接着我们来考虑一下分页插件的思路：
1、设置当前页码为0，表示第一页
2、生成分页插件的html代码
3、修改页码，再生成html代码
基于这个思路，我们编写代码如下：
```
; (function ($, window, document, undefined) {
    "use strict";
    var defaults = {
        pageIndex: 0,
        pageSize: 6,
        itemCount: 50,
        maxButtonCount: 7,
        prevText: "上一页",
        nextText: "下一页",
        buildPageUrl: null,
        onPageChanged: null
    };

    function Pager($ele, options) {
        this.$ele = $ele;
        this.options = options = $.extend(defaults, options || {});
        this.init();
    }
    Pager.prototype = {
        constructor: Pager,
        init: function () {
            this.renderHtml();
            this.bindEvent();
        },
        renderHtml: function () {
            var options = this.options;

            options.pageCount = Math.ceil(options.itemCount / options.pageSize);
            var html = [];

            //生成上一页的按钮
            if (options.pageIndex > 0) {
                html.push('<a page="' + (options.pageIndex - 1) + '" href="' + this.buildPageUrl(options.pageIndex + 1) + '" class="flip">' + options.prevText + '</a>');
            } else {
                html.push('<span class="flip noPage">' + options.prevText + '</span>');
            }

            //这里是关键
            //临时的起始页码中间页码，当页码数量大于显示的最大按钮数时使用
            var tempStartIndex = options.pageIndex - Math.floor(options.maxButtonCount / 2) + 1;

            //计算终止页码，通过max计算一排按钮中的第一个按钮的页码，然后计算出页数量
            var endIndex = Math.min(options.pageCount, Math.max(0, tempStartIndex) + options.maxButtonCount) - 1;
            var startIndex = Math.max(0, endIndex - options.maxButtonCount + 1);

            // 第一页
            if (startIndex > 0) {
                html.push("<a href='" + this.buildPageUrl(0) + "' page='" + 0 + "'>1</a> ");
                html.push("<span>...</span>");
            }

            //生成页码按钮
            for (var i = startIndex; i <= endIndex; i++) {
                if (options.pageIndex == i) {
                    html.push('<span class="curPage">' + (i + 1) + '</span>');
                } else {
                    html.push('<a page="' + i + '" href="' + this.buildPageUrl(options.pageIndex + 1) + '">' + (i + 1) + '</a>');
                }
            }

            // 最后一页
            if (endIndex < options.pageCount - 1) {
                html.push("<span>...</span> ");
                html.push("<a href='" + this.buildPageUrl(options.pageCount - 1) + "' page='" + (options.pageCount - 1) + "'>" + options.pageCount + "</a> ");
            }

            //生成下一页的按钮
            if (options.pageIndex < options.pageCount - 1) {
                html.push('<a page="' + (options.pageIndex + 1) + '" href="' + this.buildPageUrl(options.pageIndex + 1) + '" class="flip">' + options.nextText + '</a>');
            } else {
                html.push('<span class="flip noPage">' + options.nextText + '</span>');
            }

            this.$ele.html(html.join(""));
        },
        bindEvent: function () {
            var that = this;
            that.$ele.on("click", "a", function () {
                that.options.pageIndex = parseInt($(this).attr("page"), 10);
                that.renderHtml();
                that.options.onPageChanged && that.options.onPageChange(that.options.pageIndex);
            })
        },
        buildPageUrl: function () {
            if ($.isFunction(this.options.buildPageUrl)) {
                return this.options.buildPageUrl(pageIndex);
            }
            return "javascript:;";
        }        
    };


    $.fn.pager = function (options) {
        options = $.extend(defaults, options || {});

        return new Pager($(this), options);
    }

})(jQuery, window, document);
```
这段代码中有两个关键点要记住：
（1）html代码的生成，由于页码可能太多，需要隐藏部分页码，所以我们要生成一个省略号表示被隐藏的页码，通过maxButtonCount来表示最多的页码按钮
（2）事件绑定，每次页码改变都会重新生成html，我们采用事件代理的方式，提高了性能，也不用重复绑定事件
这样一个最基本的分页插件已经可以了。

但是这样足够了吗？
假设我们需要支持输入页码直接跳转的功能，那该如何呢，是否需要修改原有的html结构和css？前面我们说到，开发一个插件要围绕最基本的需求开始，那对于这些潜在的可能存在的需求又该如何处理呢。
我的解决方案是这样的，提供简单的api，不提供UI，完全由用户自定义。
我们在上面的代码增加三个api：getPageIndex，setPageIndex和setItemCount，分别表示获取当前索引，设置当前索引，设置项目总数量。代码如下：
```
getPageIndex: function () {
    return this.options.pageIndex;
},
setPageIndex: function (pageIndex) {
    this.options.pageIndex = pageIndex;
    this.renderHtml();
},
setItemCount: function (itemCount) {
    this.options.pageIndex = 0;
    this.options.itemCount = itemCount;
    this.renderHtml();
}
```
完整版代码请查看[jquery.page.js](https://github.com/LuoPQ/jquery.pager.js/blob/master/src/jquery.pager.js)
提供了这三个api，假设用户需要跳转页码的功能，可以直接使用setPageIndex方法来跳转，UI完全由用户自定义，插件本身只专注基本功能，不干涉其它。
大家可以查看[DEMO](http://luopq.com/demo/pager/examples/index.html)

整个插件的代码已经放在我的github上，有兴趣的同学可以点击查看[github](https://github.com/LuoPQ/jquery.pager.js)

### 总结
最后，我整理一下我开发一些js插件的思路：
1、专注最基本的需求本身，暂时不考虑可能潜在的需求
2、尽量不提供或少提供UI，减少对使用者的限制
3、考虑可能潜在的需求，提供api，潜在的需求完全由用户自定义

这是我在编写js插件时，考虑如何轻量化并且适用性强的一些想法，欢迎大家交流！












