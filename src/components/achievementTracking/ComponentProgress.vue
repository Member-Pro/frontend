<template>
  <small>
    {{ `${validRequirementCount} / ${requirementCount }` }}
    <!-- <progress-ring :radius="16" :progress="55" :stroke="2" /> -->
  </small>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */

import Vue from 'vue';
import { mapGetters } from 'vuex';
import ProgressRing from '../ProgressRing.vue';

export default Vue.extend({
  props: {
    componentId: {
      type: Number,
      required: true,
    },
  },
  components: {
    ProgressRing,
  },
  data(): any {
    return { };
  },
  computed: {
    ...mapGetters('achievements', [
      'currentRequirements',
      'requirementStates',
    ]),
    requirementIds(): number[] {
      const test = this.currentRequirements.filter(x => x.componentId === this.componentId).map(x => x.id);
      return test;
    },

    requirementCount(): number {
      return this.requirementIds.length;
    },

    validRequirementCount(): number {
      return this.requirementStates
        .filter(x => this.requirementIds.includes(x.requirementId) && x.isValid)
        .length;
    },
  },
});
</script>
