<template>
  <div>
    <div class="row mt-5 justify-content-center text-danger">
      {{ errorMsg }}
    </div>
    <div class="container-fluid">
      <!-- Add Task Button -->
      <div class="row mt-1">
        <div class="col-6 col-md-4 col-lg-2">
          <a
            href="#"
            class="btn btn-warning text-white"
            @click.prevent="changePage('add')"
            >Add Task</a
          >
        </div>
      </div>
      <!-- End of Add Task Button -->

      <!-- Main Card -->
      <div class="row my-1">
        <KanbanCategory
          v-for="(category, i) in categories"
          :key="i"
          :tasks="tasks"
          :category="category"
          @changePage="changePage"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
          @getEdit="getEdit"
        ></KanbanCategory>
      </div>
      <!-- End of Main Card -->
    </div>
  </div>
</template>

<script>
import KanbanCategory from "../components/Category";
export default {
  components: {
    KanbanCategory,
  },
  props: ["categories", "tasks", "errorMsg"],
  methods: {
    changePage(page) {
      return this.$emit("changePage", page);
    },
    deleteTask(obj) {
      return this.$emit("deleteTask", obj);
    },
    updateTask(obj) {
      return this.$emit("updateTask", obj);
    },
    getEdit(obj) {
      return this.$emit("getEdit", obj);
    },
  },
};
</script>

<style>
</style>