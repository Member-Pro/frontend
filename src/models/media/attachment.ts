import { SimpleMember } from '../members/member';

export default class Attachment {
  public id = 0;

  public owner: SimpleMember | null = null;

  public objectType = '';
  public objectId = 0;

  public mediaType = '';

  public fileName = '';
  public fileSize = 0;
  public contentType = '';

  public description = '';
  public createdOn = '';

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.owner = new SimpleMember(data.owner);
    }
  }
}

export class UploadAttachment {
  public objectType = '';
  public objectId = 0;

  public file: File | null = null;
}
