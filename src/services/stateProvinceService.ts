import api from './apiBaseService';
import StateProvince from '@/models/geography/stateProvince';

export default {
  async getAll(): Promise<StateProvince[]> {
    const response = await api.get('stateProvinces');

    const stateProvinces = response.data.map((x: any) => new StateProvince(x));
    return stateProvinces;
  },
}
