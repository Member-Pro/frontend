import Member from '@/models/members/member';
import memberService from '@/services/memberService';
import { addErrorToast, CommitFunction } from '../common';

interface MemberState {
  isLoading: boolean;
  currentMember: Member | null;
  members: Member[];
}

const state: MemberState = {
  isLoading: false,
  currentMember: new Member(),
  members: [],
};

const getters = {
  isLoading: (state: MemberState): boolean => state.isLoading,
  currentMember: (state: MemberState): Member | null => state.currentMember,
  members: (state: MemberState): Member[] => state.members,
};

const mutations = {
  SET_IS_LOADING(state: MemberState, value: boolean): void {
    state.isLoading = value;
  },

  SET_CURRENT_MEMBER(state: MemberState, value: Member | null): void {
    state.currentMember = value;
  },

  SET_MEMBERS(state: MemberState, value: Member[]): void {
    state.members = value;
  },
};

const actions = {
  async loadMembers({ commit }: CommitFunction): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const members = await memberService.getMembers();
      commit('SET_MEMBERS', members);
    } catch {
      addErrorToast('There was an error loading the members.');
    }

    commit('SET_IS_LOADING', false);
  },

  async loadMember({ commit }: CommitFunction, memberId: number): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      // const members = await memberService.
      const member = await memberService.findById(memberId);
      commit('SET_CURRENT_MEMBER', member);
    } catch {
      addErrorToast('There was an error loading the member.');
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
