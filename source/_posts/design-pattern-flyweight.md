title: Javascript设计模式理论与实战：享元模式
date: 2015-11-20 11:47:03
tags: [设计模式,Javascript]
categories: Web前端
description: 享元模式不同于一般的设计模式，它主要用来优化程序的性能，它最适合解决大量类似的对象而产生的性能问题。享元模式通过分析应用程序的对象，将其解析为内在数据和外在数据，减少对象的数量，从而提高应用程序的性能。
---
享元模式不同于一般的设计模式，它主要用来优化程序的性能，它最适合解决大量类似的对象而产生的性能问题。享元模式通过分析应用程序的对象，将其解析为内在数据和外在数据，减少对象的数量，从而提高应用程序的性能。

### 基本知识
享元模式通过共享大量的细粒度的对象，减少对象的数量，从而减少对象的内存，提高应用程序的性能。其基本思想就是分解现有类似对象的组成，将其展开为可以共享的内在数据和不可共享的外在数据，我们称内在数据的对象为享元对象。通常还需要一个工厂类来维护内在数据。
在JS中，享元模式主要有下面几个角色组成：
（1）客户端：用来调用享元工厂来获取内在数据的类，通常是应用程序所需的对象，
（2）享元工厂：用来维护享元数据的类
（3）享元类：保持内在数据的类

### 享元模式的实现和应用
#### 一般实现
我们举个例子进行说明：苹果公司批量生产iphone，iphone的大部分数据比如型号，屏幕都是一样，少数部分数据比如内存有分16G,32G等。未使用享元模式前，我们写代码如下：
```
        function Iphone(model, screen, memory, SN) {
            this. model  = model;
            this.screen = screen;
            this.memory = memory;
            this.SN = SN;
        }
        var phones = [];
        for (var i = 0; i < 1000000; i++) {
            var memory = i % 2 == 0 ? 16 : 32;
            phones.push(new Iphone("iphone6s", 5.0, memory, i));
        }  
```
这段代码中，创建了一百万个iphone，每个iphone都独立申请一个内存。但是我们仔细观察可以看到，大部分iphone都是类似的，只是内存和序列号不一样，如果是一个对性能要求比较高的程序，我们就要考虑去优化它。
大量相似对象的程序，我们就可以考虑用享元模式去优化它，我们分析出大部分的iphone的型号，屏幕，内存都是一样的，那这部分数据就可以公用，就是享元模式中的内在数据，定义享元类如下：
```
        function IphoneFlyweight(model, screen, memory) {
            this.model = model;
            this.screen = screen;
            this.memory = memory;
        }  
```
我们定义了iphone的享元类，其中包含型号，屏幕和内存三个数据。我们还需要一个享元工厂来维护这些数据：
```
         var flyweightFactory = (function () {
            var iphones = {};
            return {
                get: function (model, screen, memory) {
                    var key = model + screen + memory;
                    if (!iphones[key]) {
                        iphones[key] = new IphoneFlyweight(model, screen, memory);
                    }
                    return iphones[key];
                }
            };
        })();  
```
在这个工厂中，我们定义了一个字典来保存享元对象，提供一个方法根据参数来获取享元对象，如果字典中有则直接返回，没有则创建一个返回。
接着我们创建一个客户端类，这个客户端类就是修改自iphone类：
```
         function Iphone(model, screen, memory, SN) {
            this.flyweight = flyweightFactory.get(model, screen, memory);
            this.SN = SN;
        }  
```
然后我们依旧像之间那样生成多个iphone
```
        var phones = [];
        for (var i = 0; i < 1000000; i++) {
            var memory = i % 2 == 0 ? 16 : 32;
            phones.push(new Iphone("iphone6s", 5.0, memory, i));
        }
        console.log(phones); 
```
这里的关键就在于Iphone构造函数里面的this.flyweight = flyweightFactory.get(model, screen, memory)。这句代码通过享元工厂去获取享元数据，而在享元工厂里面，如果已经存在相同数据的对象则会直接返回对象，多个iphone对象共享这部分相同的数据，所以原本类似的数据已经大大减少，减少的内存的占用。

#### 享元模式在DOM中的应用
享元模式的一个典型应用就是DOM事件操作，DOM事件机制分成事件冒泡和事件捕获。我们简单介绍一下这两者：
事件冒泡：绑定的事件从最里层的元素开始触发，然后冒泡到最外层
事件捕获：绑定的事件从最外层的元素开始触发，然后传到最里层
假设我们HTML中有一个菜单列表
```
    <ul class="menu">
        <li class="item">选项1</li>
        <li class="item">选项2</li>
        <li class="item">选项3</li>
        <li class="item">选项4</li>
        <li class="item">选项5</li>
        <li class="item">选项6</li>
    </ul>  
```
点击菜单项，进行相应的操作，我们通过jQuery来绑定事件，一般会这么做：
```
        $(".item").on("click", function () {
            console.log($(this).text());
        })  
```
给每个列表项绑定事件，点击输出相应的文本。这样看暂时没有什么问题，但是如果是一个很长的列表，尤其是在移动端特别长的列表时，就会有性能问题，因为每个项都绑定了事件，都占用了内存。但是这些事件处理程序其实都是很类似的，我们就要对其优化。
```
        $(".menu").on("click", ".item", function () {
            console.log($(this).text());
        })  
```
通过这种方式进行事件绑定，可以减少事件处理程序的数量，这种方式叫做事件委托，也是运用了享元模式的原理。事件处理程序是公用的内在部分，每个菜单项各自的文本就是外在部分。我们简单说下事件委托的原理：点击菜单项，事件会从li元素冒泡到ul元素，我们绑定事件到ul上，实际上就绑定了一个事件，然后通过事件参数event里面的target来判断点击的具体是哪一个元素，比如低级第一个li元素，event.target就是li，这样就能拿到具体的点击元素了，就可以根据不同元素进行不同的处理。

### 总结
享元模式是一种优化程序性能的手段，通过共享公用数据来减少对象数量以达到优化程序的手段。享元模式适用于拥有大量类似对象并且对性能有要求的场景。因为享元模式需要分离内部和外部数据，增加了程序的逻辑复杂性，建议对性能有要求的时候才使用享元模式。