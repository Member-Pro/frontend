<template>
  <b-form-group :label-for="fieldId" :label="label" :label-sr-only="labelSrOnly" :class="groupCssClass">
    <b-form-datepicker
      :id="fieldId"
      v-model="inputVal"
      @input="handleInput"
      :class="inputCssClass"
    />
  </b-form-group>
</template>

<script lang="ts">
import Vue from 'vue';
import { commonInputProps } from './common';

export default Vue.extend({
  props: {
    ...commonInputProps,
  },
  data() {
    return {
      inputVal: this.value,
    };
  },
  methods: {
    handleInput() {
      this.$emit('input', this.inputVal);
    },
  },
});
</script>
