title: 详解Javascript中的Array对象
date: 2016-04-01 18:11:22
tags: Javascript
categories: Javascript
description: 本文详细总结了Javascript中Array对象，首先从基本概念开始说起，然后一一介绍了一些常用的数组方法，将其整理归类，最后解答了一些常见的面试题。
---

在上一篇<a href="http://luopq.com/2016/02/28/Object-in-Javascript/" target="_blank" >文章</a>中，我们详细介绍了Object对象。在这一篇文章中，我们来说说Array对象。Array对象可以说是除Object对象之外用得最频繁的一个对象了。下面我们来详细说说Array这个对象。

### 基础介绍
#### 创建数组
和Object对象一样，创建Array也有2种方式：构造函数、字面量法。
##### 构造函数创建
使用构造函数的方式可以通过new关键字来声明，如下所示：
```
var arr = new Array();
console.log(arr);//[]
```
当然也可以不通过new关键字来声明：
```
var arr = Array();
console.log(arr);  //[]
```

如果知道数组元素的个数，也可以直接传入数字表示元素个数：
```
var arr2 = new Array(5);
console.log(arr2.length);  //5
```
也可以直接传入数组元素：
```
var arr3 = new Array(5, "aa", "bb");
console.log(arr3);  //[5, "aa", "bb"]
```

##### 字面量法创建
通过字面量创建数组非常简单，推荐这种方式去创建数组：
```
var arr = [];
console.log(arr);//[]  
```
如果数组有一些初始值，可以直接写上去：
```
var arr2 = [5, "aa", "bb"];
console.log(arr2);  //[5, "aa", "bb"]
```

#### 数组长度
我们都知道要访问数组元素的个数很简单，直接通过length属性来获取到。
```
var arr = [2, 3, 4, 5];
console.log(arr.length);  //4
```
但是和其他语言不同的是，在JS中，length属性是可以被设置的。
假设我们要清空一个数组，我们可以直接将length设置成0：
```
arr.length = 0;
console.log(arr); //[] 
```
可以看到，arr数组的元素被清空的

如果我们设置成负数会怎么样呢：
```
arr.length = -1;//Uncaught RangeError: Invalid array length
console.log(arr);  
```
很明显，length是不允许被设置成负数的。

通过设置length属性，我们可以删除元素，比如：
```
var arr = [2, 3, 4, 5];
console.log(arr);//[2, 3, 4, 5]
arr.length = 2;
console.log(arr);[2, 3]
```
将length属性设置成比原来小的数值，后面的元素就会被移除掉。

如果将length设置成比原来大的数值会怎么样呢？
```
arr.length = 5;
console.log(arr);//[2, 3, 4, 5]
console.log(arr[4]);//undefined
console.log(arr.length);//5  
```
可以看到，设置成比较大的数值后，多出来的元素值是undefined

#### 数组检测
简单地介绍了Array之后，我们来说说如果检测一个变量是否是一个Array对象。这个也是一个比较常见的话题。
在ES5中，Array新增了一个检测数组对象的方法：Array.isArray。这个方法可以完美地确认一个对象是不是数组，无论这个对象是在哪个全局执行环境中创建的。
```
var arr = [2, 3, 4, 5];
console.log(Array.isArray(arr));  //true
```
对于不支持该方法的浏览器中，我们可以采用下面的polyfill：
```
if (!Array.isArray) {
    Array.isArray = function (Obj) {
        return Object.prototype.toString.apply(Obj) === "[object Array]";
    }
}  
```

### 一些常用的数组对象方法
Array对象中包含着很多有用的方法，尤其是在ES5，ES6中新增了许多方法，下面我们来总结一下。
#### 静态方法
##### Array.from
Array.from是ES6种新增的方法，它可以将类数组对象或可迭代对象转换成数组对象。
常见的类数组对象比如有函数的arguments值，或者NodeList，HTMLCollection对象等等。
常见的可迭代对象比如字符串，还有就是ES6新增的Set对象和Map对象。

我们来看看的基本用法，将一个arguments转换成数组对象：
```
var arr = (function () {
    return Array.from(arguments);
})(1, 2, 3);
console.log(arr);//[1,2,3]  
```
也可以将一个字符串转换成数组对象：
```
console.log(Array.from("abcdefg")); //["a", "b", "c", "d", "e", "f", "g"] 
```

