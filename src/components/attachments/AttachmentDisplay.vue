<template>
  <div class="attachment-display">
    <grid-view :attachments="displayAttachments" :allowSelection="false" :showUpload="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Attachment from '@/models/media/attachment';
import GridView from '@/components/attachments/GridView.vue';

export default Vue.extend({
  props: {
    attachmentIds: {
      type: [ Array, String ],
      required: false,
      default: () => {
        return [];
      },
    },
  },
  components: {
    GridView,
  },
  computed: {
    ...mapGetters('attachments', [
      'attachments',
    ]),

    selectedIds(): number[] {
      if (!this.attachmentIds) {
        return [];
      }

      if (Array.isArray(this.attachmentIds)) {
        return this.attachmentIds.map((x: any) => parseInt(x));
      }

      return this.attachmentIds.split(',').map((x: any) => parseInt(x));
    },
    displayAttachments(): Attachment[] {
      return this.attachments
        .filter((x: any) => this.selectedIds.includes(x.id));
    },
  },
  async created() {
    // If there are no attachments in store, load them
    // TODO: Ideally, don't load all the attachments...
    if (this.attachments.length === 0) {
      await this.loadAll();
    }
  },
  methods: {
    ...mapActions('attachments', [
      'loadAll',
    ]),
  },
});
</script>
