import api from './apiBaseService';
import MemberRequirementState, { UpdateMemberRequirementState } from '@/models/achievements/memberRequirementState';

export default {
  async getUserRequirementStatesForAchievement(achievementId: number): Promise<MemberRequirementState[]> {
    const url = `/achievements/${achievementId}/state`;

    const response = await api.get(url);
    const states = response.data.map((x: any) => new MemberRequirementState(x));
    return states;
  },

  async updateRequirementState(model: UpdateMemberRequirementState): Promise<MemberRequirementState> {
    const url = `/requirements/${model.requirementId}/state`;

    const response = await api.put(url, model);
    const data = new MemberRequirementState(response.data);
    return data;
  },
};
