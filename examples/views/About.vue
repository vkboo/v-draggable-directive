<template>
  <comp-a class="wrap" />
</template>

<script>
import compA from '../components/compA'
export default {
  name: 'about',
  components: {
compA
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    background: blue;
    user-select: none;
  }
</style>
