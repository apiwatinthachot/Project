<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="../assets/blackboard.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          <span class="font1">BookingNU ระบบจองห้องออนไลน์</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active" role="presentation">
              <span type="button" :to="{ name: 'blogs' }" v-on:click="navigateTo('/blogs')"><span  class="font1" style="color: #000000"><i class="fas fa-home"></i> หน้าหลัก</span></span>
            </li>
            <li class="nav-item active" role="presentation " v-if="isUserLoggedIn">
              &nbsp;&nbsp;&nbsp;<span type="button" :to="{ name: 'blogs' }" v-on:click="navigateTo('/users')"><span  class="font1" style="color: #000000"> ดูข้อมูลผู้ใช้งาน</span></span>
            </li>
           <li class="nav-item active" v-if="!isUserLoggedIn" role="presentation">
              <a type="button" v-on:click="navigateTo('/Login')">&nbsp;&nbsp;&nbsp;<span  class="font1" style="color: #000000">เข้าสู่ระบบ</span></a>
            </li>
            <li class="nav-item" v-if="isUserLoggedIn" role="presentation">
              <a type="button" v-on:click.prevent="logout">&nbsp;&nbsp;&nbsp;<span class="font1" style="color: #000000">&nbsp;&nbsp;&nbsp;ออกจากระบบ</span></a>
            </li>
            
          </ul>
          <form class="form-inline my-2 my-lg-0">
           <img
            src="../assets/sci.png"
            width="35"
            height="35"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          &nbsp;&nbsp;<img
            src="../assets/nu.png"
            width="35"
            height="35"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          </form>
        </div>
      </nav>
    </div>

    <div class="modal" v-if="showLogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>เข้าสู่ระบบ</h3>
          <form v-on:submit.prevent="clientLogin" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-3">Email:</label>
              <div class="col-md-9">
                <input
                  placeholder="email"
                  type="email"
                  v-model="email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Password:</label>
              <div class="col-md-9">
                <input
                  type="password"
                  placeholder="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                  <i class="fas fa-key"></i> เข้าสู่ระบบ
                </button>
                <button
                  v-on:click.prevent="showLogin = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="fas fa-timescircle"></i> ยกเลิก
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <div class="modal" v-if="showRegister">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>สมัครสมาชิก</h3>
          <form v-on:submit.prevent="clientRegister" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-3">Email:</label>
              <div class="col-md-9">
                <input
                  required
                  placeholder="email"
                  type="email"
                  v-model="user.email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Password:</label>
              <div class="col-md-9">
                <input
                  required
                  type="password"
                  placeholder="password"
                  v-model="user.password"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Name:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="name"
                  v-model="user.name"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-3">Lastname:</label>
              <div class="col-md-9">
                <input
                  required
                  type="text"
                  placeholder="lastname"
                  v-model="user.lastname"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button class="btn btn-success btn-sm" type="submit">
                  <i class="fas fa-key"></i> ตกลง
                </button>
                <button
                  v-on:click.prevent="showRegister = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="fas fa-timescircle"></i> ยกเลิก
                </button>
              </div>
            </div>
            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <p>{{ resultUpdated }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import UsersService from "@/services/UsersService";
export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "blogs",
      });
    },
    navigateTo (route) {
            this.$router.push(route)
        },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>
<style scoped>
.bg-light {
    background-color:#ae7ab4!important;
}
</style>