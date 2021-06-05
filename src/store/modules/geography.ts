import Country from '@/models/geography/country';
import Division from '@/models/geography/division';
import Region from '@/models/geography/region';
import StateProvince from '@/models/geography/stateProvince';
import CountryService from '@/services/countryService';
import divisionService from '@/services/divisionService';
import regionService from '@/services/regionService';
import StateProvinceService from '@/services/stateProvinceService';

interface GeographyState {
  isLoadingCountries: boolean;
  countries: Country[];
  isLoadingStateProvinces: boolean;
  stateProvinces: StateProvince[];

  isLoadingRegions: boolean;
  regions: Region[];
  isLoadingDivisions: boolean;
  divisions: Division[];
}

const state: GeographyState = {
  isLoadingCountries: false,
  countries: [],
  isLoadingStateProvinces: false,
  stateProvinces: [],

  isLoadingRegions: false,
  regions: [],
  isLoadingDivisions: false,
  divisions: [],
};

const getters = {
  isLoadingCountries: (state: GeographyState): boolean => state.isLoadingCountries,
  countries: (state: GeographyState): Country[] => state.countries,
  isLoadingStateProvinces: (state: GeographyState): boolean => state.isLoadingStateProvinces,
  stateProvinces: (state: GeographyState): StateProvince[] => state.stateProvinces,

  isLoadingRegions: (state: GeographyState): boolean => state.isLoadingRegions,
  regions: (state: GeographyState): Region[] => state.regions,
  isLoadingDivisions: (state: GeographyState): boolean => state.isLoadingDivisions,
  divisions: (state: GeographyState): Region[] => state.divisions,
};

const mutations = {
  SET_IS_LOADING_COUNTRIES(state: GeographyState, value: boolean): void {
    state.isLoadingCountries = value;
  },
  SET_COUNTRIES(state: GeographyState, value: Country[]): void {
    state.countries = value;
  },
  SET_IS_LOADING_STATEPROVINCES(state: GeographyState, value: boolean): void {
    state.isLoadingStateProvinces = value;
  },
  SET_STATE_PROVINCES(state: GeographyState, value: StateProvince[]): void {
    state.stateProvinces = value;
  },

  SET_IS_LOADING_REGIONS(state: GeographyState, value: boolean): void {
    state.isLoadingRegions = value;
  },
  SET_REGIONS(state: GeographyState, value: Region[]): void {
    state.regions = value;
  },
  SET_IS_LOADING_DIVISIONS(state: GeographyState, value: boolean): void {
    state.isLoadingDivisions = value;
  },
  SET_DIVISIONS(state: GeographyState, value: Division[]): void {
    state.divisions = value;
  },
};

const actions = {
  async loadCountries({ commit }: { commit: any }): Promise<void> {
    commit('SET_IS_LOADING_COUNTRIES', true);

    const countries = await CountryService.getAll();
    commit('SET_COUNTRIES', countries);

    commit('SET_IS_LOADING_COUNTRIES', false);
  },
  async loadStateProvinces({ commit }: { commit: any }, countryId: number): Promise<void> {
    commit('SET_IS_LOADING_STATEPROVINCES', true);

    const states = await StateProvinceService.getByCountryId(countryId);
    commit('SET_STATE_PROVINCES', states);

    commit('SET_IS_LOADING_STATEPROVINCES', false);
  },

  async loadRegions({ commit }: { commit: any }): Promise<void> {
    commit('SET_IS_LOADING_REGIONS', true);

    const regions = await regionService.getAll();
    commit('SET_REGIONS', regions);

    commit('SET_IS_LOADING_REGIONS', false);
  },
  async loadDivisions({ commit }: { commit: any }, regionId: number): Promise<void> {
    commit('SET_IS_LOADING_DIVISIONS', true);

    const divisions = await divisionService.getByRegionId(regionId);
    commit('SET_DIVISIONS', divisions);

    commit('SET_IS_LOADING_DIVISIONS', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
