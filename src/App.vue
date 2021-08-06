<template>
  <div id="app">
    <main-nav />

    <div class="container">
      <toasts />

      <router-view />
    </div>

    <footer class="site-footer mt-4 py-2 background-light">
      <div class="container">
        <p>&copy; 2017-2021 InternetMill LLC. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </div>
    </footer>
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
    await this.loadRegions();
  },
  methods: {
    ...mapActions('geography', [
      'loadCountries',
      'loadRegions',
    ]),
  },
});
</script>

<style lang="scss">
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import './assets/app.scss';

footer.site-footer {
  background-color: $gray-100;
}
</style>
