import { getField, updateField } from 'vuex-map-fields';
import Member, { RegisterMember } from '@/models/members/member';
import UserService from '@/services/userService';
import { addErrorToast, addSuccessToast, CommitDispatchStateFunction } from '../common';

interface UserState {
  isLoading: boolean;
  isSaving: boolean;
  currentUser: Member | null;
  register: RegisterMember;
  registrationError: string | null;
}

const state: UserState = {
  isLoading: false,
  isSaving: false,
  currentUser: null,
  register: new RegisterMember(),
  registrationError: null,
};

const getters = {
  getField,

  isLoading: (state: UserState): boolean => state.isLoading,
  isSaving: (state: UserState): boolean => state.isSaving,
  currentUser: (state: UserState): Member | null => state.currentUser,
  registrationError: (state: UserState): string | null => state.registrationError,
  hasRegistrationError: (state: UserState): boolean => state.registrationError !== null && state.registrationError.length > 0,
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
  SET_REGISTRATION_ERROR(state: UserState, value: string | null): void {
    state.registrationError = value;
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

  async register({ commit, dispatch, state }: CommitDispatchStateFunction<UserState>): Promise<void> {
    commit('SET_IS_SAVING', true);

    // TODO: Possibly move validation here...

    try {
      if (state.register) {
        await UserService.create(state.register);
      }
    } catch (error) {
      commit('SET_REGISTRATION_ERROR', 'There was an error with your registration. Try again.');
      throw new Error('Error registering member');
    }

    commit('SET_IS_SAVING', false);
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
