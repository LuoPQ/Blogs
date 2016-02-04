title: Javascript设计模式理论与实战：单例模式
date: 2015-10-27 22:19:11
tags: [设计模式,Javascript]
categories: Javascript
description: 在Javascript中，单例模式是一种最基本又经常用到的设计模式，可能在不经意间就用到了单例模式。本文将从最基础的理论开始，讲述单例模式的基本概念和实现，最后用一个例子来讲述单例模式的应用。
---
在Javascript中，单例模式是一种最基本又经常用到的设计模式，可能在不经意间就用到了单例模式。
本文将从最基础的理论开始，讲述单例模式的基本概念和实现，最后用一个例子来讲述单例模式的应用。

### 理论基础

#### 概念
单例模式，顾名思义就是只有一个实例存在。通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。

#### 基本结构
最简单的单例模式起始就是一个对象字面量，它将有关联的属性和方法组织到一起。
```
var singleton = {
    prop:"value",
    method:function(){
    }
}
```
这种形式的单例模式，所有成员都是公开的，都可以通过singleton来访问。这样的缺点是单例中有一些辅助的方法并不希望暴露给使用者，如果使用者用了这些方法，然后在后面维护的时候，一些辅助方法被删除，这样会造成程序错误。
如何避免这样从的错误呢？

#### 包含私有成员的单例模式
要怎么在类中创建私有成员呢，这通过需要闭包来进行实现，关于闭包的知识，本文不再赘述，大家可以自行Google。
基本形式如下：
```
var singleton = (function () {
            var privateVar = "private";
            return {
                prop: "value",
                method: function () {
                    console.log(privateVar);
                }
            }
        })();  
```
首先是一个自执行的匿名函数，在匿名函数中，声明了一个变量privateVar，返回一个对象赋值给单例对象singleton。在匿名函数外部无法访问到privateVar变量，它就是单例对象的私有变量，只能在函数内部或通过暴露出来的方法去访问这个私有变量。这种形式又被成为模块模式。

#### 惰性实例化
不管是直接字面量或者私有成员的单例模式，两者都是在脚本加载时就被创建出来的单例，但是有时候，页面可能永远也用不到这个单例对象，这样会造成资源浪费。对于这种情况，最佳的处理方式就是惰性加载，就是说在需要的时候才去真正实例化这个单例对象，如何实现呢？
```
var singleton = (function () {
            function init() {
                var privateVar = "private";
                return {
                    prop: "value",
                    method: function () {
                        console.log(privateVar);
                    }
                }
            }
            var instance = null;
            return {
                getInstance: function () {
                    if (!instance) {
                        instance = init();
                    }
                    return instance;
                }
            }
        })();  
```
首先将创建单例对象的代码封装到init函数中，然后声明一个私有变量instance表示单例对象的实例，公开一个方法getInstance来获取单例对象。
调用的时候就通过singleton.getInstance()来进行调用，单例对象是在调用getInstance的时候才真正被创建。

#### 适用场合
单例模式是JS中最常使用的设计模式，从增强模块性和代码组织性等方面来说，应该尽可能的使用单例模式。它可以把相关代码组织到一起便于维护，对于大型项目，每个模块惰性加载可以提高性能，隐藏实现细节，暴露出常用的api。常见的类库比如underscore，jQuery我们都可以将其理解为单例模式的应用。

### 结合实战
前面已经讲过，单例模式是最常用的设计模式之一，我们来举个例子进行说明，
下面的代码主要实现一个简单的日期帮助类，通过单例模式实现：
#### 基本的单例模式结构
```
var dateTimeHelper = {
            now: function () {
                return new Date();
            },
            format: function (date) {
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            }
        };  

console.log(dateTimeHelper.now());
```
这段代码通过对象字面量实现单例模式，使用的时候直接调用方法即可。

#### 惰性加载实现单例模式
```
 var dateTimeHelper = (function () {
            function init() {
                return {
                    now: function () {
                        return new Date();
                    },
                    format: function (date) {
                        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    }
                }
            }
            var instance = null;
            return {
                getInstance: function () {
                    if (!instance) {
                        instance = init();
                    }
                    return instance;
                }
            }
        })();  
console.log(dateTimeHelper.getInstance().now())
```
这就是惰性加载的单例模式。

### 总结
单例模式的好处在于对代码的组织作用，将相关的属性和方法封装在一个不会被多次实例化的对象中，让代码的维护和调试更加轻松。隐藏了实现细节，可以防止被错误修改，还防止了全局命名空间的污染。另外可以通过惰性加载提高性能，减少不必要的内存消耗。
