<template>
  <div class="form-row">
    <b-form-group class="col-10">
      <b-form-file v-model="file" :disabled="isUploading" placeholder="Select files or drag and drop them here to upload.">
        <template slot="file-name" slot-scope="{ names }">
          <b-badge variant="dark">{{ names[0] }}</b-badge>
          <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
            + {{ names.length - 1 }} More files
          </b-badge>
        </template>
      </b-form-file>
    </b-form-group>

    <div class="">
      <b-button type="button" @click="upload" variant="primary" :disabled="!file">Upload</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default Vue.extend({
  props: {
    objectType: {
      type: String,
      required: false,
    },
    objectId: {
      required: false,
    },
    // TODO: support multiple uploads... will likely require backend changes

    // allowMultiple: {
    //   type: Boolean,
    //   required: false,
    //   default: true,
    // },
  },
  data(): any {
    return {
      // This is a dummy to make TS happy...
    };
  },
  computed: {
    ...mapFields('attachments', {
      isUploading: 'isUploading',
      type: 'upload.objectType',
      id: 'upload.objectId',
      file: 'upload.file',
    }),
  },
  created() {
    this.type = this.objectType;
    this.id = this.objectId;
  },
  methods: {
    ...mapActions('attachments', [
      'upload',
    ]),
  },
});
</script>
