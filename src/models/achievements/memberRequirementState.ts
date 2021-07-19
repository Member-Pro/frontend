export default class MemberRequirementState {
  public memberId = 0;
  public requirementId = 0;

  public updatedOn = '';

  public data: any | null = null;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);

      if (data.data) {
        this.data = JSON.parse(data.data);
      }
    }
  }
}

export class UpdateMemberRequirementState {
  public memberId = 0;
  public requirementId = 0;

  public data: any | null = null;
}
