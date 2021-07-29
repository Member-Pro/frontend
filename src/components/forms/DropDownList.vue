<template>
  <b-form-group :label-for="fieldId" :label="label" :label-sr-only="labelSrOnly" :class="groupCssClass">
    <b-form-select
      :id="fieldId"
      v-model="inputVal"
      @input="handleInput"
      :class="inputCssClass"
      :options="selectOptions"
      value-field="value"
      text-field="text"
    />
  </b-form-group>
</template>

<script lang="ts">
import Vue from 'vue';
import { commonInputProps } from './common';

export default Vue.extend({
  props: {
    ...commonInputProps,
    options: {
      type: Array,
      required: true,
    },
    defaultOption: {
      type: Object,
      required: false,
    },
  },
  data(): any {
    return {
      inputVal: this.value,
    };
  },
  computed: {
    selectOptions(): Array<any> {
      let options = [ ...this.options ];
      if (this.defaultOption) {
        options = [ this.defaultOption, ...options ];
      }

      return options;
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.inputVal);
    },
  },
});
</script>
