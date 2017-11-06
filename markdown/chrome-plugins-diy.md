<!--TAG chrome;plugin /TAG-->
<!--DESC 本文主要介绍了chrome插件开发的一些常用知识 /DESC-->
# chrome插件 DIY
![](http://oxjqfafek.bkt.clouddn.com/blog/171020/cDaA47JmJd.png?imageslim)
## 1 前言
对于一个web前端开发者，chrome浏览器是一个工作，学习和生活的必备工具。除了chrome本身的基本能力（控制台等）外，能大幅提高这个神器的使用体验的是，可扩展能力（插件）以及丰富的插件生态。

每个人根据使用习惯会有自己的一套插件配置（鼠标手势、代理配置等等），这些插件包括具体的插件的配置信息，甚至可以和你的google账号绑定，当你换一台电脑，只要使用相同的google账号登录chrome，就会享受到一致的使用体验。

当你打开chrome的“扩展程序”界面，看着琳琅满目的插件，有没有想过亲自动手，打造一个自己的插件呢？当然，这种想法不应该是闲着某个部位疼，刻意的去开发一个连自己都不会实际使用的插件。而应该是发现现在的[插件库](https://chrome.google.com/webstore/category/extensions?hl=zh-CN)里，没有一个能解决自已在使用chrome过程中某个痛点的插件。

好，假设现在你在chrome的使用上想要一个扩展功能，但用各种关键字在各种可能找到答案的地方都搜索了，仍然没有看到想要的插件。这个时候，就可以考虑自己开发了。如果刚好你是一个web前端开发者，那么恭喜你，几乎没有门槛（只要有能看懂chrome extentions API文档就行），因为所有用到的技术都是你所熟悉的： json配置, js逻辑， css+html展示。

## 2 初步探索
chrome extension的[官方文档](https://developer.chrome.com/extensions)上，有着简单的demo指引，全面的API文档，以及对于各种API的丰富例子。对于初次开发chrome插件的人来说，建议先看[入门指引小demo](https://developer.chrome.com/extensions/getstarted)，篇幅很小，很快可以看完。看完之后对chrome插件的基本配置和文件结构会有一个大致的认识，同时也学会了如何在chrome上加载自己在本地开发的插件。

chrome extention支持的扩展点以及扩展功能很多，对于初学者不可能一下子看完官方所有文档再去动手。而应该是先根据自己用过的插件，脑海中有个大致的印象：插件可以在哪些地方起到效果。chrome插件最常见的功能莫过到url栏右侧的那些小图标了，就是这些：
![](http://7tszky.com1.z0.glb.clouddn.com/Foqn7uVaErx62-HlCZVSuqHRl9op)
如果看完上[入门指引小demo](https://developer.chrome.com/extensions/getstarted)后，你肯定知道了怎么样实现这样一个功能。这里就不讲官方文档里已经讲过的细节，主要讲一下比较重要的配置文件 `manifest.json` 。官方小demo的配置文件内容如下：
``` js
{
  "manifest_version": 2, // 插件标准版本，目前统一是2

  "name": "Getting started example", // 插件名称，显示在插件详情和插件商店中
  "description": "This extension shows a Google Image search result for the current page",  // 简介
  "version": "1.0", // 插件版本,发布到插件商店后，如果有修改插件代码，需要修改这里

  "browser_action": { // 就是url栏右侧那些小图标啊
    "default_icon": "icon.png", // 展示出来的图标图片
    "default_popup": "popup.html" // 点击图标后展示的气泡框页面（独立页面，可加载js / css）
  },
  "permissions": [ // 插件权限设置，规则较多，建议看官方文档
    "activeTab",
    "https://ajax.googleapis.com/"
  ]
}
```

插件配置文件里配置的文件路径，都是相对于`mainfest.json`的相对路径。所以当插件逻辑并不复杂时，通常就将配置文件和插件代码直接放在同一层目录下。插件配置文件中，配置了该插件扩展的描述信息、扩展的功能，以及插件的访问权限。插件功能除了`browser_action`配置的popup页面外，还支持什么功能呢？用过鼠标手势类插件的肯定知道，插件可以**访问和修改页面dom**，因为这类插件本质就是在dom上绘制鼠标路径。那么在哪里配置控制页面dom的代码呢？在`content_scripts`中：
```js
{
  "name": "My extension",
  ...
  "content_scripts": [ // 这里配置的脚本和样式将直接按顺序注入到影响的页面中
    {
      "matches": ["http://www.google.com/*"],
      "css": ["mystyles.css"],
      "js": ["jquery.js", "myscript.js"]
    }
  ],
  ...
}
```

`content_scripts`实际上是运行在受插件影响的页面中，在devtool中可以看到插件注入的这些内容:
![](http://7tszky.com1.z0.glb.clouddn.com/FpvhQQhsBSMHq5dga8jznv_poQWx)

目前我们已经掌握了插件两个功能点的配置了。如果用过evernote剪裁插件的人应该知道，插件可以改变chrome在页面上的右键菜单：
![](http://7tszky.com1.z0.glb.clouddn.com/FvXJrs8i7ncA1_b0zo4IDF3V92zW)
这里在哪里实现的呢？以上的两个配置点无法实现，是在`background`项中配置的：

```js
{
  "name": "My extension",
  ...
  "background": { // 在浏览器运行环境中运行的后台脚本，只要开启插件就会生效
    "scripts": ["background.js"]
  }
```

了解了上面三种扩展点的配置方法后，就可以开始开发功能丰富的插件了。

## 3 插件开发示例
本人开发了一个插件，通过介绍这个插件的开发流程，让大家熟悉几个常用的API。

>**初衷/痛点**：平时看一些文章/博客，要处理手头上其他事情，不得不中断。为了下次再看，通常是保存到书签/笔记。使用书签/笔记的方法，有两个弊端：一个是下次再进入时，不记得上次看到哪里了，又得重头开始看，或者拼命回忆上次看到哪里；另一个是，下次根本不记得哪些是没有看完的（除非专门建一个分类标签）。

>**期望**：有个插件，能够记录那些没看完，但又非常想继续看完的文章，即使关闭浏览器，换个浏览器，也能够获取到这些记录，并且打开再次打开文章时，能自动跳转到上次看到的位置。

* 安装：[https://chrome.google.com/webstore/detail/progress-bookmark/ediaiaoabgoimfjpmegbhlhmpajmegoj](https://chrome.google.com/webstore/detail/progress-bookmark/ediaiaoabgoimfjpmegbhlhmpajmegoj)
* 源码: [https://github.com/coolriver/smartBookmark](https://github.com/coolriver/smartBookmark)

这个插件的主要功能是：
1. 记录没有看完的文章/博客（在页面上通过右键菜单添加标记）,保存进度（按高度百分比）。
2. 下次从记录（url栏右侧插件功能点）中进入文章页面时，页面会滚动到上次标记的位置。

### 3.1 配置文件
这个插件用到了2节中讲到了3个插件扩展点： `browser_action` , `content_scripts` 和 `background`。配置文件如下：
```js
{
    "manifest_version": 2,

    "name": "Progress Bookmark",
    "description": "save progress of articles that has not been read completely",
    "version": "1.1.5",

    "browser_action": {
        "default_icon": "icon48.png",
        "default_popup": "popup.html",
        "default_title": "Progress Bookmark",
        "default_badgetext": "test"
    },
    "icons": {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
    },
    "background": {
        "scripts": ["background.js"]
    },
    "content_scripts": [{
        "matches": [
            "http://*/*",
            "https://*/*"
        ],
        "js": [
            "jquery-2.2.0.min.js",
            "content_script.js"
        ],
        "css": ["mystyle.css"]
    }],
    "permissions": [
        "contextMenus",
        "storage",
        "tabs",
        "http://*/*",
        "https://*/*"
    ]
}

```

上面的配置文件已经包含了大部分需要开发的文件名： `popup.html`, `background.js`, `content_script.js` `mystyle.css`。另外，各种尺寸的icon图片，用于插件在不同地方（插件logo，pop图标，插件商店等等）展示。目录结构如下：
![](http://7tszky.com1.z0.glb.clouddn.com/Fl5dWkhnx4Uj8_i_-TfDj-MMUTzA)

### 3.2 数据存储和数据流
本插件的功能类似于书签，需要保存目标页面的一些信息（标题, url, 进度）。那么有没有一种好的方法，可以保存这些数据，并且在同一个google账号上共享呢？还真有：`chrome.storage`。[官方文档](https://developer.chrome.com/extensions/storage)中详细介绍了其用法，以及如何在同账号不同浏览器上自动同步数据。

基于`chrome.storage`，本插件的各种扩展点的数据流操作图如下：
![](http://7tszky.com1.z0.glb.clouddn.com/Fpm1uI7-C1Ake0LQ-lzIPhQXgBGQ)

上图中，content_script和background的脚本运行环境不一样，通过message来进行通讯。

###３.3 popup页面
本插件的popup页面用于展示已经保存记录的未读完页面，页面展示效果如下:
![](http://7tszky.com1.z0.glb.clouddn.com/FooI47OVhOidl30GgLaS5QKfVsJP)
该页面负责展示和删除保存的记录，页面主要逻辑如下:
```js
// popup.js in popup.html
document.addEventListener('DOMContentLoaded', function() {
    loadStorage();
    bindEvents();
});

function loadStorage() { // 读取storage中的记录并render
    chrome.storage.sync.get(null, function(data) {
        var list = [],
            prop,
            html;
        //console.log(data);
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                if (data[prop].pageX !== undefined) {
                    list.push($.extend({}, data[prop], {
                        url: prop
                    }));
                }
            }
        }

        html = renderList(list);
        $('#content').html(html);
    });
}

function bindEvents() {
    $(document).on('click', '.js-remove', function(e) { // 监听和删除记录
        //console.log('click remove');
        var $this = $(this),
            $link = $this.closest('tr').find('.text-title a'),
            url = $link.attr('href');
        chrome.storage.sync.remove(url, function() {
            loadStorage();
        });
    });
}
```

### 3.4 content_script
content_script主要有两个功能：
1. 在页面中操作（新增 、滚动到指定位置、删除）记录坐标的元素 ；
2. 向background发送坐标消息和删除坐标的消息。
主要功能代码如下：

```js
// content_script.js

function checkBookmark(e) { // 初始化时检测storage中当前页面的书签信息
    var url = location.href;
    chrome.storage.sync.get(url, function(data) {
        data = data[url];

        if (!data) {
            return;
        }

        //console.log('get: ' + JSON.stringify(data));
        insertBookTag(data);
        $scrollElems[0].animate({
            scrollTop: data.pageY
        }, 1000);

        // body scroll失败，尝试html scroll
        if ($scrollElems[0].scrollTop() !== data.pageY) {
            $scrollElems[1].animate({
                scrollTop: data.pageY
            }, 1000);
        }
    });
}

function bindEvents() { // 事件和消息
    $doc.on('mouseup', function(e) { // 右键记录当前位置，并发送message给background
            //console.log(e.which);

            if (e.which === 3) {
                chrome.runtime.sendMessage({
                    type: 'bookmark-position',
                    pageX: e.pageX,
                    pageY: e.pageY,
                    title: document.title,
                    progress: Math.floor(e.pageY * 100 / $doc.height())
                });
            }
        })
        .on('ready', checkBookmark)
        .on('click', '#book-mark-tag .js-delete', function(e) {
            chrome.runtime.sendMessage({
                type: 'remove-bookmark'
            });
        });

    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) { // background返回的回调消息
        if (request.type === 'add-bookmark-cb') {
            insertBookTag(request);
        } else if (request.type === 'remove-bookmark-cb') {
            deleteTag();
        }
    });
}
```

### 3.5 background
background负责的任务有：
1. 添加右键菜单
2. 接收content_script发来的消息并处理

```js
// background.js
function createMenu() {     // 添加右键菜单
    var contexts = ["page", "selection", "link", "editable", "image", "video",
        "audio"
    ];
    contextId = chrome.contextMenus.create({
        "title": 'Set progress tag here',
        "contexts": contexts,
        "onclick": menuHandle
    });
}

function menuHandle() { // 右键菜单点击时的处理函数
    //console.log('click');
    var value = {},
        key = senderCur.url,
        obj = {};

    value.pageX = requestCur.pageX;
    value.pageY = requestCur.pageY;
    value.progress = requestCur.progress;
    value.title = requestCur.title;

    obj[key] = value;
    //console.log(obj);
    chrome.storage.sync.set(obj, function() {
        //console.log('send callback');
        chrome.tabs.query({ // 查找当前tab
            active: true,
            currentWindow: true
        }, function(tabs) { // 发送消息到当前tab,添加书签相关dom节点
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'add-bookmark-cb',
                pageX: requestCur.pageX,
                pageY: requestCur.pageY
            });
        });
    });
}

function bindEvents() {
    // 响应来自content_script的message
    chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
        if (request.type === 'bookmark-position') { // 添加/update书签
            requestCur = request;
            senderCur = sender;
        } else if (request.type === 'remove-bookmark') { // 删除书签
            //console.log('sendRequest: ' + sendRequest);
            chrome.storage.sync.remove(sender.url, function() {
                chrome.tabs.query({ // 查找当前激活的标签tab
                    active: true,
                    currentWindow: true
                }, function(tabs) { // 发送消息到当前tab,删除书签相关dom节点
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'remove-bookmark-cb'
                    });
                });
            });
        }
    });
}
```

## 4 插件调试方法
* popup.html调试：
右键点击popup图标，选择“审查弹出内容”:
![](http://7tszky.com1.z0.glb.clouddn.com/FiBuLS5Jc2exbrgHUu8ogKjcN_Au)
* content_script调试：devtool -> sources -> Content scripts
* background调试：
chrome://extensions/ 激活开发者模式，点击对应插件“检查视图”后的“背景页”
![](http://7tszky.com1.z0.glb.clouddn.com/FgNASpMThlmPId82TmxjL2GPKteG)

## 5 插件发布
需要google账户+信用卡（为了成为google认证的开发者）
参考链接：[https://segmentfault.com/a/1190000000354014](https://segmentfault.com/a/1190000000354014)
