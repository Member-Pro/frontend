<template>
  <div class="requirement-param-editor">
    <b-form @submit.prevent="save">
      <div class="param" v-for="param in requirement.validationParameters" :key="param.key">
        <text-box
          v-if="param.inputType === 'TextBox'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          :placeholder="param.description"
          v-model="param.value"
        />

        <text-area
          v-if="param.inputType === 'TextArea'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          :placeholder="param.description"
          v-model="param.value"
        />

        <checkbox
          v-if="param.inputType === 'Checkbox'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          v-model="param.value"
        />

        <date-picker
          v-if="param.inputType === 'DatePicker'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          v-model="param.value"
        />

        <drop-down-list
          v-if="param.inputType === 'DropDownList'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          v-model="param.value"
          :options="param.options.map(x => ({ value: x, text: x }))"
          :defaultOption="{ text: '', value: '' }"
        />

        <attachment-selector
          v-if="param.inputType === 'FileSelectorSingle' || param.inputType === 'FileSelectorMultiple'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          v-model="param.value"
        />
      </div>

      <b-button type="submit" variant="primary">Save</b-button>&nbsp;
      <b-button type="button" variant="outline-secondary" @click="cancel">Cancel</b-button>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import AttachmentSelector from '@/components/forms/AttachmentSelector.vue';
import Checkbox from '@/components/forms/Checkbox.vue';
import DatePicker from '@/components/forms/DatePicker.vue';
import DropDownList from '@/components/forms/DropDownList.vue';
import TextArea from '@/components/forms/TextArea.vue';
import TextBox from '@/components/forms/TextBox.vue';

export default Vue.extend({
  props: {
    requirement: {
      type: Object,
      required: true,
    },
  },
  data(): any {
    return {
    };
  },
  components: {
    AttachmentSelector,
    Checkbox,
    DatePicker,
    DropDownList,
    TextArea,
    TextBox,
  },
  methods: {
    ...mapActions('achievements', [
      'updateRequirementState',
    ]),

    async save() {
      await this.updateRequirementState({ requirementId: this.requirement.id });
      this.$emit('closeEditor');
    },
    cancel() {
      this.$emit('closeEditor');
    },
  },
});
</script>
