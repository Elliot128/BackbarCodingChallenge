import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '../constants';

const { MUTATION_TYPES } = Constants;

Vue.use(Vuex);

// remove "code" url param
const urlParams = new URLSearchParams(window.location.search);
urlParams.delete('code');
window.history.replaceState(
    null,
    window.document.title,
    `${urlParams.toString() ? `?${urlParams}` : ''}`
);

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
