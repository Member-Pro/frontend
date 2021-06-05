import api from './apiBaseService';
import Region from '@/models/geography/region';

export default {
  async getAll(): Promise<Region[]> {
    const response = await api.get('regions');

    const regions = response.data.map((x: any) => new Region(x));
    return regions;
  },
}
