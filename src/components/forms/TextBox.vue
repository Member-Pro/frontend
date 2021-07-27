<template>
  <b-form-group :label-for="fieldId" :label="label" :label-sr-only="labelSrOnly" :class="groupCssClass">
    <b-form-input
      :id="fieldId"
      :type="type"
      v-model="inputVal"
      @input="handleInput"
      :placeholder="placeholder"
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

    type: {
      type: String,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
    },
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
