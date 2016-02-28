title: 详解Javascript中的Object对象
date: 2016-02-28 17:26:36
tags: Javascript
categories: Javascript
description: Object是在javascript中一个被我们经常使用的类型，而且JS中的所有对象都是继承自Object对象的。虽说我们平时只是简单地使用了Object对象来存储数据，并没有使用到太多其他功能，但是Object对象其实包含了很多很有用的属性和方法，尤其是ES5增加的方法，因此，本文将从最基本的介绍开始，详细说明了Object的常用方法和应用。
---
Object是在javascript中一个被我们经常使用的类型，而且JS中的所有对象都是继承自Object对象的。虽说我们平时只是简单地使用了Object对象来存储数据，并没有使用到太多其他功能，但是Object对象其实包含了很多很有用的属性和方法，尤其是ES5增加的方法，因此，本文将从最基本的介绍开始，详细说明了Object的常用方法和应用。

### 基础介绍

#### 创建对象
首先我们都知道，对象就是一组相似数据和功能的集合，我们就是用它来模拟我们现实世界中的对象的。那在Javascript中，创建对象的方式通常有两种方式：构造函数和对象字面量。
##### new构造函数法
```
var person = new Object();
person.name = "狼狼的蓝胖子";
person.age = 25;
```
这种方式使用new关键字，接着跟上Object构造函数，再来给对象实例动态添加上不同的属性。这种方式相对来说比较繁琐，一般推荐使用对象字面量来创建对象。

##### 对象字面量
对象字面量很好理解，使用key/value的形式直接创建对象，简洁方便。
```
var person = {
    name: “狼狼的蓝胖子”,
    age: 25
};
```
这种方式直接通过花括号将对象的属性包起来，使用key/value的方式创建对象属性，每个属性之间用逗号隔开。
注意：如果是最后一个属性，后面就不要加逗号，因为在一些旧的浏览器下会报错。

#### 对象实例的属性和方法
不管通过哪种方式创建了对象实例后，该实例都会拥有下面的属性和方法，下面将会一一说明。

##### constructor属性
constructor属性是保存当前对象的构造函数，前面的例子中，constructor保存的就是Object方法。
```
var obj1 = new Object();
obj1.id = "obj1";
var obj2 = {
    "id": "obj2"
};
 
console.log(obj1.constructor);//function Object(){}
console.log(obj2.constructor);//function Object(){}  
```

##### hasOwnProperty(propertyName)方法
hasOwnProperty方法接收一个字符串参数，该参数表示属性名称，用来判断该属性是否在当前对象实例中，而不是在对象的原型链中。我们来看看下面这个例子：
```
var arr = [];        
console.log(arr.hasOwnProperty("length"));//true
console.log(arr.hasOwnProperty("hasOwnProperty"));//false  
```
在这个例子中，首先通过定义了一个数组对象的实例arr，我们知道数组对象实际是通过原型链继承了Object对象，然后拥有自己的一些属性，我们通过hasOwnProperty方法判断length是arr自己的属性，而hasOwnProperty是在原型链上的属性。
hasOwnProperty方法可以和for..in结合起来获取对象自己的key。

##### isPrototypeOf(Object)方法
isPrototype方法接收一个对象，用来判断当前对象是否在传入的参数对象的原型链上，说起来有点抽象，我们来看看代码。
```
function MyObject() {}
var obj = new MyObject();
console.log(Object.prototype.isPrototypeOf(obj));  
```
我们知道MyObject是继承自Object对象的，而在JS中，继承是通过prototype来实现的，所以Object的prototype必定在MyObject对象实例的原型链上。

##### propertyIsEnumerable(prototypeName)方法
prototypeIsEnumerable用来判断给定的属性是否可以被for..in语句给枚举出来。看下面代码：
```
var obj = {
    name: "objName"
}  
for (var i in obj) {
    console.log(i);
}
```
执行这段代码输出字符串“name”，这就说明通过for...in语句可以得到obj的name这个属性，但是我们知道，obj的属性还有很多，比如constructor，比如hasOwnPrototype等等，但是它们没有被输出，说明这些属性不能被for...in给枚举出来，可以通过propertyIsEnumerable方法来得到。
```
console.log(obj.propertyIsEnumerable("constructor"));//false  
```
判断“constructor”是否可以被枚举，输出false说明无法被枚举出来。

