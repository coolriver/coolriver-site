<!--TAG 工具 /TAG-->
# 你可能不知道的前端在线 coding 乐园
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171110/4GI7k0AJBH.jpg?imageslim)


当大家在热烈讨论撸代码是用哪个IDE，编辑器，还是记事本时，有没有考虑过？其实我们可以不用本地的编辑器之类的，而是直接在线上撸？当然，如果是真枪实弹地做项目，当然还是离不开一款趁手的IDE或者编辑器。但如果你只是一时心血来潮，或者灵光一现  

![mark](http://oxjqfafek.bkt.clouddn.com/blog/171110/LHiGg0JGe1.jpg?imageslim)  

想立即撸几行代码验证一个惊天的想法,那么不防尝试一下直接线上撸代码。这样的话，你就省去了在本地新建文件，改扩展名，安装依赖，运行调试等一系列繁杂的工序，直接将你的想法立即实现为代码，并在线看到效果。是不是很爽？更进一步，如果你线上的代码可以随时随地可以分享给其他人，是不是更爽了？  

![mark](http://oxjqfafek.bkt.clouddn.com/blog/171110/A1b0k76lEm.jpg?imageslim)  

本文接下来将简单介绍，当前在前端方面比较好用的在线coding乐园。只希望能给大家提供一些线上coding的参考。并不对各个系统作太深入讲解。  
`前方多iframe预警...`

### 在线coding系统特性
上面已经提过，对于小规模的片段代码，比较适合在在线coding系统中进行编辑。那么在线coding系统本身有什么特性呢?

1. `支持基本的html, css javascript代码高亮`：代码高亮这种基本的编程体验还是要的，至于自动补全什么的就不强求了（虽然有的系统也支持一点）。
2. `可在线预览`：这个是必须的啊，而且最好是能编辑后实时reload。
3. `支持某些非原生语言`：这里的非原生语言是指 scss, less, typescript, jsx之类的。这个不是所有的在线coding系统上都支持，毕竟功能比较高级。
4. `可以自由引入第三方库`：不同在线coding系统有不同引入方式，有的是自己加script标签，有的已经包装了了一些常用的库和框架。
5. `支持多种形式分享`：线上写了一段很牛逼的代码，想让大家看到怎么办？可以直接把线上保存后生成的链接发给别人。也可以使用iframe等形式embed在blog文章中，展现了代码的同时还能直接认人家看到运行效果，比简单地使用静态的代码文本片段有说服力多了。
6. `可以fork别人代码`： 这个功能一般在线coding系统也都支持。站在前人已有的基础上，可以有更好的思路。

### 几款流行的在线前端coding乐园
接下来介绍一些当前比较流行的在线前端coding系统。将对每个系统进行极为简单的描述（多说无益，最好是自己去亲自尝试），然后配合实际的例子嵌入到本文中。  
`因为本站是https的，里面不允许嵌入http协议的iframe，下面的示例中有两个是不支持（或者要付费才支持）https的，所以在我添加https代理前，需要移步至对应的官网体验了`

#### 1. [JSFiddle](https://jsfiddle.net/)
* **简介:** 比较早就有的系统，当前也有很多人在上面分享代码。基本功能都有。偏JavaScript
* **亮点:** 可以格式化代码。
* **缺点:** 国内访问不稳定，有时候甚至加载不出来。
* **推荐:** ★★★★☆
* **示例:** 如下, 可点击reslut栏查看效果（下面的例子在国内网络有时候会加载失败，可以多刷新页面试试...）

<iframe width="100%" height="300" class="card js-lazy-iframe" lazy-src="https://jsfiddle.net/coolriver/368vsno5/9/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


#### 2. [JSBin](http://jsbin.com)
* **简介:** 功能和JSFiddle差不多。偏JavaScript
* **亮点:** 有单独的console伴
* **缺点:** https嵌入居然要收钱...
* **推荐:** ★★★☆☆
* **示例:** 如下(暂时是看不到效果，得加个https的代理，所以可以先移步去官网看)

<iframe width="100%" height="300" class="card js-lazy-iframe" lazy-src="https://jsbin.com/sefeput/2/edit?html,css,js,console,output" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



#### 3. [CodePen](https://codepen.io/)
* **简介:** 社区活跃，高颜值，偏CSS和动效。
* **亮点:** 里面可以找到很多炫酷的视觉和动画效果
* **缺点:** 暂时没找出明显的缺点
* **推荐:** ★★★★★
* **示例:** 如下(fork自一个魔性的机器人跳舞项目，可以试着用鼠标拖动小人)

<iframe width="100%" height="550" class="card js-lazy-iframe" lazy-src="https://codepen.io/coolriver/embed/OOWRyM/?height=300&theme-id=8258&default-tab=result&embed-version=2" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe>

#### 4. [CssDeck](http://cssdeck.com/)
* **简介:** 和CodePen类似，偏CSS和动效。
* **亮点:** 暂时没找到明显的亮点
* **缺点:** 社区没有CodePen活跃，被比下去了（个人观点）, 并且不支持https
* **推荐:** ★★★☆☆
* **示例:** 如下(因为不支持https, 所以只能移步去官网看了)

<iframe width="100%" height="550" class="card js-lazy-iframe" lazy-src="https://cssdeck.com/labs/full/lyd1w2nh" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe>

#### 5. [Runkit](https://runkit.com/home)
* **简介:** 专属于nodejs的线上乐园，在上面可以自由地在各种node版本里，自由加载各种npm包，甚至有坐落于国外的虚拟机帮你运行node程序（让我想到了是不是可以在上面搞个代理来实现 访问真正的互联网，有兴趣的小伙伴可以试试）
* **亮点:** 与node和npm完美结合，提供了很多新颖有用的特性(endpoint, data visualize等)
* **缺点:** 暂时没找到明显的亮点
* **推荐:** ★★★★★
* **示例:** 如下(点击"run"查看运行效果。好吧，我比较偏心，放了两个demo，但其实我觉得还是不够，更多特性可以去官网体验。)

<script src="https://embed.runkit.com" data-element-id="my-element"></script>
<!-- anywhere else on your page -->
<div id="my-element">
// 使用async-get-json包异步加载google地图数据
var getJSON = require("async-get-json");
await getJSON("https://storage.googleapis.com/maps-devrel/google.json");
</div>

<script src="https://embed.runkit.com" data-element-id="my-element2"></script>
<div id="my-element2">
// 直接获取页面信息， 虽然国内的网络不能直接访问youtube，但这里仍然可以获取到页面的信息，因为这个是run在国外服务器上的哦
var urlYoutube = 'https://www.youtube.com/?hl=zh-cn';
</div>

<!-- 下面脚本是runkit需要重新设置iframe高度而加入的 -->
<script>
  window.addEventListener('message', function (e) {
    try {
      var data = JSON.parse(e.data);
    } catch (e) {
      return false;
    }

    if (data.context !== 'iframe.resize') {
      return false;
    }

    var iframe = document.querySelector('iframe[src="' + data.src + '"]');

    if (!iframe) {
      return false;
    }

    if (data.height) {
      iframe.height = data.height;
    }
  });
</script>

#### 6. [Regex101](https://regex101.com/)
* **简介:** 专注正则表达式（注意要选择javascript语法）
* **亮点:** 可以帮解析正则语法，让你理清你写的正则思路
* **缺点:** 暂时没找到
* **推荐:** ★★★★★
* **示例:** 如下(可以随便编辑试验)

<iframe width="100%" height="300" class="card js-lazy-iframe" lazy-src="https://regex101.com/r/Rw2T9G/2" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe>

#### 7. [LiveWeave](https://liveweave.com/)
* **简介:** 一个没啥亮点的系统
* **亮点:** 暂时没找到，可以认为是来凑数的，或者衬托其它的。。。
* **缺点:** 嵌入效果不好(看下面的示例，显示都叠起来了)
* **推荐:** ★★☆☆☆
* **示例:** 如下

<iframe width="100%" height="550" class="card js-lazy-iframe" lazy-src="https://liveweave.com/4b7b0D" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe>

#### 8. [Plunker](http://plnkr.co/edit/?p=catalogue)
* **简介:** 一个只有一丝亮点的系统
* **亮点:** 支持多个文件，有项目的概念
* **缺点:** 长得不好看
* **推荐:** ★★★☆☆
* **示例:** 如下

<iframe width="100%" height="500" class="card js-lazy-iframe" lazy-src="https://embed.plnkr.co/VxudflhNetVoqCIW1PNj/" allowfullscreen="allowfullscreen" frameborder="0" scrolling="no"></iframe>

### 结束语
如果有什么遗漏的比较好的在线coding系统，欢迎大家评论补充!
