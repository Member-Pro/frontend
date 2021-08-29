<template>
  <div>
    <dl class="row requirement-params">
      <template v-for="param in requirement.validationParameters">
        <dt class="col-md-3" :key="`${param.key}-name`">
          {{ param.name }}
        </dt>
        <dd class="col-md-9" :key="`${param.key}-value`">
          <template v-if="param.inputType === 'Checkbox'">
            {{ param.value === 'true' ? 'Yes' : 'No' }}
          </template>

          <attachment-display
            v-else-if="param.inputType === 'FileSelectorSingle' || param.inputType === 'FileSelectorMultiple'"
            :attachmentIds="param.value"
          />

          <template v-else-if="param.value">
            {{ param.value }}
          </template>

          <i class="text-muted" v-else>No value...</i>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AttachmentDisplay from '@/components/attachments/AttachmentDisplay.vue';

export default Vue.extend({
  props: {
    requirement: {
      type: Object,
      required: true,
    },
  },
  components: {
    AttachmentDisplay,
  },
});
</script>

<style lang="scss" scoped>
.requirement-params {
  dt {
    font-weight: normal;
  }
}
</style>