Array.from还包含2个可选参数：mapFn，thisArg
mapFn：将from返回的数组再进行处理再返回
thisArg：执行mapFn函数时this指向的值
假设页面上有多个span标签，我们想获取这些span标签里面的文本，这是html代码
```
<span>第一个span</span>
<span>第二个span</span>
<span>第三个span</span>
<span>第四个span</span>  
```
我们要获取span标签里面的文本成组成一个数组，可以这么做：
```
var spans = document.getElementsByTagName("span");
    var texts = Array.from(spans, function (val, key) {
        return val.innerText;
})
console.log(texts);  
```
通过from函数将其转换成数组之后，再通过mapFn进行处理，获取每一个元素的innerText。

Array.from是ES6中新增的功能，必然有很多浏览器不支持，可以使用下面的polyfill：
```
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function (collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
var isFunction = function (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
} 

if (!Array.from) {
    Array.from = function (arrayLike, mapFn, thisArg) {
        if (!isArrayLike(arrayLike)) {
            throw new TypeError("被转换的对象不是一个类数组对象或可迭代对象");
        }
        mapFn = isFunction(mapFn) ? mapFn : function (val, key) {
            return val;
        }
    
        var result = [];
        for (var i = 0, length = arrayLike.length; i < length; i++) {
            result.push(mapFn.call(thisArg, arrayLike[i], i));
        }
        return result;
    }
} 
```

##### Array.isArray
Array.isArray是用来判断一个对象是否是数组，在前面判断数组类型的章节我们已经提到过了，这里就不再赘述啦。

##### Array.of
Array.of方法是ES6中新增的方法，它可以将传入的多个参数作为一个数组返回。看下面例子：
```
console.log(Array.of(2, 3, 4, 5)); //[2, 3, 4, 5] 
```
通过传入4个参数，返回一个包含4个元素的数组。
注意Array.of与采用Array构造函数的区别，看下面代码：
```
console.log(Array(4));//[]
console.log(Array.of(4));//[4]
```
第一种方式采用Array构造函数的方式，创建了一个4个元素的数组，每个元素的值都是undefined。
第二中方式采用Array.of方法的方式，创建了一个1个元素的数组，元素值是4。

在不支持的浏览器中，可以采用下面的polyfill：
```
if (!Array.of) {
    Array.of = function () {
        return Array.prototype.slice.call(arguments);
    };
}  
```


#### 继承自Object的方法
我们知道，所有的引用类型都继承自Object对象，自然而然地包含了Object的一些方法。在Array中，我们主要说说其继承自Object的toString方法和valueOf方法。
##### toString方法
toString方法会返回对象的字符串表示，对于Array来说，这个方法会将每一个元素值用逗号分隔起来，最终形成一个字符串返回：
```
console.log([1, 2, 3, 4].toString()); //1,2,3,4 
```

##### valueOf方法
valueOf方法用来返回对象的原始值，对于Array来说，它将返回数组本身：
```
console.log([1, 2, 3, 4].valueOf());//[1,2,3,4]  
```

#### 元素判断方法
在ES5中，Array原型中增加了2个判断数组是否满足某一条件的方法，下面分别来说明一下：
##### every方法
every方法用来判断数组中的所有元素是否都满足条件，如果全部满足则返回true，否则false。
every的用法如下：
```
arr.every(callback[, thisArg])
```
其中callback是用来判断每个元素是否满足条件的函数，它包含两个参数：元素值，索引，数组本身。
thisArg参数是可选的，它表示callback中this指向的对象。
看看下面的例子：
```
 var arr = [1, 2, 3]; 
console.log(arr.every(function (val, index) {
    return val > 0;
}));//true 
```
在不支持的浏览器中，可以采用下面的polyfill：
```
if (Array.prototype.every) {
    Array.prototype.every = function (fn, thisArg) {
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            if (!fn.call(thisArg, arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    };
}  
```

##### some方法
some方法和every方法用法类似，但是它只需要数组中的某一个元素符合条件即返回true。
我们来看下面的例子：
```
var arr = [1, 2, 3];
console.log(arr.some(function (val, index) {
    return val > 2;
}));  //true
```
在数组中，只有一项元素大于2，则返回true。
在不支持的浏览器中，可以采用下面的polyfill：
```
if (!Array.prototype.some) {
    Array.prototype.some = function (fn, thisArg) {
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            if (fn.call(thisArg, arr[i], i)) {
                return true;
            }
        }
        return false;
    };
}  
```

