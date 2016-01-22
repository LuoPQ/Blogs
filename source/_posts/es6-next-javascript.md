title: ES6：下一版本的JavaScript的新特性
date: 2016-01-20 17:36:02
tags: [Javascript,ES6,翻译]
categories: Javascript
description: 你可能已经听说过EMCAScript6（ES6）了，这是下一个版本的Javascript，它包含了一些很棒的新特性。这些特性拥有不同程度的复杂性，对于简单的脚本和复杂的应用程序都非常的有用。本文将盘点一些ES6的新特性，这些特性都可以用在你日常的编码中。请注意，只有现代浏览器才能支持这些新的ES6特性，虽然浏览器的支持各不相同。如果你需要兼容那些不支持ES6新特性的旧浏览器，我也会谈谈关于这方面的解决方案。
info: 本文始发于码农网，原文地址：http://www.codeceo.com/article/es6-next-javascript.html 
---

你可能已经听说过EMCAScript6（ES6）了，这是下一个版本的Javascript，它包含了一些很棒的新特性。这些特性拥有不同程度的复杂性，对于简单的脚本和复杂的应用程序都非常的有用。本文将盘点一些ES6的新特性，这些特性都可以用在你日常的编码中。
请注意，只有现代浏览器才能支持这些新的ES6特性，虽然浏览器的支持各不相同。如果你需要兼容那些不支持ES6新特性的旧浏览器，我也会谈谈关于这方面的解决方案。
在本文中，大部分示例代码都会带有“运行代码”的链接，读者可以点击链接运行示例。

### 变量

#### LET
通常我们使用var关键字来声明变量，现在我们同样可以使用let，它们之间的细微差别在于作用域。使用var声明变量时，该变量的作用域是其最近的函数，而使用let声明变量，它的作用域只在包含它的块。
```
if (true) {
    let x = 1;
}
console.log(x);//undefined
```
这样可以让代码更加干净整洁，可以减少无用的变量。
看看下面这个经典的数组循环：
```
for(let i = 0,l = list.length;i <  l;i++){
    //do something
}
console.log(i);//undefined
```
举个例子，经常会有人使用变量j在同一作用域中的另外一个循环中。但是使用let声明变量，你可以很安全地再声明一次，因为它只在自己块级作用域内定义和有效。

#### CONST
声明块级作用域内的变量的另一种方法是使用const。使用const，你可以声明一个只读的值，必须直接指定一个值，如果尝试改变它的值或者没有立即指定一个值，就会得到下面的错误：
```
const MY_CONSTANT = 1;
MY_CONSTANT = 2; //error
const SOME_CONSTANT;//error
```
注意，你还是可以修改对象的属性或者数组的成员
```
const MY_OBJECT = {some:1};
MY_OBJECT.some = "some";
```

### 箭头函数
箭头函数对于Javascript来说是一个非常棒的补充，它可以让代码更加精简。我们首先来介绍箭头函数，在稍后的其他例子中就会使用到它的优点。下面的代码展示了一个箭头函数和我们熟悉的ES5风格的两种写法的函数：
```
let book = [{title:'X',price:10},{title:'Y',price:15}];
let titles = book.map(item => item.title);

//ES5 equivalent;
var titles = book.map(function(item){
    return item.title;
});
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20books%20%3D%20%5B%7Btitle%3A%20'X'%2C%20price%3A%2010%7D%2C%20%7Btitle%3A%20'Y'%2C%20price%3A%2015%7D%5D%3B%0A%0Alet%20titles%20%3D%20books.map(%20item%20%3D%3E%20item.title%20)%3B%0A" target="_blank" >运行代码</a>

我们来看看箭头函数的语法，其中没有function关键字，剩下的就是0个或多个参数、(=>)箭头和函数表达式。注意：return语句将隐式地被添加进来。

如果是0个或多个参数，必须添加括号：
```
//没有参数
books.map(()=>1);//[1,1]

