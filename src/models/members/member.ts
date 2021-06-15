export default class Member {
  public id = 0;

  public firstName = '';
  public lastName = '';

  public status = 0;
  public joinedOn = '';

  public emailAddress = '';

  public dateOfBirth = '';

  public countryId = 0;
  public stateProvinceId = 0;

  public address = '';
  public address2 = '';
  public city = '';
  public postalCode = '';

  public phoneNumber = '';

  public regionId = 0;
  public divisionId = 0;

  public showInDirectory = false;

  public biography = '';
  public interests = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class SimpleMember {
  public id = 0;

  public firstName = '';
  public lastName = '';

  public status = 0;
  public joinedOn = '';

  public emailAddress = '';

  public dateOfBirth = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
