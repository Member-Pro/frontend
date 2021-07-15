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
              <div class="card-header">{{ component.name }}</div>
              <div class="list-group list-group-flush">
                <div class="list-group-item" v-for="requirement in getRequirementsForComponent(component.id)" :key="requirement.id">
                  <b>{{ requirement.name }}</b>

                  <requirement-param-display :requirement="requirement" />
                </div>
              </div>
            </div>
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
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
// import Activities from '@/components/achievementTracking/Activities.vue';
import AttachmentList from '@/components/attachments/AttachmentList.vue';
import Requirement from '@/models/achievements/requirement';
import RequirementParamDisplay from '@/components/achievementTracking/RequirementParamDisplay.vue';
// import RequirementParts from '@/components/achievementTracking/RequirementParts.vue';

export default Vue.extend({
  components: {
    // Activities,
    AttachmentList,
    RequirementParamDisplay,
    // RequirementParts,
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
    return { };
  },
  computed: {
    ...mapGetters('achievements', [
      'currentAchievement',
      'currentComponents',
      'currentRequirements',
    ]),
    currentComponent(): any {
      return this.currentComponents.find(x => x.id === this.componentId);
    },
  },
  watch: {
    achievementId: 'refresh',
  },
  async created() {
    await this.refresh();
    console.log('componentId', this.componentId);
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