//多个参数
[1,2].map((n,index) => n * index);[0,2]
```
如果需要更多的逻辑或者空白区域，可以将函数表达式放在({...})块中。
```
let result = [1,2,3,4,5].map(n =>{
    n = n % 3;
    return n;
})
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20result%20%3D%20%5B1%2C%202%2C%203%2C%204%2C%205%5D.map(%20n%20%3D%3E%20%7B%0A%20%20%20%20n%20%3D%20n%20%25%203%3B%0A%20%20%20%20return%20n%3B%0A%7D)%3B" target="_blank" >运行代码</a>

箭头函数不仅仅意味着更少的字符，它的行为也不同于常规的函数。一个箭头函数从它的外界上下文中继承this和arguments关键字。这表示你可以摆脱以前那些难看的语句，比如var that = this，而且不需要绑定函数到正确的上下文中。下面有一个例子（注意：this.title等同于ES5版本的that.title）：
```
let book = {
   title: 'X',
   sellers: ['A', 'B'],
   printSellers() {
      this.sellers.forEach(seller => console.log(seller + ' sells ' + this.title));
   }
}

// ES5 equivalent:
var book = {
   title: 'X',
   sellers: ['A', 'B'],
   printSellers: function() {
      var that = this;
      this.sellers.forEach(function(seller) {
         console.log(seller + ' sells ' + that.title)
      })
   }
}
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20book%20%3D%20%7B%0A%20%20%20%20title%3A%20'X'%2C%0A%20%20%20%20sellers%3A%20%5B'A'%2C%20'B'%5D%2C%0A%20%20%20%20printSellers()%20%7B%0A%20%20%20%20%20%20%20%20this.sellers.forEach(seller%20%3D%3E%20console.log(seller%20%2B%20'%20sells%20'%20%2B%20this.title))%3B%0A%20%20%20%20%7D%0A%7D" target="_blank">运行代码</a>

### 字符串
#### 方法
String的prototype中添加了几个方便的方法，大部分是indexOf方法的变通：
```
‘my string’.startsWith('my');//true
'my string'.endsWith('my');//false
'my string'.includes('str');//true
```
简单有效！另外，还添加了一个方便创建重复字符串的方法：
```
‘my ’.repeat(3);//‘my my my ’
```

#### 模板字符串
模板字符串提供了一个简洁的方式去创建字符串和实现字符串插值。你可能已经熟悉了它的语法，模板字符串基于$符号和花括号${...}，要使用反撇号`将其包围。
下面是一个简单的演示：
```
let name = 'John',
   apples = 5,
   pears = 7,
   bananas = function() { return 3; }

console.log(`This is ${name}.`);

console.log(`He carries ${apples} apples, ${pears} pears, and ${bananas()} bananas.`);
// ES5 equivalent:
console.log('He carries ' + apples + ' apples, ' + pears + ' pears, and ' + bananas() +' bananas.');
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20name%20%3D%20'John'%2C%0A%20%20%20%20apples%20%3D%205%2C%0A%20%20%20%20pears%20%3D%207%2C%0A%20%20%20%20bananas%20%3D%20function()%20%7B%20return%203%3B%20%7D%0A%0Aconsole.log(%60This%20is%20%24%7Bname%7D.%60)%3B%0A%0Aconsole.log(%60He%20carries%20%24%7Bapples%7D%20apples%2C%20%24%7Bpears%7D%20pears%2C%20and%20%24%7Bbananas()%7D%20bananas.%60)%3B%0A" target="_blank">运行代码</a>

上面的示例中，和ES5相比较，模板字符串仅仅只是方便字符串的串联。模板字符串通常应用于多行字符串，请记住，空白是字符串的一部分。
```
let x = `1...
2...
3 lines long!`; // Yay

// ES5 equivalents:
var x = "1...\n" +
"2...\n" +
"3 lines long!";
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20x%20%3D%20%601...%0A2...%0A3%20lines%20long!%60%3B" target="_blank">运行代码</a>


