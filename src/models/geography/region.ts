export default class Region {
  public id = 0;
  public name = '';
  public abbreviation = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