#### 栈和队列方法
在js中，数组即可以像栈那个操作，也可以像队列那样操作，它提供了几个关于栈和队列的方法，这些方法相信大家非常熟悉，在这里简单地说明一下：
##### pop方法
pop方法会将数组的最后一个元素删除，然后返回这个被删除的元素

##### push方法
push方法是一个比较常用的方法，和pop方法相反，它用来将一个元素添加到元素的末尾，然后返回数组的长度。

##### shift方法
shift方法将第一个元素删除，然后返回这个元素

##### unshift方法
unshift在数组开头添加一个或多个元素，然后返回这个元素的长度：
```
var arr = [1, 2, 3];
console.log(arr.unshift(3, 2, 1));//6
console.log(arr);  // [3,2,1,1,2,3]
```

#### 元素索引方法
##### indexOf方法
indexOf方法用来返回元素在数组中的位置，不存在则返回-1：
```
var arr = [1, 2, 3];
console.log(arr.indexOf(2));  //1
```
indexOf方法有第二个可选参数，这个参数表示从哪个索引开始查找：
```
console.log(arr.indexOf(2, 1)); //1 
```
如果这个参数大于数组长度，则直接返回-1，如果是负数，则将末尾进行抵消，然后开始查找，比如-1就从倒数第一开始查找，-2从倒数第二开始查找。
indexOf方法是ES5中提供的方法，对于不支持的浏览器，可以采用下面的polyfill：
```
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (element, fromIndex) {
        if (this.length === 0 || this.length < fromIndex) {
            return -1;
        }
        var index = fromIndex || 0;
        var length = this.length;
        if (fromIndex < 0) {
            index = length + fromIndex;
        }
            
        for (; index < length; index++) {
            if (this[index] === element) {
                return index;
            }
        }
        return -1;
    }
}  
```

##### lastIndexOf方法
lastIndexOf方法和indexOf方法类似，它用于查找元素在数组最后一项的索引，如果不存在则返回-1：
```
var arr = [1, 5, 3, 4, 5, 6, 7];
console.log(arr.indexOf(5));//1
console.log(arr.lastIndexOf(5));  //4
```
如上面例子所示，数组中存在着两个数字5，使用indexOf方法将返回1，使用lastIndexOf将返回5。
lastIndexOf方法同样拥有第二个可选参数fromIndex，表示从该位置开始逆向查找。
如果fromIndex值大于或等于数组长度，则整个数组都会被查找。
如果fromIndex值为负值，并且其绝对值小于数组长度时，将从数组末尾向前查找。
如果fromIndex只为负数，但是其绝对值大于数组长度时，则直接返回-1。
```
var arr = [1, 5, 3, 4, 5, 6, 7];
console.log(arr.lastIndexOf(5, 10)); //4 
console.log(arr.lastIndexOf(5, -4));  //1
console.log(arr.lastIndexOf(5, -10));  //-1
```
对于不支持的浏览器，可以使用下面的polyfill：
```
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (element, fromIndex) {
        if (this.length === 0 || (fromIndex < 0 && this.length < Math.abs(fromIndex))) {
            return -1;
        }
            
        var length = this.length;
        var index = fromIndex || length - 1;
        if (fromIndex < 0) {
            index = length + fromIndex;
        }
        
        for (; index > -1; index--) {
            if (this[index] === element) {
                return index;
            }
        }
        return -1;
    }
}  
```

#### 元素查找方法
##### findIndex方法
findIndex方法用来查找数组中符合条件的元素的索引，如果没有则返回-1。它包含两个参数：
callback：用来判断元素是否符合条件的回调函数，包含三个参数，分别是：当前元素，当前元素索引，数组
thisArg：可选参数，表示callback中this对象。
来看看下面的例子：
```
var arr = [1, 2, 3, 4, 5, 6];
    console.log(arr.findIndex(function (val, idx) {
        return val > 3;
})) //3 
```
查找第一个大于3的元素的索引，结果为3。
如果是一个比较复杂元素的数组，我们可以来查找其中符合某个条件的元素的索引：
```
 var arr = [{ a: 1 }, { a: 2 }];
console.log(arr.indexOf({ a: 2 }));//-1
console.log(arr.findIndex(function (val, idx) {
    return val.a == 2;//1
}));  
```
如果是要查找一个复杂对象，使用indexOf可能查找不到其索引，但是我们可以通过findIndex来找到其索引。这个对于查找复杂元素非常有用。
对于不支持的浏览器，可以使用下面的polyfill：
```
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (fn, thisArg) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) {
                return i;
            }
        }
        return -1;
    }
}  
```

