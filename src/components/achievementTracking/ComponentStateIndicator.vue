<template>
  <div class="component-progress">
    <small v-if="!allRequirementsAreValid">
      {{ `${validRequirementCount} / ${requirementCount }` }}
      <!-- <progress-ring :radius="16" :progress="55" :stroke="2" /> -->
    </small>

    <b-icon-check-circle-fill v-if="allRequirementsAreValid" class="text-success ml-2" title="Achievement component is complete" />
  </div>
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
      'requirements',
      'requirementStates',
    ]),
    requirementIds(): number[] {
      const test = this.requirements.filter(x => x.componentId === this.componentId).map(x => x.id);
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

    allRequirementsAreValid(): boolean {
      return this.validRequirementCount === this.requirementCount;
    },
  },
});
</script>
