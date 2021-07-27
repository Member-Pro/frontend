<template>
  <b-icon-check-circle-fill v-if="isValid" class="text-success ml-2" title="Requirement complete" />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { BIconCheckCircleFill } from 'bootstrap-vue';

export default Vue.extend({
  props: {
    requirementId: {
      type: Number,
      required: true,
    },
  },
  components: {
    BIconCheckCircleFill,
  },
  computed: {
    ...mapGetters('achievements', [
      'requirementStates',
    ]),

    isValid() {
      const reqState = this.requirementStates.find(x => x.requirementId === this.requirementId);
      return reqState && reqState.isValid;
    },
  },
});
</script>
