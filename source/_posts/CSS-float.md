title: 详解CSS float属性
date: 2015-11-08 21:10:47
tags: CSS
categories: Web前端
description: CSS中的float属性是一个频繁用到的属性，对于初学者来说，如果没有理解好浮动的意义和表现出来的特性，在使用的使用很容易陷入困惑，云里雾里，搞不清楚状态。本文将从最基本的知识开始说起，谈谈关于浮动的应用，出现的问题和解决方案。
---
CSS中的float属性是一个频繁用到的属性，对于初学者来说，如果没有理解好浮动的意义和表现出来的特性，在使用的使用很容易陷入困惑，云里雾里，搞不清楚状态。本文将从最基本的知识开始说起，谈谈关于浮动的应用，出现的问题和解决方案。

### 基础知识
float，顾名思义就是浮动，设置了float属性的元素会根据属性值向左或向右浮动，我们称设置了float属性的元素为浮动元素。
浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。举例说明如下：
Html代码：
```
<div class="box">
        <span class="float-ele">
            浮动元素
        </span>
        普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流普通文档流
</div>  
```
CSS代码：
```
.box { background: #00ff90; padding: 10px; width: 500px; }
.float-ele { float: left; margin: 10px; padding: 10px; background: #ff6a00; width: 100px; text-align: center; }  
```
效果图
![float基本效果](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo1.jpg "float基本效果")

由效果图可以看出，span元素周围的文字会围绕着span元素，而设置了float属性的span元素变成了一个块级元素的感觉，可以设置width和height属性。这是设置了float属性后的效果，关于float的详细细节，我们接下来详细讲解。

### float的详细细节
在说明float带来的详细细节之前，我们首先要了解一个概念。
包含块：浮动元素的包含块就是离浮动元素最近的块级祖先元素，前面叙述的例子中，div.box就是span元素的包含块。

了解完包含块的概念之后，首先要说明的浮动元素的第一个特性：不管一个元素是行内元素还是块级元素，如果被设置了浮动，那浮动元素会生成一个块级框，可以设置它的width和height，因此float常常用于制作横向配列的菜单，可以设置大小并且横向排列。

浮动元素的展示在不同情况下会有不同的规则，下面我们来一一说明这些规则。
1.浮动元素在浮动的时候，其margin不会超过包含块的padding
这一点很简单，浮动元素的浮动位置不能超过包含块的内边界
HTML代码
```
<div class="box">
        <span class="rule1">
            浮动元素
        </span>
    </div>
```
CSS代码
```
.box { background: #00ff90; padding: 10px; width: 500px; height: 400px; }
        .rule1 { float: left; margin: 10px; padding: 10px; background: #ff6a00; width: 100px; text-align: center; }  
```
效果图
![float规则一](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo2.jpg "float规则一")
这个例子中，box的padding是10px，浮动元素的margin是10px，合起来为20px，即浮动元素不会超过包含块的padding。
PS：如果想要元素超出，可以设置margin属性

2.如果有多个浮动元素，后面的浮动元素的margin不会超过前面浮动元素的margin
简单说就是如果有多个浮动元素，浮动元素会按顺序排下来而不会发生重叠的现象。
修改前面例子中的HTML代码如下：
```
<div class="box">
        <span class="rule1">
            浮动元素1
        </span>
        <span class="rule1">
            浮动元素2
        </span>
        <span class="rule1">
            浮动元素3
        </span>
    </div>  
```
效果图如下：
![float规则二](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo3.jpg "float规则二")

如图所示，浮动元素会一个一个排序下来而不会发生重叠现象。

3.如果两个元素一个向左浮动，一个向右浮动，左浮动元素的marginRight不会和右浮动元素的marginLeft相邻。
什么意思呢，我们要分两种情况来看。
（1）包含块的宽度大于两个浮动元素的宽度总和，举例如下：
HTML代码：
```
<div class="box">
        <span class="rule1">
            浮动元素1
        </span>
        <span class="rule2">
            浮动元素2
        </span>
    </div>  
```
CSS代码
```
        .box { background: #00ff90; padding: 10px; width: 500px; height: 400px; }
        .rule1 { float: left; margin: 10px; padding: 10px; background: #ff6a00; width: 100px; text-align: center; }
        .rule2 { float: right; margin: 10px; padding: 10px; background: #ff6a00; width: 100px; text-align: center; }  
```
效果图
![float规则三情况1](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo4.jpg "float规则三情况1")

