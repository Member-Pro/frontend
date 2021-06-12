<template>
  <div>
    <h1>Achievements</h1>

    <p class="intro">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
      a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
      of Lorem Ipsum.
    </p>

    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

      <div class="achievement-list">
        <achievement-row
          v-for="achievement in achievements"
          :key="achievement.id"
          :achievement="achievement"
        />
      </div>
    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AchievementRow from '@/components/achievements/AchievementRow.vue';

export default Vue.extend({
  components: {
    AchievementRow,
  },
  computed: {
    ...mapGetters('achievements', [
      'isLoading',
      'achievements',
    ]),
  },
  async created() {
    await this.loadAchievements();
    await this.loadTrackedAchievements();
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievements',
    ]),
    ...mapActions('memberAchievements', [
      'loadTrackedAchievements',
    ]),
  },
});
</script>
