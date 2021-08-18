import api from './apiBaseService';
import Attachment, { UploadAttachment } from '@/models/media/attachment';
import { objectToQueryString } from '@/helpers';

export default {
  async findById(id: number): Promise<Attachment> {
    const response = await api.get(`attachments/${id}`);

    const attachment = new Attachment(response.data);
    return attachment;
  },

  async getAll(): Promise<Attachment[]> {
    const url = '/attachments';

    const response = await api.get(url);
    const attachments = response.data.map((x: any) => new Attachment(x));
    return attachments;
  },

  async search(objectType: string, objectId: number): Promise<Attachment[]> {
    const query = objectToQueryString({ objectType, objectId });
    const url = `/attachments?${query}`;

    const response = await api.get(url);
    const attachments = response.data.map((x: any) => new Attachment(x));
    return attachments;
  },

  async upload(upload: UploadAttachment): Promise<Attachment> {
    if (!upload.file) {
      throw new Error('No file specified to upload.');
    }

    const formData = new FormData();
    formData.append('objectType', upload.objectType);
    formData.append('objectId', upload.objectId.toString());

    formData.append('file', upload.file, upload.file.name);

    const response = await api.post('attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const attachment = new Attachment(response.data);
    return attachment;
  },
};
