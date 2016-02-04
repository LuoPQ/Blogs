title: Javascript设计模式理论与实战：简单工厂模式
date: 2015-11-03 00:35:48
tags: [设计模式,Javascript]
categories: Javascript
description: 通常我们创建对象最常规的方法就是使用new关键字调用构造函数，这会导致对象之间的依赖性。工厂模式是一种有助于消除类之间依赖性的设计模式，它使用一个方法来决定要实例化哪一个类。本文详细介绍了简单工厂模式的理论，并且举例说明了简单工厂模式的具体应用。
---
通常我们创建对象最常规的方法就是使用new关键字调用构造函数，这会导致对象之间的依赖性。工厂模式是一种有助于消除类之间依赖性的设计模式，它使用一个方法来决定要实例化哪一个类。本文详细介绍了简单工厂模式的理论，并且举例说明了简单工厂模式的具体应用。
#### 基本介绍
简单工厂模式是工厂模式中最基本的一种。通过定义一个工厂类，根据参数实例化具体的某个产品类。
#### 举例说明
我们举个例子进行说明：假设我们开发一个旅游行业网站，网站上面销售机票，酒店等产品。一个用户准备购买一张机票。我们可以定义相关类如下：
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
        function User() {
            this.shopCart = [];
        }
        User.prototype = {
            constructor: User,
            order: function (productType) {
                var product = null;
                switch (productType) {
                    case productEnums.flight:
                        product = new Flight();
                    case productEnums.hotel:
                        product = new Hotel();
                    default:
                }
                this.shopCart.push(product);
            }
        }
        var user = new User();
        user.order(productEnums.flight);  
```
这段代码定义了三个类：用户类User，机票类Flight，酒店类Hotel，其中User包含预订方法。用户预订的时候直接传入产品类型即可。这段代码乍一看没什么问题，但是需求和业务是随时变化的，如果公司业务扩展，增加了签证业务，我们就要去修改User类来保证它支持签证。我们当然可以这么做，但直接去修改User类有什么不好呢，有没有更好的方法呢？
首先要说的是User类，这个类是表示用户类，而用户类本质上跟具体的某一类业务是无关的，也就是说，业务有可能随时增加，但是用户关于业务方面的代码也就是创建产品订单。新增的签证业务本质上和已经存在的机票和酒店没有什么区别，如果每增加一种业务就要去修改User类，这对代码的稳定性和可维护性大大的不好，更好的解决方法是有一个专门的创建订单的类在管理不同的业务，这个类就是简单工厂。
我们修改代码如下：
```
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
        User.prototype = {
            constructor: User,
            order: function (productType) {
                this.shopCart.push(productFactory.createProduct(productType));
            }
        }  
```
这段代码主要修改的地方有两点：
（1）增加了一个产品工厂，根据不同的产品类型返回不同的对象
（2）修改User类的order方法为调用工厂类中的创建产品方法。
这样做的好处是：
（1）使User的order方法更加专注，只做预订产品这一功能，而提取创建产品订单到专门的工厂类中，代码更简洁清晰
（2）一个专门管理product的factory，添加新产品很容易，不用再去修改User类

#### 总结说明
简单工厂模式的主要特点是将对象的创建和使用进行了分离，主要有3个部分组成：
1.对象使用类，该类是被工厂创造出来的使用者，与对象的种类和创建过程无关
2.工厂类，工厂类根据传入的参数创建不同的对象并返回给对象使用类，包含了不同对象的创建过程，如果有不同的对象，则要修改该类
3.对象类，不同业务产生的不同类，就是工厂生产的产品

##### 简单工厂模式优点
1.工厂类集中了所有对象的创建，便于对象创建的统一管理
2.对象的使用者仅仅是使用产品，实现了单一职责
3.便于扩展，如果新增了一种业务，只需要增加相关的业务对象类和工厂类中的生产业务对象的方法，不需要修改其他的地方。

##### 适用场景
1.需要根据不同参数产生不同实例，这些实例有一些共性的场景
2.使用者只需要使用产品，不需要知道产品的创建细节

注意：除非是适用场景，否则不可滥用工厂模式，会造成代码的复杂度。