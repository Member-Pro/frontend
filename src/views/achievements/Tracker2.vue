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

                <component-state-indicator :componentId="component.id" />
              </h5>
              <div class="list-group list-group-flush">
                <div class="list-group-item" v-for="requirement in getRequirementsForComponent(component.id)" :key="requirement.id">
                  <requirement-view :requirement="requirement" />
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
          <div class="card jump-to sticky-top">
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

import Vue from 'vue';
import { mapActions } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
// import Activities from '@/components/achievementTracking/Activities.vue';
import AttachmentList from '@/components/attachments/AttachmentList.vue';
import ComponentStateIndicator from '@/components/achievementTracking/ComponentStateIndicator.vue';
import Requirement from '@/models/achievements/requirement';
import RequirementView from '@/components/achievementTracking/Requirement.vue';

export default Vue.extend({
  components: {
    AttachmentList,
    ComponentStateIndicator,
    RequirementView,
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
  },
});
</script>

<style lang="scss" scoped>

</style>