##### find方法
find方法用户查找满足条件的第一个元素，如果没有满足条件的元素，则返回undefined。
find方法的用法和findIndex类似，它包含两个参数：
callback：用来判断元素是否符合条件的回调函数，包含三个参数，分别是：当前元素，当前元素索引，数组
thisArg：可选参数，表示callback中this对象。
来看看下面的例子：
```
var arr = [{ v: 1 }, { v: 3 }, { v: 4 }, { v: 5 }, { v: 6 }];
    console.log(arr.find(function (val, idx) {
        return val.v > 3;
}))//Object {v: 4}  
```
通过find方法，查找到第一个其属性v大于3的元素并返回。
大家在日常的开发中一定会遇到这种查找符合条件的元素的需求，find方法是一个非常有用的方法。
对于不支持的浏览器，可以采用下面的polyfill：
```
if (!Array.prototype.find) {
    Array.prototype.find = function (fn, thisArg) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) {
                return arr[i];
            }
        }
    }
}  
```

#### 元素排序方法
在Array对象中，它还包含了一些排序的方法，主要有sort和reverse两个方法，下面来说明一下这两个方法。
##### sort方法
sort方法用来对数组进行排序，并返回排序后的数组。它包含一个参数，这个参数是一个函数，用它来比较每个参数之前的前后关系。如果不传，则默认按照字符串的Unicode码位点进行排序。
看看下面的例子：
```
var arr = [2, 4, 6, 2, 4, 8, 11, 34];
console.log(arr.sort().toString());  //11,2,2,34,4,4,6,8
console.log(arr.sort(function (a, b) {
    return a - b;
}).toString());  //2,2,4,4,6,8,11,34
```
如上结果所示，不指定比较函数的话，11排到了2前面，所以一般来说，我们要指定这个比较函数。

通过比较函数，我们可以来自定义数组排序的规则：
（1）返回-1，则元素a则排在了b前面
（2）返回0，位置不变
（3）返回1，元素a排在b后面

##### reverse方法
reverse方法是一个很简单的方法，它将数组元素的顺序进行倒序，并返回这个数组。
```
var arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr.reverse()); //[7, 6, 5, 4, 3, 2, 1]
console.log(arr);  //[7, 6, 5, 4, 3, 2, 1]
```

#### 元素循环方法
Array对象中包含一些对元素进行遍历的方法，通过对元素进行遍历，从而进行不同的操作。
##### filter方法
filter方法是用来过滤数组的，通过传入一个回调函数，如果元素通过回调函数的测试，则保留该元素，否则丢弃。具体用法如下：
```
var arr = [2, 3, 4, 5, 6, 7, 8];
console.log(arr.filter(function (val, idx, arr) {
    return val > 3;
}))  //[4, 5, 6, 7, 8]
```
如上所示，通过回调函数，我们过滤掉那些值不大于3的元素。
对于回调函数，它包含3个参数：元素，元素索引，当前数组。
filter函数还包含一个可选的参数thisArg，它表示回调函数中this的指向。
对于不支持的浏览器，可以采用下面的polyfill：
```
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn, thisArg) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        var result = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}  
```

##### forEach函数
forEach简单地说就是for循环的语法糖，它用于让数组的每一项都执行给定的函数。
看看下面的例子，循环数组的每一项，分别输入每一项。
```
var arr = [2, 3, 4, 5, 6, 7, 8];
arr.forEach(function (val, idx) {
    console.log(val);
})  
```
和其他循环方法一样，forEach包含两个参数：
callback：循环每一项调用的函数，包含三个参数：元素，元素索引，当前数组
thisArg：可选的参数，表示callback中this的指向。
有一点要注意的是：除非是抛出异常，否则无法终止或跳出循环。
对于不支持的浏览器，可以采用下面的polyfill：
```
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, thisArg) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            fn.call(thisArg, arr[i], i, arr);
        }
    }
}  
```

