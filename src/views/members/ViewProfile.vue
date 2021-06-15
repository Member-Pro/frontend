<template>
  <div class="member-profile">
    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

      <div class="header">
        <h1>{{`${currentMember.firstName} ${currentMember.lastName}`}}</h1>
        <h3 v-if="currentMember.stateProvince && currentMember.country">
          {{`${currentMember.city}, ${currentMember.stateProvince.name}, ${currentMember.country.abbreviation}`}}
        </h3>
      </div>

      <hr />

      <div class="achievements">
        <h3>Achievements</h3>

        <b-skeleton-wrapper :loading="isLoadingAchievements">
          <template #loading>
            <b-skeleton width="85%"></b-skeleton>
            <b-skeleton width="55%"></b-skeleton>
            <b-skeleton width="70%"></b-skeleton>
          </template>

          <div class="achievement" v-for="achievement in achievements" :key="achievement.id">
            <achievement-row :achievement="achievement.achievement" :showDescription="false" :showTrackButton="false" />
          </div>
        </b-skeleton-wrapper>

      </div>

    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AchievementRow from '@/components/achievements/AchievementRow.vue';

export default Vue.extend({
  props: {
    memberId: {
      required: true,
    },
  },
  components: {
    AchievementRow,
  },
  computed: {
    ...mapGetters('members', [
      'isLoading',
      'currentMember',
    ]),
    ...mapGetters('memberAchievements', {
      isLoadingAchievements: 'isLoading',
      achievements: 'memberAchievements',
    }),
  },
  watch: {
    memberId: 'refreshMember',
  },
  async created() {
    await this.refreshMember();
  },
  methods: {
    ...mapActions('members', [
      'loadMember',
    ]),
    ...mapActions('memberAchievements', [
      'loadMemberAchievements',
    ]),
    async refreshMember() {
      this.loadMember(this.memberId);
      this.loadMemberAchievements(this.memberId);
    },
  },
});
</script>
