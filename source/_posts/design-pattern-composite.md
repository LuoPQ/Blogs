title: Javascript设计模式理论与实战：组合模式
date: 2015-11-16 12:41:39
tags: [设计模式,Javascript]
categories: Javascript
description: 我们平时开发过程中，一定会遇到这种情况：同时处理简单对象和由简单对象组成的复杂对象，这些简单对象和复杂对象会组合成树形结构，在客户端对其处理的时候要保持一致性。比如电商网站中的产品订单，每一张产品订单可能有多个子订单组合，比如操作系统的文件夹，每个文件夹有多个子文件夹或文件，我们作为用户对其进行复制，删除等操作时，不管是文件夹还是文件，对我们操作者来说是一样的。在这种场景下，就非常适合使用组合模式来实现。
---
我们平时开发过程中，一定会遇到这种情况：同时处理简单对象和由简单对象组成的复杂对象，这些简单对象和复杂对象会组合成树形结构，在客户端对其处理的时候要保持一致性。比如电商网站中的产品订单，每一张产品订单可能有多个子订单组合，比如操作系统的文件夹，每个文件夹有多个子文件夹或文件，我们作为用户对其进行复制，删除等操作时，不管是文件夹还是文件，对我们操作者来说是一样的。在这种场景下，就非常适合使用组合模式来实现。

### 基本知识
组合模式：将对象组合成树形结构以表示“部分-整体”的层次结构，组合模式使得用户对单个对象和组合对象的使用具有一致性。
组合模式主要有三个角色：
（1）抽象组件（Component）：抽象类，主要定义了参与组合的对象的公共接口
（2）子对象（Leaf）：组成组合对象的最基本对象
（3）组合对象（Composite）：由子对象组合起来的复杂对象
理解组合模式的关键是要理解组合模式对单个对象和组合对象使用的一致性，我们接下来说说组合模式的实现加深理解。

### 组合模式的实现

#### 最简单的组合模式
HTML文档的DOM结构就是天生的树形结构，最基本的元素醉成DOM树，最终形成DOM文档，非常适用适用组合模式。
我们常用的jQuery类库，其中组合模式的应用更是频繁，例如经常有下列代码实现：
```
$(".test").addClass("noTest").remove("test");
```
这句简单的代码就是获取class包含test的元素，然后进行addClass和removeClass处理，其中不论$(".test")是一个元素，还是多个元素，最终都是通过统一的addClass和removeClass接口进行调用。
我们简单模拟一下addClass的实现：
```
        var addClass = function (eles, className) {
            if (eles instanceof NodeList) {
                for (var i = 0, length = eles.length; i < length; i++) {
                    eles[i].nodeType === 1 && (eles[i].className += (' ' + className + ' '));
                }
            }
            else if (eles instanceof Node) {
                eles.nodeType === 1 && (eles.className += (' ' + className + ' '));
            }
            else {
                throw "eles is not a html node";
            }
        }
        addClass(document.getElementById("div3"), "test");
        addClass(document.querySelectorAll(".div"), "test");  
```
这段代码简单的模拟了addClass的实现（暂不考虑兼容性和通用性），很简单地先判断节点类型，然后根据不同类型添加className。对于NodeList或者是Node来说，客户端调用都是同样的使用了addClass这个接口，这个就是组合模式的最基本的思想，使部分和整体的使用具有一致性。

#### 典型的例子
前面我们提到一个典型的例子：产品订单包含多个产品子订单，多个产品子订单组成一个复杂的产品订单。由于Javascript语言的特性，我们将组合模式的三个角色简化成2个角色：
（1）子对象：在这个例子中，子对象就是产品子订单
（2）组合对象：这里就是产品的总订单
假设我们开发一个旅游产品网站，其中包含机票和酒店两种子产品，我们定义了子对象如下：
```
        function FlightOrder() { }
        FlightOrder.prototyp.create = function () {
            console.log("flight order created");
        }
        function HotelOrder() { }
        HotelOrder.prototype.create = function () {
            console.log("hotel order created");
        }  
```
上面的代码定义了两个类：机票订单类和酒店订单类，每个类都有各自的订单创建方法。
接下来我们创建一个总订单类：
```
        function TotalOrders() {
            this.orderList = [];
        }
        TotalOrders.prototype.addOrder = function (order) {
            this.orderList.push(order);
        }
        TotalOrders.prototype.create = function (order) {
            for (var i = 0, length = this.orderList.length; i < length; i++) {
                this.orderList[i].create();
            }
        }  
```
这个对象主要有3个成员：订单列表，添加订单的方法，创建订单的方法。
在客户端使用的时候如下：
```
        var flight = new FlightOrder();
        flight.create();

        var orders = new TotalOrders();
        orders.addOrder(new FlightOrder());
        orders.addOrder(new HotelOrder());
        orders.create();  
```
客户端调用展示了两种方式，一种是单一的创建机票订单，一种是创建多张订单，但最终都是通过create方法进行创建，这就是一个很典型的组合模式的应用场景。

### 总结
组合模式并不难理解，它主要解决的是单一对象和组合对象在使用方式上的一致性问题。如果对象具有明显的层次结构并且想要统一地使用它们，这就非常适合使用组合模式。在Web开发中，这种层次结构非常常见，很适合使用组合模式，尤其是对于JS来说，不用拘泥于传统面向对象语言的形式，灵活地利用JS语言的特性，达到对部分和整体使用的一致性。
