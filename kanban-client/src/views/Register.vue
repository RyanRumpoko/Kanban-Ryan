<template>
  <div class="container-fluid">
    <div class="row mt-5 justify-content-center text-danger">
      {{ errorMsg }}
    </div>
    <!-- Register Form -->
    <div class="row my-1 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Register</div>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="email-register" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email_register"
              placeholder="ryan@mail.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password-register" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_register"
              placeholder="password123"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="changePage('login')"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email_register: "",
      password_register: "",
    };
  },
  props: ["errorMsg"],
  methods: {
    register() {
      let obj = {
        email: this.email_register,
        password: this.password_register,
      };
      this.email_register = "";
      this.password_register = "";
      return this.$emit("register", obj);
    },
    changePage(page) {
      return this.$emit("changePage", page);
    },
  },
};
</script>

<style>
</style>