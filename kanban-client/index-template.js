const app = new Vue({
  el: "#app",
  data: {
    page: "login",
    dataLogin: {
      email: "",
      password: ""
    },
    dataTask: {
      title: ""
    }
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    auth() {
      if (!localStorage.getItem("token")) {
        this.page = "login"
      } else {
        this.page = "home"
        this.getTask()
      }
    },
    login() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email: this.dataLogin.email,
          password: this.dataLogin.password
        }
      })
        .then((data) => {
          localStorage.setItem("token", data.data.accessToken)
          this.auth()
        })
        .catch((err) => {
          console.log(err);
        })
    },
    register() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
          email: this.dataLogin.email,
          password: this.dataLogin.password
        }
      })
        .then((data) => {
          console.log(data);
          this.auth()
        })
        .catch((err) => {
          console.log(err);
        })
    },
    logout() {
      localStorage.removeItem("token")
      this.auth()
    },
    getTask() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/tasks',
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    postTask() {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/tasks',
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          title: this.dataTask.title
        }
      })
        .then((data) => {
          console.log(data);
          this.auth()
        })
        .catch((err) => {
          console.log(err);
        })
    },
  },
  beforeCreate: function () { },
  created: function () {
    this.auth()
  },
  beforeMount: function () { },
  mounted: function () { }
})