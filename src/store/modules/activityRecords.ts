import { getField, updateField } from 'vuex-map-fields';
import ActivityRecord from '@/models/achievements/activityRecord';
import activityRecordService from '@/services/activityRecordService';
import { addErrorToast, addSuccessToast, CommitDispatchStateFunction, CommitFunction, CommitStateFunction } from '../common';

interface ActivityRecordsState {
  isLoading: boolean;
  records: ActivityRecord[];
  isEditing: boolean;
  editingRecord: ActivityRecord;
}

const state: ActivityRecordsState = {
  isLoading: false,
  records: [],
  isEditing: false,
  editingRecord: new ActivityRecord(),
};

const getters = {
  getField,

  isLoading: (state: ActivityRecordsState) => state.isLoading,
  records: (state: ActivityRecordsState) => state.records,
};

const mutations = {
  updateField,

  SET_IS_LOADING(state: ActivityRecordsState, value: boolean): void {
    state.isLoading = value;
  },
  SET_ACTIVITY_RECORDS(state: ActivityRecordsState, value: ActivityRecord[]): void {
    state.records = value;
  },
  ADD_ACTIVITY_RECORD(state: ActivityRecordsState, value: ActivityRecord): void {
    state.records = [ ...state.records, value ];
  },
  REMOVE_ACTIVITY_RECORD(state: ActivityRecordsState, value: ActivityRecord): void {
    state.records = state.records.filter(x => x.id !== value.id);
  },
  SET_IS_EDITING(state: ActivityRecordsState, value: boolean): void {
    state.isEditing = value;
  },
  SET_EDITING_RECORD(state: ActivityRecordsState, value: ActivityRecord): void {
    state.editingRecord = value;
  },
};

const actions = {
  async loadActivityRecords({ commit }: CommitFunction,
    { achievementId, requirementId } : { achievementId: number, requirementId: number }): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const records = await activityRecordService.getByAchievementForCurrentUser(achievementId, requirementId);
      commit('SET_ACTIVITY_RECORDS', records);
    } catch {
      addErrorToast('There was an error loading your activity records. Try again.');
    }

    commit('SET_IS_LOADING', false);
  },

  addRecord({ commit }: CommitFunction, { achievementId, requirementId } : { achievementId: number, requirementId: number }): void {
    const newRecord = new ActivityRecord();
    newRecord.achievementId = achievementId;
    newRecord.requirementId = requirementId;

    commit('SET_EDITING_RECORD', newRecord);
    commit('SET_IS_EDITING', true);
  },

  editRecord({ commit, state }: CommitStateFunction<ActivityRecordsState>, recordId: number): void {
    const record = state.records.find(x => x.id === recordId);
    console.log('edit record', recordId, record);

    if (record) {
      commit('SET_EDITING_RECORD', record);
      commit('SET_IS_EDITING', true);
    }
  },

  async saveRecord({ commit, dispatch, state }: CommitDispatchStateFunction<ActivityRecordsState>): Promise<void> {
    try {
      if (state.editingRecord.id === 0) {
        // adding new record
        const newRecord = await activityRecordService.create(state.editingRecord);
        commit('ADD_ACTIVITY_RECORD', newRecord);
        addSuccessToast('The activity record has been added.');
      } else {
        // editing record
        await activityRecordService.update(state.editingRecord);
        addSuccessToast('The activity record has been updated.');
      }

      dispatch('resetEditing');
    } catch {
      addErrorToast('There was an error saving the activity record. Try again.');
    }
  },

  async deleteRecord({ commit, state }: CommitStateFunction<ActivityRecordsState>, recordId: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this activity record?')) {
      return;
    }

    try {
      const record = state.records.find(x => x.id === recordId);
      if (record) {
        await activityRecordService.delete(record);
        commit('REMOVE_ACTIVITY_RECORD', record);
        addSuccessToast('The activity record has been deleted.');
      }
    } catch {
      addErrorToast('There was an error deleting the activity.');
    }
  },

  resetEditing({ commit }: CommitFunction): void {
    commit('SET_IS_EDITING', false);
    commit('SET_EDITING_RECORD', new ActivityRecord());
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