这种情况很简单：包含块元素的宽度足够大，两个元素一个向左浮动，一个向右浮动，井水不犯河水。

（2）包含块的宽度小于两个浮动元素的宽度总和
修改浮动元素的宽度为300px，CSS代码如下：
```
.rule1 { float: left; margin: 10px; padding: 10px; background: #ff6a00; width: 300px; text-align: center; }
.rule2 { float: right; margin: 10px; padding: 10px; background: #ff6a00; width: 300px; text-align: center; }  
```
效果图
![float规则三情况2](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo5.jpg "float规则三情况2")

如果所示，如果包含块宽度不够高，后面的浮动元素将会向下浮动，其顶端是前面浮动元素的底端。

4.浮动元素顶端不会超过包含块的内边界底端，如果有多个浮动元素，下一个浮动元素的顶端不会超过上一个浮动元素的底端
这条规则简单说就是如果有多个浮动元素，后面的元素高度不会超过前面的元素，并且不会超过包含块。举例如下：
HTML代码：
```
<div class="box">
        <p>在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，</p>
        <p class="rule1">
            浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1浮动元素1
        </p>
        <p>在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后</p>
        <p class="rule1">
            浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2浮动元素2
        </p>
    </div>  
```
CSS代码
```
        .box { background: #00ff90; padding: 10px; width: 500px; height: 400px; }
        .rule1 { float: left; margin: 10px; padding: 10px; background: #ff6a00; width: 250px; text-align: center; }
        p { margin-top: 20px; margin-bottom: 20px; }  
```
效果图
![float规则四](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo6.jpg "float规则四")
如图所示，两个浮动元素，后面的浮动元素不会超过前面的浮动元素

5.如果有非浮动元素和浮动元素同时存在，并且非浮动元素在前，则浮动元素不会不会高于非浮动元素
这条规则也是显而易见的，在第4条规则中的例子，浮动元素有一个非浮动元素p，而浮动元素没有超过它。

6.浮动元素会尽可能地向顶端对齐、向左或向右对齐
在满足其他规则下，浮动元素会尽量向顶端对齐、向左或向右对齐，在第4条规则中的例子，浮动元素会尽可能靠近不浮动的p元素，左侧对齐
![float规则六](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo7.jpg "float规则六")


### float特殊情况
前面讨论了float需要遵守的一些规则，这些规则都是在比较常见的场景下展示的结果。下面我们来讨论一些不常见的情况。
#### 浮动元素的延伸性
在说浮动元素的延伸性之前，我们首先来考虑一个比较特殊的例子。
我们将span元素放在p元素内，并将其高度设置成高于p元素并且左浮动，这个例子的关键在浮动元素高度高于父元素。
HTML代码
```
<p>
        在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，
        <span class="high-float">
            浮动元素比父级元素高
        </span>
    </p>
    <p>在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后在浮动元素之后</p>  
```
CSS代码
```
p { margin-top: 20px; margin-bottom: 20px; background-color: #00ff21; width: 500px; }
.high-float { float: left; height: 80px; line-height: 80px; background-color: orangered; }  
```
效果图
![浮动元素高度大于父级元素](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo8.jpg "浮动元素高度大于父级元素")

在这个例子中，浮动元素高度高于父元素，可以看到浮动元素超出了父元素的底端。
这种情况要怎么解决呢，只要将父元素也设置成浮动即可，我们将第一个p元素设置成左浮动，效果如下
![浮动元素延伸性](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo9.jpg "浮动元素延伸性")

将父元素p设置成float:left后，浮动元素就会被包含到父元素里面，我们将这个特性成为浮动元素的延伸性。
浮动元素的延伸性是什么呢，我们可以将其理解为元素被设置成浮动后，该元素会进行延伸进而包含其所有浮动的子元素

