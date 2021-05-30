import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import Auth from './modules/auth';
import Geography from './modules/geography';

Vue.use(Vuex);

const logger = createLogger({
  collapsed: true,
  logActions: true,
  logMutations: false,
});

export default new Vuex.Store({
  state: {
    apiCallsInProgress: 0,
  },
  getters: {
    apiCallsInProgress: (state) => state.apiCallsInProgress,
    showLoadingIndicator: (state) => state.apiCallsInProgress > 0,
  },
  mutations: {
    INCREASE_API_CALLS(state) {
      state.apiCallsInProgress = state.apiCallsInProgress + 1;
    },

    DECREASE_API_CALLS(state) {
      state.apiCallsInProgress = state.apiCallsInProgress - 1;
    },
  },
  modules: {
    auth: Auth,
    Geography,
  },
  plugins: [
    logger,
  ],
});
