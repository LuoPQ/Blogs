title: 提高代码质量：如何编写函数
date: 2016-02-21 15:45:18
tags: 代码质量
categories: 代码质量
description: 函数是实现程序功能的最基本单位，每一个程序都是由一个个最基本的函数构成的。写好一个函数是提高程序代码质量最关键的一步。本文就函数的编写，从函数命名，代码分布，技巧等方面入手，谈谈如何写好一个可读性高、易维护，易测试的函数。
---
函数是实现程序功能的最基本单位，每一个程序都是由一个个最基本的函数构成的。写好一个函数是提高程序代码质量最关键的一步。本文就函数的编写，从函数命名，代码分布，技巧等方面入手，谈谈如何写好一个可读性高、易维护，易测试的函数。

### 命名
首先从命名说起，命名是提高可读性的第一步。如何为变量和函数命名一直是开发者心中的痛点之一，对于母语非英语的我们来说，更是难上加难。下面我来说说如何为函数命名的一些想法和感受：
#### 采用统一的命名规则
在谈及如何为函数取一个准确而优雅的名字之前，首先最重要的是要有统一的命名规则。这是提高代码可读性的最基础的准则。
帕斯卡命名法和驼峰命名法是目前比较流行的两种规则，不同语言采用的规则可能不一样，但是要记住一点：保持团队和个人风格一致。
1、帕斯卡命名法
帕斯卡命名法简单地说就是：多个单词组成一个名称时，每个单词的首字母大写。比如：
```
public void SendMessage ();
public void CalculatePrice ();
```
在C#中，这种命名法常用于类、属性，函数等等，在JS中，构造函数也推荐采用这种方式命名。

2、驼峰命名法
驼峰命名法和帕斯卡命名法很类似，多个单词组成一个名称时，第一个单词全部小写，后面单词首字母大写。比如：
```
var sendMessage = function () {};
var calculatePrice = function () {};
```
驼峰命名法一般用于字段、局部变量、函数参数等等。在JS中，函数也常用此方法命名。

采用哪种命名规则并不绝对，最重要的是要遵守团队约定，语言规范。

#### 尽可能完整地描述函数所做的所有事情
有的开发者可能觉得相较于长函数名来说，短函数名看起来可能更简洁，看起来也更舒服。但是通常来说，函数名称越短其描述的意思越抽象。函数使用者对函数的第一印象就是函数名称，进而了解函数的功能，我们应该尽可能地描述到函数所做的所有事情，防止使用者不知道或误解造成潜在的错误。
举个例子，假设我们做一个添加评论的功能，添加完毕后并返回评论总数量，如何命名比较合适呢？
```
// 描述不够完整的函数名
var count = function addComment() {};

// 描述完整的函数名
var count = function addCommentAndReturnCount() {};
```
这只是简单的一个例子，实际开发中可能会遇到得更多复杂的情况，单一职责原则是我们开发函数要遵守的准则，但是有时候无法做到函数单一职责时，请记得函数名应该尽可能地描述所有事情。当你无法命名一个函数时，应该分析一下，这个函数的编写是否科学，有什么办法可以去优化它。

#### 采用准确的描述动词
这一点对母语非英语的开发者来说应该是比较难的一点，想要提高这方面的能力，最主要的还是要提高词汇量，多阅读优秀代码积累经验。
这里简单说说我自己的一些感想和看法：
1、不要采用太抽象广泛的单词
很多开发人员会采用一个比较宽泛的动词来为函数命名，最典型的一个例子就是get这个单词。我们平时开发中经常会通过各种不同的方式拿到数据，但是每一种方式都用get就有点太抽象了。具体如何命名，要具体分析：
（1）简单的返回数据
```
Person.prototype.getFullName = function() {
    return this.firstName = this.lastName;
}
```

（2）从远程获取数据
```
var fetchPersons = function () {
    ...
    $.ajax({
    })
}
```
（3）从本地存储加载数据
```
var loadPersons = function () {};
```

（4）通过计算获取数据
```
var calculateTotal = function () {};
```

（5）从数组中查找数据
```
var findSth = function (arr) {};
```

（6）从一些数据生成或得到
```
var createSth = function (data) {};
var buildSth = function (data) {};
var parseSth = function(data) {};
```
这是一个简单的例子，我们平时开发中遇到的情况肯定会复杂得多，关键还是靠单词的积累，多阅读优秀源码

下面是整理的一些常用的对仗词，大家可以参考使用
```
add/remove        increment/decrement       open/close
begin/end            insert/delete                      show/hide
create/destory    lock/unlock                        source/target
first/last              min/max                             star/stop
get/put                next/previous                     up/down     
get/set                old/new
```

#### 根据不同项目和需求制定好命名规则
这一点也是很重要的，尤其是在团队合作中，不同的项目和需求可能导致的不同的命名规则。
比如我们通常采用的命名规则是动宾结构，也就是动词在前，名词灾后。但是有一些项目，比如数据接口等项目中，有的团队会采用名字在前，动词在后的形式，例如：
```
public static Product[] ProductsGet(){};
public static Product[] ProductsDel(){};
public static Customer[] CustomerDel(){};
public static Customer[] CustomerDel(){};
```
这种的好处是看到前面的名词，比如ProductsGet，就能很快的知道这是产品相关的数据接口。
当然这个并不是绝对的，关键还是要团队共同制定和遵守同一套命名规则。

