<!--TAG vue;react;组件 /TAG-->
# HOC(高阶组件)在vue中的应用

HOC是Higher-Order Components(高阶组件)的简称。如果有人第一次看到这个名词，可能会觉得是一个什么高深的技术。  
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171102/5G6Deel1Gf.jpg?imageslim)  
其实熟悉React的同学对这个概念应该不陌生。在React体系中，HOC被广泛地用于组件间公共功能的复用。而在Vue中，官方给出的组件复用方式则是mixin。接下来，本文将常用的组件复用方式（mixin和HOC）进行对比和实践。`（前方多码预警。。。）`

### 组件复用场景
什么时候会需要组件复用呢？空谈很虚(Talk is cheap, show me the code!)，直接给出实际场景:  
有一个使用了vue-router和vuex的单面应用。在N个(下面以两个为例子)独立页面功能完成后，需要增加权限控制的功能。有的页面需要特定的用户权限才能进入，否则如果强行输入url进入的话，会提示“没有权限访问本页面”。

#### 场景介绍
下面是没有权限控制时，系统主要的几个代码文件:

`页面入口: main.js`  

```javascript
import Vue from 'vue';
import store from './store';
import router from './routes';
import App from './app';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
```  

`页面根组件: app.vue`  

```javascript
<template>
  <div id="app">
    <div class="app-page" v-if="user.userLoaded">
      <div class="app-page-cnt">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'app',
  data() {
    return {};
  },
  methods: {
    // vuex中的action，会从接口请求包含权限的用户信息，并保存到store中的user字段
    // store中具体的代码因为比较简单，并且在这里不重要，所以就不展示了,可以自己脑补
    ...mapActions(['getUserDetail']),
  },
  computed: {
    // store中的user信息，在未从接口获取返回之前，为{ userLoaded: false }
    ...(mapState(['user'])),
  },
  created() {
    this.getUserDetail();
  }
};
</script>
```  

`路由配置: routes.js`  

```javascript
import Router from 'vue-router';

// 以下是组件异步加载的写法, 功能上等同于直接import
const Page1 = resolve => require(['./page1'], resolve);
const Page2 = resolve => require(['./page2'], resolve);

export default {
  routes: [
    { path: '/page1', component: Page1 },
    { path: '/page2', component: Page2 },
  ]
}
```  

`页面组件: page1.vue, page2.vue`  

```javascript
/**************** page1.vue ****************/
export default {
  template: `<div>欢迎访问传说中的 page1 !</div>`
}

/**************** page2.vue ****************/
export default {
  template: `<div>欢迎访问传说中的 page2 !</div>`
}
```  

#### 不考虑复用
在当前场景下，要对page1和page2两个页面添加权限控制，不考虑复用时可以这么粗暴地在page1.vue和page2.vue上进行如下改造来实现

`页面组件: page1.vue, page2.vue`  

```javascript
/**************** page1.vue ****************/
export default {
  template: `
    <div v-if="hasRight">欢迎访问传说中的 page1 !</div>
    <div v-else>不好意思，由于不够帅，你没有权限访问本页面</div>
  `,
  computed: {
    hasRight() { // 判断用户是否有权限进入本页面的计算属性
      // 这里的user是之前在app中通过接口返回注入store的用户信息
      const { rightList } = this.$store.state.user;
      return rightList.indexOf('RIGHT_PAGE_1');
    }
  }
}

/**************** page2.vue ****************/
export default {
  template: `
    <div v-if="hasRight">欢迎访问传说中的 page2 !</div>
    <div v-else>不好意思，由于不够帅，你没有权限访问本页面</div>
  `,
  computed: {
    hasRight() { // 判断用户是否有权限进入本页面的计算属性
      // 这里的user是之前在app中通过接口返回注入store的用户信息
      const { rightList } = this.$store.state.user;
      return rightList.indexOf('RIGHT_PAGE_2');
    }
  }
}
```

以上的方式，在只有两个页面的时候，可能不觉得麻烦。如果页面多了之后，就十分难维护了，同时会有大量的重复代码。鲁迅说过: `不要重复你自己(Do not repeat yourself)`  
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171102/lBBh5EKfDl.jpg?imageslim)  

