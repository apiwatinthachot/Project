<template>
  <div>
   <main-header navsel="front"></main-header><br>
    <center><h1>กรอกรายละเอียด</h1>
    <form v-on:submit.prevent="createBooking">
      <p><b>รหัสนิสิต:</b> <input type="text" v-model="booking.number" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ชื่อ:</b> <input type="text" v-model="booking.name" /></p>
      <p><b>นามสกุล:</b> <input type="text" v-model="booking.lastname" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;<b>email:</b> <input type="text" v-model="booking.email" /></p>
      <p>&nbsp;&nbsp;&nbsp;<b>ชื่อห้อง:</b> 
      <select v-model="booking.roomname">
                          <option disabled value="">เลือกห้อง</option>
                          <option v-for="blog in blogs" v-bind:key="blog.id">{{blog.title}}</option>
                        </select>
      <p><b>จำนวนคน:</b> <input type="text" v-model="booking.people" /></p>
      <p>&nbsp;&nbsp;<b>วันที่จอง:</b> <input type="date" v-model="booking.date" /></p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>เวลา:</b> <input type="time" v-model="booking.time" style="width:10%;"/>
      <b>ถึง:</b><input type="time" v-model="booking.timeout" style="width:10%;"/></p>
      <p><b>รายละเอียด:</b> <input type="text" v-model="booking.detail" /></p>
      <p><div class="back-nav" ><button   class="btn btn-success-m"  style="background:#17a2b8;" type="submit"><span class="font3" style="color:#ffffff"><b>ยืนยัน</b></span></button>
        <button class="btn btn-success-m" style="background:#cc0000;" v-on:click="navigateTo('/front')">
          <span class="font3" style="color:#ffffff"><b>ยกเลิก</b></span>
        </button></div>
    </form>
    <hr />
    </center>
  </div>
</template>
<script>
import BookingService from "@/services/BookingService";
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blogs: [],
      booking: {
        number: "",
        name: "",
        lastname: "",
        email: "",
        roomname: "",
        people: "",
        date: "",
        time: "",
        timeout: "",
        detail: "",

      },
    };
  },
  async created() {
    this.blogs = (await BlogsService.index()).data;
  },
  methods: {
    async createBooking() {
      try {
        await BookingService.post(this.booking);
        this.$router.push({
          name: "front",
        });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>