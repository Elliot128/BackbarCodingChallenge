import Vue from 'vue';
import App from './App.vue';
import store from './store';

// remove "code" url param
const urlParams = new URLSearchParams(window.location.search);
urlParams.delete('code');
window.history.replaceState(
    null,
    window.document.title,
    `${window.location.pathname}${urlParams}`
);

new Vue({
    store,
    el: '#app',
    render: h => h(App)
});
