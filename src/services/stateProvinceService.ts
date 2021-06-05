import api from './apiBaseService';
import StateProvince from '@/models/geography/stateProvince';

export default {
  async getByCountryId(countryId: number): Promise<StateProvince[]> {
    const response = await api.get(`countries/${countryId}/states`);

    const stateProvinces = response.data.map((x: any) => new StateProvince(x));
    return stateProvinces;
  },
};
