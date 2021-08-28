<template>
  <div>
    <dl class="row requirement-params">
      <template v-for="param in requirement.validationParameters">
        <dt class="col-md-3" :key="`${param.key}-name`">
          {{ param.name }}
        </dt>
        <dd class="col-md-9" :key="`${param.key}-value`">
          <template v-if="param.inputType === 'Checkbox'">
            {{ param.value === 'true' ? 'Yes' : 'No' }}
          </template>
          <template v-else-if="param.value">
            {{ param.value }}
          </template>
          <i class="text-muted" v-else>No value...</i>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    requirement: {
      type: Object,
      required: true,
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
