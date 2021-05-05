<template>
  <div class="container-fluid">
    <!-- Edit Task Form -->
    <div class="row my-5 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Edit Task</div>
        <form @submit.prevent="editTask">
          <div class="mb-3">
            <label for="add-task" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              v-model="dataEdit.title"
              placeholder="Title"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Edit Task</button>
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
    <!-- End of Edit Task Form -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      title_task: "",
    };
  },
  props: ["dataEdit"],
  methods: {
    editTask() {
      let obj = {
        id: this.dataEdit.id,
        title: this.dataEdit.title,
      };
      return this.$emit("editTask", obj);
    },
    changePage(page) {
      return this.$emit("changePage", page);
    },
  },
};
</script>

<style>
</style>