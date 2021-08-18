<template>
  <a :href="`#${targetId}`" @click.prevent="goToElement">
    <slot />
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    targetId: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToElement() {
      const targetElement = document.getElementById(this.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
  },
});
</script>