为了利用权限控制的公共逻辑，接下来我们先尝试使用官方推荐的mixin方式来进行优化。

#### 使用mixin实现复用
在使用mixin前，先把那个分散在各种页面组件中的无权限提示，提取到单独的组件中以便复用
`提取出错误提示组件: no-right-tips.vue`  
```javascript
export default {
  template: `<div>不好意思，由于不够帅，你没有权限访问本页面</div>`,
  name: 'no-right-tips'
}
```  

接来下我们创建一个用于权限控制的mixin, 目标是使页面组件(page1, page2)不用关心权限校验是如何运行的。在这个例子中，只需要把hasRight这个计算属性提取到mixin中。  
`right-mixin.js`  
```javascript
export default {
  computed: {
    hasRight() { // 判断用户是否有权限进入本页面的计算属性
      // 这里的user是之前在app中通过接口返回注入store的用户信息
      const { rightList } = this.$store.state.user;
      return rightList.indexOf('RIGHT_PAGE_?'); // 注意这里，无法确定各个页面的权限标志
    }
  }
}
```

注意看上面代码的最后一行注释。我们希望把权限验证放到mixin中，但问题是不同页面所需要的权限是不一样的啊，无法将`RIGHT_PAGE_1`之类的具体权限写死在mixin中。怎么办呢？机智的你应该可以想到，用函数包一层啊:  
`right-mixin.js`  
```javascript
export default rightType => { // rightType作为参数传入，返回特定mixin
  computed: {
    hasRight() { // 判断用户是否有权限进入本页面的计算属性
      // 这里的user是之前在app中通过接口返回注入store的用户信息
      const { rightList } = this.$store.state.user;
      return rightList.indexOf(rightType); // 问题解决，美滋滋
    }
  }
}
``` 
上面的所说的 `用函数包一层`，听起来好low是吧？我们来给这种方式起个高逼格一点的名字吧，我们称上面的方式为 `高阶mixin`。是不是瞬间听起来不一样了？  
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171103/gf5l9b79Il.jpg?imageslim)   
这个名字听起来是不是和我们后面要讲的 `高阶组件` 如出一辙？  
我们先不纠结名字了，看看我们上面的方式如何在页面组件中使用吧:  

`page1.vue, page2.vue`
```javascript
/**************** page1.vue ****************/
import NoRightTips from './no-right-tips';
import rightmixin from './right-mixin';

export default {
  mixin: [rightmixin('RIGHT_PAGE_1')],
  template: `
    <div v-if="hasRight">欢迎访问传说中的 page1 !</div>
    <no-right-tips v-else></no-right-tips>
  `,
  components: {
    NoRightTips
  }
}

/**************** page2.vue ****************/
import NoRightTips from './no-right-tips';
import rightmixin from './right-mixin';

export default {
  mixin: [rightmixin('RIGHT_PAGE_2')],
  template: `
    <div v-if="hasRight">欢迎访问传说中的 page2 !</div>
    <no-right-tips v-else></no-right-tips>
  `,
  components: {
    NoRightTips
  }
}
```  
经过mixin改造和错误提示的组件提取之后，代码看起来复用度提高了，职责也分明了。现在页面组件不用关心权限是怎么检验的，只用管从mixin提供的computed属性中判断检验结果，并在没有权限时直接展示公共的错误提示组件。感觉不错！    
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171103/5cAHefjcBF.jpg?imageslim)  

