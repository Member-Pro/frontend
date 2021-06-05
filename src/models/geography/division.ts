import Region from './region';

export default class Division {
  public id = 0;

  public region: Region | null = null;

  public name = '';
  public abbreviation = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      this.region = new Region(data.region);
    }
  }
}
