<template>
  <div>
    <Nav
      v-if="page === 'home' || page === 'add' || page === 'edit'"
      @logout="logout"
    ></Nav>
    <Home
      v-if="page === 'home'"
      :categories="categories"
      :tasks="tasks"
      :errorMsg="errorMsg"
      @changePage="changePage"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
      @getEdit="getEdit"
    ></Home>
    <Login
      v-if="page === 'login'"
      :errorMsg="errorMsg"
      :auth="auth"
      @login="login"
      @changePage="changePage"
    ></Login>
    <Register
      v-if="page === 'register'"
      :errorMsg="errorMsg"
      @register="register"
      @changePage="changePage"
    ></Register>
    <AddTask
      v-if="page === 'add'"
      @postTask="postTask"
      @changePage="changePage"
    ></AddTask>
    <EditTask
      v-if="page === 'edit'"
      :dataEdit="dataEdit"
      @editTask="editTask"
    ></EditTask>
  </div>
</template>

<script>
import axios from "axios";

import Nav from "./views/Nav";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AddTask from "./views/AddTask";
import EditTask from "./views/EditTask";

export default {
  data() {
    return {
      page: "",
      categories: ["Back Log", "To Do", "On Going", "Completed"],
      tasks: [],
      dataEdit: {},
      errorMsg: "",
      baseUrl: "https://kanban-ryan.herokuapp.com/",
    };
  },
  components: {
    Nav,
    Home,
    Login,
    Register,
    AddTask,
    EditTask,
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    auth() {
      if (!localStorage.getItem("token")) {
        this.page = "login";
      } else {
        this.page = "home";
        this.getTask();
      }
    },
    login(payload) {
      axios({
        method: "POST",
        url: this.baseUrl + "login",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.accessToken);
          this.auth();
        })
        .catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.message;
            console.log(err.response.data);
            setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          }
        });
    },
    register(payload) {
      axios({
        method: "POST",
        url: this.baseUrl + "register",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((data) => {
          this.auth();
        })
        .catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.errors[0];
            console.log(err.response.data);
            setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          }
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.auth();
    },
    getTask() {
      axios({
        method: "GET",
        url: this.baseUrl + "tasks",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((data) => {
          this.tasks = data.data;
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    },
    postTask(payload) {
      axios({
        method: "POST",
        url: this.baseUrl + "tasks",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          title: payload.title,
        },
      })
        .then(() => {
          this.auth();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        });
    },
    deleteTask(payload) {
      axios({
        method: "DELETE",
        url: this.baseUrl + "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(() => {
          console.log("Data has been deleted");
          this.getTask();
        })
        .catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.message;
            console.log(err.response.data);
            setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          }
        });
    },
    updateTask(payload) {
      axios({
        method: "PATCH",
        url: this.baseUrl + "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          category: payload.category,
        },
      })
        .then((data) => {
          this.getTask();
        })
        .catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.message;
            console.log(err.response.data);
            setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          }
        });
    },
    getEdit(payload) {
      axios({
        method: "GET",
        url: this.baseUrl + "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((data) => {
          this.dataEdit = data.data;
          this.changePage(payload.page);
        })
        .catch((err) => {
          if (err.response) {
            this.errorMsg = err.response.data.message;
            console.log(err.response.data);
            setTimeout(() => {
              this.errorMsg = "";
            }, 5000);
          }
        });
    },
    editTask(payload) {
      axios({
        method: "PUT",
        url: this.baseUrl + "tasks/" + payload.id,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          title: payload.title,
        },
      })
        .then((data) => {
          this.auth();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          }
        })
        .then(() => {
          this.title_task = "";
        });
    },
  },
  created() {
    this.auth();
  },
};
</script>

<style scoped>
</style>