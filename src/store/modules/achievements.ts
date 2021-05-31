import Achievement from '@/models/achievements/achievement';
import AchievementService from '@/services/achievementService';

interface AchievementState {
  isLoading: boolean;
  achievements: Achievement[];
}

const state: AchievementState = {
  isLoading: false,
  achievements: [],
};

const getters = {
  isLoading: (state: AchievementState): boolean => state.isLoading,
  achievements: (state: AchievementState): Achievement[] => state.achievements,
};

const mutations = {
  SET_IS_LOADING(state: AchievementState, value: boolean): void {
    state.isLoading = value;
  },
  SET_ACHIEVEMENTS(state: AchievementState, value: Achievement[]): void {
    state.achievements = value;
  },
};

const actions = {
  async loadAchievements({ commit }: { commit: any }): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const achievements = await AchievementService.getAll();
      commit('SET_ACHIEVEMENTS', achievements);
    } catch {
      // TODO: Show error
    }

    commit('SET_IS_LOADING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
