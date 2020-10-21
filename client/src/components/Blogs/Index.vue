<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="container">
      <div class="blog-header">
        <br><h2>ค้นหาห้อง</h2>
        <div>
          <form class="form-inline form-search">
            <div class="form-group">
              <div class="input-group">
                <input
                  type="text"
                  v-model="search"
                  class="form-control"
                  id="exampleInputAmount"
                  placeholder="Search"
                />
                <div class="input-group-addon">
                  <i class="fas fasearch"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="create-blog">
          
           <span class="font2"><strong> จำนวนห้อง: </strong> {{ results.length }}</span>
        </div>
   
        <ul class="categories">
        <button
            class="btn btn-success btn-sm"
            v-on:click="navigateTo('/blog/create')"
          >
           <span class="font3" style="color:#ffffff"> เพิ่มห้อง </span>
          </button>
        <button class="btn  btn-sm" type="reset" style="background:#ff3333;" >
            <a type="button" v-on:click.prevent="setCategory('')" ><span class="font3" style="color:#ffffff">ล้างข้อมูล</span></a>
          </button>
          <button class="btn  btn-sm" type="reset" style="background:#d54282;">
            <a type="button" v-on:click.prevent="navigateTo('/Bookings')" ><span class="font3" style="color:#ffffff">ข้อมูลการจองห้อง</span></a>
          </button>

        </ul>
        <div class="clearfix"></div>
      </div>
      <transition-group name="fade">
        <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
          <!-- <p>id: {{ blog.id }}</p> -->
          <div class="blog-pic">
            <!-- <transition name="fade"> -->
            <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
              <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
            </div>
            <!-- </transition> -->
          </div>
          
          <h3>{{ blog.title }}</h3>

          <div class="blog-info">
            <p><strong>ประเภทห้อง: </strong> {{ blog.category }}</p>
            <p><strong>รายละเอียด:</strong>{{ blog.status }}</p>
            <p><strong>ความจุ(คน): </strong>{{ blog.people }} คน</p>
            <!-- <p>status: {{ blog.status }}</p> -->
            <p>
              <button
                class="btn btn-sm btn-info"
                v-on:click="navigateTo('/blog/' + blog.id)"
              >
                <i class="far fa-eye"></i>
                เพิ่มเติม..
              </button>
              <button
                class="btn btn-sm " style="background:#f88307;"
                v-on:click="navigateTo('/blog/edit/' + blog.id)"
              >
                <span style="color:#ffffff">แก้ไขข้อมูล</span>
              </button>
              <button
                class="btn btn-sm btn-danger"
                v-on:click="deleteBlog(blog)"
              >
                ลบข้อมูล
              </button>
            </p>
          </div>
          <div class="clearfix"></div>
        </div>
      </transition-group>
      <div v-if="blogs.length === 0 && loading === false" class="emptyblog">
        *** ไม่มีข้อมูล ***
      </div>
      <div id="blog-list-bottom">
        <div
          class="blog-load-finished"
          v-if="blogs.length === results.length && results.length > 0"
        >
 <span class="font2">โหลดข้อมูลครบแล้ว</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "blogs",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.results = [];
        this.loading = true;
        this.results = (await BlogsService.index(value)).data;
        this.appendResults();
        this.results.forEach((blog) => {
          if (this.category.length > 0) {
            // console.log(this.category.indexOf(blog.category))
            if (this.category.indexOf(blog.category) === -1) {
              this.category.push(blog.category);
            }
          } else {
            this.category.push(blog.category);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      category: [],
      loading: false,
    };
  },
  // async created () {
  // this.blogs = (await BlogsService.index()).data
  // },
  methods: {
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        await BlogsService.delete(blog);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    },
    setCategory(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
  },
  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
};
</script>
<style scoped>
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.blog-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: #451551;
  color: white;
}
.categories {
  margin-top: 10px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}

.categories li.clear a {
 
  color: white;
}
.create-blog {
  margin-top: 10px;
}
</style>
