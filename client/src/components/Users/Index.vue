<template>
  <div>
    <main-header navsel="back"></main-header>
    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ดูข้อมูลผู้ใช้งาน</h2>
    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;จำนวนผู้ใช้งาน {{ users.length }}</h4>
    <p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  class="btn btn-success-m" style="background:#ec8f28;" v-on:click="navigateTo('/user/create')"><span class="font3" style="color:#ffffff"><b>สร้างผู้ใช้งาน</b></span></button>
    </p>

    <div v-for="user in users" v-bind:key="user.id">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: {{ user.id }}</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชื่อ-นามสกุล : {{ user.name }} - {{ user.lastname }}</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: {{ user.email }}</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: {{ user.password }}</p>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m" style="background:#2d7309;" v-on:click="navigateTo('/user/' + user.id)"><span class="font3" style="color:#ffffff"><b>ดูข้อมูล</b></span></button>
      <button class="btn btn-success-m" style="background:#17a2b8;" v-on:click="navigateTo('/user/edit/' + user.id)"><span class="font3" style="color:#ffffff"><b>
        แก้ไขข้อมูล </b></span>
      </button>
      <button class="btn btn-success-m" style="background:#cc0000;" v-on:click="deleteUser(user)"><span class="font3" style="color:#ffffff"><b>ลบข้อมูล</b></span></button>
      <button class="btn btn-success-m" style="background:#ec8f28;" v-on:click="logout"><span class="font3" style="color:#ffffff"><b>Logout</b></span></button>
      <hr />
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    this.users = (await UsersService.index()).data;
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    async deleteUser(user) {
      try {
        await UsersService.delete(user);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>