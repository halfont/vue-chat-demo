//index.js
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import rooms from './rooms'

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {rooms: rooms}
})

export default store