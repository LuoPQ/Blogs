title: Javascript设计模式理论与实战：状态模式
date: 2015-11-25 14:59:34
tags: [设计模式,Javascript]
categories: Javascript
description: 在软件开发中，很大部分时候就是操作数据，而不同数据下展示的结果我们将其抽象出来称为状态，我们平时开发时本质上就是对应用程序的各种状态进行切换并作出相应处理。状态模式就是一种适合多种状态场景下的设计模式。使用状态模式可以可以让代码更加清晰，提高应用程序的维护性和扩展性。
---
在软件开发中，很大部分时候就是操作数据，而不同数据下展示的结果我们将其抽象出来称为状态，我们平时开发时本质上就是对应用程序的各种状态进行切换并作出相应处理。状态模式就是一种适合多种状态场景下的设计模式。使用状态模式可以可以让代码更加清晰，提高应用程序的维护性和扩展性。
### 基础知识
状态模式定义一个对象，这个对象可以通过管理其状态从而使得应用程序作出相应的变化。状态模式是一个非常常用的设计模式，它主要有两个角色组成：
（1）环境类：拥有一个状态成员，可以修改其状态并作出相应反应。
（2）状态类：表示一种状态，包含其相应的处理方法

### 状态模式的实现
#### 基本示例
我们简单地通过一个红绿灯的例子来说明状态模式，红绿灯拥有一个状态：哪一种颜色的灯亮了，每一种颜色的灯亮了之后又各自的动作，一共有红绿黄三种颜色的灯，也就是有三种状态。
首先，需要一个最基本的红绿灯对象，我们定义如下：
```
       var trafficLight = (function () {
            var currentLight = null;
            return {
                change: function (light) {
                    currentLight = light;
                    currentLight.go();
                }
            }
        })();
```
上面的代码中，trafficLight是一个红绿灯对象，它有一个局部变量currentLight表示当前亮灯的对象，同时返回一个方法，这个方法用来改变红绿灯的状态，并触发相应的处理程序。
接着我们定义三种不同颜色的灯，代码如下：
```
        function RedLight() { }
        RedLight.prototype.go = function () {
            console.log("this is red light");
        }
        function GreenLight() { }
        GreenLight.prototype.go = function () {
            console.log("this is green light");
        }
        function YellowLight() { }
        YellowLight.prototype.go = function () {
            console.log("this is yellow light");
        }  
```
这段代码分别定义了红绿黄三种颜色的灯对象，每一个对象都包含一个go方法作为亮灯之后的处理程序。
接着，我们在客户端进行切换不同颜色的灯：
```
        trafficLight.change(new RedLight());
        trafficLight.change(new YellowLight());
```
通过传入灯对象到change方法中，从而改变红绿灯的状态，触发其相应的处理程序，这就是一个典型的状态模式的应用。

#### JS组件开发中的状态模式
状态模式在开发JS组件时非常有用，我们平时开发组件时很多时候要切换组件的状态，每种状态有不同的处理方式，这个时候就可以使用状态模式进行开发
比如我们要开发一个菜单组件，菜单拥有最基本的两种状态：显示和隐藏，相应的显示或隐藏可能会有各自的其他操作。使用状态模式的话，我们首先定义一个环境类，在这里也就是菜单对象，简单地定义如下：
```
        function Menu() { }
        Menu.prototype.toggle = function (state) {
            state();
        }  
```
这个菜单类有一个toggle方法用来切换状态，然后调用相应的处理方法。
接着我们定义两种状态，定义如下：
```
        var menuStates = {
            "show": function () {
                console.log("the menu is showing");
            },
            "hide": function () {
                console.log("the menu is hiding");
            }
        };       
```
在这里，通过一个对象menuStates来定义menu的状态，这里有两种状态show和hide，然后拥有相应的处理方法。在使用的时候通过下面的方法进行调用：
```
        var menu = new Menu();
        menu.toggle(menuStates.show);
        menu.toggle(menuStates.hide);  
```
这段代码实例化了一个Menu对象，然后分别切换了显示和隐藏两种状态，如果有第三种状态，我们只需要menuStates添加相应的状态和处理程序即可。

### 总结
状态模式在开发Web组件时非常有用，能让我们的代码结构更加清晰，能够很方便的增加组件的各种状态。使用状态模式的关键是要理清组件的各种状态，搞清楚组件的不同状态和相应的处理函数，对组件后期的维护和扩展有极大的好处。