##### reduce函数
reduct函数我们可以将其想象成一个累加器，从左到右依次将每个元素累加起来。
看看下面的例子：
```
var arr = [1, 2, 3, 4, 5];
console.log(arr.reduce(function (prev, current, currentIndex, array) {
    return prev + current;
}))  
```
这个例子中，通过reduce方法将数组的元素累加起来，计算总和。
reduct包含两个参数：
callback：累加调用函数，包含4个参数：
（1）上一次调用的返回值，默认情况下是第一个元素
（2）当前元素
（3）当前元素索引
（4）被循环的数组
initialValue：累加的初始值，不传则是第一个元素
对于不支持的浏览器，可以采用下面的polyfill：
```
if (Array.prototype.reduce) {
    Array.prototype.reduce = function (fn, initialValue) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        var result = initialValue || arr[0];
        var index = !!initialValue ? -1 : 0;

        for (var length = arr.length - 1; index < length; index++) {
            result = fn(result, arr[index + 1], index + 1, arr);
        }
        return result;
    }
}  
```

##### reduceRight方法
reduceRight与reduce类似，只是从右向左开始调用回调函数，这里就不再赘述。
对于不支持的浏览器，可以使用下面的polyfill：
```
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (fn, initialValue) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        var result = initialValue || arr[arr.length - 1];
        var index = !!initialValue ? arr.length : arr.length - 1;
        
        for (; index > 0; index--) {
            result = fn(result, arr[index - 1], index - 1, arr);
        }
        return result;
    }
}  
```

##### map函数
map方法用来将数组转换成另外一个数组，通过传入的函数来进行转换。来看看下面的例子：
```
var arr = [1, 2, 3, 4, 5];
console.log(arr.map(function (val, idx, array) {
    return { "val": val };
}))  //[Object, Object, Object, Object, Object]
```
和其他循环方法一样，map方法包含两个参数：
callback：循环每一项调用的函数，包含三个参数：元素，元素索引，当前数组
thisArg：可选的参数，表示callback中this的指向。

对于不支持的浏览器，可以采用下面的polyfill：
```
if (!Array.prototype.map) {
    Array.prototype.map = function (fn, thisArg) {
        if (!isFunction(fn)) {
            throw new TypeError("fn不是一个有效的函数");
        }
        
        var arr = this;
        var result = [];
        for (var i = 0, length = arr.length; i < length; i++) {
            result.push(fn.call(thisArg, arr[i], i, arr));
        }
        return result;
    }
}  
```

#### 数组操作方法
##### concat方法
concat方法用来将传入的数组参数或非数组参数与原数组本身合并成一个新数组并返回，具体用法如下：
```
var arr = [1, 2, 3];
console.log(arr.concat([4, 5]));//1,2,3,4,5
console.log(arr.concat(4, 5));1,2,3,4,5  
```
从上面的例子，我们可以看出三点：
（1）传入的参数可以是数组，也可以是非数组
（2）传入的参数数量没有限定
（3）原来的数组并不会被改变

##### slice方法
slice方法用来剪切数组成一个新的数组，然后返回这个新数组。
```
var arr = [1, 2, 3, 4, 5, 6];
var newArr = arr.slice(1, 3);
console.log(newArr);//[2,3]  
```
slice方法含有参数：
start：截取数组的开始索引，不传则默认为0
end：截取数组的结束索引，不传则截取到末尾，如果传了end参数，则被截取的数组将从start开始，于end索引处结束（不包含end）。

还有一点需要注意的是，被截取的数组的元素是引用对象的话，新数组的元素是和原数组的元素实际上是引用了同一个对象：
```
var arr = [{ v: 1 }, { v: 2 }];
var newArr = arr.slice(0, 1);
newArr[0].v = 666;
console.log(newArr[0]);//Object {v: 666}
console.log(arr[0]);  //Object {v: 666}
```
如上所示，数组里的元素是引用对象，修改其中一个元素的值，另一个也会跟着变化。

