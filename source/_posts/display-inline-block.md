title: 详解CSS display:inline-block的应用
date: 2015-11-01 13:02:11
tags: CSS 
categories: CSS
description: 本文详细描述了display:inline-block的基础知识，产生的问题和解决方法以及其常见的应用场景，加深了对inline-block应用的进一步理解。
---
本文详细描述了display:inline-block的基础知识，产生的问题和解决方法以及其常见的应用场景，加深了对inline-block应用的进一步理解。

### 基础知识
display:inline-block是什么呢？相信大家对这个属性并不陌生，根据名字inline-block我们就可以大概猜出它是结合了inline和block两者的特性于一身，简单的说：设置了inline-block属性的元素既拥有了block元素可以设置width和height的特性，又保持了inline元素不换行的特性。

举例说明：以前我们做横向菜单列表的时候，我们可以通过li和float:left两者来实现，现在可以通过li和display:inline-block。
> HTML代码

```
<ul>
        <li>
            首页
        </li>
        <li>
            关于
        </li>
        <li>
            热点
        </li>
        <li>
            联系我们
        </li>
    </ul>  
```
> CSS代码：

```
ul, li { padding: 0; margin: 0; list-style-type: none; }
        li { display: inline-block; border: 1px solid #000; }  
```
> 效果图：

![inline-block基本效果](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo1.jpg)

