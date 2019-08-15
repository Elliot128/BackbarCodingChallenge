<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="js">
import { mapState, mapMutations } from 'Vuex'; 
import Constants  from './constants';
const { MUTATION_TYPES } = Constants;

export default {
  name: 'app',
  computed: mapState([
    'msg'
  ]),
  methods: mapMutations([
      MUTATION_TYPES.SET_MSG
  ]),
  created () {
      setTimeout(() => {
          this[MUTATION_TYPES.SET_MSG]('Goodbye World');
      }, 5000);
  }
};
</script>

<style lang="css">
  #app {
    color: #5e03d4;
  }
</style>
