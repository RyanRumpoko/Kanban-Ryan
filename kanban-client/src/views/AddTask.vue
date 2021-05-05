<template>
  <div class="container-fluid">
    <!-- Add Task Form -->
    <div class="row my-5 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Add Task</div>
        <form @submit.prevent="postTask">
          <div class="mb-3">
            <label for="add-task" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              v-model="title_task"
              placeholder="Title"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Task</button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="changePage('home')"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <!-- End of Add Task Form -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title_task: "",
    };
  },
  methods: {
    postTask() {
      let obj = {
        title: this.title_task,
      };
      return this.$emit("postTask", obj);
    },
    changePage(page) {
      return this.$emit("changePage", page);
    },
  },
};
</script>

<style>
</style>