### 函数参数
函数使用者在调用函数时，必须严格遵守函数定义的参数，这对函数的易用性，可测试性等方面都是至关重要的。下面我从几个方面来谈谈关于如何优化好函数参数的一些想法。

#### 参数数量
毫无疑问，函数参数越多，函数的易用性就越差，因为使用者需要严格眼中参数列表依次输入参数，如果某个参数输错，将导致不可意料的结果。
但是，函数参数就一定越少越好吗？我们来看看下面的例子：
```
var count = 0;
var unitPrice = 1.5;
....
...
var calculatePrice = function () {
    return count * unitPrice;
}
```
在这个例子中，我们通过calculatePrice这个函数来计算价格，函数不接收任何参数，直接通过两个全局变量unitPrice和count进行计算。这种函数的定义对使用者来说非常方便，直接调用即可，不用输入任何参数。但是这里可能会有潜在的bug：全局变量可能在其他地方被修改成其他值了，难以进行单元测试等等问题。所以，这个函数可以传入数量和价格信息：
```
var calculatePrice = function(count, unitPrice) {
    return count * unitPrice;
}
```
这种方式下，函数使用者在使用时，要传入参数进行调用，避免了全局变量可能存在的问题。另外也降低了耦合，提高了可测试性，在测试的时候就不必依赖于全局变量。

当然，在保证函数不依赖于全局变量和测试性的情况下，函数参数还是越少越好。《代码大全》中提出将函数的参数限制在7个以内，这个可以作为我们的参考。
有的时候，我们不可避免地要使用超过10个以上函数，在这中情况下，我们可以考虑将类似的参数构造成一个类，我们来看看一个典型的例子。
我相信大家平时一定做过这样的功能，列表筛选，其中涉及到各种条件的筛选，排序，分页等等功能，如果将参数一个一个地列出来必定会很长，例如：
```
var filterHotel = function (city, checkIn, checkOut, price, star, position, wifi, meal, sort, pageIndex) {}
```
这是一个筛选酒店的函数，其中的参数分别是城市，入住和退房时间，价格，星级，位置，是否有wifi，是否有早餐，排序，页码等等，实际的情况可能会更多。在这种参数特别多的情况下，我们可以考虑将一些相似的参数提取成类出来：
```
function DatePlace (city, checkIn, checkOut){
    this.city = city;
    this.checkIn = checkIn;
    this.checkOut = checkOut
}

function HotelFeature (price, star, position, wifi, meal){
    this.price = price;
    this.star = star;
    this.position = position;
    this.wifi = wifi;
    this.meal = meal;
}

var filterHotel = function (datePlce, hotelFeature, sort, pageIndex) {};
```
将多个参数提取成对象了，虽然对象数量增多了，但是函数参数更清晰了，调用起来也更方便了。

#### 尽量不要使用bool类型作为参数
有的时候，我们会写出使用bool作为参数的情况，比如：
```
var getProduct = function(finished) {
    if(finished){
    }
    else{
    }
}

// 调用
getProduct(true);
```
如果没有注释，使用者看到这样的代码：getProduct(true)，他肯定搞不清楚true是代表什么意思，还要去查看函数定义才能明白这个函数是如何使用的。这就意味着这个函数不够清晰，就应该考虑去优化它。通常有两种方式去优化它：
（1）将函数一分为二，分成两个函数getFinishedProduct和getUnFinishedProduct
（2）将bool转换成有意义的枚举getProduct(ProductStatus)

#### 不要修改输入参数
如果输入参数在函数内被修改了，很有可能造成潜在的bug，而且使用者不知道调用函数后居然会修改函数参数。
正确使用输入参数的做法应该是只传入参数用于函数调用。
如果不可避免地要修改，一定要在注释中说明。

#### 尽量不要使用输出参数
使用输出参数说明这个函数不只做了一件事情，而且使用者使用的时候可能还会感到困惑。正确的方式应该是分解函数，让函数只做一件事。

### 编写函数体
函数体就是实现函数功能的整个逻辑，是一个函数最关键的地方。下面我谈谈关于函数代码编写的一些个人想法。