##### splice方法
splice方法是数组操作中最为强大的方法：它可以新增，删除，替换数组的元素。
splice方法会返回被删除的元素组成的数组，它包含三个参数：
（1）start：从哪个索引开始修改数组，如果值大于数组长度，则表示从末尾开始添加内容，如果是负数，则从数组的末位开始的第几位。
（2）deleteCount：表示要删除的数组的数量，如果deleteCount的值大于start索引之后元素的数量，则后面所有元素将被删除。
（3）items：要添加的新元素，如果不传入该参数，则表示删除元素
我们来看看具体的几个例子：

**删除元素：**
1、只传递start参数，并且start参数大于0小于数组长度
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(2).toString());//空字符串或3,4,5,6,7,8,9,10
console.log(arr.toString());//1,2,3,4,5,6,7,8,9,10或1,2 
```
在这个例子中，splice只传递了start参数，这种情况下，根据浏览器有两种情况：
（1）在IE8等旧浏览器下，数组不会被该变
（2）在新浏览器下，数组会被删除掉从start参数开始后的所有元素

2、只传递start参数，并且start参数大于数组长度
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(15).toString());//空字符串
console.log(arr.toString());//1,2,3,4,5,6,7,8,9,10  
```
传递了大于数组长度的值之后，数组没有被修改

3、只传递start参数，并且start参数是负数
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(-2).toString());//9,10
console.log(arr.toString());  //1,2,3,4,5,6,7,8
```
在这个例子中，我们传递了-2，也就是说，splice方法将从数组的末尾开始删除，即从末尾的第二位，最终被删除的元素就是9，10
注意：对于IE8等旧浏览器来说，数组仍然没有被修改

4、只传递start参数，并且start参数是绝对值大于数组长度的负数
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(-1).toString());//1,2,3,4,5,6,7,8,9,10
console.log(arr.toString());  //
```
在这个例子中，我们传递了-15，其绝对值15大于数组长度，则整个数组都被删除了。
注意：对于IE8等旧浏览器来说，数组仍然没有被修改

5、传递start和deleteCount参数
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(1, 2).toString());//2,3
console.log(arr.toString());//1,4,5,6,7,8,9,10  
```
这个例子中，传递了start参数1，deleteCount参数2，表示从索引1的位置删除2个元素，所以最终结果如上所示。

6、传递start和deleteCount参数，其中start参数是负数
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(-5, 2).toString());//6,7
console.log(arr.toString());//1,2,3,4,5,8,9,10
```
我们传递了-5给start参数，则数组将从倒数第5位开始修改，然后删除2个元素，所以最终结果如上所示。

**添加元素**
splice方法也可以用来添加元素，我们要通过传递deleteCount参数为0，并且items不能为空来添加元素。看看下面的例子：
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(1, 0, 2, 2, 2).toString());
console.log(arr.toString());  //1,2,2,2,2,3,4,5,6,7,8,9,10
```
如上所示，我们在索引为1的位置开始添加了3个2作为新增的元素到数组中。

**替换元素**
splice方法用来替换元素和添加元素传递的参数类似，唯一的区别在于deleteCount不能为0。看看下面的例子：
```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr.splice(1, 3, 2, 2, 2).toString());//2,3,4
console.log(arr.toString());//1,2,2,2,5,6,7,8,9,10  
```
这个例子中，从索引为1的元素开始，删除掉3个元素，然后再添加2,2,2这三个元素，最终数组变成1,2,2,2,5,6,7,8,9,10。

#### 数组对象的方法总结
Array对象上包含了很多个方法，有一些方法会修改数组本身，有一些方法只是返回新数组，在这里简单总结下：
（1）修改数组本身的方法：pop，push，shift，unshift，sort，reverse，splice
（2）不修改数组本身，只返回新数组的方法：concat，slice
另外，对于旧浏览器，可以引用这个polyfill：<a href="https://github.com/LuoPQ/array.polyfill.js" target="_blank" >array.polyfill.js</a>

### 数组面试题
数组是在实际开发中非常经常遇到的一个对象，而关于数组的面试题也经常遇到，下面说说一些几个常见的数组面试题：
#### 数组去重
数组去重是一个很常见的面试题，一个数组有多个元素，其中包含一些重复的元素，如何去除掉这些重复的元素呢？
最常见的方法是采用hash表去重法，看下面的代码：
```
Array.prototype.distinct = function () {
    var arr = this;
    var dic = {};
    var result = [];
    
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i];
        if (!dic[key]) {
            dic[key] = arr[i];
            result.push(arr[i]);
        }
    }
    return result;
}
var arr = [1, 2, 3, 1, 2, 3];
console.log(arr.distinct());//[1,2,3]
var arr = ["a", "b", "c", "a", "b", "c"];
console.log(arr.distinct());  //["a","b","c"]
```
这个是最简单的情况，可以简单地实现数组的去重。但是也有一个明显的缺点：在作为key值时，元素会自动调用toString，最终导致一些复杂本来不是重复的元素被误认为重复。
我们看下面的例子：
```
var arr = [1, 2, 3, "1", "2", "3"];
console.log(arr.distinct());//[1,2,3]  
```
这个例子中，数组分别包含数字1,2,3，字符串“1”，“2”，“3”，这原本是不重复的元素，去重后就剩下了1,2,3了。我们将上面的方法优化一下：
```
Array.prototype.distinct = function () {
    var arr = this;
    var dic = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var key = typeof (arr[i]) + arr[i];
        if (!dic[key]) {
            dic[key] = arr[i];
            result.push(arr[i]);
        }
    }
    return result;
}  
```
我们将所谓hash表的key值的元素加上一个类型：var key = typeof (arr[i]) + arr[i]，这样问题就基本解决了：
```
var arr = [1, 2, 3, "1", "2", "3"];
console.log(arr.distinct());//[1, 2, 3, "1", "2", "3"]

