<template>
  <b-form-group
    :label-for="fieldId"
    :label="label"
    :label-sr-only="labelSrOnly"
    :class="groupCssClass"
  >
    <b-form-textarea
      :id="fieldId"
      v-model="inputVal"
      :rows="rows"
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
    rows: {
      type: Number,
      required: false,
      default: 3,
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
