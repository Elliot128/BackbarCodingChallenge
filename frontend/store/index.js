import Vue from 'vue';
import Vuex from 'vuex';
import Constants from '../constants';
import Axios from 'axios';

const { ACTION_TYPES, MUTATION_TYPES } = Constants;

Vue.use(Vuex);

// remove "code" url param
const urlParams = new URLSearchParams(window.location.search);
urlParams.delete('code');
window.history.replaceState(
    null,
    window.document.title,
    `${window.location.pathname}${urlParams}`
);

const Api = Axios.create({
    baseURL: window.location.origin
});

export default new Vuex.Store({
    state: {
        code: '',
        msgs: [],
    },
    actions: {
        async [ACTION_TYPES.GET_CODE] ({ commit }) {
            const code = await Api.get('/code');
            commit(MUTATION_TYPES.SET_CODE, code);
        },
        async [ACTION_TYPES.GET_MSGS] ({ commit }) {
            const msgs = await Api.get('/messages');
            commit(MUTATION_TYPES.SET_MSGS, msgs);
        },
        async [ACTION_TYPES.ADD_MSG] ({ commit }, payload) {
            await Api.post(`/messages/${payload}`);
            commit(MUTATION_TYPES.ADD_MSG, payload);
        },
    },
    mutations: {
        [MUTATION_TYPES.SET_CODE] (state, payload) {
            state.code = payload;
        },
        [MUTATION_TYPES.SET_MSGS] (state, payload) {
            state.msgs = payload;
        },
        [MUTATION_TYPES.ADD_MSG] (state, payload) {
            state.msgs.push(payload);
        },
    }
});