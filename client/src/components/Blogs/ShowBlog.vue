<template>
  <div>
    <main-header navsel="back"></main-header>
    <div v-if="blog">
      <div class="hero-wrapper">
        <div class="hero">
          <img src="@/assets/blackboard.png" width="230"  height="200" class="logo" style="float: left" />
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BookingNU ระบบจองห้องออนไลน์</h1>
          <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ยินดีต้อนรับ</h4>
          <p><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เข้าสู่ระบบการจองห้องออนไลน์ ตึก SC2 ภาควิชาคณิตศาสตร์ 
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ภาควิชาการคอมพิวเตอร์และเทคโนโลยีสารสนเทศ มหาวิทยาลัยนเรศวร</b></p>
        </div>
      </div>
      <div class="blog-wrapper" v-if="blog != null">
        <h1>{{ blog.title }}</h1>
        <p>
          <strong>ประเภทห้อง: </strong>:
          <span 
          class="font3" style="color:#cc0000"
           type="button"
            v-on:click.prevent="navigateTo(`/blogs?search=${blog.category}`)"
            >{{ blog.category }}</span>
        </p>
        <div class="content" v-html="blog.content"></div>
        <!-- <p>category: {{ blog.category }}</p>
<p>status: {{ blog.status }}</p> -->
      </div>
      <div class="back-nav">
        <button class="btn btn-success" v-on:click="navigateTo('/blogs')">
          <i class="fas fa-arrow-left"></i>Back..
        </button>
      </div>
      <comment-comp v-bind:blogid="blog.id" v-bind:user="user"></comment-comp>
      <transition name="fade">
        <div v-if="resultUpdated != ''" class="popup-msg">
          <p>{{ resultUpdated }}</p>
        </div>
      </transition>
      <br />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BlogsService from "@/services/BlogsService";
import UsersService from "@/services/UsersService";
import CommentComp from "@/components/Fronts/Comment";
export default {
  data() {
    return {
      blog: null,
      users: null,
    };
  },
  components: {
    CommentComp,
  },
  async created() {
    // get blog
    // check permission first
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>
<style scoped>
.hero {
  margin-top: 80px;
  border-radius: 5px;
  background: #D28BB5;
  height: 250px;
  color: #000000;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.blog-wrapper {
  margin-top: 20px;
  padding: 40px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.back-nav {
  margin-top: 20px;
  text-align: center;
}
.blog-wrapper h1 {
  text-align: center;
  font-family: "kanit";
  padding-bottom: 50px;
}
.blog-wrapper p {
  font-family: "kanit";
  font-size: 1.4em;
  padding-bottom: 20px;
}
.blog-wrapper .content {
  font-family: "kanit";
  font-size: 1.2em;
}
</style>