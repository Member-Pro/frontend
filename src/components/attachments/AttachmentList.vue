<template>
  <div class="attachments">
    <upload-attachments :objectType="objectType" :objectId="objectId" class="mb-2" />

    <div class="attachment-list d-flex flex-wrap justify-content-start">
      <div class="attachment text-center p-2" v-for="attachment in attachments" :key="attachment.id">
        <h1><b-icon-image /></h1>
        <a :href="attachment.url" target="_blank">
          {{ attachment.fileName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { BIconImage } from 'bootstrap-vue';
import UploadAttachments from './UploadAttachments.vue';

export default Vue.extend({
  props: {
    objectType: {
      type: String,
      required: true,
    },
    objectId: {
      required: true,
    },
  },
  components: {
    BIconImage,
    UploadAttachments,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('attachments', [
      'attachments',
    ]),
  },
  watch: {
    objectType: 'refresh',
    objectId: 'refresh',
  },
  async created() {
    await this.refresh();
  },
  methods: {
    ...mapActions('attachments', [
      'searchAttachments',
    ]),

    async refresh() {
      await this.searchAttachments({ objectType: this.objectType, objectId: this.objectId });
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.attachment {
  width: 125px;
  max-height: 100px;

  &:hover {
    background-color: $gray-200;
  }
}
</style>
