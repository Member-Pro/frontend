<template>
  <b-form-checkbox
    :id="fieldId"
    v-model="inputVal"
    @input="handleInput"
  >
    {{ label }}
  </b-form-checkbox>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    fieldId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      // not sure if this should be required or have type validation...
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
