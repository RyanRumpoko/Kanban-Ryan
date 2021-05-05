<template>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">KANBAN</a>
      <button type="button" class="btn btn-danger" @click.prevent="logout()">
        Log Out
      </button>
    </div>
  </nav>
  <!-- End of Navbar -->
</template>

<script>
export default {
  methods: {
    logout() {
      return this.$emit("logout");
    },
  },
};
</script>

<style>
</style>