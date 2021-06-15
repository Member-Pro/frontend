import MemberAchievement from '@/models/members/memberAchievement';
import api from './apiBaseService';

export default {
  async findById(memberId: number, id: number): Promise<MemberAchievement> {
    const response = await api.get(`/members/${memberId}/achievements/${id}`);

    const achievement = new MemberAchievement(response.data);
    return achievement;
  },

  async getByMemberId(memberId: number): Promise<MemberAchievement[]> {
    const response = await api.get(`/members/${memberId}/achievements`);

    const achievements = response.data.map((x: any) => new MemberAchievement(x));
    return achievements;
  },
};
