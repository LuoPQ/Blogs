title: Javascript设计模式理论与实战：桥接模式
date: 2015-11-11 22:37:21
tags: [设计模式,Javascript]
categories: Javascript
description: 桥接模式将抽象部分与实现部分分离开来，使两者都可以独立的变化，并且可以一起和谐地工作。抽象部分和实现部分都可以独立的变化而不会互相影响，降低了代码的耦合性，提高了代码的扩展性。
---
桥接模式将抽象部分与实现部分分离开来，使两者都可以独立的变化，并且可以一起和谐地工作。抽象部分和实现部分都可以独立的变化而不会互相影响，降低了代码的耦合性，提高了代码的扩展性。

### 基本理论
桥接模式定义：将抽象部分与它的实现部分分离，使它们都可以独立地变化。
桥接模式主要有4个角色组成：
（1）抽象类
（2）扩充抽象类
（3）实现类接口
（4）具体实现类
根据javascript语言的特点，我们将其简化成2个角色：
（1）扩充抽象类
（2）具体实现类
怎么去理解桥接模式呢？我们接下来举例说明

### 桥接模式的实现

理解桥接模式的思想，关键是要理解其分离抽象部分和实现部分的思想。我们举例进行说明
#### 最简单的桥接模式
其实我们最经常用的jQuery的each函数就是一个典型的桥接模式，我们模拟其实现如下：
```
        var each = function (arr, fn) {
            for (var i = 0; i < arr.length; i++) {
                var val = arr[i];
                if (fn.call(val, i, val, arr)) {
                    return false;
                }
            }
        }
        var arr = [1, 2, 3, 4];
        each(arr, function (i, v) {
            arr[i] = v * 2;
        })  
```
在这个例子中，我们通过each函数循环了arr数组，别看这个例子很常见，但其中就包含了典型的桥接模式。
在这个例子中，抽象部分是each函数，也就是上面说的扩充抽象类，实现部分是fn，即具体实现类。抽象部分和实现部分可以独立的进行变化。这个例子虽然简单，但就是一个典型的桥接模式的应用。

#### 插件开发中的桥接模式
桥接模式的一个适用场景是组件开发。我们平时开发组件为了适应不同场合，组件相应的会有许多不同维度的变化。桥接模式就可以应用于此，将其抽象与实现分离，使组件的扩展性更高。
假设我们要开发一个弹窗插件，弹窗有不同的类型：普通消息提醒，错误提醒，每一种提醒的展示方式还都不一样。这是一个典型的多维度变化的场景。首先我们定义两个类：普通消息弹窗和错误消息弹窗。
```
        function MessageDialog(animation) {
            this.animation = animation;
        }
        MessageDialog.prototype.show = function () {
            this.animation.show();
        }
        function ErrorDialog(animation) {
            this.animation = animation;
        }
        ErrorDialog.prototype.show = function () {
            this.animation.show();
        }  
```
这两个类就是前面提到的抽象部分，也就是扩充抽象类，它们都包含一个成员animation。
两种弹窗通过show方法进行显示，但是显示的动画效果不同。我们定义两种显示的效果类如下：
```
        function LinerAnimation() {
        }
        LinerAnimation.prototype.show = function () {
            console.log("it is liner");
        }
        function EaseAnimation() {
        }
        EaseAnimation.prototype.show = function () {
            console.log("it is ease");
        }  
```
这两个类就是具体实现类，它们实现具体的显示效果。那我们如何调用呢？
```
        var message = new MessageDialog(new LinerAnimation());
        message.show();
        var error = new ErrorDialog(new EaseAnimation());
        error.show();  
```
如果我们要增加一种动画效果，可以再定义一种效果类，传入即可。

### 总结
学习桥接模式关键是要理解抽象部分与实现部分的分离，使得二者可以独立的变化，而不必拘泥于形式。JS插件灵活的变化，适用场景的多变就非常适合使用这种模式来实现。使用桥接模式最重要的是要找出系统中不同的变化维度。


