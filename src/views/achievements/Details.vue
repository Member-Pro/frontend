<template>
  <div class="achievement-details">
    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

      <template v-if="currentAchievement">
        <div class="d-flex justify-content-between align-items-baseline">
          <h1>
            {{ currentAchievement.name }}
          </h1>

          <track-achievement-toggle :achievementId="currentAchievement.id" />
        </div>

        <div class="description my-2">
          {{ currentAchievement.description }}
        </div>

        <div class="requirements my-2">
          <h3>Steps/Requirements</h3>

          <ol class="requirement-list">
            <li v-for="step in currentAchievementSteps" :key="step.id">
              {{ step.name }}
            </li>
          </ol>
        </div>
      </template>
    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import TrackAchievementToggle from '@/components/achievements/TrackAchievementToggle.vue';

export default Vue.extend({
  components: { TrackAchievementToggle },
  props: {
    achievementId: {
      required: true,
    },
  },
  computed: {
    ...mapGetters('achievements', [
      'isLoading',
      'currentAchievement',
      'currentAchievementSteps',
    ]),
  },
  async created() {
    await this.refreshView();
    await this.loadTrackedAchievements();
  },
  watch: {
    achievementId: 'refreshView',
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievement',
    ]),
    ...mapActions('memberAchievements', [
      'loadTrackedAchievements',
    ]),

    async refreshView() {
      this.loadAchievement(this.achievementId);
    },
  },
});
</script>
