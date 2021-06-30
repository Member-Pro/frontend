<template>
  <div class="activity-editor">
    <b-form @submit.prevent="saveRecord">
      <div class="form-row">
        <b-form-group label-for="activity-date" label="Date" class="col-md-3">
          <b-form-datepicker
            id="activity-date"
            v-model="activityDate"
            hide-header
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" />
        </b-form-group>

        <b-form-group label-for="activity-description" label="Description" class="col-md-6">
          <b-form-input id="activity-description" v-model="description" />
        </b-form-group>

        <b-form-group label-for="activity-quantity" label="Amount *" class="col-md-3">
          <b-form-input id="activity-quantity" type="number" v-model="quantityCompleted" no-wheel />
        </b-form-group>
      </div>

      <b-form-group label-for="activity-comments" label="Comments">
        <b-form-textarea id="activity-comments" rows="3" v-model="comments" />
      </b-form-group>

      <p class="text-muted">
        * Amount refers to the number of hours or number of items completed during this activity.
      </p>
      <b-button type="submit" variant="primary">Save Activity</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default Vue.extend({
  computed: {
    ...mapFields('activityRecords', [
      'editingRecord.id',
      'editingRecord.activityDate',
      'editingRecord.description',
      'editingRecord.quantityCompleted',
      'editingRecord.comments',
    ]),
  },
  methods: {
    ...mapActions('activityRecords', [
      'saveRecord',
    ]),
  },
});
</script>
