import api from './apiBaseService';
import Achievement from '@/models/achievements/achievement';

export default {
  async findById(id: number): Promise<Achievement> {
    const response = await api.get(`achievements/${id}`);

    const achievement = new Achievement(response.data);
    return achievement;
  },

  async getAll(): Promise<Achievement[]> {
    const response = await api.get('achievements');

    const achievements = response.data.map((x: any) => new Achievement(x));
    return achievements;
  },
};
