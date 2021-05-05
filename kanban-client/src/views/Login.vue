<template>
  <div class="container-fluid">
    <div class="row mt-5 align-self-center text-danger">
      {{ errorMsg }}
    </div>
    <!-- Login Page -->
    <div class="row my-1 justify-content-center">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="h3">Login</div>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email_login" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="email_login"
              placeholder="ryan@mail.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password_login" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password_login"
              placeholder="password123"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="changePage('register')"
          >
            Register
          </button>
          <button
            v-google-signin-button="clientId"
            class="google-signin-button btn btn-primary my-1"
          >
            Login with Google
          </button>
        </form>
      </div>
    </div>
    <!-- End of Login /Page -->
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";

export default {
  data() {
    return {
      email_login: "",
      password_login: "",
      clientId:
        "109984424561-97edhu97887mh6b18qpumu8mknuvomhv.apps.googleusercontent.com",
    };
  },
  directives: {
    GoogleSignInButton,
  },
  props: ["errorMsg", "auth"],
  methods: {
    login() {
      let obj = {
        email: this.email_login,
        password: this.password_login,
      };
      this.email_login = "";
      this.password_login = "";
      return this.$emit("login", obj);
    },
    changePage(page) {
      return this.$emit("changePage", page);
    },
    OnGoogleAuthSuccess(idToken) {
      const id_token = idToken;
      console.log(id_token, "acc token GOOGLE");
      axios({
        method: "POST",
        url: "https://kanban-ryan.herokuapp.com/googleLogin",
        data: {
          id_token,
        },
      })
        .then((result) => {
          console.log(result);
          localStorage.setItem("token", result.data.accessToken);
          this.auth();
          // console.log(result)
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    },
    OnGoogleAuthFail(error) {
      if (error.response) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style>
</style>