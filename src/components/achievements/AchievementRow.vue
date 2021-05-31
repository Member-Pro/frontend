<template>
  <div class="achievement">
    <div class="img">
      <img src="https://via.placeholder.com/140x100" :alt="achievement.name">
    </div>

    <div class="info">
      <h4>{{ achievement.name }}</h4>
      <p class="description">
        {{ achievement.description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    achievement: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.achievement {
  display: flex;
  flex-flow: row;
  margin-bottom: 1rem;

  .img {
    width: 15%;
  }
  .info {
    width: 85%;
  }
}
</style>
