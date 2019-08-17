<template>
  <div id="app">
    <h1>{{ code }}</h1>
    <ul>
      <li v-for="msg in msgs" :key="msg" >
        Data: {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import { mapState, mapActions } from 'Vuex'; 
import Constants  from './constants';
const { ACTION_TYPES } = Constants;

export default {
  name: 'app',
  computed: mapState([
    'code',
    'msgs',
  ]),
  methods: mapActions([
      ACTION_TYPES.LOAD_CODE,
      ACTION_TYPES.LOAD_MSGS,
  ]),
  created () {
    this[ACTION_TYPES.LOAD_CODE]();
    this[ACTION_TYPES.LOAD_MSGS]();
  }
};
</script>

<style lang="css">
  #app ul {
    list-style-type: none;
  }
</style>
