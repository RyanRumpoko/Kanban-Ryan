<template>
  <div class="col-12 col-md-6 col-lg-3 my-1">
    <div class="card border border-dark">
      <div class="h2 card-header bg-dark text-white text-center">
        {{ category }}
      </div>
      <div class="card-body">
        <KanbanCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          :category="category"
          @changePage="changePage"
          @deleteTask="deleteTask"
          @updateTask="updateTask"
          @getEdit="getEdit"
        ></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "../components/Card";
export default {
  components: {
    KanbanCard,
  },
  props: ["tasks", "category"],
  methods: {
    deleteTask(obj) {
      return this.$emit("deleteTask", obj);
    },
    updateTask(obj) {
      return this.$emit("updateTask", obj);
    },
    getEdit(obj) {
      return this.$emit("getEdit", obj);
    },
    changePage(page) {
      return this.$emit("changePage", page);
    },
  },
};
</script>

<style>
</style>