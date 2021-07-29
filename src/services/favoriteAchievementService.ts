import api from './apiBaseService';
import FavoriteAchievement, { CreateFavoriteAchievement } from '@/models/members/favoriteAchievement';

export default {
  async findById(id: number): Promise<FavoriteAchievement> {
    const response = await api.get(`achievements/favorites/${id}`);

    const achievement = new FavoriteAchievement(response.data);
    return achievement;
  },

  async getForCurrentUser(): Promise<FavoriteAchievement[]> {
    const response = await api.get('achievements/favorites');

    const achievements = response.data.map((x: any) => new FavoriteAchievement(x));
    return achievements;
  },

  async create(favoriteAchievement: CreateFavoriteAchievement): Promise<FavoriteAchievement> {
    const response = await api.post('achievements/favorites', favoriteAchievement);

    const achievement = new FavoriteAchievement(response.data);
    return achievement;
  },

  async update(favoriteAchievement: FavoriteAchievement): Promise<void> {
    await api.put(`achievements/favorites/${favoriteAchievement.id}`, favoriteAchievement);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`achievements/favorites/${id}`);
  },
};
