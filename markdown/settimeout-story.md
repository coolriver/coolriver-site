<!--TAG javascript /TAG-->
<!--DESC 关于setTimeout的一些理解，老鸟可绕道 /DESC-->
# setTimeout的那些事
>如果懂setTimeout，可以直接看第3节，前面两节也可以当段子看一下。
>如果不是很懂setTimeout，看下1，2两节应该会有一些收获。

### 1 JavaScript运行环境
之前[关于service worker介绍的文章](http://imweb.io/topic/56592b8a823633e31839fc01)中，这样描述了浏览器环境下Javascript环境："*每个页面的javascript运行主线程都是一个Boss*"、"*Boss很厉害，在页面上指点江山，呼风唤雨。但他有个局限：同一时刻只做一件事（单线程）*"。

以上体现了Javascript在浏览器运行环境中的局限性，单线程。实际上，不仅是在浏览器环境中，在Nodejs环境中的javascript也是单线程的。在不使用其它新员工（webworker等）的情况下，JS是如何在单线程上处理复杂的操作和逻辑，以至于在用户看来可以同时响应不同的操作的呢？

我们还是以Boss来称呼javascript的主线程吧。Boss为了更多更快地处理用户的需求，会不停地接收任务来执行。为了进一步提交效率，他优先执行最紧急的任务（即刻要执行），如果你要和他说"等下（3秒后 /  如果有我点了按钮 / 如果收到了服务器的响应）帮我在控制台打一个log吧。"，BOSS不会专门等着去执行你的需求，而是默默地把你这个"伪需求"记在一个"小本本"上，然后拍拍胸脯和你说："我保证(I promise!)"，接着继续做手头上的事，等BOSS手头上事情做完了，会从小本本上选择**最早记录的没被执行**的任务来执行。

BOSS能力和时间有限，能做的只有这么多了。他Promise会帮你做的任务肯定会做（只要他没有猝死。。），但时间上可能并不一定严格符合你的要求，毕竟小本本上可能不仅只有一条任务。

>想严肃了解JavaScript运行环境的同学可以看一下[《JavaScript 运行机制详解：再谈Event Loop》](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

### 2 理解setTimeout
咳咳。。是时候严肃一下了，我们改一下以上的称呼方式：
* JS主线程 => BOSS
* 同步任务 => BOSS手头上正在做的任务
* 异步任务（队列） => BOSS的小本本上的任务

setTimeout这个方法相信很多初学者都有过误解：让JS从现在开始，经过指定的时间后，执行相应的函数。

从方法名和大部分现象来看，很容易产生以上的误解。在我们理解了JS主线程的特点后，知道了它会优先完成同步任务，在同步任务执行过程中，不会执行其它任务。

实际上，setTimeout做的事情是：**在指定delay时间后，将指定方法作为异步任务添加到异步任务队列中**。

所以，如果setTimeout的定时到了执行时间，JS主线程仍然还在执行同步任务，setTimeout所指定的方法并不会立刻执行。
更惨的是，即使JS主线程执行完了同步任务，也不一定会执行setTimeout指定的方法，因为异步任务队列中可能有更早加入的异步任务。

最惨的是，即使天时地利人和，到了定时的时间时，JS主线程空闲，异步任务队列中只有setTimeout执行的方法，这个方法的执行时间也并不是精确的delay时间（精确到毫秒），因为浏览器上的计时器精确度有限：（以下摘自《Javascript高级程序设计（第三版）》）
* IE8及更早版本的计时器精度为15.625ms
* IE9及更晚版本的计时器精度为4ms
* Firefox和Safari的计时器精度大约为10ms
* Chrome的计时器精度为4ms

纵使setTimeout有些不尽人意，但这些瑕疵在大部分情况下，用户无法感知出来。
很多时候，setTimeout真正意图不是用来满足强迫者的精确需求，而是一种态度，一种中华名族传承已久的谦让美德：**"You can you up!"**。贯彻了此精神的代码，会让整个JS运行环境和谐运行。

>给setTimeout一句评价就是："上善若水，水善利万物而不争。" -- 摘自《道德经》

### 3 setTimeout应用例子

#### 3.1 替换setInterval来实现重复定时
setTimeout有个哥哥：setInterval。他哥看起来叼叼的，可以循环地每隔一个delay就向异步任务队列中添加一个任务。实际上setInterval用起来真地顺滑吗？以下YY一段setTimeout表哥的对话：
>  setTimeout： 欧妮桑
>  setInterval：纳泥？
>  setTimeout：我发现你可能有bug！
>  setInterval：我愚蠢的弟弟啊。。肯定是你使用的方法不对！
>  setTimeout：考虑到JS运行环境的特点，你的定时方法可能会连续执行，之间没有预期的间隔。
>   setInterval：Too young too simple! 你是说JS主线程的步同任务执行时间很长，并且异步队列中只有我在往其中添加任务，导致我在异步队列中重复添加的任务没有及时被执行，然后JS主线程空闲后，我添加的多个任务就会连续执行，是吗？
>  setTimeout：其实我想说的是。。。
>  setInterval：机智的为兄早就料到了这一点，于是我在往异步队列中添加任务的时候，特意检测了队列中是否已经有了我之前添加的任务，如果有的话，为兄就不再重复添加。
>  setTimeout：你说的那个检测机制我知道，我想说的是，当JS主线程中正在执行你添加的任务，如果此时异步任务队列为空，你再向队列中添加异步任务时，JS主线程执行完你上次添加的任务，会立刻执行你这次添加的任务。
>  setInterval：。。。。这是没办法的啊，我只能检测队列中的任务，没法检测正在执行的任务。You can you up?
>  setTimeout：请看下面代码：

```javascript
setTimeout(function() {
	doWhatYouWantTo();
	setTimeout(arguments.callee, 100)
}, 100);
```

>setInterval： （捂眼。。。）好亮的代码！你赢了...

使用以上setTimeout链式调用的方式，可以保证在下一次定时器代码执行之前，至少要等待指定的时间间隔，避免连续的运行。

#### 3.2 防止事件疯狂触发
除了点击这种单次事件，浏览器上有一些会疯狂触发的事件，例如onreaize事件。如果给这个事件绑定了处理函数，在浏览器窗口大小改变的时候会很高频地触发处理函数。如果处理函数中有DOM操作的话，对页面性能影响会很大，尤其是在IE浏览器中，甚至可能让浏览器崩溃。

如果你实在需要在这类事件上绑定操作DOM的函数，那么可以考虑一下限制一下事件执行的时间间隔，至少不要那么频繁。至于设置多少时间间隔，看具体场景和需求。以下代码是利用setTimeout来实现事件执行频率控制：

```javascript
/**
 * 限制method执行频次，当方法100ms之内没有
 * 再次被调用时，才执行method方法
 * @param  {function} method  被限制的方法
 * @param  {Object} context method执行的上下文
 */
function throttle(method, context) {
    clearTimeout(method.tid);

    method.tid = setTimeout(function() {
        method.call(context);
    }, 100);
}

function fnResize() {
    console.log(111);
}

window.onresize = function() {
    throttle(fnResize);
}
```

#### 3.3 IE下重新播放单次gif动画
有这样一个需求：设计给了一个gif动画，gif本身是单次播放的。产品要求页面加载时动画播放一次。后续用户只要鼠标hover到动画上，动画就重新播放一次。利用搜索引擎的强大功能，很快找到了实现方案:

```javascript
$logo.on('mouseenter', function() { // hover时重新播放gif动画
    var $logoImg = $(this).find('img');
    $logoImg.attr('src', ''); // 将img的src置为空
    $logoImg.attr('src', _opt.logoImg); // 重新设置src为gif链接，以实现重新播放
});
```
在chrome等浏览器上验证没问题后，按照惯例，在IE上出问题了。。。gif并没有重新播放一次。
当时想的是，可能是IE反应太慢了，在src属性重置的那个间隔内，没有意识到这一点。于是就尝试加了个setTimeout，把重新设置src的操作丢到了异步任务队列中。

```javascript
$logo.on('mouseenter', function() { // hover时重新播放gif动画
    var $logoImg = $(this).find('img');
    $logoImg.attr('src', '');
    setTimeout(function() { // IE下要这样搞，不然不能重新播放动画
        $logoImg.attr('src', _opt.logoImg);
    }, 0);
});
```
虽然没有从根本上理解为什么IE会这样，但是setTimeout已然解决了这个问题。。

#### 3.4 blur事件延时生效
经常有这种场景：监控input或者textarea中文本的变化，然后触发某个事件处理程序。考虑到除了键盘输入，还有鼠标的粘贴和剪切操作，比较完整的监控输入内容改变的方法是：

```javascript
// 响应键盘输入，粘贴和剪切事件
$('#input').on('keyup paste cut', function() {
	console.log($(this).val());
});
```

以上代码在键盘输入场景下，能够在控制台输入最新的输入框内文本。但是当使用鼠标右键操作进行粘贴或剪切时，控制台输入的文本内容是操作前的旧内容。为了获取操作后的新文本内容，可以将对文本的获取和处理放在setTimeout中延时执行：

```javascript
// 响应键盘输入，粘贴和剪切事件
$('#input').on('keyup paste cut', function() {
	var $this = $(this);
	setTimeout(function(){ // 使鼠标粘贴和剪切时，输入框内内容为最新
		console.log($this.val());
	}, 0)
});
```

#### 3.5 更多用法？
setTimeout能够影响代码的执行顺序和时机，合理使用能够让更重要的代码优先执行，也可以FIX某些场景下的奇怪的bug。上面只列举了4种应用的场景，更多的用法欢迎大家讨论和补充。
