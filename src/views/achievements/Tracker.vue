<template>
  <div class="achievement-tracker">
    <template v-if="currentAchievement">
      <h1>{{ currentAchievement.name }} Tracking</h1>

      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <div class="list-group-item list-group-item-secondary">
              <b>Requirements</b>
            </div>
            <router-link
              :to="{ name: 'achievementTracker', params: { achievementId, componentId: component.id } }"
              class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :class="{ active: componentId == component.id }"
              v-for="component in currentComponents"
              :key="component.id">
              {{ component.name }}
              <span class="badge badge-primary badge-pill">{{ component.requirements.length }}</span>
            </router-link>
          </div>
        </div>
        <div class="col-md-8">
          <div class="requirement-section my-2">
          </div>

          <hr />

          <div class="requirement-section my-2">
            <activities :achievementId="achievementId" :requirementId="componentId" />
          </div>

          <hr />

          <div class="requirement-section my-2">
            <h3>Attachments</h3>
            <p class="text-muted">Photos and other documentation to support your submission.</p>

            <attachment-list :objectType="'requirement'" :objectId="componentId" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Activities from '@/components/achievementTracking/Activities.vue';
import Tasks from '@/components/achievementTracking/Tasks.vue';
import AttachmentList from '@/components/attachments/AttachmentList.vue';

export default Vue.extend({
  components: {
    Activities,
    AttachmentList,
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
  },
});
</script>

<style lang="scss" scoped>

</style>
