<template>
  <div class="achievement">
    <div class="img">
      <img src="https://via.placeholder.com/140x100" :alt="achievement.name">
    </div>

    <div class="info">
      <h4>
        <router-link :to="{name: 'achievementDetails', params: { achievementId: achievement.id } }">
          {{ achievement.name }}
        </router-link>
      </h4>
      <p class="description">
        {{ achievement.description }}
      </p>

      <track-achievement-toggle :achievementId="achievement.id" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TrackAchievementToggle from './TrackAchievementToggle.vue';

export default Vue.extend({
  components: { TrackAchievementToggle },
  props: {
    achievement: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.achievement {
  display: flex;
  flex-flow: row;
  margin-bottom: 1rem;

  .img {
    width: 15%;
  }
  .info {
    width: 85%;
  }
}
</style>
