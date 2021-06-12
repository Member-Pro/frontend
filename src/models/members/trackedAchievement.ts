import Achievement from '../achievements/achievement';

export default class TrackedAchievement {
  public id = 0;

  public memberId = 0;

  public achievementId = 0;
  public achievement: Achievement | null = null;

  public notes: string | null = null;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.achievement = new Achievement(data.achievement);
    }
  }
}

export class CreateTrackedAchievement {
  public memberId = 0;
  public achievementId = 0;
  public notes: string | null = null;
}
