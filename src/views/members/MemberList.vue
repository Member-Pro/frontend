<template>
  <div class="member-directory">
    <h1>Member Directory</h1>

    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <b-skeleton width="85%"></b-skeleton>
        <b-skeleton width="55%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </template>

      <div class="member-list">
        <div class="member" v-for="member in members" :key="member.id">
          <h4>
            <router-link :to="{name: 'memberProfile', params: { memberId: member.id } }">
              {{`${member.firstName} ${member.lastName}`}}
            </router-link>
          </h4>
        </div>

      </div>
    </b-skeleton-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters('members', [
      'isLoading',
      'members',
    ]),
  },
  async created() {
    await this.loadMembers();
  },
  methods: {
    ...mapActions('members', [
      'loadMembers',
    ]),

    async refreshMembers() {
      await this.loadMembers();
    },
  },
});
</script>
