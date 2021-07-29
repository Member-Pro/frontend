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

    <div class="filters my-2 d-flex justify-content-between">
      <div>
        <b-form-group label-for="viewType" label="Display Achievements" label-sr-only class="my-0">
          <b-select id="viewType" v-model="viewType">
            <b-select-option value="all">All Achievements</b-select-option>
            <b-select-option value="favorite">Favorite Achievements</b-select-option>
          </b-select>
        </b-form-group>
      </div>
    </div>

    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

      <div class="achievement-list">
        <achievement-row
          v-for="achievement in displayAchievements"
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
import Achievement from '@/models/achievements/achievement';

export default Vue.extend({
  components: {
    AchievementRow,
  },
  data(): any {
    return {
      viewType: 'all',
    };
  },
  computed: {
    ...mapGetters('achievements', [
      'isLoading',
      'achievements',
    ]),
    ...mapGetters('memberAchievements', [
      'favoriteAchievementIds',
    ]),
    displayAchievements: function(): Achievement[] {
      if (this.viewType === 'all') {
        return this.achievements;
      }

      return this.achievements.filter((x: Achievement) => this.favoriteAchievementIds.includes(x.id));
    },
  },
  watch: {
    viewType: 'updateParams',
  },
  async created() {
    this.viewType = this.$route.query.viewType ?? 'all';

    await this.loadAchievements();
    await this.loadFavoriteAchievements();
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievements',
    ]),
    ...mapActions('memberAchievements', [
      'loadFavoriteAchievements',
    ]),
    updateParams() {
      if (this.$route.query.viewType !== this.viewType) {
        this.$router.push({ query: { viewType: this.viewType } });
      }
    },
  },
});
</script>
