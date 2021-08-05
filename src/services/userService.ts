import api from './apiBaseService';
import Member, { RegisterMember } from '@/models/members/member';

export default {
  async getCurrentMember(): Promise<Member> {
    const response = await api.get('user/current');

    const member = new Member(response.data);
    return member;
  },

  async create(member: RegisterMember): Promise<Member> {
    const response = await api.post('user', member);

    const newMember = new Member(response.data);
    return newMember;
  },

  async update(member: Member): Promise<void> {
    await api.put('user', member);
  },
};
