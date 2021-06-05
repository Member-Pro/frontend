import api from './apiBaseService';
import Member from '@/models/members/member';

export default {
  async getCurrentMember(): Promise<Member> {
    const response = await api.get('user/current');

    const member = new Member(response.data);
    return member;
  },

  async update(member: Member): Promise<void> {
    await api.put('user', member);
  },
};
