<template>
  <div class="activities">
    <div class="heading d-flex justify-content-between">
      <h3>Activities</h3>
      <b-button variant="success" size="sm" @click="showAddRecord">Add Record</b-button>
    </div>

    <p class="text-muted">A log of the activities you've completed so far towards this requirement.</p>

    <div class="list-group list-group-flush activity-list">

      <b-skeleton-wrapper :loading="isLoading">
        <template #loading>
          <b-skeleton width="45%"></b-skeleton>
          <b-skeleton width="65%"></b-skeleton>
          <b-skeleton width="20%"></b-skeleton>
        </template>

        <div class="list-group-item" v-for="activity in records" :key="activity.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ activity.description }}</h5>
            <small>{{ activity.date }}</small>
          </div>
          <p class="mb-1">
            {{ activity.comments }}
          </p>
          <p class="mb-1 actions">
            <b-button variant="link" size="sm" @click="editRecord(activity.id)">Edit</b-button>
            <b-button variant="link" size="sm" @click="deleteRecord(activity.id)">Delete</b-button>
          </p>
        </div>
      </b-skeleton-wrapper>

    </div>

    <b-modal v-model="isEditing" hide-footer no-close-on-backdrop size="lg" title="Add Activity Record">
      <activity-editor />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import ActivityEditor from './ActivityEditor.vue';

export default Vue.extend({
  props: {
    achievementId: {
      required: true,
    },
    requirementId: {
      required: true,
    },
  },
  components: {
    ActivityEditor,
  },
  computed: {
    ...mapGetters('activityRecords', [
      'isLoading',
      'records',
    ]),
    ...mapFields('activityRecords', [
      'isEditing',
    ]),
  },
  watch: {
    achievementId: 'refresh',
    requirementId: 'refresh',
  },
  async created() {
    await this.refresh();
  },
  methods: {
    ...mapActions('activityRecords', [
      'loadActivityRecords',
      'addRecord',
      'editRecord',
      'deleteRecord',
    ]),

    showAddRecord() {
      this.addRecord({
        achievementId: this.achievementId,
        requirementId: this.requirementId,
      });
    },

    async refresh() {
      await this.loadActivityRecords({ achievementId: this.achievementId, requirementId: this.requirementId });
    },
  },
});
</script>