var arr = [1, 2, 3, "1", "true", true, true];
console.log(arr.distinct());//[1, 2, 3, "1", "true", true]  
```

如果涉及到更极端的情况，数组元素中包含undefined或null，会怎么样呢，这种情况下，我们就要再进行一层判断：
```
Array.prototype.distinct = function () {
    var arr = this;
    var dic = {};
    var result = [];

    var hasUnderfined = false;
    var hasNull = false;
    for (var i = 0; i < arr.length; i++) {
        var type = typeof (arr[i]);
        if (arr[i] === null) {
            if (hasNull == true) {
                continue;
            }
            hasNull = true;
        }
        
        if (type === "undefined") {
            if (hasUnderfined) {
                continue;
            }
            hasUnderfined = true;
        }

        var key = type + arr[i];
        if (!dic[key]) {
            dic[key] = arr[i];
            result.push(arr[i]);
        }
    }
    return result;
} 

var arr = [1, 2, 3, "1", "2", "3", undefined, undefined, null, null];
console.log(arr.distinct()); //[1, 2, 3, "1", "2", "3", undefined, null]
```

我们再来考虑一下，如果数组是复杂对象的情况下会如何，假设这种情况：
```
var arr = [{val : 1}, {val : 1},{ val : 2}];
```
通常对于这样的数据，我们是将两个{val:1}当成是一样的数据的，但是由于是引用类型，它们又是不相等的数据，如果要去重，应该如何做呢？
我们可以传入一个key值转换函数，通过这个函数来过滤这些复杂的数据：
```
var isFunction = function (fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

Array.prototype.distinct = function (keyThunk) {
    var arr = this;
    var dic = {};
    var result = [];

    keyThunk = isFunction(keyThunk) ? keyThunk : function (val) {
        return typeof (val) + val;
    }

    var hasUnderfined = false;
    var hasNull = false;
    for (var i = 0; i < arr.length; i++) {
        var type = typeof (arr[i]);

        if (arr[i] === null) {
            if (hasNull == true) {
                continue;
            }
            hasNull = true;
        }

        if (type === "undefined") {
            if (hasUnderfined) {
                continue;
            }
            hasUnderfined = true;
        }

        var key = keyThunk(arr[i]);
        if (!dic[key]) {
            dic[key] = arr[i];
            result.push(arr[i]);
        }
    }
    return result;
}

var arr = [{ val: 1 }, { val: 1 }, { val: 3 }];
console.log(arr.distinct().map(function (val) {
    return val.val
}));//[1]
console.log(arr.distinct(function (val) {
    return val.val;
}).map(function (val) {
    return val.val;
})) [1,3] 
```
我们添加了一个key值的转换函数，这样就可以比较那些复杂对象了。

欢迎补充其他常见的面试题！

### 总结
本文详细总结了Javascript中Array对象，首先从基本概念开始说起，然后一一介绍了一些常用的数组方法，将其整理归类。最后解答了一些常见的面试题，欢迎大家交流！！





