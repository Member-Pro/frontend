<template>
  <div class="attachment-browser grid-view">
    <upload-attachments v-if="showUpload" class="mb-2" />

    <div class="attachments row">
      <div
        class="card attachment text-center p-2 m-2 col-5 col-md-2"
        v-for="attachment in attachments"
        :id="`attachment-${attachment.id}`"
        :key="attachment.id"
        :class="{ 'selected': isSelected(attachment.id) }"
      >
        <div class="title d-flex justify-content-between">
          <span class="file-name" :title="attachment.fileName">{{ attachment.fileName }}</span>

          <b-button
            v-if="allowSelection"
            size="sm"
            variant="link"
            class="file-select-check text-reset"
            @click="toggleSelection(attachment.id)"
          >
            <b-icon-check-square-fill v-if="isSelected(attachment.id)" />
            <b-icon-check-square v-else />
          </b-button>
        </div>

        <div class="file-preview">
          <i class="fa fa-file text-info"></i>
          <img v-if="attachment.mediaType === 'Photo'" :src="attachment.variantUrls.small_240" class="img-fluid" />
          <b-icon-file-richtext-fill v-else class="h1" />
        </div>

        <div class="file-info">
          <div class="footer d-flex justify-content-between align-text-bottom ">
            <small>
              <span class="date text-muted" :title="`Uploaded on ${$luxon(attachment.createdOn, 'med')}`">
                {{ attachment.createdOn | luxonRelative }}
              </span>
            </small>
            <span class="actions">
              <b-dropdown size="sm" variant="link" no-caret>
                <template #button-content>
                  <b-icon-three-dots class="text-reset" />
                </template>

                <b-dropdown-item href="#">Edit</b-dropdown-item>
                <b-dropdown-item href="#">Delete</b-dropdown-item>
              </b-dropdown>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UploadAttachments from './UploadAttachments.vue';

export default Vue.extend({
  props: {
    attachments: {
      type: Array,
    },
    allowSelection: {
      type: Boolean,
    },
    showUpload: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    selectedIds: {
      type: Array,
      default: () => { return []; },
    },
  },
  components: {
    UploadAttachments,
  },
  data(): any {
    return {
    };
  },
  methods: {
    toggleSelection(attachId: number): void {
      // The parent component will handle updating state
      this.$emit('selectionChanged', attachId);
    },

    isSelected(attachId: number): boolean {
      return this.selectedIds.includes(attachId);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.attachment {
  border: 1px solid gray;

  &.selected {
    border: 1px solid $primary;
  }

  .file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-select-check {
    padding-right: 0;
  }

  .actions {
    button {
      padding: 0;
    }
  }
}
</style>
