<template>
  <div class="attachments">
    <upload-attachments :objectType="objectType" :objectId="objectId" class="mb-2" />

    <div class="attachment-list d-flex flex-wrap justify-content-start">
      <div class="attachment text-center p-2 m-2" v-for="attachment in attachments" :key="attachment.id">
        <h1><b-icon-image /></h1>
        <!-- <a :href="attachment.url" target="_blank">
          {{ attachment.fileName }}
        </a> -->
        <div class="d-flex justify-content-between">
          <span>select</span><span>edit</span>
        </div>
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
      required: false,
    },
    objectId: {
      required: false,
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
      'loadAll',
      'searchAttachments',
    ]),

    async refresh() {
      if (this.objectType && this.objectId) {
        await this.searchAttachments({ objectType: this.objectType, objectId: this.objectId });
      } else {
        await this.loadAll();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.attachment {
  border: 1px solid gray;
  width: 150px;
  max-height: 100px;

  &:hover {
    background-color: $gray-200;
  }
}
</style>
