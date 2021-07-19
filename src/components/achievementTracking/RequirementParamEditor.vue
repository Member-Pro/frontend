<template>
  <div class="requirement-param-editor">
    <b-form @submit.prevent="save">
      <div class="param" v-for="param in requirement.validationParameters" :key="param.key">
        <text-box
          v-if="param.inputType === 'TextBox'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          v-model="param.value"
        />

        <text-area
          v-if="param.inputType === 'TextArea'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
          v-model="param.value"
        />

        <checkbox
          v-if="param.inputType === 'Checkbox'"
          :fieldId="`req${requirement.id}-${param.key}`"
          :label="param.name"
          :labelSrOnly="false"
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
import Checkbox from '@/components/forms/Checkbox.vue';
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
    Checkbox,
    TextArea,
    TextBox,
  },
  methods: {
    ...mapActions('achievements', [
      'updateRequirementState',
    ]),

    async save() {
      await this.updateRequirementState({ requirementId: this.requirement.id });
    },
    cancel() {
      this.$emit('cancelEditingRequirementParam');
    },
  },
});
</script>
