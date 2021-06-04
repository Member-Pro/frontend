<template>
  <div id="app">
    <main-nav />

    <div class="container">
      <toasts />

      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import MainNav from '@/components/MainNav.vue';
import Toasts from '@/components/Toasts.vue';

export default Vue.extend({
  components: {
    MainNav,
    Toasts,
  },
  async created() {
    // Always want these available so just load them into state
    await this.loadCountries();
  },
  methods: {
    ...mapActions('geography', [
      'loadCountries',
    ]),
  },
});
</script>
