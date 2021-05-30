import Country from '@/models/geography/country';
import StateProvince from '@/models/geography/stateProvince';
import CountryService from '@/services/countryService';
import StateProvinceService from '@/services/stateProvinceService';

interface GeographyState {
  countries: Country[];
  stateProvinces: StateProvince[];
}

const state: GeographyState = {
  countries: [],
  stateProvinces: [],
};

const getters = {
  countries: (state: GeographyState): Country[] => state.countries,
  stateProvinces: (state: GeographyState): StateProvince[] => state.stateProvinces,
};

const mutations = {
  SET_COUNTRIES(state: GeographyState, value: Country[]): void {
    state.countries = value;
  },

  SET_STATE_PROVINCES(state: GeographyState, value: StateProvince[]): void {
    state.stateProvinces = value;
  },
};

const actions = {
  async loadCountries({ commit }: { commit: any }): Promise<void> {
    const countries = await CountryService.getAll();
    commit('SET_COUNTRIES', countries);
  },
  async loadStateProvinces({ commit }: { commit: any }): Promise<void> {
    const states = await StateProvinceService.getAll();
    commit('SET_STATE_PROVINCES', states);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
