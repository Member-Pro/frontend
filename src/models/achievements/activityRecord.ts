import Achievement from './achievement';
import AchievementStep from './achievementStep';

/** Represents an achievement activity record */
export default class ActivityRecord {
  public id = 0;

  public achievementId = 0;
  public achievement: Achievement | null = null;

  public requirementId = 0;
  public requirement: AchievementStep | null = null;

  public memberId = 0;

  public activityDate = '';

  public description = '';

  public quantityCompleted: number | null = null;

  public comments = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.achievement = new Achievement(data.achievement);
      this.requirement = new AchievementStep(data.requirement);
    }
  }
}
