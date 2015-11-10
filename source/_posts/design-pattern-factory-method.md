title: Javascript设计模式理论与实战：工厂方法模式
date: 2015-11-10 14:44:26
tags: [设计模式,Javascript]
categories: Web前端
description: 本文从简单工厂模式的缺点说起，引入工厂方法模式，介绍的工厂方法模式的基本知识，实现要点和应用场景，最后举例进行说明工厂方法模式的应用。
---
本文从简单工厂模式的缺点说起，引入工厂方法模式，介绍的工厂方法模式的基本知识，实现要点和应用场景，最后举例进行说明工厂方法模式的应用。
在之前的《[Javascript设计模式理论与实战：简单工厂模式](http://luopq.com/2015/11/03/design-pattern-factory/)》这篇文章中，我们介绍了简单工厂的知识和一些应用。简单工厂模式存在一个唯一的工厂类，它的优点是所有产品类的实例化集中管理，便于理解，但这既是优点也是缺点。如果
产品类的数量较少并且不会经常发生变化，我们可以直接利用简单工厂模式，但是有的时候，需求是随时在变的，产品类也可能随时在增加，如果使用简单工厂模式，就不可避免的要去修改工厂类的代码。要解决这个问题，就要提到今天要说的工厂方法模式。

### 基本概念
工厂方法模式：不再有一个唯一的工厂类就创建产品，而是将不同的产品交给对应的工厂子类去实现。每个产品由负责生产的子工厂来创造。如果添加新的产品，需要做的是添加新的子工厂和产品，而不需要修改其他的工厂代码。

工厂方法模式主要有三种类组成：
1.抽象工厂类：负责定义创建产品的公共接口。
2.产品子工厂：继承抽象工厂类，实现抽象工厂类提供的接口
3.每一种产品各自的产品类

### 工厂方法模式的实现
首先，我们对《[Javascript设计模式理论与实战：简单工厂模式](http://luopq.com/2015/11/03/design-pattern-factory/)》一文中简单工厂模式的代码进行改造。下面是简单工厂公式的代码：
```       
        var productEnums = {
            flight: "flight",
            hotel: "hotel"
        };
        function Flight() {
            console.log("This is Flight");
        }
        function Hotel() {
            console.log("This is Hotel");
        }
        var productFactory = (function () {
            var productFactories = {
                "flight": function () {
                    return new Flight();
                },
                "hotel": function () {
                    return new Hotel();
                }
            };
            
            return {
                createProduct: function (productType) {
                    return productFactories[productType]();
                }
            }
        })();
        function User() {
            this.shopCart = [];
        }
        User.prototype = {
            constructor: User,
            order: function (productType) {
                this.shopCart.push(productFactory.createProduct(productType));
            }
        }  
```
要将上面的代码修改成工厂方法模式，首先要构造一个抽象工厂类。在JS中，由于我们抽象类的概念，我们无法做到像Java，C#的抽象工厂类，但是我们可以去模拟它。代码如下
```
function AbstractFactory() {
}
AbstractFactory.prototype.createProduct = function () {
    throw "没有实现该方法";
}  
```
在这段代码中，定义了一个工厂类，然后定义了它的一个方法CreateProduct，这个方法模拟抽象方法，不提供具体实现，而是抛出错误，继承的工厂类就要去实现具体方法，否则会抛错，这就模拟了一个抽象工厂类。
定义完抽象工厂类后，现在我们要做的就是定义子工厂去实现它，我们分别定义两个子工厂FlightFactory和HotelFactory。
```
        function FlightFactory() {
            AbstractFactory.call(this);
        }
        FlightFactory.prototype = new AbstractFactory();
        FlightFactory.prototype.createProduct = function () {
            return new Flight();
        }
        function HotelFactory() {
            AbstractFactory.call(this);
        }
        HotelFactory.prototype = new AbstractFactory();
        HotelFactory.prototype.createProduct = function () {
            return new Hotel();
        }  
```
以上代码分别定义了两个子工厂类，每个子类继承抽象工厂类，然后实现createProduct方法，每一种产品在各自的工厂类里创建。
在客户端怎么调用呢？
```
        var factory = new FlightFactory();
        factory.createProduct();
        factory = new HotelFactory();
        factory.createProduct();  
```

### 疑点解答
首先我们要理解一个概念：开放封闭原则。
软件实体应该是可扩展但不可修改的，就是对扩展是开放但是对修改是封闭的。体现在两个方面：
（1）对扩展开放，产品有新需求或变活时，可以对现有代码进行扩展，以适应新变化
（2）对修改封闭，类一旦设计完成，就不应该对其进行修改。

下面来说说几个疑点
1、相比于简单工厂模式，工厂方法模式增多了一个抽象工厂类和多个子工厂类，这样代码不是更复杂了吗？
确实，代码比简单工厂模式复杂了，引入了抽象层，还有子工厂，这会增加代码的复杂度和理解难度。但是相比于简单工厂模式，代码的维护性和扩展性提高了，新增产品时，只需要增加对应的产品类和产品工厂类，不需要修改到抽象工厂类和其他子工厂。更加符合面向对象的开放封闭原则。
当然具体场景具体分析，复杂性和扩展性相比如何舍去，在使用的时候要结合实际场景去分析。
2、在客户端调用的时候，每一种产品还是需要知道具体的工厂类来调用，好像区别不大？
和简单工厂模式的区别在于：我们将判断使用哪一个产品类的代码从工厂类转移到了调用的客户端这里，如果有新功能要添加，我们要修改的是客户端的代码而不是工厂类的代码，这样才符合开放封闭原则。

### 总结
#### 实现要点
在JS中，我们实现工厂方法模式主要包括3个角色：
1.抽象工厂类：提供工厂方法的声明
2.子工厂类：实现抽象工厂类的工厂方法
3.产品类：具体的产品类

#### 优缺点
优点：克服了简单工厂模式的缺点。如果需要增加新的产品类，无须修改现有系统，只需要增加新的工厂类和产品类；每个工厂类封装了产品对象的创建细节，系统具有良好的灵活性和可扩展性。
缺点：增加新产品的同时需要增加新的工厂，导致系统类的个数成对增加，在一定程度上增加了系统的复杂性。
