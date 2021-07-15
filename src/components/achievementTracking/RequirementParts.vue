<template>
  <div class="requirement-parts">
    <h3>Components</h3>
    <p class="text-muted">Components or sub-requirements that need to be done as part of this requirement.</p>

    <div class="list-group requirement-part-list">
      <div class="list-group-item" v-for="part in requirement.parts" :key="part.name">
        <h5 class="mb-1">{{ part.name }}</h5>
        <small>{{ part.description }}</small>
        <!-- <div class="d-flex w-100 justify-content-between">
        </div> -->
        <!-- <p class="mb-1 actions">
          <b-button variant="link" size="sm" @click="editRecord(activity.id)">Edit</b-button>
          <b-button variant="link" size="sm" @click="deleteRecord(activity.id)">Delete</b-button>
        </p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    requirement: {
      type: Object,
      required: false,
    },
  },
});
</script>
