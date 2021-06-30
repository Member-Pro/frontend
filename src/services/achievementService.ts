import api from './apiBaseService';
import Achievement from '@/models/achievements/achievement';
import AchievementStep from '@/models/achievements/achievementStep';

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

  async getStepsForAchievement(achievementId: number): Promise<AchievementStep> {
    const response = await api.get(`achievements/${achievementId}/requirements`);

    const steps = response.data.map((x: any) => new AchievementStep(x));
    return steps;
  },
};