#### 浮动元素超出父级元素的padding
在前面提到的第一条规则：浮动元素的外边界不会超过父级元素的内边界。大部分情况下，我们见到的场景都是符合的。但是有一些特殊情况。
（1）负margin
我们将浮动元素的margin-left设置成负数。
HTML代码：
```
    <p>
        在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，
        <span class="minus-margin">
            负margin-left
        </span>
    </p>  
```
CSS代码：
```
p { margin-top: 20px; margin-bottom: 20px; margin-left: 50px; background-color: #00ff21; width: 500px; }
.minus-margin { float: left; height: 80px; line-height: 80px; background-color: orangered; margin-left: -20px; }  
```
效果图
![负maring的浮动元素](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo10.jpg "负maring的浮动元素")

将margin-left设置成负数之后，浮动的子元素明显超出了父元素的内边界，这难道不是违反了第一条规则吗？
但仔细想想，这其实是合理的，因为默认情况下marign-left就是0，所以不会超出父元素的内边界，但是将其设置成负数之后，就相当于浮动元素覆盖了自己的内边界一样。
我们在从数学的角度来看看这个问题，这个例子中：
父元素的margin-left:50px，padding和border默认为0，即内边界所在距离浏览器左侧的位置为50px。
浮动的子元素默认情况下距离浏览器左侧的像素应该为50px，但是将其设置成margin-left:20px后，浏览器会进行计算：
50px+（-20px）margin+0border+0padding=30px。距离浏览器左侧更近，所以超出了父元素。

（2）浮动元素宽度大于父级元素宽度
如果我们将浮动元素的宽度设置大于父级元素，效果会如何呢？
元素左浮动，width大于父级元素
HTML代码
```
    <p>
        在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，
        <span class="big-width">
            width大于父级元素
        </span>
    </p>  
```
CSS代码
```
p { margin-top: 20px; margin-bottom: 20px; margin-left: 50px; background-color: #00ff21; width: 250px; }
.big-width { float: left; height: 80px; line-height: 80px; background-color: orangered; width: 300px; }  
```
效果图
![大width的浮动元素](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo11.jpg "大width的浮动元素")

将浮动元素左浮动，并且宽度超出父级元素时，由于浮动元素宽度较大，它会超过父级元素的右内边界
如果将其设置成右浮动，情况又会怎么样呢？
![大width的浮动元素](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo12.jpg "大width的浮动元素")
可以看到，设置成右浮动后，会超出父级元素的左内边界。

#### 重叠问题
重叠问题是指两个元素再同一个位置，会出现上下重叠的问题。浮动元素如果和普通文档流发生重叠会怎么样呢？
首先浮动元素要怎么样才会发生重叠呢，设置其margin-top为负数即可。我们看看例子：
HTML代码：
```
<p>
        <span>
            在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前。
        </span>
        <span class="overlay">
            浮动元素重叠
        </span>
    </p>  
```
CSS代码
```
p { margin-top: 20px; margin-bottom: 20px; margin-left: 50px; background-color: #00ff21; width: 250px; }
.overlay { float: left; height: 80px; line-height: 80px; background-color: orangered; width: 300px; margin-top: -30px; }  
```
效果图如下：
![浮动元素的重叠问题](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo13.jpg "浮动元素的重叠问题")
如果浮动元素不设置负margin时，是这样的
![浮动元素的重叠问题](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo14.jpg "浮动元素的重叠问题")

在这个例子中，可以看到p中正常流元素span的内容会显示在浮动元素上面。
我们给设置span设置背景图片试试，效果如下：
![浮动元素的重叠问题：有背景图](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo15.jpg "浮动元素的重叠问题：有背景图")

元素设置背景后，重叠的部分还是会显示背景

如果是span标签换成div标签会怎么样呢？
HTML代码：
```
   <p>
        <div style="background-image:url(../images/banner1.jpg)">
            在浮动元素之前在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前，在浮动元素之前。
        </div>
        <span class="overlay">
            浮动元素重叠
        </span>
    </p>  
```
效果图
![浮动元素的重叠问题：块级元素有背景图](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo16.jpg "浮动元素的重叠问题：块级元素有背景图")
这种情况下，重叠的部分不会显示背景图片。

