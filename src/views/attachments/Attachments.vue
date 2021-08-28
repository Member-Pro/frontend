<template>
  <div>
    <h1>Attachments</h1>

    <attachment-browser :allowMultipleSelection="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AttachmentBrowser from '@/components/attachments/AttachmentBrowser.vue';

export default Vue.extend({
  components: {
    AttachmentBrowser,
  },
});
</script>
