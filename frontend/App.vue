<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello World'
    }
  },
  created () {
      setTimeout(() => {
          this.msg = 'Goodbye World';
      }, 5000)
  }
}
</script>

<style lang="css">
  #app {
    color: #5e03d4;
  }
</style>
