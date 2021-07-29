<template>
  <div class="toggle-track-achievement">
    <template v-if="isFavorited">
      <b-button variant="outline-danger" size="sm" @click="unfavoriteAchievement" title="Remove this achievement from your favorites">
        <b-icon-bookmark-dash-fill /> Remove Favorite
      </b-button>
    </template>
    <template v-else>
      <b-button variant="outline-success" size="sm" @click.prevent="favoriteAchievement" title="Add this achievement as a favorite">
        <b-icon-bookmark-plus-fill /> Favorite Achievement
      </b-button>
    </template>
    &nbsp;
    <b-button
      size="sm"
      variant="outline-secondary"
      :to="{name: 'achievementTracker', params: { achievementId: achievementId } }"
    >
      Progress Tracker
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { CreateFavoriteAchievement } from '@/models/members/favoriteAchievement';

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
      'favoriteAchievementIds',
    ]),

    isFavorited(): boolean {
      return this.favoriteAchievementIds.includes(this.achievementId);
    },
  },
  methods: {
    ...mapActions('memberAchievements', [
      'createFavoriteAchievement',
      'deleteFavoriteAchievement',
    ]),

    async favoriteAchievement(): Promise<void> {
      const ta = new CreateFavoriteAchievement();
      ta.achievementId = this.achievementId;

      await this.createFavoriteAchievement(ta);
    },

    async unfavoriteAchievement(): Promise<void> {
      await this.deleteFavoriteAchievement(this.achievementId);
    },
  },
});
</script>