##### toLocaleString()方法
toLocalString方法返回对象的字符串表示，和代码的执行环境有关。
```
var obj = {};
console.log(obj.toLocaleString());//[object Object]  

var date = new Date();
console.log(date.toLocaleString());//2016/2/28 下午1:39:27  
```

##### toString()方法
toString用来返回对象的字符串表示。
```
var obj = {};
console.log(obj.toString());//[object Object]
        
var date = new Date();
console.log(date.toString());//Sun Feb 28 2016 13:40:36 GMT+0800 (中国标准时间)  
```

##### valueOf()方法
valueOf方法返回对象的原始值，可能是字符串、数值或bool值等，看具体的对象。
```
 var obj = {
    name: "obj"
};
console.log(obj.valueOf());//Object {name: "obj"}

var arr = [1];
console.log(arr.valueOf());//[1]

var date = new Date();
console.log(date.valueOf());//1456638436303  
```
如代码所示，三个不同的对象实例调用valueOf返回不同的数据。

#### 属性的类型
在Javascript中，属性有两种类型，分别是数据属性和访问器属性，我们来看看这两种属性具体是什么东西。
##### 数据属性
数据属性我们可以理解为我们平时定义对象时赋予的属性，它可以进行读和写。但是，ES5中定义了一些特性，这些特性是用来描述属性的各种特征，特性是内部值，不能直接访问到。特性通过用两对方括号表示，比如[[Enumerable]]。属性的特性会有一些默认值，要修改特性的默认值，必须使用ES5定义的新方法Object.defineProperty方法来修改。
数据属性有4个描述其特征的特性，下面将依次说明每一个特性：
（1）[[Configurable]]：该特性表示是否可以通过delete操作符来删除属性，默认值是true。
```
var obj = {};
obj.name = "myname";
        
delete obj.name;
console.log(obj.name);//undefined  
```
这段代码很明显，通过delete删除了obj的name属性后，我们再访问name属性就访问不到了。
我们通过Object.defineProperty方法来修改[[Configurable]]特性。
```
var obj = {};
obj.name = "myname";
Object.defineProperty(obj, "name", {
    configurable: false
})                

delete obj.name;
console.log(obj.name);//myname  
```
通过将configurable特性设置成false之后，delete就无法删除name属性了，如果在严格模式下，使用delete去删除就会报错。

（2）[[Enumerable]]：表示是否能够通过for...in语句来枚举出属性，默认是true
我们来看看前面的例子：
```
var obj = {
    name: "objName"
}  
for (var i in obj) {
    console.log(i);//name
}
```
这段代码只输出了name属性，我们来将constructor属性的[[Enumerable]]设置为true试试。
```
 var obj = {
        name: "objName"
}
Object.defineProperty(obj, "constructor", {
    enumerable: true
})

for (var i in obj) {
    console.log(i);//name,constructor
}
console.log(obj.propertyIsEnumerable("constructor"));//true  
```
这段代码中，for...in循环得到了name和constructor两个属性，而通过propertyIsEnumerable方法来判断constructor也返回了true。

（3）[[Writable]]：表示属性值是否可以修改，默认为true
如果[[Writable]]被设置成false，尝试修改时将没有效果，在严格模式下会报错

（4）[[Value]]：表示属性的值，默认为undefined

我们通过一个简单的例子来看看这两个特性：
```
var obj = {
    name: "name"
};
console.log(obj.name);//name        

Object.defineProperty(obj, "name", {
    value: "newValue",
    writable: false
})
console.log(obj.name);//newValue

obj.name = "oldValue";
console.log(obj.name);//newValue  
```
我们首先定义了obj对象的name属性值为“name”，然后通过defineProperty方法来修改值，并且将其设置为不可修改的。接着我们再修改name属性的值，可以发现修改无效。
如果我们通过defineProperty来修改name属性的值，是否可以修改呢？答案是可以的：
```
Object.defineProperty(obj, "name", {
    value: "oldValue"
})
console.log(obj.name); //oldValue 
```

