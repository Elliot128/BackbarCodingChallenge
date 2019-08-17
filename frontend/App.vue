<template>
  <div id="app">
    <h1>Backbar Coding Challenge</h1>
    <h2>{{ code }}</h2>
    <ul>
      <li v-for="msg in msgs" :key="msg" >
        Data: {{ msg }}
      </li>
    </ul>
    <div class="msg-entry-container">
      <input v-model=msg @keydown.enter="SendMsg()" type="text" name="msg">
      <button @click="SendMsg()">Save Entry</button>
    </div>
  </div>
</template>

<script lang="js">
import { mapState, mapActions } from 'vuex'; 
import Constants  from './constants';
const { ACTION_TYPES } = Constants;

export default {
  name: 'app',
  data() {
    return {
      msg: '',
    }
  },
  computed: mapState([
    'code',
    'msgs',
  ]),
  methods: {
    async SendMsg () {
      await this.ADD_MSG(this.msg);
      this.msg = '';
    },
    ...mapActions({
      'LOAD_CODE': ACTION_TYPES.LOAD_CODE,
      'LOAD_MSGS': ACTION_TYPES.LOAD_MSGS,
      'ADD_MSG': ACTION_TYPES.ADD_MSG,
    })
  },
  created () {
    this['LOAD_CODE']();
    this['LOAD_MSGS']();
  }
};
</script>

<style lang="css">
  #app ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
  #app div.msg-entry-container {
    display: inline-block;
  }
</style>
