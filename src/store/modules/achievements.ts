import Achievement from '@/models/achievements/achievement';
import AchievementComponent from '@/models/achievements/achievementComponent';
import achievementComponentService from '@/services/achievementComponentService';
import AchievementService from '@/services/achievementService';

interface AchievementState {
  isLoading: boolean;
  achievements: Achievement[];
  currentAchievement: Achievement | null;
  currentComponents: AchievementComponent[];
}

const state: AchievementState = {
  isLoading: false,
  achievements: [],
  currentAchievement: null,
  currentComponents: [],
};

const getters = {
  isLoading: (state: AchievementState): boolean => state.isLoading,
  achievements: (state: AchievementState): Achievement[] => state.achievements,
  currentAchievement: (state: AchievementState): Achievement | null => state.currentAchievement,
  currentComponents: (state: AchievementState): AchievementComponent[] => state.currentComponents,
};

const mutations = {
  SET_IS_LOADING(state: AchievementState, value: boolean): void {
    state.isLoading = value;
  },
  SET_ACHIEVEMENTS(state: AchievementState, value: Achievement[]): void {
    state.achievements = value;
  },
  SET_CURRENT_ACHIEVEMENT(state: AchievementState, value: Achievement | null): void {
    state.currentAchievement = value;
  },
  SET_CURRENT_COMPONENTS(state: AchievementState, value: AchievementComponent[]): void {
    state.currentComponents = value;
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

  async loadAchievement({ commit }: { commit: any }, id: number): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const achievement = await AchievementService.findById(id);
      commit('SET_CURRENT_ACHIEVEMENT', achievement);

      const components = await achievementComponentService.getAllForAchievement(id);
      commit('SET_CURRENT_COMPONENTS', components);
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
