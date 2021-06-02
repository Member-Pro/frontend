import Achievement from '@/models/achievements/achievement';
import AchievementStep from '@/models/achievements/achievementStep';
import AchievementService from '@/services/achievementService';

interface AchievementState {
  isLoading: boolean;
  achievements: Achievement[];
  currentAchievement: Achievement | null;
  currentAchievementSteps: AchievementStep[];
}

const state: AchievementState = {
  isLoading: false,
  achievements: [],
  currentAchievement: null,
  currentAchievementSteps: [],
};

const getters = {
  isLoading: (state: AchievementState): boolean => state.isLoading,
  achievements: (state: AchievementState): Achievement[] => state.achievements,
  currentAchievement: (state: AchievementState): Achievement | null => state.currentAchievement,
  currentAchievementSteps: (state: AchievementState): AchievementStep[] => state.currentAchievementSteps,
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
  SET_CURRENT_ACHIEVEMENT_STEPS(state: AchievementState, value: AchievementStep[]): void {
    state.currentAchievementSteps = value;
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

      const steps = await AchievementService.getStepsForAchievement(id);
      commit('SET_CURRENT_ACHIEVEMENT_STEPS', steps);
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
