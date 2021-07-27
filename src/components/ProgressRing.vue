<template>
  <div class="progress-circle">
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="normalizedRadius / 2"
        :cx="radius"
        :cy="radius"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    radius: Number,
    progress: Number,
    stroke: Number,
  },
  data(): any {
    const normalizedRadius = this.radius - this.stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    return {
      normalizedRadius,
      circumference,
    };
  },
  computed: {
    strokeDashoffset(): number {
      return (this.circumference - this.progress / 100 * this.circumference);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(270deg);
  transform-origin: 50% 50%;
  stroke: $primary;
}
</style>
