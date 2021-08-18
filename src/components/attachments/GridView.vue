<template>
  <div class="attachment-browser grid-view">
    <upload-attachments class="mb-2" />

    <div class="attachments row">
      <div
        class="card attachment text-center p-2 m-2 col-5 col-md-2"
        v-for="attachment in attachments"
        :key="attachment.id"
        :class="{ 'selected': selectIds.includes(attachment.id) }"
      >
        <!-- <div class="hover">
          <div class="actions">
            <button type="button" class="btn btn-icon btn-danger">
              <b-icon-trash />
            </button>
          </div>
        </div> -->
        <div class="icon">
          <!-- <i class="fa fa-file text-info"></i> -->
          <h1 class="mb-0"><b-icon-image /></h1>
        </div>

        <div class="file-info">
          <p class="mb-2 file-name text-muted">
            {{ attachment.fileName }}
          </p>

          <div class="footer d-flex justify-content-between align-text-bottom ">
            <small><span class="date text-muted">Nov 02, 2017</span></small>
            <span class="actions">
              <b-button size="sm" variant="link" class="p-0 ml-1 border-0" @click="select(attachment.id)">
                <b-icon-check-circle-fill />
              </b-button>
              <b-button size="sm" variant="outline-secondary" class="p-0 ml-1 border-0">
                <b-icon-pencil />
              </b-button>
              <b-button size="sm" variant="outline-danger" class="p-0 ml-1 border-0">
                <b-icon-trash />
              </b-button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import Vue from 'vue';
import { BIconCheckCircleFill, BIconImage, BIconPencil, BIconTrash } from 'bootstrap-vue';
import UploadAttachments from './UploadAttachments.vue';

export default Vue.extend({
  props: {
    attachments: {
      type: Array,
    },
    selectedIds: {
      type: Array,
      default: () => { return []; },
    },
  },
  components: {
    BIconCheckCircleFill,
    BIconImage,
    BIconPencil,
    BIconTrash,
    UploadAttachments,
  },
  data(): any {
    return {
      selectIds: this.selectedIds,
    };
  },
  methods: {
    select(attachId: number): void {
      if (!this.selectIds.includes(attachId)) {
        this.selectIds = [ ...this.selectIds, attachId ];
      } else {
        this.selectIds = [ ...this.selectIds.filter(x => x !== attachId) ];
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
  // max-height: 100px;
  // width: 200px;

  &.selected {
    border: 1px solid $primary;
  }

  .hover {
    background: rgba(0, 0, 0, 0.4);
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    .actions {
      left: 40%;
      position: absolute;
      top: 40%;
    }
  }

  &:hover .hover {
    transition: all 0.5s ease-in-out;
    display: inherit;
  }

  // &:hover {
  //   background-color: $gray-200;
  // }

  .actions {
    button {
      padding: 0;
    }
  }
}
</style>
