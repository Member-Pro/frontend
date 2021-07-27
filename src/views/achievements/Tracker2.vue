<template>
  <div class="achievement-tracker">
    <template v-if="currentAchievement">
      <h1 class="mb-4">
        Achievement Tracker
        <small>
          {{ currentAchievement.name }}
        </small>
      </h1>

      <div class="row">
        <div class="col-md-8">
          <div class="component-list">
            <div class="card mb-2 achievement-component" v-for="component in currentComponents" :key="component.id">
              <h5 class="card-header d-flex justify-content-between">
                <span>
                  <a :id="`component-${component.id}`"></a>
                  {{ component.name }}
                </span>

                <component-progress :componentId="component.id" />
              </h5>
              <div class="list-group list-group-flush">
                <div class="list-group-item" v-for="requirement in getRequirementsForComponent(component.id)" :key="requirement.id">
                  <div class="requirement-title d-flex justify-content-between">
                    <h5>
                      {{ requirement.name }}
                      <requirement-valid-indicator :requirementId="requirement.id" />
                    </h5>

                    <b-button
                      v-if="!isEditingRequirementParams(requirement.id)"
                      variant="outline-secondary"
                      size="sm"
                      @click="showRequirementParamEditor(requirement.id)"
                    >
                      Edit
                    </b-button>
                  </div>

                  <p class="text-muted" v-if="requirement.description">
                    {{ requirement.description }}
                  </p>

                  <requirement-param-editor v-if="isEditingRequirementParams(requirement.id)" :requirement="requirement" @cancelEditingRequirementParam="cancelEditingRequirementParam" />
                  <requirement-param-display v-else :requirement="requirement" />
                </div>
              </div>
            </div>
          </div>

          <h3>Attachments</h3>
          <a id="attachments"></a>
          <p class="text-muted">Photos and other documentation to support your submission.</p>

          <attachment-list :objectType="'achievement'" :objectId="achievementId" />
        </div>
        <div class="col-md-4">
          <div class="card jump-to" style="position: fixed">
            <div class="card-header">
              Jump to...
            </div>
            <ul class="list-group list-group-flush">
              <li
                v-for="component in currentComponents"
                :key="component.id"
                class="list-group-item">
                <a :href="`#component-${component.id}`">{{ component.name }}</a>
              </li>
              <li class="list-group-item">
                <a href="#attachments">Attachments</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */

import Vue from 'vue';
import { mapActions } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
// import Activities from '@/components/achievementTracking/Activities.vue';
import AttachmentList from '@/components/attachments/AttachmentList.vue';
import ComponentProgress from '@/components/achievementTracking/ComponentProgress.vue';
import Requirement from '@/models/achievements/requirement';
import RequirementParamDisplay from '@/components/achievementTracking/RequirementParamDisplay.vue';
import RequirementParamEditor from '@/components/achievementTracking/RequirementParamEditor.vue';
import RequirementValidIndicator from '@/components/achievementTracking/RequirementValidIndicator.vue';

export default Vue.extend({
  components: {
    AttachmentList,
    ComponentProgress,
    RequirementParamDisplay,
    RequirementParamEditor,
    RequirementValidIndicator,
  },
  props: {
    achievementId: {
      type: Number,
      required: true,
    },
  },
  data(): any {
    return {
      editingRequirementId: 0,
    };
  },
  computed: {
    ...mapFields('achievements', [
      'currentAchievement',
      'currentComponents',
      'requirementStates',
    ]),
    ...mapMultiRowFields('achievements', [
      'currentRequirements',
    ]),

  },
  watch: {
    achievementId: 'refresh',
  },
  async created() {
    await this.refresh();
  },
  methods: {
    ...mapActions('achievements', [
      'loadAchievement',
    ]),

    async refresh() {
      await this.loadAchievement(this.achievementId);
    },

    getRequirementsForComponent(componentId: number): Requirement[] {
      return this.currentRequirements.filter((x: Requirement) => x.componentId === componentId);
    },

    showRequirementParamEditor(requirementId: number) {
      this.editingRequirementId = requirementId;
    },

    cancelEditingRequirementParam() {
      this.editingRequirementId = null;
    },

    isEditingRequirementParams(requirementId: number): boolean {
      return this.editingRequirementId === requirementId;
    },
  },
});
</script>

<style lang="scss" scoped>

</style>
