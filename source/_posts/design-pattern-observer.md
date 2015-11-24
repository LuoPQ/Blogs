title: Javascript设计模式理论与实战：观察者模式
date: 2015-11-24 23:28:07
tags: [设计模式,Javascript]
categories: Web前端
description: 观察者模式主要应用于对象之间一对多的依赖关系，当一个对象发生改变时，多个对该对象有依赖的其他对象也会跟着做出相应改变，这就非常适合用观察者模式来实现。使用观察者模式可以根据需要增加或删除对象，解决一对多对象间的耦合关系，使程序更易于扩展和维护。
---
观察者模式主要应用于对象之间一对多的依赖关系，当一个对象发生改变时，多个对该对象有依赖的其他对象也会跟着做出相应改变，这就非常适合用观察者模式来实现。使用观察者模式可以根据需要增加或删除对象，解决一对多对象间的耦合关系，使程序更易于扩展和维护。
### 基础知识
观察者模式定义了对象间的一种一对多依赖关系，每当一个对象发生改变时，其相关依赖对象皆得到通知并被进行相应的改变。观察者模式又叫做发布-订阅模式。生活中有很多类似的关系，比如微信公众号订阅，多个读者订阅一个微信公众号，一旦公众号有更新，多个读者都会收到更新，而这种情况在应用程序中也非常常见，js绑定各种事件本质上就是观察者模式的实现。
观察者模式是一个非常有用的设计模式，它主要有两个角色组成：
（1）目标对象：作为一对多关系中的一，可以用来管理观察者的增加和删除
（2）观察者对象：观察目标对象，一旦目标发生改变则做出相应的反应

### 观察者模式的实现
#### 基本示例
在Web开发中，我们经常遇到这种情况，ajax请求数据后，要同时更新数据到页面的不同部分中，这种情况我们可以最直接的在ajax的回调中更新页面，但是如果要更新的位置很多，我们就要去修改回调函数，这样代码的维护性和扩张性不高，这种情况下，我们就可以用观察者模式来实现。
首先，需要一个最基本的目标对象，我们定义如下：
```
        function Subject() {
            this.observers = [];
        }
        Subject.prototype = {
            constructor: Subject,
            subscribe: function (fn) {
                this.observers.push(fn);
                return this;
            },
            unsubscribe: function (fn) {
                this.observers = this.observers.filter(function (item) {
                    if (item !== fn) {
                        return item;
                    }
                });
                return this;
            },
            fire: function (data, context) {
                this.observers.forEach(function (item) {
                    item.call(context, data);
                });
                return this;
            }
        };  
```
目标对象Subject中有一个数组，这个数组保存观察者列表，而目标对象提供三个方法：观察对象，取消观察对象，触发对象更新。
我们通过subscribe方法增加观察者，保存到observers数组中，如果有需要可以通过unsubscribe方法取消订阅，然后更新数据时调用fire方法触发，从而通知各个观察者进行相应处理。
假设我们页面有一个主视图和一个侧视图，两个视图都要进行相应的修改，我们可以定义两个对象如下：
```
        function SideView() { }
        SideView.prototype.render = function (data) {
            console.log("Side data:" + data);
        }
        function MainView() { }
        MainView.prototype.render = function (data) {
            console.log("MainView data:" + data);
        }  
```
上面代码定义了两个对象，分别为侧视图和主视图，两个对象都有相应的渲染页面的方法render，然后我们将两个方法添加到观察者列表中。
```
        var subject = new Subject();
        var sideView = new SideView();
        var mainView = new MainView();
        
        subject.subscribe(sideView.render)
        subject.subscribe(mainView.render);
        subject.fire("test");
```
通过调用fire方法，传入“test”，从而触发两个render函数。从这段代码中，我们可以很轻松地通过subscribe来添加观察者对象，而不必每次都去修改fire方法。

#### jQuery中的观察者模式
jQuery中实现观察者模式非常方便，简短的几句代码就可以实现
```
(function ($) {
            var obj = $({});
            $.subscribe = function () {
                obj.on.apply(obj, arguments);
            }
            $.unsubscribe = function () {
                obj.off.apply(obj, arguments);
            }
            $.fire = function () {
                obj.trigger.apply(obj, arguments);
            }
        })(jQuery); 
```
在jQuery中，通过on方法来绑定事件，off来移除事件，trigger来触发事件，本质上就是一种观察者模式。上面代码中，我们通过一个obj对象来保存观察者对象，我们只要像平时绑定事件一样使用就可以，如下：
```
        $.subscribe("render", function () {
            console.log("test");
        })
        $.subscribe("render", function () {
            console.log("test2");
        })
        $.fire("render");  
```
这段代码分别输出test和test2.我们绑定了两个处理函数到render上，然后通过fire触发render事件，这就实现了观察者模式一对多依赖的特点。

### 总结
观察者模式是一种很常用的设计模式，因为我们的应用程序中涉及到依赖关系的非常多。常见的比如消息通知，向用户发送一个消息需要同时通知到站内信，邮件，短信等多种消息，这种一对多的情况非常适合使用观察者模式来实现。使用观察者模式的关键是在于理清目标对象和观察者对象，目标对象通过一个数组对观察者对象进行管理，更新数据的时候再循环调用观察者对象，从而实现观察者模式。