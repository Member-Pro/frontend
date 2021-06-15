import Member from '@/models/members/member';
import api from './apiBaseService';

export default {
  async findById(id: number): Promise<Member> {
    const response = await api.get(`/members/${id}`);

    const achievement = new Member(response.data);
    return achievement;
  },

  async getMembers(): Promise<Member[]> {
    const response = await api.get('members');

    const members = response.data.map((x: any) => new Member(x));
    return members;
  },
};
