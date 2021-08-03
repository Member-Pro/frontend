import { getField, updateField } from 'vuex-map-fields';
import Member from '@/models/members/member';
import UserService from '@/services/userService';
import { addErrorToast, addSuccessToast, CommitDispatchStateFunction } from '../common';

interface UserState {
  isLoading: boolean;
  isSaving: boolean;
  currentUser: Member | null;
}

const state: UserState = {
  isLoading: false,
  isSaving: false,
  currentUser: null,
};

const getters = {
  getField,

  isLoading: (state: UserState): boolean => state.isLoading,
  isSaving: (state: UserState): boolean => state.isSaving,
  currentUser: (state: UserState): Member | null => state.currentUser,
};

const mutations = {
  updateField,

  SET_IS_LOADING(state: UserState, value: boolean): void {
    state.isLoading = value;
  },
  SET_IS_SAVING(state: UserState, value: boolean): void {
    state.isSaving = value;
  },
  SET_CURRENT_USER(state: UserState, value: Member | null): void {
    state.currentUser = value;
  },
};

const actions = {
  async loadCurrentUser({ commit }: { commit: any, dispatch: any }): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const member = await UserService.getCurrentMember();
      commit('SET_CURRENT_USER', member);
    } catch {
      addErrorToast('There was an error retrieving your profile. Please refresh to try again.');
    }

    commit('SET_IS_LOADING', false);
  },

  async update({ commit, dispatch, state }: CommitDispatchStateFunction<UserState>): Promise<void> {
    commit('SET_IS_SAVING', true);

    try {
      if (state.currentUser) {
        await UserService.update(state.currentUser);

        // Update the attributes in cogntio
        const userUpdateParams = {
          email: state.currentUser.emailAddress,
          firstName: state.currentUser.firstName,
          lastName: state.currentUser.lastName,
        };

        await dispatch('auth/updateUser', userUpdateParams, { root: true });

        addSuccessToast('Your profile has been updated.');
      }
    } catch {
      addErrorToast('There was an error saving your profile. Try again.');
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
