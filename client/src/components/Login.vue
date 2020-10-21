<template>
    <div>
       <main-header navsel="back"></main-header><br>
        <center><h1>เข้าสู่ระบบ</h1>
        <form v-on:submit.prevent="onLogin">
            <p><b>Username:</b> <input type="text" v-model="email" /></p>
            <p><b>Password:</b> <input type="password" v-model="password" /></p>
            <p><button class="btn btn-success-sm" style="background:#3a85a6;"   type="submit" ><span style="color:#ffffff">เข้าสู่ระบบ</span></button> 
            <button class="btn btn-success-sm" style="background:#e10027;" v-on:click="navigateTo('/blogs')"  type="submit" ><span style="color:#ffffff">ยกเลิก</span></button> </p>
            <div class="error" v-if="error">{{error}}</div>
        </form>
        </center>
    </div>
</template>
<script>
import AuthenService from '@/services/AuthenService'

export default {
    data () {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin () {
            try {
                const response = await AuthenService.login({
                    email: this.email,
                    password: this.password
                })

                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    name: 'blogs'
                })

                console.log(response)
            } catch (error) {
                console.log(error)
                this.error = error.response.data.error
                this.email = ''
                this.password = ''
            }
        },
        navigateTo(route) {
      this.$router.push(route);
    },

    }
}
</script>
<style scoped>
    .error {
        color:red;
    }
</style>