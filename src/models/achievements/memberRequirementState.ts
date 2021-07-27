export default class MemberRequirementState {
  public id = 0;

  public memberId = 0;
  public requirementId = 0;

  public updatedOn = '';

  public data: any | null = null;

  public isValid = false;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      // if (input.data) {
      //   console.log(this.data, input.data);
      //   this.data = JSON.parse(input.data);
      // }
    }
  }
}

export class UpdateMemberRequirementState {
  public memberId = 0;
  public requirementId = 0;

  public data: any | null = null;
}