#### 相关操作放在一起
有的时候，我们会在一个函数内进行一系列的操作来完成一个功能，比如：
```
var calculateTotalPrice = function()  {
    var roomCount = getRoomCount();
    var mealCount = getMealCount();

    var roomPrice = getRoomPrice(roomCount);
    var mealPrice = getMealPrice(mealCount);

    return roomPrice + mealPrice;
}
```
这段代码计算了房间价格和早餐价格，然后将两者相加返回总价格。
这段代码乍一看，没有什么问题，但是我们分析代码，我们先是分别获取了房间数量和早餐数量，然后再通过房间数量和早餐数量分别计算两者的价格。这种情况下，房间数量和计算房间价格的代码分散在了两个位置，早餐价格的计算也是分散到了两个位置。也就是两部分相关的代码分散在了各处，这样阅读起代码来逻辑会略显不通，代码组织不够好。我们应该让相关的语句和操作放在一起，也有利于重构代码。我们修改如下：
```
var calculateTotalPrice = function()  {
    var roomCount = getRoomCount();
    var roomPrice = getRoomPrice(roomCount);
    
    var mealCount = getMealCount();
    var mealPrice = getMealPrice(mealCount);

    return roomPrice + mealPrice;
}
```
我们将相关的操作放在一起，这样代码看起来更清晰了，而且也更容易重构了。

#### 尽量减少代码嵌套
我们平时写if，switch或for语句是常有的事儿，也一定写过多层if或for语句嵌套的情况，如果代码里的嵌套超过3层，阅读起来就会非常困难了。我们应该尽量避免代码嵌套多层，最好不要超过2层。下面我来说说我平时一些减少嵌套的技巧或方法。
##### if语句嵌套的问题
多层if语句嵌套是常有的事情，有什么好的方法可以减少嵌套呢？
1、尽早终止函数或返回数据
如果符合某个条件下可以直接终止函数，则应该将这个条件放在第一位。我们来看看下面的例子。
```
if(condition1) {
    if(condition2){
        if(condition3){
        }
        else{
            return;
        }    
    }
    else{
        return;
    }    
}
else {
    return;
}
```
这段代码中if语句嵌套了3层，看起来已经很复杂了，我们可以将最后面的return提取到最前面去。
```
if(!condition1){
    return;
}
if(!condition2){
    return;
}
if(!condition3){
    return;
}
//doSth
```
这段代码中，我们把condition1等于false的语句提取到前面，直接终止函数，将多层嵌套的if语句重构成只有一层if语句，代码也更清晰了。

注意：一般情况下，我们写if语句会将条件为true的情况写在前面，这也比较符合我们的思维习惯。如果是多层嵌套的情况，应该优先减少if语句的嵌套

2、不适用if语句或switch语句
条件语句一般来说是不可避免的，有的时候，我们要判断很多条件就会写很多if-elseif语句，嵌套的话，就更加麻烦了。如果有一天增加了新需求，我们就要去增加一个if分支语句，这样不仅修改起来麻烦，而且容易出错。《代码大全》提出的表驱动法可以有效地解决if语句带来的问题。我们来看下面这个例子：
```
if(condition == “case1”){
    return 1;
}
elseif(condition == “case2”){
    return 2;
}
elseif(condition == “case3”){
    return 3;
}
elseif(condition == “case4”){
    return 4;
}
```
这段代码分别依次判断了四种情况，如果再增加一种情况，我们就要再新增一个if分支，这样就可能造成潜在的问题，如何去优化这段代码呢？我们可以采用一个Map或Dictionary来将每一种情况和相应值一一对应。
```
var map = {
    "case1":1,
    "case2":2,
    "case3":3,
    "case4":4
}
return map[condition];
```
通过map优化后，整个代码不仅更加简洁，修改起来也更方便而且不易出错了。
当然，很多时候我们的条件判断语句并不是这么简单的，可能会涉及到复杂的逻辑运算，大家可以查看《代码大全》第18章，其中有详细的介绍。

3、提取内层嵌套为一个函数进行调用
多层嵌套的时候，我们还可以将内层嵌套提取到一个新的函数中，然后调用该函数，这样代码也就更清晰了。

##### for循环嵌套优化
for循环嵌套相比于if嵌套来说更加复杂，阅读起来会更麻烦，下面说说几点要注意的东西：
1、最多只能两层for循环嵌套
2、提取内层循环到新函数中
3、多层循环时，不要简单地位索引变量命名为i，j，k等，容易造成混淆，要有具体的意思

####  提取复杂逻辑，语义化
有的时候，我们会写出一些比较复杂的逻辑，阅读代码的人看到后可能搞不清楚要做什么，这个时候，就应该提取出这段复杂的逻辑代码。
```
if (age > 18 && gender == "man") {
    //doSth
}
```
这段代码表示当年龄大于18并且是男性的话，可以doSth，但是还是不够清晰，可以将其提取出来
```
var canDoSth = function (age, gender){
    return age > 18 && gender == "man";
}
...
...
...
if(canDoSth(age, gender)){
    //doSth
}
```
虽说多了一个函数，但是代码更加清晰和语义化了。

### 总结
本文从函数命名，函数参数和函数的代码编写三个方面谈了关于如何编写好一个函数的感受和想法。文中提到了很多具体的情况，当然日常编码中肯定会遇到更多复杂的情况可能我暂时没有想到。我简单的归纳了几点：
1、准确地对变量、函数命名
2、不要有重复逻辑的代码
3、函数的行数不要超过20行，这里的20行只是个大概，并不一定是这个数字
4、减少嵌套
我相信大家一定会很多关于这方面的经验，欢迎进行交流，共同提高代码质量。
