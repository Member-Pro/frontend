<template>
  <div class="attachment-browser">
    <!-- <attachment-list /> -->
    <grid-view :attachments="attachments" :allowSelection="allowSelection" :selectedIds="selectIds" @selectionChanged="selectionChanged" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
// import AttachmentList from './AttachmentList.vue';
import GridView from './GridView.vue';

export default Vue.extend({
  props: {
    allowSelection: {
      type: Boolean,
      required: false,
      default: () => true, // TODO: remove after dev
    },
    allowMultipleSelection: {
      type: Boolean,
      required: false,
    },
    selectedIds: {
      type: Array,
      required: false,
    },
    objectType: {
      type: String,
      required: false,
    },
    objectId: {
      required: false,
    },
  },
  components: {
    GridView,
  },
  data(): any {
    return {
      selectIds: [],
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

    selectionChanged(attachId: number): void {
      if (!this.selectIds.includes(attachId)) {
        if (this.allowMultipleSelection || this.selectIds.length < 1) {
          this.selectIds = [ ...this.selectIds, attachId ];
        }
      } else {
        this.selectIds = [ ...this.selectIds.filter((x: any) => x !== attachId) ];
      }
    },
  },
});
</script>
