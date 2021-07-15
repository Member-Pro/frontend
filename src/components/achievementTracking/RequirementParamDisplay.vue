<template>
  <div>
    <dl class="row requirement-params">
      <template v-for="param in requirement.validationParameters">
        <dt class="col-md-3" :key="`${param.key}-name`">
          {{ param.name }}
        </dt>
        <dd class="col-md-9" :key="`${param.key}-value`">
          {{ getParamValue(param.key)}}
        </dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  props: {
    requirement: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters('achievements', [
      'currentRequirements',
      'requirementStates',
    ]),
    states() {
      const states = this.requirementStates.filter(x => x.requirementId === this.requirement.id);
      return states;
    },
  },
  methods: {
    getParamValue(paramKey: string) {
      const reqState = this.requirementStates.find(x => x.requirementId === this.requirement.id);
      if (reqState) {
        const param = reqState.data[paramKey];
        return param;
      }

      return null;
    },
  },
});
</script>

<style lang="scss" scoped>
.requirement-params {
  dt {
    font-weight: normal;
  }
}
</style>