总结一下这两种情况的区别：
1、行内元素与浮动元素发生重叠，其边框，背景和内容都会显示在浮动元素之上
2、块级元素与浮动元素发生重叠时，边框和背景会显示在浮动元素之下，内容会显示在浮动元素之上

### clear属性
有的时候，我们不希望一些元素会被旁边的浮动元素影响到，这个时候就需要用到clear属性了。
clear属性：确保当前元素的左右两侧不会有浮动元素。
我们举个例子进行说明：
假设有3个浮动的div如下所示：
![3个浮动元素](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo17.jpg "浮动元素的重叠问题：3个浮动元素")

它的HTML代码和CSS代码如下
HTML代码：
```
<div class="box">
        <div class="float">浮动元素1</div>
        <div class="float">浮动元素2</div>
        <div class="float">浮动元素3</div>
    </div>  
```
CSS代码：
```
 .float { float: left; width: 150px; background: #0094ff; border: 1px solid red; margin-left: 5px; }
.cl { clear: left; }
.cr { clear: right; }
.cb { clear: both; }  
```
假设有我们有想让第二个浮动元素另起一行进行浮动，那该怎么做呢？
根据clear属性的定义：确保当前元素的左右两侧不会有浮动元素。
我们对第一个浮动元素添加clear:right保证其右侧不会有浮动元素。修改HTML代码如下：
```
<div class="box">
    <div class="float cr">浮动元素1</div>
    <div class="float">浮动元素2</div>
    <div class="float">浮动元素3</div>
</div>
```
查看效果发现没有什么变化
![第1个元素清除浮动](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo17.jpg "浮动元素的重叠问题：第1个元素清除浮动")

这种方法是错误的！！

那我们试试给第二个元素添加clear:left保证其左侧不会出现浮动元素。修改HTML代码如下：
```
<div class="box">
    <div class="float">浮动元素1</div>
    <div class="float cl">浮动元素2</div>
    <div class="float">浮动元素3</div>
</div>
```
![第2个元素清除浮动](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo18.jpg "浮动元素的重叠问题：第2个元素清除浮动")
可以看到这次clear属性有效果了。


同样是设置clear属性，为什么会出现这样的结果呢？
使用clear属性的时候要记住：**clear只对元素本身的布局起作用**。
在前面的例子中，第一个浮动元素添加了clear属性，它并不会影响到其他元素的布局，只会影响自己，所以第二个浮动元素并不会另起一行。
而第二个浮动元素设置了clear后，我们可以看到clear作用于自己，所以元素另起一行。

### 清除浮动
清除浮动是一个经常提到的东西，首先我们要理解使用浮动会带来什么问题，以及为什么要清除浮动。
我们知道，一个块级元素如果没有设置height，其height是由子元素撑开的。对子元素使用了浮动之后，子元素会脱离标准文档流，也就是说，父级元素中没有内容可以撑开其高度，这样父级元素的height就会被忽略，这就是所谓的高度塌陷。要解决这样的问题，我们就是要使用清除浮动。
清除浮动有很多方法，下面我们一一说明每一种方法。

对于IE浏览器来说，要清除浮动带来的问题，只需要触发器hasLayout就可以，直接设置样式zoom:1就可以触发。关于hasLayout的知识，这里暂不详述，以后我们专门来讲讲这个东西，感兴趣的同学可以先查查相关资料。

对于非IE浏览器，主要有下面几种方法：
#### 增加额外的div
这是最简单直接的方法，哪里有浮动元素，就在其父级元素后增加一个
```
<div style="clear:both"></div>
```
这样就会清除浮动元素带来的问题。
优点：简单直接，初学者常常使用的方法，也易于理解
缺点：增加额外的无意义标签，不利于语义化，每次清除都要添加额外的空标签，造成浪费

