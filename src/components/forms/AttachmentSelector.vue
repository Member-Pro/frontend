<template>
  <div class="attachment-selector">
    <b-form-group :label-for="fieldId" :label="label" :class="groupCssClass">
      <b-button variant="outline-secondary" @click="openFileSelector">
        Select file
      </b-button>

    </b-form-group>

    <b-modal
      v-model="showSelector"
      size="xl"
      title="Select attachment"
      no-close-on-backdrop
    >
      <attachment-browser :allowMultipleSelection="allowMultipleSelection"/>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AttachmentBrowser from '../attachments/AttachmentBrowser.vue';
import { commonInputProps } from './common';
export default Vue.extend({
  components: { AttachmentBrowser },
  props: {
    ...commonInputProps,

    allowMultipleSelection: {
      type: Boolean,
      default: false,
    },
  },
  data(): any {
    return {
      showSelector: false,
    };
  },
  methods: {
    openFileSelector() {
      this.showSelector = true;
    },
  },
});
</script>
