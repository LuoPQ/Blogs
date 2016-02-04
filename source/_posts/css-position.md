title: 详解CSS position属性
date: 2015-11-15 10:05:16
tags: CSS
categories: CSS
description: position是CSS中非常重要的一个属性，通过position属性，我们可以让元素相对于其正常位置，父元素或者浏览器窗口进行偏移。postion也是初学者容易搞不清楚状况的一个属性，本文将从最基础的知识讲起，谈谈关于positon属性的一些理论与应用。
---
position是CSS中非常重要的一个属性，通过position属性，我们可以让元素相对于其正常位置，父元素或者浏览器窗口进行偏移。postion也是初学者容易搞不清楚状况的一个属性，本文将从最基础的知识讲起，谈谈关于positon属性的一些理论与应用。

### 基础知识
postion属性我们成为定位，它有4个不同类型的定位，这些类型会影响元素的生成方式，下面我们详细说明position属性。
#### position四种类型
（1）static
static是position属性的默认值，默认情况下，块级元素和行内元素按照各自的特性进行显示
（2）relative
relative翻译成中文称相对定位，设置了这个属性后，元素会根据top，left，bottom，right进行偏移，关键点是它原本的空间仍然保留。我们看下面例子：
HTML代码
```
<div class="relative">
</div>
<div></div>  
```
CSS代码
```
div { background: #0094ff; width: 250px; height: 100px; }
        .relative { background: #ff6a00; position: relative; width: 200px; height: 100px; top: 20px; left: 50px; }  
```
效果图
![relative效果](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo1.jpg "relative效果")

在这个例子中，div.relative相对定位，并且left设置为20px，left设置为50px，其相对于父元素进行偏移，并且原本的空间也占据着，下面的元素并不会顶替上去。

（3）absolute
元素设置成absolute后会脱离文档流，并且不占有原本的空间，后面的元素会顶替上去，而且不论元素是行内元素还是块级元素，都会生成一个块级框，也就是例如行内元素span设置了absolute后就可以设置height和width属性了。看下面例子：
HTML代码
```
<span class="absolute">
</span>
<div></div>  
```
CSS代码
```
div { background: #0094ff; width: 250px; height: 100px; }
        .absolute { background: #ff6a00; position: absolute; width: 200px; height: 100px; top: 20px; left: 50px; }  
```
效果图
![absolute效果](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo2.jpg "absolute效果")

如图所示，span标签被设置成绝对定位，就可以设置height和width属性，而且不占有原本的空间，后面的div元素会顶替上去。

（4）fixed
fixed的表现方式类似于absolute，但是相比于absolute相对于不确定的父元素进行偏移，fixed就是相对于浏览器窗口进行偏移

