import MemberAchievement from '@/models/members/memberAchievement';
import FavoriteAchievement, { CreateFavoriteAchievement } from '@/models/members/favoriteAchievement';
import memberAchievementService from '@/services/memberAchievementService';
import favoriteAchievementService from '@/services/favoriteAchievementService';
import { addErrorToast, addSuccessToast, CommitDispatchFunction, CommitDispatchStateFunction } from '../common';

interface MemberAchievementState {
  isLoading: boolean;
  isSaving: boolean;
  memberAchievements: MemberAchievement[];
  favoriteAchievements: FavoriteAchievement[];
}

const state: MemberAchievementState = {
  isLoading: false,
  isSaving: false,
  memberAchievements: [],
  favoriteAchievements: [],
};

const getters = {
  isLoading: (state: MemberAchievementState): boolean => state.isLoading,
  isSaving: (state: MemberAchievementState): boolean => state.isSaving,
  memberAchievements: (state: MemberAchievementState): MemberAchievement[] => state.memberAchievements,
  favoriteAchievements: (state: MemberAchievementState): FavoriteAchievement[] => state.favoriteAchievements,
  favoriteAchievementIds: (state: MemberAchievementState): number[] =>
    state.favoriteAchievements.map((a: FavoriteAchievement) => a.achievementId),
};

const mutations = {
  SET_IS_LOADING(state: MemberAchievementState, value: boolean): void {
    state.isLoading = value;
  },

  SET_IS_SAVING(state: MemberAchievementState, value: boolean): void {
    state.isSaving = value;
  },

  SET_MEMBER_ACHIEVEMENTS(state: MemberAchievementState, value: MemberAchievement[]): void {
    state.memberAchievements = value;
  },

  SET_TRACKED_ACHIEVEMENTS(state: MemberAchievementState, value: FavoriteAchievement[]): void {
    state.favoriteAchievements = value;
  },

  ADD_TRACKED_ACHIEVEMENT(state: MemberAchievementState, value: FavoriteAchievement): void {
    state.favoriteAchievements = [ ...state.favoriteAchievements, value ];
  },

  REMOVE_TRACKED_ACHIEVEMENT(state: MemberAchievementState, trackedId: number): void {
    state.favoriteAchievements = state.favoriteAchievements.filter((ta: FavoriteAchievement) => ta.id !== trackedId);
  },
};

const actions = {
  async loadMemberAchievements({ commit }: CommitDispatchFunction, memberId: number): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const achievements = await memberAchievementService.getByMemberId(memberId);
      commit('SET_MEMBER_ACHIEVEMENTS', achievements);
    } catch {
      addErrorToast('There was an error loading the member\'s achievements.');
    }

    commit('SET_IS_LOADING', false);
  },

  async loadFavoriteAchievements({ commit }: CommitDispatchFunction): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const achievements = await favoriteAchievementService.getForCurrentUser();
      commit('SET_TRACKED_ACHIEVEMENTS', achievements);
    } catch {
      addErrorToast('There was an error loading your tracked achievements.');
    }

    commit('SET_IS_LOADING', false);
  },

  async createFavoriteAchievement({ commit }: CommitDispatchFunction, data: CreateFavoriteAchievement): Promise<void> {
    commit('SET_IS_SAVING', true);

    try {
      const response = await favoriteAchievementService.create(data);
      commit('ADD_TRACKED_ACHIEVEMENT', response);

      addSuccessToast(`You have favorited ${response.achievement?.name}.`);
    } catch {
      addErrorToast('There was an error favoriting the achievement. Try again.');
    }

    commit('SET_IS_SAVING', false);
  },

  async deleteFavoriteAchievement({ state, commit }: CommitDispatchStateFunction<MemberAchievementState>, achieveId: number): Promise<void> {
    commit('SET_IS_SAVING', true);

    try {
      const ta = state.favoriteAchievements.find((x: FavoriteAchievement) => x.achievementId === achieveId);
      if (ta) {
        await favoriteAchievementService.delete(ta.id);
        commit('REMOVE_TRACKED_ACHIEVEMENT', ta.id);

        addSuccessToast('You have removed the favorite achievement.');
      }
    } catch {
      // TODO: Success is still showing even if there was an API error
      addErrorToast('There was an error removing the favorite achievement.');
    }

    commit('SET_IS_SAVING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
