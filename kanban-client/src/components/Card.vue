<template>
  <div class="card border border-white mb-3" v-if="category === task.category">
    <h3 class="card-title">{{ task.title }}</h3>
    <p class="card-text">{{ task.User.email }}</p>
    <div class="row justify-content-center">
      <a
        href="#"
        class="col-5 btn btn-warning text-white mx-1 my-1"
        @click.prevent="getEdit('edit')"
        >Edit</a
      >
      <a
        href="#"
        class="col-5 btn btn-warning text-white mx-1 my-1"
        @click.prevent="deleteTask()"
        >Delete</a
      >
      <a
        href="#"
        class="col-5 btn btn-warning text-white mx-1 my-1"
        v-if="category !== 'Completed'"
        @click.prevent="updateTask()"
        >Update</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["task", "category"],
  methods: {
    deleteTask() {
      let obj = {
        id: this.task.id,
      };
      return this.$emit("deleteTask", obj);
    },
    updateTask() {
      let updateCategory;
      switch (this.task.category) {
        case "Back Log":
          updateCategory = "To Do";
          break;
        case "To Do":
          updateCategory = "On Going";
          break;
        case "On Going":
          updateCategory = "Completed";
          break;
      }
      let obj = {
        id: this.task.id,
        category: updateCategory,
      };
      return this.$emit("updateTask", obj);
    },
    getEdit(page) {
      let obj = {
        id: this.task.id,
        page,
      };
      return this.$emit("getEdit", obj);
    },
  },
};
</script>

<style>
</style>