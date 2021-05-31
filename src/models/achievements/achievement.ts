export default class Achievement {
  public id = 0;

  public name = '';
  public description = '';

  public infoUrl = '';
  public imageFilename = '';

  public isDisabled = false;

  public createdOn = '';
  public updatedOn = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
