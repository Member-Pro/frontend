import api from './apiBaseService';
import ActivityRecord from '@/models/achievements/activityRecord';

export default {
  async findById(achievementId: number, id: number): Promise<ActivityRecord> {
    const response = await api.get(`achievements/${achievementId}/activities/${id}`);

    const record = new ActivityRecord(response.data);
    return record;
  },

  async getByAchievementForCurrentUser(achievementId: number, requirementId?: number): Promise<ActivityRecord[]> {
    let url = `achievements/${achievementId}/activities`;
    if (requirementId) {
      url = `${url}?requirementId=${requirementId}`;
    }

    const response = await api.get(url);

    const records = response.data.map((x: any) => new ActivityRecord(x));
    return records;
  },

  async create(activity: ActivityRecord): Promise<ActivityRecord> {
    const url = `achievements/${activity.achievementId}/activities`;

    const respoonse = await api.post(url, activity);
    return new ActivityRecord(respoonse.data);
  },

  async update(activity: ActivityRecord): Promise<void> {
    const url = `achievements/${activity.achievementId}/activities/${activity.id}`;

    await api.put(url, activity);
  },

  async delete(activity: ActivityRecord): Promise<void> {
    const url = `achievements/${activity.achievementId}/activities/${activity.id}`;

    await api.delete(url);
  },
};
