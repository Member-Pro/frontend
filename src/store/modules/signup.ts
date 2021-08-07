import { getField, updateField } from 'vuex-map-fields';
import Auth from '@aws-amplify/auth';
import { RegisterMember, VerifyEmail } from '@/models/members/member';
import UserService from '@/services/userService';
import { CommitStateFunction } from '../common';

interface SignupState {
  isSaving: boolean;
  user: RegisterMember;
  error: string | null;
  verifyEmail: VerifyEmail;
}

const state: SignupState = {
  isSaving: false,
  user: new RegisterMember(),
  error: null,
  verifyEmail: new VerifyEmail(),
};

const getters = {
  getField,

  isSaving: (state: SignupState): boolean => state.isSaving,
  error: (state: SignupState): string | null => state.error,
  hasError: (state: SignupState): boolean => state.error !== null && state.error.length > 0,
};

const mutations = {
  updateField,

  SET_IS_SAVING(state: SignupState, value: boolean): void {
    state.isSaving = value;
  },
  SET_ERROR(state: SignupState, value: string | null): void {
    state.error = value;
  },
  SET_VERIFY_EMAIL(state: SignupState, email: string): void {
    const model = new VerifyEmail();
    model.emailAddress = email;
    state.verifyEmail = model;
  },
};

const actions = {
  async register({ commit, state }: CommitStateFunction<SignupState>): Promise<void> {
    commit('SET_IS_SAVING', true);

    // TODO: Possibly move validation here...

    try {
      if (state.user) {
        await UserService.create(state.user);

        commit('SET_VERIFY_EMAIL', state.user.emailAddress);
      }
    } catch (error) {
      commit('SET_ERROR', 'There was an error with your registration. Try again.');
      throw new Error('Error registering member');
    }

    commit('SET_IS_SAVING', false);
  },

  async verifyEmail({ commit, state }: CommitStateFunction<SignupState>): Promise<void> {
    try {
      await Auth.confirmSignUp(state.verifyEmail.emailAddress, state.verifyEmail.code);
    } catch (err) {
      throw new Error('Error verifying email address ' + err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
