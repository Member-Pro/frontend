import Achievement from './achievement';

export default class AchievementStep {
  public id = 0;

  public achievement: Achievement | null = null;

  public name = '';
  public description = '';

  public isRequired = false;
  public minimumCount = 0;

  public isDisabled = false;

  public createdOn = '';
  public updatedOn = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
