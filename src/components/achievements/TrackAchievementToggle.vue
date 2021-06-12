<template>
  <div class="toggle-track-achievement">
    <template v-if="isUserTracking">
      <b-button variant="outline-danger" size="sm" @click="stopTrackingAchievement" title="Stop tracking this achievement">
        <b-icon-bookmark-dash-fill /> Stop Tracking
      </b-button>
    </template>
    <template v-else>
      <b-button variant="outline-success" size="sm" @click.prevent="trackAchievement" title="Start tracking this achievement">
        <b-icon-bookmark-plus-fill /> Track Achievement
      </b-button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { CreateTrackedAchievement } from '@/models/members/trackedAchievement';

export default Vue.extend({
  props: {
    achievementId: {
      type: Number,
      required: true,
    },
  },
  data(): any {
    return {

    };
  },
  computed: {
    ...mapGetters('memberAchievements', [
      'trackedAchievementIds',
    ]),

    isUserTracking(): boolean {
      return this.trackedAchievementIds.includes(this.achievementId);
    },
  },
  methods: {
    ...mapActions('memberAchievements', [
      'createTrackedAchievement',
      'deleteTrackedAchievement',
    ]),

    async trackAchievement(): Promise<void> {
      const ta = new CreateTrackedAchievement();
      ta.achievementId = this.achievementId;

      await this.createTrackedAchievement(ta);
    },

    async stopTrackingAchievement(): Promise<void> {
      await this.deleteTrackedAchievement(this.achievementId);
    },
  },
});
</script>
