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
            <div class="achievement-component mb-4" v-for="component in currentComponents" :key="component.id">
              <h3>{{ component.name }}</h3>

              <div class="requirement mb-4" v-for="requirement in currentRequirements.filter(x => x.componentId === component.id)" :key="requirement.id">
                <div class="requirement-title d-flex justify-content-between">
                    <h4>{{ requirement.name }}</h4>

                    <b-button
                      v-if="!isEditingRequirementParams(requirement.id)"
                      variant="link"
                      @click="showRequirementParamEditor(requirement.id)"
                    >
                      Edit
                    </b-button>
                  </div>

                  <requirement-param-editor v-if="isEditingRequirementParams(requirement.id)" :requirement="requirement" @cancelEditingRequirementParam="cancelEditingRequirementParam" />
                  <requirement-param-display v-else :requirement="requirement" />
              </div>

              <hr />
            </div>

            <!-- <div class="card mb-2 achievement-component" v-for="component in currentComponents" :key="component.id">
              <div class="card-header">{{ component.name }}</div>
              <div class="list-group list-group-flush">
                <div class="list-group-item" v-for="requirement in getRequirementsForComponent(component.id)" :key="requirement.id">
                  <div class="requirement-title d-flex justify-content-between">
                    <b>{{ requirement.name }}</b>

                    <b-button
                      v-if="!isEditingRequirementParams(requirement.id)"
                      variant="outline-secondary"
                      size="sm"
                      @click="showRequirementParamEditor(requirement.id)"
                    >
                      Edit
                    </b-button>
                  </div>

                  <requirement-param-editor v-if="isEditingRequirementParams(requirement.id)" :requirement="requirement" />
                  <requirement-param-display v-else :requirement="requirement" />
                </div>
              </div>
            </div> -->
          </div>

          <h3>Attachments</h3>
          <p class="text-muted">Photos and other documentation to support your submission.</p>

          <attachment-list :objectType="'requirement'" :objectId="componentId" />
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
import Requirement from '@/models/achievements/requirement';
import RequirementParamDisplay from '@/components/achievementTracking/RequirementParamDisplay.vue';
import RequirementParamEditor from '@/components/achievementTracking/RequirementParamEditor.vue';

export default Vue.extend({
  components: {
    AttachmentList,
    RequirementParamDisplay,
    RequirementParamEditor,
  },
  props: {
    achievementId: {
      type: Number,
      required: true,
    },
    componentId: {
      type: Number,
      required: false,
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