可以看到li元素可以横向排列，并且可以设置width属性，大家可以复制代码自己查看效果或查看[Demo](http://runjs.cn/code/2qc4sp6i)

### inline-block的问题
观察上面的例子，细心的同学肯定会发现，每个li之间有一个小空隙，而我们的代码中并没有设置margin等相关属性，这是为什么呢？

#### 默认的inline元素
首先，我们观察一下默认的inline元素的表现：
> HTML代码

```
    <a>首页</a>
    <a>热点</a>  
```
> CSS代码

```
 a { margin: 0; padding: 0; border: 1px solid #000; }  
```
> 效果图

![inline默认情况](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo2.jpg)

默认情况下，inline元素之间就有空隙出现，所以结合了inline和block属性的inline-block属性自然也有这个特点。
那这些空隙是什么呢，它们是空白符！

#### 消除空白符
在浏览器中，空白符是不会被浏览器忽略的，多个连续的空白符浏览器会自动将其合并成一个。我们编写代码时写的空格，换行都会产生空白符。所以自然而然的两个元素之间会有空白符，如果将上述例子中的a标签写成一行，空白符消失，菜单之间也就紧凑起来了。

空白符虽然是浏览器正常的表现行为，但是通常情况下，设计师同学的设计稿不会出现这些空隙，我们在还原设计稿的时候，怎么去除掉这些空隙呢。
要去除空白符产生的间隙，首先要理解空白符归根结底是个字符，通过设置font-size属性可以控制产生的间隙的大小。
首先我们将font-size设置成50px试试，修改CSS代码如下：
```
ul, li { padding: 0; margin: 0; list-style-type: none; font-size:50px}
        li { display: inline-block; border: 1px solid #000; width: 100px; text-align: center;font-size:12px }
```
我们修改ul的font-size为50px，而li的font-size为12px保持原来的字体大小，效果如下：
![font-size:50px的空隙](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo3.jpg)
可以看到菜单之间的空隙变大了。
接着我们设置font-site属性为0px，代码如下
```
ul, li { padding: 0; margin: 0; list-style-type: none; font-size:0px}
        li { display: inline-block; border: 1px solid #000; width: 100px; text-align: center;font-size:12px }
```
效果如下：
![font-size:0的空隙](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo4.jpg)
可以看到菜单之间的空隙没有了，大家可以自行查看[Demo](http://runjs.cn/code/2qc4sp6i)

#### 兼容性问题
在IE8+，FF和Chrome的浏览器，inline-block可以完美的兼容，考虑到IE6和IE7等低版本浏览器的占用率，虽然有办法可以兼容，但本文不再赘述，大家有兴趣的可以查找相关资料。

### inline-block的应用
inline-block的应用什么场景有哪些呢？我们大家考虑一个技术的应用场景时，首先一定要思考的是技术的特性和需求是否符合。inline-block的特点是结合inline和block两种属性的特性，可以设置width和height，并且元素保持行内排列的特性，基于这一点，所有行内排列并且可以设置大小的场景都是我们可以考虑使用inline-block的应用场景。下面举例说明：

#### 网页头部菜单
网页头部的菜单就是典型的横向排列并且需要设置大小的应用，在inline-block之前，实现菜单基本都是用float属性来实现，float属性会造成高度塌陷，需要清除浮动等问题，使用inline-block实现就不需要在意这样的问题。代码如下：
> HTML代码：

```
    <div class="header">
        <ul>
            <li>
                <a href="javascript:;" target="_blank">服装城</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">美妆馆</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">超市</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">全球购</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">闪购</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">团购</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">拍卖</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">金融</a>
            </li>
            <li>
                <a href="javascript:;" target="_blank">智能</a>
            </li>
        </ul>
    </div>  
```
> CSS代码

```
 a, ul, li { padding: 0; margin: 0; list-style-type: none; }
 a { text-decoration: none; color: #333; } 
 .header ul { font-size: 0; text-align: center; }
        .header li { display: inline-block; font-size: 16px; width: 80px; text-align: center; } 
```
> 效果图

![京东首页导航菜单](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo5.jpg)

这是模仿京东首页头部导航菜单的实现，使用inline-block可以很简单的实现横向菜单列表

#### 内联块元素
除了菜单之外，一切需要行内排列并且可设置大小的需求就可以用inline-block来实现。
例如使用a标签做按钮时，需要设置按钮的大小，我们就可以使用inline-block来实现。
> HTML代码：

```
    <div>
        点击右边的按钮直接购买
        <a href="javascript:;" class="button">
            购买
        </a>
    </div>  
```
> CSS代码：

```
        .button { display: inline-block; width: 150px; height: 45px; background: #b61d1d; color: #fff; text-align: center; line-height: 45px; font-size: 20px; }  
```
> 效果图

![a标签菜单](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo6.jpg)

#### 布局
inline-block也可以用于常见的布局，使用它就不需要去注意float属性布局带来的问题。
举例说明，创建一个常见的3列布局。
> HTML代码：

```
    <div class="wrap">
        <div class="header">
            网页头部
        </div>
        <div class="content">
            <div class="left">
                左侧
            </div>
            <div class="center">
                中间
            </div>
            <div class="right">
                右侧
            </div>
        </div>
        <div class="footer">
            网页底部
        </div>
    </div>  
```
> CSS代码

```
        body, div { margin: 0; padding: 0; }
        .header, .footer { width: 100%; background: #ccc; height: 120px; text-align: center; line-height: 120px; }
        .content { margin: 0 auto; background: #ff6a00; width: 1000px; font-size: 0; }
            .content .left, .content .center, .content .right { display: inline-block; font-size: 16px; height: 400px; }
            .content .left, .content .right { width: 200px; }
            .content .center { width: 600px; background: #00ffff; }  
```
> 效果图：

![inline-block的三列布局](http://7xnjy3.com1.z0.glb.clouddn.com/displayInlineBlock-demo7.jpg)
这个例子使用了inline-block做出了常见的网页布局。

关于inline-block的应用，只要是从左到右，从上到下，并且需要设置大小的列表都可以用它来实现，而这种需求是非常常见的，相比于float，我更推荐inline-block。inline-block的应用应该还有很多，大家可以多多挖掘出来。

### 总结
相比于使用float所带来的问题，使用inline-block所需要注意的点主要是空白符带来的问题，这一点也可以很方便的解决。
使用inline-block可以很方便的进行列表布局，更加符合我们的思维习惯，相信使用它的同学们也会越来越多，欢迎大家讨论。