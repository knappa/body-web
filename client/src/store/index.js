import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: undefined,
  },
  plugins: [createLogger()],
  getters: {
    name: (state) => state.user.displayName,
    photoURL: (state) => state.user.photoURL,
    isLoggedIn: (state) => !!state.user,
  },
  mutations: {
    logout(state) {
      state.userData = undefined;
    },
    login(state, user) {
      state.user = user;
    },
  },
});

export default store;
