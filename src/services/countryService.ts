import api from './apiBaseService';
import Country from '@/models/geography/country';

export default {
  async getAll(): Promise<Country[]> {
    const response = await api.get('countries');

    const countries = response.data.map((x: any) => new Country(x));
    return countries;
  },
}
