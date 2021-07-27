export default class Requirement {
  public id = 0;

  public componentId = 0;

  public name = '';
  public description = '';

  public validatorTypeName = '';
  public validationParameters: any | null = null;

  public type = 0;

  public minCount: number | null = 0;
  public maxCount: number | null = 0;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
