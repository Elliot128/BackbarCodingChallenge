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
  methods: mapActions({
      'LOAD_CODE': ACTION_TYPES.LOAD_CODE,
      'LOAD_MSGS': ACTION_TYPES.LOAD_MSGS,
      'ADD_MSG': ACTION_TYPES.ADD_MSG,
  }),
  created () {
    this['LOAD_CODE']();
    this['LOAD_MSGS']();
  }
};
</script>

<style lang="css">
  #app ul {
    list-style-type: none;
  }
</style>