##### 访问器属性
访问器属性有点类似于C#中的属性，和数据属性的区别在于，它没有数据属性的[[Writable]]和[[Value]]两个特性，而是拥有一对getter和setter函数。
[[Get]]：读取属性时调用的函数，默认是undefined
[[Set]]：设置属性时调用的函数，默认是undefined
getter和setter是一个很有用的东西，假设有两个属性，其中第二个属性值会随着第一个属性值的变化而变化。这种场景在我们平时的编码中起始是非常常见的。在之前的做法中，我们往往要去手动修改第二个属性的值，那现在我们就可以通过get和set函数来解决这个问题。看下面这个例子：
```
var person = {
    age: 10
}

Object.defineProperty(person, "type", {
    get: function () {
        if (person.age > 17) {
            return "成人";
        }
        return "小孩";
    }
})

console.log(person.type);//小孩

person.age = 18;
console.log(person.type);//成人  
```
通过修改age的值，type的值也会相应的修改，这样我们就不用再手动的去修改type的值了。
下面这种方式也是可以实现同样的效果：
```
var person = {
    _age: 10,
    type: "小孩"
} 

Object.defineProperty(person, "age", {
    get: function () {
        return this._age;
    },
    set: function (newValue) {
        this._age = newValue;
        this.type = newValue > 17 ? "成人" : "小孩";
    }
})
console.log(person.type);

person.age = 18;
console.log(person.type); 
```

关于访问器属性，有几点要注意：
1、严格模式下，必须同时设置get和set
2、非严格模式下，可以只设置其中一个，如果只设置get，则属性是只读的，如果只设置set，属性则无法读取
3、Object.defineProperty是ES5中的新方法，IE9（IE8部分实现，只有dom对象才支持）以下浏览器不支持，一些旧的浏览器可以通过非标准方法__defineGetter__()和__defineSetter__()来设置，这里就不说明了，有兴趣的同学可以查找相关资料。

##### 特性操作的相关方法
ES5提供了一些读取或操作属性特性的方法，前面用到的Object.defineProperty就是其中之一。我总结了一些比较常用的方法如下：

（1）Object.defineProperty
定义一个对象的属性，这个方法前面我们已经用到多次，简单说说其用法。
```
Object.defineProperty(obj,propName,descriptor);
```
defineProperty有点类似于定于在Object上的静态方法，通过Object直接调用，它接收3个参数：
obj：需要定义属性的对象
propNane：需要被定义的属性名称
defineProperty：属性描述符，包含一些属性的特性定义
例子如下：
```
var obj = {};
Object.defineProperty(obj, "name", {
    value: "name",
    configurable: true,
    writable: true,
    enumerable: true
});
```

（2）Object.defineProperties
和defineProperty类似，是用来定义对象属性的，不同的是它可以用来同时定义多个属性，我们通过命名也可以看出来，用法如下：
```
var obj = {};
Object.defineProperty(obj, {
    "name": {
        value: "name",
        configurable: true,
        writable: true,
        enumerable: true
    },
    "age": {
        value: 20 
    }
});
```

（3）Object.getOwnPropertyDescriptor
ES5中还提供了一个读取特性值的方法，该方法接收对象及其属性名作为两个参数，返回一个对象，根据属性类型的不同，返回对象会包含不同的值。
```
var person = {
    _age: 10,
    type: "小孩"
}
Object.defineProperty(person, "age", {
    get: function () {
        return this._age;
    },
    set: function (newValue) {
        this._age = newValue;
        this.type = newValue > 17 ? "成人" : "小孩";
    }
})

console.log(Object.getOwnPropertyDescriptor(person, "type"));//Object {value: "成人", writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(person, "age")); //Object {enumerable: false, configurable: false, get: function(),set: function ()} 
```

### Object的方法
在ES5中，Object对象上新增了一批方法，这些方法可以直接通过Object进行访问，前面用到的defineProperty就是新增的方法之一。除此之外还有很多方法，我将其总结归纳如下：

#### 对象创建型方法
##### Object.create(proto, [propertiesObject])
在前面我们提到，创建一个对象有两种方法：构造函数和对象字面量。
这两种方法有一个缺点就是：如果要创建多个对象，写起来很繁琐，所以后来就有了一种创建自定义构造函数的方法来创建对象，如下所示：
```
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var person = new Person("Jack", 15);
```
这种方式可以很方便的创建多个同样的对象，也是目前比较常用的方法。