#### 父级元素添加overflow:hidden
这个方法的关键在于触发了BFC，BFC是CSS中的难点之一，我们以后专门来学习这个概念。现在只需要知道它可以清除浮动带来的影响。
```
.clearfix{overflow:hidden;zoom:1}
```
优点：代码量少，没有额外的标签
缺点：如果子元素超出父元素的范围，会造成超出的部分被隐藏

#### after伪元素
after表示子元素的后面，通过它可以设置一个具有clear的元素，然后将其隐藏
```
clearfix:{
    zoom:1
}
clearfix:after{
    display:block; content:''; clear:both; height:0; visibility:hidden;
}
```
这种方法的远离和第一个方法一样，就是生成一个元素来清除浮动，只是这个元素是“假的”。
优点：没有额外标签，综合起来算是比较好的方法
缺点：稍显复杂，但是理解其原理后也挺简单的
推荐使用这种方法。

### float的应用
说了这么多float的原理和可能造成的问题，接下来我们就要谈谈float的应用。

#### 文字环绕效果
float最初的应用就是文字环绕效果，这对图文并茂的文章很有用。我们简单的距离说明一下：
HTML代码
```
<div class="box">
        <img src="1.jpg" class="float" />
        我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字我是环绕的文字
    </div>  
```
CSS代码：
```
.box { background: #00ff90; padding: 10px; width: 500px; }  
.float {background: #0094ff none repeat scroll 0 0;border: 1px solid red;float: left;margin-left: 5px;width: 400px;}
```
效果图
![文字环绕效果](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo19.jpg "文字环绕效果")

这样很轻松的实现了文字环绕效果。

#### 横向菜单排列
在之前提到的display:inline的文章[详解CSS display:inline-block的应用](http://luopq.com/2015/11/01/display-inline-block/)中，我们提到了横向排列菜单的实现，最早是利用float属性来实现的，它可以很简单的实现横向菜单的效果。
HTML代码：
```
    <ul class="menu clearfix">
        <li>首页</li>
        <li>政治</li>
        <li>娱乐</li>
        <li>体育</li>
        <li>游戏</li>
    </ul>  
```
CSS代码：
```
        .clearfix: { zoom: 1; }
            .clearfix:after { display: block; content: ''; clear: both; height: 0; visibility: hidden; }
        .menu { background: #0094ff; width: 500px; }
            .menu li { float: left; width: 100px; list-style-type: none; }  
```
效果图：
![横向菜单](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo20.jpg "横向菜单")
这种方式可以很轻松的实现横向菜单效果，但需要注意的是要注意清除浮动，推荐使用display:inline-block来实现

#### 布局
float最经常使用的场景就是布局。使用float可以很简单的实现布局，而且易于理解。下面我们来实现一个三栏两列的固定布局。
HTML代码：
```
    <div class="header">
        我是头部
    </div>
    <div class="content clearfix">
        <div class="side">左侧</div>
        <div class="main">
            右侧
        </div>
    </div>
    <div class="footer">
        我是底部
    </div>  
```
CSS代码
```
        .clearfix: { zoom: 1; }
            .clearfix:after { display: block; content: ''; clear: both; height: 0; visibility: hidden; }
        .header, .footer { height: 50px; background: #0094ff; text-align: center; }
        .content { margin: 0 auto; width: 1000px; background: #000000; }
        .side { float: left; height: 500px; width: 280px; background: #ff006e; }
        .main { float: right; height: 500px; width: 700px; background: #fbcfcf; }  
```
效果图
![三栏两列布局](http://7xnjy3.com1.z0.glb.clouddn.com/CSS-float-Demo21.jpg "三栏两列布局")
这就是一个很常见的布局，要注意的就是清除浮动的问题。

float常见的应用大概是这几种，当然它存在着更多的应用等待着大家去挖掘，欢迎交流！！

### 总结
float属性是一个频繁用到的属性，要用好它就要理解它的特性，否则容易云里雾里搞不清楚状况。关于float，最重要的是要理解下面几点：
1.float会造成元素脱离文档流
2.float影响元素的几个规则
3.浮动带来的问题以及如何清除浮动
