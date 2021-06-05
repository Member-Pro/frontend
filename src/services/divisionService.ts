import api from './apiBaseService';
import Division from '@/models/geography/division';

export default {
  async getByRegionId(regionId: number): Promise<Division[]> {
    const response = await api.get(`regions/${regionId}/divisions`);

    const divisions = response.data.map((x: any) => new Division(x));
    return divisions;
  },
}
