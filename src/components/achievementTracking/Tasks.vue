<template>
  <div class="tasks">
    <h3>Tasks</h3>
    <p class="text-muted">Things that need to be done as part of this requirement.</p>

    <div class="list-group list-group-flush task-list">

      <div class="list-group-item add-task-wrapper">
        <b-form>
          <div class="form-row">
            <div class="col-md-10">
              <b-form-group label-for="add-task-title" class="my-0 mr-sm-2" label="Add Task" label-sr-only>
                <b-form-input id="add-task-title" placeholder="Add a task..." class="w-100" />
              </b-form-group>

            </div>
            <div class="col">
              <b-button variant="primary">Add Task</b-button>
            </div>
          </div>
        </b-form>
      </div>

      <div class="list-group-item" v-for="task in tasks" :key="task.id">
        <b-form-checkbox :id="`task-complete-${task.id}`" v-model="task.isCompleted">
          {{task.title}}
        </b-form-checkbox>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      tasks: [
        { id: 1, isCompleted: true, title: 'Build locomotive 1' },
        { id: 2, isCompleted: true, title: 'Build locomotive 2' },
        { id: 3, isCompleted: false, title: 'Scratch build locomotive' },
        { id: 4, isCompleted: false, title: 'Scratch build documentation' },
      ],
    };
  },
});
</script>
