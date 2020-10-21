<template>
  <div>
    <main-header navsel="back"></main-header><br>
    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อมูลการจองห้อง</h2>
    <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;จำนวนการจองห้อง {{ bookings.length }}</h4>

    <div v-for="booking in bookings" v-bind:key="booking.id">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>id:</b> {{ booking.id }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>รหัสนิสิต:</b> {{ booking.number }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ชื่อ-นามสกุล :</b> {{ booking.name }} - {{ booking.lastname }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>email:</b> {{ booking.email }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ชื่อห้อง:</b> {{ booking.roomname }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>จำนวนคน:</b> {{ booking.people }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>วันที่จอง:</b> {{ booking.date }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>เวลา:</b> {{ booking.time }}</button>
      &nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ถึง:</b> {{ booking.timeout }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>รายละเอียด:</b> {{ booking.detail }}</button></p>

      
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button  class="btn btn-success-m" style="background:#2d7309;" v-on:click="navigateTo('/booking/edit/'+booking.id)"><span class="font3" style="color:#ffffff"><b>ดูข้อมูล</b></span></button>
      <button  class="btn btn-success-m" style="background:#17a2b8;" v-on:click="logout"><span class="font3" style="color:#ffffff"><b>Logout</b></span></button>
      <button  class="btn btn-success-m" style="background:#cc0000;" v-on:click="deleteBooking(booking)"><span class="font3" style="color:#ffffff"><b>ลบข้อมูล</b></span></button>
      <button  class="btn btn-success-m" style="background:#ec8f28;" v-on:click="navigateTo('/blogs')"><span class="font3" style="color:#ffffff"><b>กลับ</b></span></button>
      <br><br>
      
    </div>
  </div>
</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      bookings: [],
      booking:{
          status: "",
      }
    };
  },
  async created() {
    this.bookings = (await BookingService.index()).data;
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
    async editBorrow() {
      try {
        await BookingService.put(this.booking);
      } catch (err) {
        console.log(err);
      }
    },
    async deleteBooking(booking) {
      try {
        await BookingService.delete(booking);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.bookings = (await BookingService.index()).data;
    },
    navigateTo(route) {
      this.$router.push(route);
  },
  },
};
</script>
<style scoped>
</style>