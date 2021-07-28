<template>
  <div class="requirement">
    <div class="requirement-title d-flex justify-content-between">
      <h5>
        {{ requirement.name }}

        <requirement-state-indicator :requirementId="requirement.id" />
      </h5>

      <b-button v-if="!isEditing" variant="outline-secondary" size="sm" @click="edit">
        Edit
      </b-button>
    </div>

    <p class="text-muted" v-if="requirement.description">
      {{ requirement.description }}
    </p>

    <requirement-param-editor v-if="isEditing" :requirement="requirement" @closeEditor="closeEditor" />
    <requirement-param-display v-else :requirement="requirement" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RequirementParamDisplay from './RequirementParamDisplay.vue';
import RequirementParamEditor from './RequirementParamEditor.vue';
import RequirementStateIndicator from './RequirementStateIndicator.vue';

export default Vue.extend({
  props: {
    requirement: Object,
  },
  components: {
    RequirementParamDisplay,
    RequirementParamEditor,
    RequirementStateIndicator,
  },
  data(): any {
    return {
      isEditing: false,
    };
  },
  methods: {
    edit(): void {
      this.isEditing = true;
    },
    closeEditor(): void {
      this.isEditing = false;
    },
  },
});
</script>