### 数组
Array对象现在新增了一些静态方法以及prototype上的一些方法。
第一、Array.from方法从类数组或可迭代对象上创建Array的实例。类数组对象的例子包括：
1、函数中的arguments对象
2、document.getElementsByTagName放回的一个nodeList对象
3、新的Map和Set数据结构
```
let itemElements = document.querySelectorAll('.items');
let items = Array.from(itemElements);
items.forEach(function(element) {
    console.log(element.nodeType)
});

// A workaround often used in ES5:
let items = Array.prototype.slice.call(itemElements);
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20itemElements%20%3D%20document.querySelectorAll('div')%3B%0Alet%20items%20%3D%20Array.from(itemElements)%3B%0Aitems.forEach(function(element)%20%7B%0A%20%20%20%20console.log(element.nodeType)%0A%7D)%3B%0A" target="_blank">运行代码</a>
上面的示例中，可以看出items数组拥有forEach方法，但是在itemElements集合中，这个方法是不可用的。

Array.from有一个有趣的特性是它的第二个可选参数mapFunction，这个参数允许在单次调用中创建一个新的映射数组。
```
let navElements = document.querySelectorAll('nav li');
let navTitles = Array.from(navElements, el => el.textContent);
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20navElements%20%3D%20document.querySelectorAll('nav%20li')%3B%0Alet%20navTitles%20%3D%20Array.from(navElements%2C%20el%20%3D%3E%20el.textContent)%3B%0Aconsole.log(navTitles.join(''))%3B" target="_blank">运行代码</a>

第二、Array.of方法，这个方法的行为有点像Array的构造函数，它修复了传递单个数字参数时的特殊情况，所以Array.of相比于new Array()更好。不过大多数情况下，我们推荐使用数组字面量。
```
let x = new Array(3); // [undefined, undefined, undefined]
let y = Array.of(8); // [8]
let z = [1, 2, 3]; // Array literal
```
最后，Array的prototype中添加了几个方法，其中的find方法我觉得Javascript开发者将会非常喜欢。
1、find方法：获取回调函数return true的第一个元素。
2、findIndex方法：获取回调函数return true的第一个元素的索引
3、fill方法：根据给定的参数重写数组的元素
```
[5, 1, 10, 8].find(n => n === 10) // 10
[5, 1, 10, 8].findIndex(n => n === 10) // 2
[0, 0, 0].fill(7) // [7, 7, 7]
[0, 0, 0, 0, 0].fill(7, 1, 3) // [0, 7, 7, 7, 0]
```

