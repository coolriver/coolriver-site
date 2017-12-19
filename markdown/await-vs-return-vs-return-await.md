<!--TAG Promise;await;async /TAG-->
# 翻译: await vs return vs return await
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171219/IDBFa4iifk.jpg?imageslim)
### 前言
受够了回调地狱，又觉得Promise用起来不过瘾，想用一下更加优雅的async/await吗？在使用之前可以关注一下有哪些使用方式和坑。已经使用了async/await的同学也可以看一下有没有遇到过类似的坑。另外，本文是译文，喜欢看英文的同学可以直接去下文原文链接去看。

> 原文链接: [await vs return vs return await](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)  

正文开始分割线
<hr>
正文开始!  

当我们在写async函数时，有几种不同的写法: `await`, `return`, `return await`。这几种写法实现的效果有所不同，选择一个正确的写法十分重要。  

我人先从一个async函数开始:  

```javascript
async function waitAndMaybeReject() {
  // 等一秒钟
  await new Promise(r => setTimeout(r, 1000));
  // 随机一把
  const isHeads = Boolean(Math.round(Math.random()));

  if (isHeads) return 'yay';
  throw Error('Boo!');
}
```  

上面的函数会返回一个等待一秒的promise，一秒之后，有50%的概率获得fullfill（resolve）值"yay"，另外50%的概率reject一个error。接下来我们将通过不同的方式来使用这个函数：  

### 直接调用
```javascript
async function foo() {
  try {
    waitAndMaybeReject();
  }
  catch (e) {
    return 'caught';
  }
}
```  

在这种用法中，如果你调用 `foo` 函数，返回的promise总是**立即**获得**fullfill值undefined**, 不会有等待时间。  
因为我们没有对 `waitAndMaybeReject()` 的结果进行 await 或者 return，所以这个函数不会有期望的async效果。这种代码一般是错误的写法。


### Awaiting
```javascript
async function foo() {
  try {
    await waitAndMaybeReject();
  }
  catch (e) {
    return 'caught';
  }
}
```  

在这种用法中，如果调用 `foo` 函数，返回的promise总是会等待一秒，接着，要么获得**fullfill值undefined**，要么获得**fullfill值 "caught"**。  
因为我们await了 `waitAndMaybeReject()` 的返回结果，所以它的rejection相当于throw了一个异常，然后catch块就能捕获到这个异常。当 `waitAndMaybeReject()` 是正常的fullfill时，因为我们没对fullfill的值做任何处理，所以 `foo` 函数的fullfill值是undefined。  

### Retruning
```javascript
async function foo() {
  try {
    return waitAndMaybeReject();
  }
  catch (e) {
    return 'caught';
  }
}
```  

在这种用法中，如果调用 `foo` 函数，返回的promise总是会等待一秒，接着，要么获得**fullfill值 "yay"**, 要么**reject(Error('Boo!'))**。  
通过返回 `waitAndMaybeReject()` 的值，我们直接传递了它的返回结果（Promise），所以我们catch块里的代码永远不会执行。

### Return-awaiting
如果你想在catch块中捕获到 `waitAndMaybeReject()` 的异常，在try中正常返回 `waitAndMaybeReject()` 的fullfill值，你得使用 `return await`:  
```javascript
async function foo() {
  try {
    return await waitAndMaybeReject();
  }
  catch (e) {
    return 'caught';
  }
}
```  

在这种用法中，如果调用 `foo` 函数，返回的promise总是会等待一秒，接着，要么获得**fullfill值 "yay"**，要么获得**fullfill值 "caught"**。  
因为我们await了 `waitAndMaybeReject()` 的返回结果，所以它的rejection相当于throw了一个异常，我们的catch块就会执行。如果 `waitAndMaybeReject()` 获得了fullfill值（"yay"），我们就将这个值返回。  

如果上面的代码看起来令人费解，那么将代码拆分成两个部分来看可能会比较好理解：  
```javascript
async function foo() {
  try {
    // 等待 waitAndMaybeReject() 的结果来解决,
    // 并且将 fullfill 的值赋给 fullfilledValue:
    const fulfilledValue = await waitAndMaybeReject();
    // 如果 waitAndMaybeReject() reject了，
    // 我们的代码就会抛出异常，并且进入 catch 代码块的逻辑。
    // 否则，这里的代码就会继续运行下面的语句:
    return fulfilledValue;
  }
  catch (e) {
    return 'caught';
  }
}
```  

> 注意：在 try/catch 块之外执行 `return await` 是多余的操作（直接 `return` 就好啦）。甚至Eslint还[专门有规则来检测这种场景](https://github.com/eslint/eslint/blob/master/docs/rules/no-return-await.md)，如果在 try/catch 块之内，Eslint就允许这种操作。（当然你也可以加eslint disable来无视这种操作限制）  
![mark](http://oxjqfafek.bkt.clouddn.com/blog/171219/mIILl8aLAH.jpg?imageslim)
