<template>
  <div id="app">
    <main-nav />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainNav from '@/components/MainNav.vue';

export default Vue.extend({
  components: {
    MainNav,
  },
});
</script>
