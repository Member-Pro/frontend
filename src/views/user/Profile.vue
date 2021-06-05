<template>
  <div class="profile-dashboard">
    <h1>My Profile</h1>

    <div class="row">
      <div class="col-md-2">
        <profile-nav />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ProfileNav from '@/components/user/ProfileNav.vue';

export default Vue.extend({
  components: {
    ProfileNav,
  },
});
</script>