### Math
Math对象也添加了几个方法。
1、Math.sign 返回一个数字的符号，有1，-1或0三个值分别表示正值，负值或0
2、Math.trunc 返回一个数字去掉小数位数后的数
3、Math.cbrt 返回一个数字的立方根
```
Math.sign(5); // 1
Math.sign(-9); // -1
Math.trunc(5.9); // 5
Math.trunc(5.123); // 5
Math.cbrt(64); // 4
```
如果你想要学习更多的新的Math内容，点击[new number and math features in ES6](http://www.2ality.com/2015/04/numbers-math-es6.html)。

### 扩展操作符
扩展操作符(...)是一个非常方便的语法，它用于在数组的特殊的地方扩展元素，比如函数调用中的参数。下面展示一些例子来说明它的用处。
首先，我们来看看如何通过另一个数组来扩展数组的元素：
```
let values = [1, 2, 4];let some = [...values, 8]; // [1, 2, 4, 8]
let more = [...values, 8, ...values]; // [1, 2, 4, 8, 1, 2, 4]

// ES5 equivalent:
let values = [1, 2, 4];
// Iterate, push, sweat, repeat...
// Iterate, push, sweat, repeat...
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20values%20%3D%20%5B1%2C%202%2C%204%5D%3B%0Alet%20some%20%3D%20%5B...values%2C%208%5D%3B%0Alet%20more%20%3D%20%5B...values%2C%208%2C%20...values%5D%3B%0Aconsole.log(some)%3B%0Aconsole.log(more)%3B" target="_blank">运行代码</a>

当使用参数调用函数时，扩展操作符同样非常强大。
```
let values = [1, 2, 4];doSomething(...values);
function doSomething(x, y, z) { 
    // x = 1, y = 2, z = 4
}

// ES5 equivalent:
doSomething.apply(null, values);
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20values%20%3D%20%5B1%2C%202%2C%204%5D%3B%0AdoSomething(...values)%3B%0Afunction%20doSomething(x%2C%20y%2C%20z)%20%7B%0A%20%20%20%20console.log(arguments)%3B%0A%7D%0A" target="_blank">运行代码</a>

正如你所看到的，这避免了我们经常使用的fn.apply()这种委婉曲折的方式。扩展操作符语法非常灵活，因为它可以在参数列表的任何地方使用，即下面的调用方式也会产生一样的结果：
```
let values = [2, 4];
doSomething(1, ...values);
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20values%20%3D%20%5B2%2C%204%5D%3B%0AdoSomething(1%2C%20...values)%3B%0Afunction%20doSomething(x%2C%20y%2C%20z)%20%7B%0A%20%20%20%20console.log(arguments)%3B%0A%7D" target="_blank">运行代码</a>

我们已经将扩展操作符应用到Array和arguents中了。实际上，所有的可迭代的对象都可以应用扩展操作符，比如NodeList：
```
let form = document.querySelector('#my-form'),
   inputs = form.querySelectorAll('input'),
   selects = form.querySelectorAll('select');
let allTheThings = [form, ...inputs, ...selects];
```
[运行代码](http://jsbin.com/vibaxerino/edit?html,js,console)
现在allTheThings变成一个扁平的数组，其中包含form节点，input和select的子节点。

### 解构
解构提供了一个便捷的方式来从对象或数组中提取数据。下面给了一个使用数组的典型例子。
```
let [x,y] = [1,2];// x = 1, y = 2

// ES5
var arr = [1, 2];
var x = arr[0];
var y = arr[1];
```
使用这种语法，可以一次性指定多个变量。还有另外一个作用是可以很简单的交换两个变量值。
```
let x = 1,
     y = 2;
[x, y] = [y, x];// x = 2, y = 1
```
[运行代码](https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20x%20%3D%201%2C%0A%20%20%20%20y%20%3D%202%3B%0A%0A%5Bx%2C%20y%5D%20%3D%20%5By%2C%20x%5D%3B%0A)

解构也能用于对象上，要保证key值匹配。
```
let obj = [x: 1,y: 2];
let {x, y} = obj; // x = 1, y = 2
```
[运行代码](https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=let%20obj%20%3D%20%7Bx%3A%201%2C%20y%3A%202%7D%3B%0Alet%20%7Bx%2C%20y%7D%20%3D%20obj%3B)

也可以通过这个机制来修改变量的名称
```
let obj = {x:1 ,y: 2}
let {x: a,y: b} = obj;// a = 1, b = 2
```

还有另外一个有趣的用法是模拟多个返回值
```
function doSomething(){
    return [1, 2];
}
let [x, y] = doSomething(); // x = 1,y = 2
```
[运行代码](https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=true&spec=false&code=function%20doSomething()%20%7B%0A%20%20%20%20return%20%5B1%2C%202%5D%0A%7D%0A%0Alet%20%5Bx%2C%20y%5D%20%3D%20doSomething()%3B)

解构同样也可以指定argument对象的默认值，通过字面量对象，可以模拟命名参数。
```
function doSomething({ y = 1,z = 0 }){
    console.log(y, z);
}
doSomething({y: 2});
```

### 参数
#### 默认值
在ES6中，是可以给函数参数定义一个默认值的，语法如下：
```
function doSomething(x, y = 2){
    return x * y;
}
doSomething(5); //10
doSomething(5, undefined); //10
doSomething(5, 3);// 15
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=true&spec=false&code=function%20doSomething(x%2C%20y%20%3D%202)%20%7B%0A%20%20%20%20return%20x%20*%20y%3B%0A%7D%0A%0Aconsole.log(doSomething(5))%3B%0Aconsole.log(doSomething(5%2C%20undefined))%3B%0Aconsole.log(doSomething(5%2C%203))%3B" target="_blank">运行代码</a>

这样看起来就简洁多了，如果是ES5之前的写法，我们肯定要补充一些参数：
```
function doSomething(){
    y = y === undefined ? 2 : y;
    return x * y;
}
```
undefined或者无参时将会触发参数的默认值。

#### 剩余不定参数
我们已经看过了扩展操作符，不定参数与其非常相似。不定参数也使用...语法，它允许将函数末端的参数存储在一个数组里面。
```
function doSomething(x,...remaining){
    return x * remaining.length;
}

doSomething(5,0,0,0);// 15
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&code=function%20doSomething(x%2C%20...remaining)%20%7B%0A%20%20%20%20return%20x%20*%20remaining.length%3B%0A%7D%0A%0AdoSomething(5%2C%200%2C%200%2C%200)%3B" target="_blank">运行代码</a>

### 模块
模块是Javascript中非常受欢迎的一个补充，我认为它是ES6中非常值得挖掘的一个特性。
现如今，任何重要的JS项目都会使用某种模块系统-可能是“暴露型模块模式”或者更广泛的AMD和Common.js。但是，浏览器是没有任何模块系统的特性的，总是需要为AMD或CommonJS模块构建加载模块，处理这些的工具包括RequireJS，Browserify和Webpack。

ES6规范中同时包含了模块中的语法和加载机制。如果你想要在以后使用模块，应该使用下面的语法。现代的构建工具可以通过插件支持这种格式，所以我们可以尽管去使用它。（不用担心，我们在后面的“Transpilation”章节中会讨论这个问题）。

现在，在ES6的模块语法中，模块被设计成使用export和import两个关键字，我们来看看示例中的两个模块。
```
// lib/math.js
export function sum(x, y){
    return x + y;
}
exprot var pi = 3.141593;

// app.js
import { sum, pi} from "lib/math";
console.log('2π = ' + sum(pi, pi));
```
如你所见，代码中有多个export语句。每一个都必须显式地声明输出的值，在这个例子中，就是function和var。

示例中的import语句使用了一个语法（类似于解构）来显式地定义了输出的内容。要将整个模块一起输出，可以使用通配符“*”，结合as关键字给模块一个本地名称。
```
// app.js
import * as math from "lib/math";
console.log('2π = ' + math.sum(math.pi, math.pi));
```

模块系统有一个默认模块，它也可以是函数。要导出模块内的默认值，需要提供一个本地名称：
```
// lib/my-fn.js
export default function(){
    console.log('echo echo');
}

// app.js
import doSomething from 'lib/my-fn.js';
doSomething();
```
注意：import语句是同步的，但是它会等到所有依赖的加载完毕才会执行。

### Classes
类是ES6中讨论得很多的一个特性。一些人类违反了JS的原型性质，而其他人觉得这降低了初学者和来自其他开发语言的开发者的入门门槛，并且能够帮助他们编写大规模应用。无论如何，它都是ES6中的一部分，我们简单地介绍一下。
我们通过class和constructor关键字构建类，下面是一个简短的示例：
```
class Vehicle{
    constructor(name){
        this.name = name;
        this.kind = 'vehicle';
    }
    getName(){
        return this.name;
    }
}

// 创建实例
let myVehicle = new Vehicle('rocky');
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=true&spec=false&code=class%20Vehicle%20%7B%0A%20%20%20%20constructor(name)%20%7B%0A%20%20%20%20%20%20%20%20this.name%20%3D%20name%3B%0A%20%20%20%20%20%20%20%20this.kind%20%3D%20'vehicle'%3B%0A%20%20%20%20%7D%0A%20%20%20%20getName()%20%7B%0A%20%20%20%20%20%20%20%20return%20this.name%3B%0A%20%20%20%20%7D%20%20%20%0A%7D%0A%0Alet%20myVehicle%20%3D%20new%20Vehicle('rocky')%3B%0A%0Aconsole.log(myVehicle.getName())%3B%0A" target="_blank">运行代码</a>

注意：类的定义并不是一个普通的对象，因此类成员之间没有使用逗号来分隔。

从一个类创建实例必须使用new关键字，而从一个基类继承则使用extends：
```
class Car extends Vehicle{
    constructor(name){
        super(name);
        this.kind = 'car'
    }
}

let myCar = new Car('bumpy');

myCar.getName();// 'bumpy'
myCar instanceof Car;// true
myCar instanceof Vehicle; //true
```
<a href="https://babeljs.io/repl/#?experimental=false&evaluate=true&loose=true&spec=false&code=class%20Vehicle%20%7B%0A%20%20%20%20constructor(name)%20%7B%0A%20%20%20%20%20%20%20%20this.name%20%3D%20name%3B%0A%20%20%20%20%20%20%20%20this.kind%20%3D%20'vehicle'%3B%0A%20%20%20%20%7D%0A%20%20%20%20getName()%20%7B%0A%20%20%20%20%20%20%20%20return%20this.name%3B%0A%20%20%20%20%7D%20%20%20%0A%7D%0A%0Aclass%20Car%20extends%20Vehicle%20%7B%0A%20%20%20%20constructor(name)%20%7B%0A%20%20%20%20%20%20%20%20super(name)%3B%0A%20%20%20%20%20%20%20%20this.kind%20%3D%20'car'%0A%20%20%20%20%7D%0A%7D%0A%0Alet%20myCar%20%3D%20new%20Car('bumpy')%3B%0A%0Aconsole.log(myCar.getName())%3B%0Aconsole.log(myCar%20instanceof%20Car)%3B%0Aconsole.log(myCar%20instanceof%20Vehicle)%3B" target="_blank">运行代码</a>

在派生类中，可以使用super关键字来访问基类的构造函数或方法：
1、要访问基类构造函数，使用super()
2、要访问基类中的方法，是用super.getName()

类还有更多的用法，如果想要深入地学习这方面，可以看看[Classes in ECMAScript6](http://www.2ality.com/2015/02/es6-classes-final.html)

### Symbol
Symbol是一种新的原始数据类型，和Number、String一样。我们可以使用symbol来给对象创建唯一的ID或唯一的常量。
```
const MY_CONSTANT = Symbol();
let obj = {};
obj[MY_CONSTANT] = 1;
```
注意：Object.getOwnPropertyNames方法不会返回Symbol生成键值，在for..in循环中，Object.keys()和JSON.stringify()也是不可见的，这是与普通的字符串key值的区别所在。我们可以通过Object.getOwnPropertySymbols()获取对象中的symbol数组。

因为不可变的特点，Symbols常常与const一起配合使用：
```
const CHINESE = Symbol();
const ENGLISH = Symbol();
const SPANISH = Symbol();

switch(language){
    case CHINESE:
    // 
    break;
    case ENGLISH:
    // 
    break;
    case SPANISH:
    // 
    break;
}
```
也可以给Symbol一段字符串来描述，虽然无法通过字符串来访问symbol本身，但是调试的时候很有用。
```
const CONST_1 = Symbol('my symbol');
const CONST_2 = Symbol('my symbol');

typeof CONST_1 = 'symbol';// true
CONST_1 == CONST_2;// false
```
想要学习更多的symbol内容可以查看[symbol primitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### Transpilation
现在我们可以使用ES6来写代码了。前面介绍中提到的浏览器还没有广泛地支持ES6的特性，而且支持性各不相同。你的用户使用的浏览器很有可能不完全懂得解析ES6代码。所以我们要将这些代码转换成上一个版本的Javascript（ES5），它们可以很好地运行在现代浏览器上，这种转换通常被称为Transpilation。在浏览器支持ES6之前，都需要在我们的应用程序中做这一项转换。

#### 开始
转换代码并不困难，可以直接通过命令行转换代码，或者在Grunt和Gulp中作为一个Task包含在插件里面。有很多转换代码的方案，比如Babel，Traceur和TypeScript。可以看看这个使用Babel的例子[many ways to start using ES6](http://babeljs.io/docs/setup/)，很多ES6的特性都会进行处理。

那我们如何使用ES6呢？首先，根据你想要使用的ES6特性和你需要支持的浏览器或运行环境（比如Node.js）,在你的工作流中结合一个编译转换器。如果你希望的话，还有一些监视文件变化和浏览器实时刷新的插件来让你体验无缝的编码。
如果是从头开始，你可能只是想要使用命令行来转换代码（查看例子[Babel CLI documentation](https://babeljs.io/docs/usage/cli/)）。如果你已经使用过grunt或gulp之类的工具，你可以添加一个比如[gulp-babel](https://www.npmjs.com/package/gulp-babel)的插件，或者Webpack中的[babel-loader](https://github.com/babel/babel-loader)插件。对于Grunt，有一个[grunt-babel](https://github.com/babel/grunt-babel)，还有很多其他的[ES6-related plugins](http://gruntjs.com/plugins?q=es6)。对于使用Browserify的开发者，可以看看[babelify](https://github.com/babel/babelify)。

很多特性被转换成ES5的兼容性代码后，并不会有很大的开销，通过编译器提供的临时性方案会有一点点的性能损耗。你可以通过各种交互环境（也称作RELPs）来看看使用ES6代码和编译后的代码是什么样的：
1、Traceur：[website](https://github.com/google/traceur-compiler),[REPL](https://google.github.io/traceur-compiler/demo/repl.html)
2、Babel：[website](https://babeljs.io/),[REPL](https://babeljs.io/repl/)
3、TypeScript：[website](http://www.typescriptlang.org/),[REPL](http://www.typescriptlang.org/Playground)
4、[ScratchJS](https://github.com/richgilbank/Scratch-JS)（chrome插件）

注意，TypeScript并不完全是一个转换器，它是强类型的Javascript的超集，可以编译成Javascript，它和其他转换器一样，支持很多ES6特性。

#### 究竟如何使用？
通常来说，一些ES6的特性可以自由地使用，比如模块、箭头函数，不定参数和类。这些特性不会用太多开销，就可以转换成ES5代码。而Array、String和Math对象上和原型上的方法（比如Array.from等等）需要所谓的“polyfills”。Polyfills是对那些浏览器还没有原生支持的特性的一个临时方案。你可以首先加载polyfills，如果浏览器有此函数，代码就会正常运行，Babel和Traceur都会提供类似的polyfills。

可以查看[ES6兼容性表](https://kangax.github.io/compat-table/es6/)来看看转换器和浏览器对ES6新特性的支持情况。令人激动的是，在写这篇文章的时候，最新的浏览器已经支持了所有ES6特性的55%到70%。Microsoft Edge，Google Chrome和Mozilla Firefox相互竞争，这对整个Web的发展有很大的意义。

就我个人而言，我发现能够很简单地使用ES6中的新特性，比如模块，箭头函数和不定参数等等是一种解脱，也是对自己编码的一个显著的提升。现在我很享受使用ES6写代码，然后将其转换成ES5代码。ES6的优点随着时间的增长会越来越明显。

#### 下一步呢？
只要安装了一个转换器，就可以开始使用一些小的特性，比如let和箭头函数。记住，已经编写好的ES5代码，转换器会原封不动地保留下来。当你使用ES6去优化你的代码，慢慢地喜欢用它，你就可以逐步将越来越多的ES6特性应用到代码中。也许有一些代码会有新的模块或类语法，但是我保证一切都会越来越好的！

除了文章中提到的特性，还有更多的ES6的东西没有被提到，比如Map，Set，标签模板字符串，生成器，Proxy和Promise，如果你想知道请关注后续的文章。另外，如果想要深入学习，我推荐[Exploring ES6](http://exploringjs.com/)这本书，书里面提到了所有的ES6特性。

### 最后的思考
通过使用转换器，所有的代码实际上是转换成了ES5。而浏览器一直在添加新特性，所以，即便浏览器完全支持某个特定的ES6特性，最后还是运行ES5兼容版本的代码，这样[可能表现会更糟糕](http://kpdecker.github.io/six-speed/)。你可以期待，在你需要兼容的浏览器和运行环境里，所有的ES6特性最终都会被支持。但是在那之前，我们需要管理好这些ES6特性的支持情况，选择性地禁用某些ES6特性来减少转换成ES5代码后带来的不必要的开销。知道了这些，你就可以决定是否要使用ES6中的特性.。






