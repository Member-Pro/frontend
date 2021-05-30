import Country from './country';

export default class StateProvince {
  public id = 0;

  public country: Country | null = null;

  public name = '';
  public abbreviation = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
