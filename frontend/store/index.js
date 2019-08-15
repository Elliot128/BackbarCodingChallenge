import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '../constants';

const { MUTATION_TYPES } = Constants;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        msg: 'Hello World'
    },
    mutations: {
        [MUTATION_TYPES.SET_MSG] (state, payload) {
            state.msg = payload;
        }
    }
});
