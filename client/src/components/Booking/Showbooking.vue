<template>
  <div>
    <main-header navsel="back"></main-header>
    
    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>id:</b> {{ booking.id }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>รหัสนิสิต:</b> {{ booking.number }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ชื่อ-นามสกุล :</b> {{ booking.name }} - {{ booking.lastname }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>email:</b> {{ booking.email }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ชื่อห้อง:</b> {{ booking.roomname }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>จำนวนคน:</b> {{ booking.people }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>วันที่จอง:</b> {{ booking.date }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>เวลา:</b> {{ booking.time }}</button>
      &nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>ถึง: </b>{{ booking.timeout }}</button></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-success-m"   style="background:#ced7d4;"><b>รายละเอียด:</b> {{ booking.detail }}</button></p>


<form v-on:submit.prevent="editUser">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <select v-model="booking.status">
                          <option disabled value="">เลือกการกระทำ</option>
                          <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                          <option value="อนุมัติแล้ว">อนุมัติแล้ว</option>
                          <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button  class="btn btn-success-m" style="background:#2d7309;" type="submit"><span class="font3" style="color:#ffffff"><b>ตกลง</b></span></button>
                        <button  class="btn btn-success-m" style="background:#cc0000;" v-on:click="navigateTo('/Bookings')"> <span class="font3" style="color:#ffffff"><b>กลับ</b> </span></button></form><br>
  </div>
</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      booking: {
        status: "",
      },
    };
  },
  async created() {
    try {
      let bookingId = this.$route.params.bookingId;
      this.booking = (await BookingService.show(bookingId)).data;
    } catch (error) {
      console.log(error);
    }
    
  }, methods: {
  navigateTo(route) {
      this.$router.push(route);
  },
  async editUser() {
      try {
        await BookingService.put(this.booking);
        this.$router.push({
          name: "booking-Show",
        });
      } catch (err) {
        console.log(err);
      }
    },
    },
};
</script>
<style scoped>
</style>









<!--<template>
  <div>
    <main-header navsel="back"></main-header>
    <h1>Show User</h1>
    <p>id : {{booking.id}}</p>
    <p>รหัสนิสิต: {{ booking.number }}</p>
    <p>ชื่อ: {{ booking.name }}</p>
    <p>นามสกุล: {{ booking.lastname }}</p>
    <p>email: {{ booking.email }}</p>
    <p>ชื่อห้อง: {{ booking.roomname }}</p>
    <p>จำนวนคน: {{ booking.people }}</p>
    <p>วันที่จอง: {{ booking.date }}</p>
    <p>เวลา: {{ booking.time }} ถึง: {{ booking.timeout }}</p>
    <p>รายละเอียด: {{ booking.detail }}</p>
  </div>
</template>
<script>
import BookingService from "@/services/BookingService";

export default {
  data() {
    return {
      booking: null,
    };
  },
  async created() {
    try {
      let bookingId = this.$route.params.bookingId;
      this.bookingId = (await BookingService.show(BookingId)).data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped>
</style>-->