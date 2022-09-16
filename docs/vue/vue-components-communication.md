---
id: vue-components-communication
title: Vue组件间通信
---

Vue组件间通信的两种常见情况：

- 父子组件间通信
  - 父传子
  - 子传父
- 非父子组件间通信


### 父子组件间通信：

父子组件通信很简单，父组件会通过 `props` 向下传数据给子组件，当子组件有事情要告诉父组件时会通过 `$emit` 事件告诉父组件。

这里拿element-ui中的对话框dialog举例，定义两个组件，`Index.vue`和`Dialog.vue`。Index中有一个按钮，点击按钮，将`dialog.isVisible=true`带到子组件中，打开对话框；在子组件中点击关闭按钮，再关闭对话框。关闭时，需要在子组件调用父组件中的方法，将父组件中的属性`dialog.isVisible`置为`false`。

`Dialog.vue`：

```vue
<template>
  <div>
    <el-dialog
        :title="title"
        :visible.sync="isVisible"
        width="30%">
      <span>message:{{ msg }}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="close" type="primary">关 闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog",
  // props:定义组件的属性，父组件通过props中定义的属性将值传过来。也就是说父组件只能向子组件中props定义的属性传值
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  // 当组件属性发生改变时返回最新的值
  computed: {
    isVisible() {
      return this.visible
    }
  },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    close() {
      // 子组件调用父组件方法，定义close事件，当dialog关闭时，调用父组件定义的方法<Dialog @close="xxx"/>，调用父组件中的xxx方法
      this.$emit('close')
    },
    // 该方法在父组件中通过$refs.dialog.initMsg()的形式调用
    initMsg(){
      this.msg = '父组件调用子组件方法'
    }
  }
}
</script>
```

`Index.vue`：

```vue
<template>
  <div>
    <button @click="dialogOpen">打开对话框</button>
    <!--
			visible：是子组件props中定义的属性，父组件通过通过这种形式将值带到子组件中
			title：也是同理
			@close="dialogClose"：@close是子组件Dialog自定义的事件。当Dialog关闭时，子组件中执行this.$emit('close')，调用父组件中的dialogClose()方法
			ref：官方的解释是用来给元素或子组件注册一个引用，该引用会绑定到父组件的$refs对象上。如果在普通DOM元素上使用，引用指向的是DOM元素；如果用在子组件上，引用就是指向子组件的实例。
		-->
    <Dialog :visible="dialog.isVisible" :title="dialog.title" @close="dialogClose" ref="dialog"></Dialog>
  </div>
</template>

<script>
import Dialog from './components/Dialog'

export default {
  name: "index",
  components: {Dialog},
  data() {
    return {
      dialog: {
        isVisible: false,
        title: ''
      }
    }
  },
  methods: {
    dialogOpen() {
      this.dialog.title = '父传子'
      // 父组件调用子组件方法，通过ref属性指向子组件实例，调用子组件中的方法
      this.$refs.dialog.initMsg()
      this.dialog.isVisible = true
    },
    dialogClose() {
      this.dialog.isVisible = false
    }
  }
}
</script>
```



### 非父子组件间通信：

