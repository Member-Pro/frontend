import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';
import Achievements from './modules/achievements';
import Auth from './modules/auth';
import geography from './modules/geography';
import { createToastModule } from './modules/toast';

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
    achievements: Achievements,
    auth: Auth,
    geography,
    toast: createToastModule(),
  },
  plugins: [
    logger,
  ],
});