#### 使用高阶组件(HOC)实现复用
铺垫了这么多，终于要进入主题了！在使用高阶组件之前，先简单描述一下它。我们上面起了一个高逼格的名字: `高阶mixin`，用来表示被函数包了一层的普通mixin。是有一定依据的。  
* 维基百科对于[高阶函数](https://zh.wikipedia.org/wiki/%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)的定义:
> 在数学和计算机科学中，高阶函数是至少满足下列一个条件的函数：  
> * 接受一个或多个函数作为输入
> * 输出一个函数

* 再看看关于React中HOC的定义
> * 老版定义(原始内容找不到，只能从[以前的博文](https://segmentfault.com/a/1190000004598113)中查证一二): `Higher-Order Components (HOCs) are JavaScript functions which add functionality to existing component classes.`
> * [新版定义](https://reactjs.org/docs/higher-order-components.html): `a higher-order component is a function that takes a component and returns a new component.`  

根据上面的定义，我们可以引申为：`通过函数向现有XXX添加功能，就是高阶XXX`。在上面mixin的例子中，通用函数，给普通mixin提供了可配置的权限检测参数，所以可称之为高阶mixin。  

到这里，其实高阶函数的定义已经在上面带出来了。根据react官方文档里最新的定义： `高阶组件是一个方法，这个方法接收一个原始组件作为参数，并返回新的组件`。我想这个命名和定义应该也是参照高阶函数的吧。  

大家可能觉得奇怪，为什么我要用react官方里的定义来说明高阶组件呢？是因为高阶组件最开始就是在react中提出来的。关于高阶组件的历史，我们可以后面再讨论。不如先看一下，如何使用高阶组件来实现上面场景中的组件复用功能。

我们创建如下高阶组件:  
`right-hoc.js`
```javascript
import NoRightTips from './no-right-tips';

export default (Comp, rightType) => {
  components: {
    Comp,
    NoRightTips,
  },
  computed: {
    hasRight() {
      const { rightList } = this.$store.state.user;
      return rightList.indexOf(rightType);
    }
  },
  render(h) {
    return this.hasRight ? h(Comp, {}) : h(NoRightTips, {});
  }
}
```  

接下来去掉页面组件中已经提取到高阶组件中的部分逻辑:  
`page1.vue, page2.vue`
```javascript
/**************** page1.vue ****************/
export default {
  template: `<div>欢迎访问传说中的 page1 !</div>`,
}

/**************** page2.vue ****************/
export default {
  template: `<div>欢迎访问传说中的 page2 !</div>`,
}
```  
发现没有？所有的权限相关代码都抽出来了！组件回归到的之前没有权限功能时的样子，是不是很清爽。那hoc在哪里与组件结合起来呢？答案是在routes里，在使用组件的地方：  
`路由配置: routes.js`
```javascript
import Router from 'vue-router';
import rightHoc from './right-hoc';

// 以下是组件异步加载的写法, 功能上等同于直接import
const Page1 = resolve => require(['./page1'], resolve);
const Page2 = resolve => require(['./page2'], resolve);

export default {
  routes: [
    { path: '/page1', component: rightHoc(Page1, 'RIGHT_PAGE_1') },
    { path: '/page2', component: rightHoc(Page2, 'RIGHT_PAGE_2') },
  ]
}
``` 

使用高阶组件同样实现了组件复用。而且看起来似乎更优雅？我们来对比一下高阶组件和mixin两种方式，在以上场景中的区别：   
`HOC`： 
* 增加了一个hoc文件， hoc文件中引入no-right-tips
* 路由配置中，使用页面组件的地方引入并使用了hoc

`mixin`:
* 增加了一个mixin文件
* 每个组件代码中，引入mixin、no-right-tips, 并且增加相应的模板逻辑(v-if)

我认为，在本文的场景中，使用HOC相比使用mixin有以下优势： 
1. 减少对原始组件的入侵，降低耦合。HOC中，原始组件只用考虑自身逻辑，不用考虑，也感知不到HOC对它做了什么。而mixin，组件在内部需要使用mixin的计算属性（更复杂的mixin还会用到生命周期和methods方法）.
2. 权限控制方便集中管理，直接在routes配置中管理各个页面配置，而不是分散在各个页面组件内部。
3. 避免命名冲突。如果页面自己有自己内部的权限控制，刚好也有个computed属性叫`hasRight`呢？在HOC下没问题，但mixin就不行了。

### React中的HOC现状
其实最早在React中，也是使用mixin来实现组件功能复用的，[但从v0.13.0开始，React的ES6 class组件写法中就不支持mixin了](https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html)。这应该算是比较大的特性调整了。在此之后，已经使用了React的项目，可以继续使用`React.createClass`定义组件的方式来继续使用mixin，如果要使用ES6 class并且实现同样的组件复用，就必须使用HOC了。  
React为什么做了这个决定呢？人家不是没事搞事情，而是有原因的。官方博客专门发文列举mixin可能带来的一些问题: [mixin Considered Harmful](https://reactjs.org/blog/2016/07/13/mixin-considered-harmful.html)。这篇文章里结合实际例子列举了mixin在React中可能带来的几个问题，并且给出了mixin迁移到HOC的一些指导。原文是英文，并且篇幅较长，所以这里简单地把文章里提到的mixin可能带来的几个问题列举一下: 
1. mixin会导致依赖不明确  
  mixin会调用组件内部方法/数据，组件会调用mixin方法/数据, 无法保证双方方法稳定存在.  
  多个mixin同时作用时，依赖关系对于被mixin的组件来说会更困惑

2. mixin会导致命名冲突  
  多个mixin和组件本身，方法名称会有命名冲突风险，如果遇到了，不得不重命名某些方法

3. mixin会带来滚雪球般的复杂度  
  原文中列举了一个复杂的mixin例子，我没看懂。。。。

也就是说，现在React体系中mixin已经不推荐使用，而推荐使用HOC。下图是《深入React技术栈》一书中关于mixin和HOC的对比  
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171103/Jce6Ah6bff.jpg?imageslim) 

### Vue中的HOC现状
相比于React，Vue目前还是使用mixin作为官方的组件复用方式。我在探索Vue中HOC的时候，发现很少有相关描述和实践和文章。在百度里搜不出来，在google里也只能搜出寥寥几个。在我找到的资源中，有一个vuejs的github issue十分有代表价值： [Discussion: Best way to create a HOC](https://github.com/vuejs/vue/issues/6201)  

在上面的issue讨论中，我很高兴有相同的志士也在想Vue中如何使用HOC。虽然我上面的例子简单地实现了HOC，但是实际的场景可能更复杂，涉及属性传递，slots等问题。而上面的issue就是在讨论这个问题。目前这个issue已经关闭，结论有两个: 
1. 暂时由热心人士产出了一个npm包: [vue-hoc](https://www.npmjs.com/package/vue-hoc)来帮助Vue方便地实现HOC.
2. 官方暂时不考虑将HOC加入vue core中，因为觉得相比于mixin的优势不够巨大。  

### 后话
HOC在React被认为是更好的mixin替代方式。最初HOC也是在React社区中产生的，然后由官方进行采纳和推广。在Vue中，我不清楚是因为没人想到这个问题还是什么，HOC很少有人关注。所以我写了这篇文章，做了自己的HOC实践，感觉效果不错。同时，我也在知乎了提了相关的问题: [为何在React中推荐使用HOC，而不是mixins来实现组件复用。但在Vue中，很少有HOC的尝试？](https://www.zhihu.com/question/67588479)，希望有大神能解答。

### 关于以上场景为什么不用router钩子来做统一权限控制的补充说明
1. **为什么不用`beforeEach`全局路由勾子来检验权限？** 因为，包含权限的用户信息是在app.vue中异步加载，并且存储到vuex store中的。在beforeEach函数中没有找到可以访问store中异步填入的数据的方法。要做的话，只能在beforeEach函数里，将next方法放在获取用户信息的ajax回调里，以实现等待用户信息加载完毕再判断路由是否有权限进入的效果。如果真这样做了，在每次点击链接导航至其它路由前，岂不是都要执行ajax请求了？当然，可以做用户信息数据缓存，但这样就把事情变更复杂了不是吗？而且，在ajax数据到达前，路由下控制的页面组件是完全阻塞住的，想展示Loading态都不行。

2. **为什么要把用户信息放在vuex store中？** 因为除了权限检验需要用到用户信息之外，实际在其它模块组件(header模块，和侧边栏菜单模块)中也需要用于用户信息。统一在app.vue的mounted中请求并保存在vuex store中，可以方便地提供给各组件进行用户数据共享复用。
