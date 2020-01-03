<template>
  <div class="home">
    <div class="target" v-drag-me.tagx.about.xxx>
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
  name: 'drag-me' // 自定义指令名称
})

export default {
  name: 'home',
  components: {
    About,
  },
}
</script>

<style lang="scss" scoped>
.target {
  width: 100px;
  height: 100px;
  background: #ff0000;
  bottom: 123px;
  right: 200px;
}
.tag {
  position: absolute;
  left: 50%;
  margin-left: -25px;
  width: 50px;
  height: 50px;
  top: -50px;
  background: rebeccapurple;
}
</style>