![img](https://upyun1.surcode.cn/imgs/20200920164317.jpg)

如果我们不需要类似Vuex这样的库来处理组件之间的数据通信，就可以考虑Vue中的 `事件总线` ，即 `EventBus`来通信。

**EventBus的简介**

`EventBus` 又称为事件总线。在Vue中可以使用 `EventBus` 来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件，但也就是太方便所以若使用不慎，就会造成难以维护的“灾难”，因此才需要更完善的Vuex作为状态管理中心，将通知的概念上升到共享状态层次。

**如何使用EventBus**

**一、初始化**
首先需要创建事件总线并将其导出，以便其它模块可以使用或者监听它。我们可以通过两种方式来处理。先来看第一种，新创建一个 .js 文件，比如 `event-bus.js`

```javascript
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

实质上`EventBus`是一个不具备 `DOM` 的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

另外一种方式，可以直接在项目中的 `main.js` 初始化 `EventBus` :

```javascript
// main.js
Vue.prototype.$EventBus = new Vue()
```

注意，这种方式初始化的`EventBus`是一个`全局的事件总线`。

现在我们已经创建了 `EventBus` ，接下来你需要做到的就是在你的组件中加载它，并且调用同一个方法，就如你在父子组件中互相传递消息一样。

**二、发送事件**

![img](https://upyun1.surcode.cn/imgs/20200920164616.jpg)

假设你有两个Vue页面需要通信： A 和 B ，A页面 在按钮上面绑定了点击事件，发送一则消息，想通知 B页面。

```vue
<!-- A.vue -->
<template>
    <button @click="sendMsg()">-</button>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  methods: {
    sendMsg() {
      EventBus.$emit("aMsg", '来自A页面的消息');
    }
  }
}; 
</script>
```

接下来，我们需要在 B页面 中接收这则消息。

**三、接收事件**

![img](https://upyun1.surcode.cn/imgs/20200920164707.jpg)

```vue
<!-- IncrementCount.vue -->
<template>
  <p>{{msg}}</p>
</template>

<script> 
import { EventBus } from "../event-bus.js";
export default {
  data(){
    return {
      msg: ''
    }
  },
  mounted() {
    EventBus.$on("aMsg", (msg) => {
      // A发送来的消息
      this.msg = msg;
    });
  }
};
</script>
```

同理我们也可以在 B页面 向 A页面 发送消息。这里主要用到的两个方法：

```javascript
// 发送消息
EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
EventBus.$on(channel: string, callback(payload1,…))
```

前面提到过，如果使用不善，`EventBus`会是一种灾难，到底是什么样的`“灾难”`了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的`EventBus`会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，`EventBus`在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理`EventBus`在项目中的关系。通常会用到，在vue页面销毁时，同时移除`EventBus`事件监听。

**移除事件监听者**

![img](https://upyun1.surcode.cn/imgs/20200920164847.jpg)

```javascript
import { eventBus } from './event-bus.js'

EventBus.$off('aMsg', {})
```

你也可以使用 `EventBus.$off('aMsg')` 来移除应用内所有对此某个事件的监听。或者直接调用 `EventBus.$off()` 来移除所有事件频道，不需要添加任何参数 。

上面就是 `EventBus` 的使用方法，是不是很简单。上面的示例中我们也看到了，每次使用 `EventBus` 时都需要在各组件中引入 `event-bus.js` 。事实上，我们还可以通过别的方式，让事情变得简单一些。那就是创建一个全局的 `EventBus` 。接下来的示例向大家演示如何在Vue项目中创建一个全局的 `EventBus` 。

**全局EventBus**

它的工作原理是发布/订阅方法，通常称为 `Pub/Sub` 。

**创建全局EventBus**

```javascript
var EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```

在这个特定的总线中使用两个方法`$on`和`$emit`。一个用于创建发出的事件，它就是`$emit`；另一个用于订阅`$on`：

```javascript
var EventBus = new Vue();

this.$bus.$emit('nameOfEvent', { ... pass some event data ...});

this.$bus.$on('nameOfEvent',($event) => {
  // ...
})
```

然后我们可以在某个Vue页面使用`this.$bus.$emit("sendMsg", '我是web秀');`，另一个Vue页面使用

```javascript
this.$bus.$on('updateMessage', function(value) {
  console.log(value); // 我是web秀
})
```

同时也可以使用`this.$bus.$off('sendMsg')`来移除事件监听。

**总结**

本文主要通过简单的实例学习了Vue中有关于 `EventBus` 相关的知识点。主要涉及了 `EventBus` 如何实例化，又是如何通过 `$emit` 发送频道信号，又是如何通过 `$on` 来接收频道信号。最后简单介绍了如何创建全局的 `EventBus` 。从实例中我们可以了解到， `EventBus` 可以较好的实现兄弟组件之间的数据通讯。
