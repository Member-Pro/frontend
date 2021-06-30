<template>
  <div class="achievement-tracker">
    <template v-if="currentAchievement">
      <h1>{{ currentAchievement.name }} Tracking {{requirementId}}</h1>

      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <router-link :to="{ name: 'achievementTracker', params: { achievementId, requirementId: step.id } }"  class="list-group-item list-group-item-action" :class="{ active: requirementId == step.id }" v-for="step in currentAchievementSteps" :key="step.id">
              {{ step.name }}
            </router-link>
          </div>
        </div>
        <div class="col-md-8">
          <div class="requirement-section my-2">
            <tasks />
          </div>

          <hr />

          <div class="requirement-section my-2">
            <activities :achievementId="achievementId" :requirementId="requirementId" />
          </div>

          <hr />

          <div class="requirement-section my-2">
            <h3>Attachments</h3>
            <p class="text-muted">Photos and other documentation to support your documentation.</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Activities from '@/components/achievementTracking/Activities.vue';
import Tasks from '@/components/achievementTracking/Tasks.vue';

export default Vue.extend({
  components: {
    Activities,
    Tasks,
  },
  props: {
    achievementId: {
      required: true,
    },
    requirementId: {
      required: false,
    },
  },
  computed: {
    ...mapGetters('achievements', [
      'currentAchievement',
      'currentAchievementSteps',
    ]),
  },
  watch: {
    achievementId: 'refresh',
  },
  async created() {
    await this.refresh();
    console.log('requirementId', this.requirementId);
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievement',
    ]),

    async refresh() {
      await this.loadAchievement(this.achievementId);
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