#### 包含块
在[详解CSS float属性](http://luopq.com/2015/11/08/CSS-float/)中我们提到包含块这个概念。对于position属性也有包含块这个属性，它要分几种情况来讨论：
1.根元素的包含块，根元素一般是html元素，有些浏览器会使用body作为根元素，大多数浏览器，初始包含块是一个视窗大小的矩形
2.非根元素的包含块，如果该元素的position是relative或static，它的包含块是最近的块级框，表的单元格或行内块的内容边界
我们举例进行说明，
HTML代码
```
<div>
    我是父级元素的内容        
    <div class="relative">
        相对定位元素
    </div>
</div>  
```
CSS代码
```
div { background: #0094ff; width: 250px; height: 100px; }
.relative { background: #ff6a00; position: relative; width: 200px; height: 100px; top: 20px; left: 50px; }  
```
效果图
![包含块](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo3.jpg "包含块")

这是相对定位元素的包含块，为最近的块级框，表的单元格或行内块的内容边界，相对定位元素相对于其包含块进行偏移，我们可以简单理解为相对于其原来的位置进行偏移。

3.非根元素的包含块，如果该元素的position是absolute，则包含块为最近的position不是static的祖先元素。
简单来说，它的包含块会从父级元素一直向上查找，找到第一个position不是static的元素为止。

#### 偏移属性
前面的例子中已经涉及到偏移属性，它指的是元素相对于其包含块的偏移，我们称其为偏移属性，分别是top，bottom，left，right，依次代表上下左右。他们的值可以是具体的数值，也可以是百分比。如果是百分比，top和bottom是相对于包含块高度的百分比，left和right是相对于宽度的百分比。它们也可以设置负值，即有可能将元素移动到包含块的外边。

### 绝对定位
接下来我们了解一下绝对定位的详细细节。

#### 基本的绝对定位
一个元素被设置为绝对定位时，会脱离文档流，然后相对其包含块进行偏移。
一般来说，我们会将一个元素设置为relative来作为absolute元素的包含块，我们看看下面的例子：
HTML代码
```
<div class="absolute">
        相对于初始包含块定位
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="relative">
        <div class="absolute">
            相对于最近relative祖先元素定位
        </div>
    </div>  
```
CSS代码
```
div { background: #0094ff; width: 250px; height: 100px; }
        .relative { background: #ff6a00; position: relative; width: 200px; height: 100px; top: 20px; left: 50px; }
        .absolute { background: #988c8c; position: absolute; width: 200px; height: 100px; top: 20px; left: 50px; }  
```
效果图
![基本的绝对定位](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo4.jpg "基本的绝对定位")
如图所示，有两个绝对定位元素，第一个元素没有position不是static的祖先元素，所以它的包含块是body，根据body进行偏移，
第二个绝对定位元素设置了一个relative的父元素，它根据父元素进行偏移。

#### 绝对定位的重叠问题
元素设置成绝对定位后会脱离文档流，并且失去占用的空间，而且如果偏移的位置接近，会造成重叠问题。看看下面的例子：
HTML代码
```
    <div class="relative">
        <div class="absolute">
            相对于最近relative祖先元素定位1
        </div>
        <div class="absolute light">
            相对于最近relative祖先元素定位2
        </div>
    </div>  
```
CSS代码
```
        div { background: #0094ff; width: 250px; height: 100px; }
        .relative { background: #ff6a00; position: relative; width: 500px; height: 300px; top: 20px; left: 50px; }
        .absolute { background: #988c8c; position: absolute; width: 200px; height: 100px; top: 20px; left: 50px; }
        .light { background: #f3d6d6; top: 70px; left: 80px; }  
```
效果图
![绝对定位的重叠问题](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo5.jpg "绝对定位的重叠问题")

我们可以看到，第二个绝对定位元素盖住了第一个元素，那怎么让第一个元素盖住第二个元素呢，这就要用到z-index属性，这个属性表示元素的叠加顺序，默认情况下，z-index为0，数值越高的元素层级越高，就可以盖住低于其层级的元素，我们设置第一个原色的z-index为10，结果如下
![绝对定位的重叠问题](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo6.jpg "绝对定位的重叠问题")
如果两个元素的层级相同，则越后面的元素会覆盖前面的元素，默认情况下，第二个元素就会盖住第一个元素。

### 固定定位
fixed定位很简单，类似与absoulte，但是它的包含块就是浏览器窗口，相对来说简单很多。常见的应用比如固定导航，回到顶部。在这里不再赘述，大家可以查找相关资料。

### 相对定位
relative定位的元素进行偏移后，不会脱离文档流，还有占据原本的空间。除此之外，我们还要注意一个细节：如果元素设置了margin为负值之后发生重叠的情况下，相对定位的元素会覆盖普通元素。我们看看下面的例子：
HTML代码
```
    <div class="no-relative">
        未相对定位的元素
    </div>
    <div class="minus-margin">
        负margin元素
    </div>  
```
CSS代码
```
        div { background: #0094ff; width: 250px; height: 100px; }
        .no-relative { background: #ff6a00; width: 200px; height: 100px; }
        .relative { background: #ff6a00; width: 200px; height: 100px; position: relative; }
        .minus-margin { margin-top: -30px; }  
```
效果图
![未相对定位时没有覆盖](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo7.jpg "未相对定位时没有覆盖")
默认情况下，两个元素都是正常的元素，设置了负的margin属性后，后面的元素会覆盖前面的元素，我们修改第一个元素的class为relative，可以看到效果如下：
![相对定位时覆盖](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo8.jpg "相对定位时覆盖")
添加了相对定位后，第一个元素就会覆盖其他正常的元素了。

relative属性最经常的一个应用应该是作为absolute元素的包含块了，为了限制absolute元素的偏移位置，常常设置其父元素为relative来作为其包含块。

### 应用举例
position的应用非常频繁，下面我来说说常见的一些场景：
#### 产品标签
在电商网站中，我们常常可以看到产品的左上角或右上角有一些比如“新品”，“促销”，“热卖”等标签，比如下图：
![产品标签](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo9.jpg "产品标签")
这个是怎么实现的呢，我们来模拟一下：
HTML代码：
```
<div class="product">
        我是产品
        <span class="hot">
            热卖
        </span>
    </div>  
```
CSS代码：
```
     .product { width: 150px; height: 150px; background: #0094ff; position: relative; }
        .hot { position: absolute; right: 10px; top: 10px; width: 40px; height: 20px; background: #ff6a00; text-align: center; }  
```
效果如下：
![产品标签](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo10.jpg "产品标签")
如图所示，右上角有一个标签。原理很简单，就是设置父元素相对定位，标签元素绝对定位，然后相对于父元素偏移到右上角。

#### 自动完成框
自动完成框是一个非常常见的应用，其生成的下拉菜单也是用到了position属性。我们先看看下面的效果：
![自动完成输入框](http://7xnjy3.com1.z0.glb.clouddn.com/css-position-demo11.jpg "自动完成输入框")
这是一个很简单常见的下来自动完成框，我们来看看它的HTML和CSS代码：
HTML代码
```
  <input class="search-box" type="text" placeholder="请输入关键字" value="position" />
    <ul style="left:58px;">
        <li>position属性</li>
        <li>position应用</li>
        <li>position是什么</li>
        <li>position翻译</li>
    </ul>  
```
CSS代码
```
        .search-box { border: 1px solid #ccc; width: 200px; padding: 5px; height: 24px; margin-left: 50px; }
        ul, li { list-style-type: none; }
        ul { border: 1px solid #ccc; width: 210px; position: absolute; }
        li { padding: 5px; }  
```
这个原理也很简单，通过设置下拉菜单为绝对定位，然后设置其left属性与输入框对齐。

当然position的应用还有很多，比如布局，比如fixed可以用来做固定导航菜单，网页右下角的固定菜单等，有兴趣的同学可以自行查找相关资料进行学习。

### 总结
position属性是一个容易让初学者迷惑的属性，尤其是absolute和relative的应用。要用好它们，首先要从absolute和relative的基本特性开始了解，理解了他们的特性之后应用起来就得心应手了，了解基本原理后，多多写几个例子从实践中去体会它们的特性，慢慢的就会熟悉了。

