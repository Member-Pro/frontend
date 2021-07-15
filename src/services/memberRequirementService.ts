import api from './apiBaseService';
import MemberRequirementState from '@/models/achievements/memberRequirementState';

export default {
  async getUserRequirementStatesForAchievement(achievementId: number): Promise<MemberRequirementState[]> {
    const url = `/achievements/${achievementId}/state`;

    const response = await api.get(url);
    const states = response.data.map((x: any) => new MemberRequirementState(x));
    return states;
  },
}