ES5提供的Object.create方法也是一个创建对象的方法，这个方法允许为创建的对象选择原型对象，不需要定义一个构造函数。用法如下：
```
var obj = Object.create(Object.prototype, { 
    name: {
        value: "Jack"
    }
})
console.log(obj.name);//Jack
```
这个方法接收的第一个参数作为被创建对象的原型，第二个参数是对象的属性。注意：在这个例子中，name属性是无法被修改的，因为它没有设置writable特性，默认则为false。
个人看法：Object.create这种创建对象的方式略显繁琐，除非是需要修改属性的特性，否则不建议使用这种方式创建对象。

#### 属性获取型方法
##### Object.keys
Object.keys是用来获取给定对象的所有可枚举的自身属性的属性名，它返回一个数组。
```
function Parent() {
    this.lastName = "Black"
}
function Child(firstName) {
    this.firstName = firstName;
}
Child.prototype = new Parent();

var son = new Child("Jack");
console.log(Object.keys(son));//["firstName"]  
```
代码中返回了firstName，并没有返回从prototype继承而来的lastName和不可枚举的相关属性。
在一些旧的浏览器中，我们可以使用hasOwnProperty和for...in来达到类似的效果。
```
Object.keys = Object.keys ||
    function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    }   
```

##### Object.getOwnPropertyNames() 
getOwnPropertyNames用来获取对象自身的所有属性，包括可枚举和不可枚举的所有属性，如下所示：
```
function Parent() {
    this.lastName = "Black"
}
function Child(firstName) {
    this.firstName = firstName;
}
Child.prototype = new Parent();

var son = new Child("Jack");
Object.defineProperty(son, "age", {
    enumerable: false
})
console.log(Object.keys(son));//["firstName"]  
console.log(Object.getOwnPropertyNames(son));//["firstName", "age"]  
```
我们定义给son对象定义了一个不可枚举的属性age，然后通过keys和getOwnPropertyNames两个方法来获取属性列表，能明显看出了两者区别。

#### 属性特性型方法
这个主要是前面提到的三个方法：defineProperty，defineProperties和getOwnPropertyDescriptor三个方法

#### 对象限制型方法
ES5中提供了一系列限制对象被修改的方法，用来防止被某些对象被无意间修改导致的错误。每种限制类型包含一个判断方法和一个设置方法。

##### 阻止对象扩展
Object.preventExtensions()用来限制对象的扩展，设置之后，对象将无法添加新属性，用法如下：
```
Object.preventExtensions(obj);
```
该方法接收一个要被设置成无法扩展的对象作为参数，需要注意两点：
1、对象的属性不可用扩展，但是已存在的属性可以被删除
2、无法添加新属性指的是无法在自身上添加属性，如果是在对象的原型上，还是可以添加属性的。
```
function Person(name) {
    this.name = name;
}
var person = new Person("Jack");
Object.preventExtensions(person);

delete person.name;
console.log(person.name);//undefined

Person.prototype.age = 15;
console.log(person.age);//15  
```

Object.isExtensible方法用来判断一个对象是否可扩展，默认情况是true

##### 将对象密封
Object.seal可以密封一个对象并返回被密封的对象。
密封对象无法添加或删除已有属性，也无法修改属性的enumerable，writable，configurable，但是可以修改属性值。
```
function Person(name) {
    this.name = name;
}
var person = new Person("Jack");
Object.seal(person);
delete person.name;
console.log(person.name);//Jack  
```
将对象密封后，使用delete删除对象属性，还是可以访问得到属性。

通过Object.isSealed可以用来判断一个对象是否被密封了。

##### 冻结对象
Object.freeze方法用来冻结一个对象，被冻结的对象将无法添加，修改，删除属性值，也无法修改属性的特性值，即这个对象无法被修改。
```
function Person(name) {
    this.name = name;
}
var person = new Person("Jack");
Object.freeze(person);

delete person.name;
console.log(person.name);//Jack

Person.prototype.age = 15;
console.log(person.age);//15  
```
分析上面的代码我们可以发现，被冻结的对象无法删除自身的属性，但是通过其原型对象还是可以新增属性的。

通过Object.isFrozen可以用来判断一个对象是否被冻结了。

可以发现：这三个限制对象的方法的限制程度是依次上升的。

### 总结
Object虽说是一个我们平时开发中最经常用到的对象，但是它的很多功能还没有被我们挖掘出来。本文首先介绍了Object的基本使用，接着介绍了一些比较少使用到的属性特性，最后分析了一些比较常用的方法，尤其是ES5中提供的新方法。欢迎大家交流！！
