# vue-dragable-direactive
Make everything draggable in Vue!

## Install
```
npm i -S vue-dragable-direactive
```

## Example

```html
<template>
  <div class="home">
    <!-- 可指定多个modifier，用来排除drag区域 -->
    <div class="target" v-drag-me.tagx.about>
    <!-- ref于上面的modifier一一对应 -->
      <div class="tag" ref="tagx"></div>
      <About ref="about"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DragableDirective from '../../src'
import About from './About'

Vue.use(DragableDirective, {
    name: 'drag-me' // 自定义指令名称(默认名称是dragable)
})

export default {
  name: 'home',
  components: {
    About,
  },
}
</script>
```

test