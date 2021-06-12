import api from './apiBaseService';
import TrackedAchievement, { CreateTrackedAchievement } from '@/models/members/trackedAchievement';

export default {
  async findById(id: number): Promise<TrackedAchievement> {
    const response = await api.get(`tracked-achievements/${id}`);

    const achievement = new TrackedAchievement(response.data);
    return achievement;
  },

  async getForCurrentUser(): Promise<TrackedAchievement[]> {
    const response = await api.get('tracked-achievements');

    const achievements = response.data.map((x: any) => new TrackedAchievement(x));
    return achievements;
  },

  async create(trackedAchievement: CreateTrackedAchievement): Promise<TrackedAchievement> {
    const response = await api.post('tracked-achievements', trackedAchievement);

    const achievement = new TrackedAchievement(response.data);
    return achievement;
  },

  async update(trackedAchievement: TrackedAchievement): Promise<void> {
    await api.put(`tracked-achievements/${trackedAchievement.id}`, trackedAchievement);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`tracked-achievements/${id}`);
  },
};
