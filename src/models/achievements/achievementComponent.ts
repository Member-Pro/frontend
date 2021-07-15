import Requirement from './requirement';

export default class AchievementComponent {
  public id = 0;

  public name = '';
  public description = '';

  public isDisabled = false;

  public createdOn = '';
  public updatedOn = '';

  public requirements: Requirement[] = [];

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
