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
        <h1>
          {{ currentAchievement.name }}
        </h1>

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

export default Vue.extend({
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
  },
  watch: {
    achievementId: 'refreshView',
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievement',
    ]),

    async refreshView() {
      this.loadAchievement(this.achievementId);
    },
  },
});
</script>
