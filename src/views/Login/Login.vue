<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo_.png" width="186" height="30" alt="" />
    </div>
    <div class="time">
      <div>{{ today.year }}<span>y</span></div>
      <div>{{ today.month }}<span>m</span></div>
      <div>{{ today.date }}<span>d</span></div>
    </div>
    <div class="word">
      <div>We will</div>
      <div>Continue</div>
      <div>To work hard.</div>
    </div>
    <div class="botton">
      <vs-button color="warn" relief block @click="showLoginDia()">
        <i class='bx bx-log-in-circle'></i>
        登录
      </vs-button>
    </div>

    <vs-dialog v-model="login_dia" auto-width>
      <template #header>
        <h4 class="not-margin"><b>Login</b></h4>
      </template>

      <div class="con-form">
        <vs-input v-model="form.u_id" placeholder="User">
          <template #icon>
            <i class="bx bxs-user"></i>
          </template>
        </vs-input>
        <vs-input type="password" v-model="form.password" placeholder="Password">
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="remember">Remember me</vs-checkbox>
        </div>
      </div>
      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="goLogin()"> Log In </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { login } from '@/api/_/admin_user'
export default {
  data() {
    return {
      login_dia: false,
      form: {
        u_id: "",
        password: ""
      },
      remember: false,
      today: {
        year: new Date().getFullYear().toString().slice(2),
        month: (new Date().getMonth() + 1).toString().length < 2 ? (new Date().getMonth() + 1).toString().padStart(2, '0') : new Date().getMonth() + 1,
        date: new Date().getDate().toString().length < 2 ? new Date().getDate().toString().padStart(2, '0') : new Date().getDate()
      }
    };
  },
  methods: {
    showLoginDia() {
      this.login_dia = true;
      if (localStorage.getItem('remember')) {
        this.form = {
          u_id: localStorage.getItem('user'),
          password: localStorage.getItem('password')
        }
        this.remember = Boolean(localStorage.getItem('remember'))
      } else {
        this.form = {
          u_id: '',
          password: ''
        }
        this.remember = false
      }
    },
    goLogin() {
      login(this.form).then(res => {
        console.log(res);
        if (res.data.status === 200) {
          document.cookie = 'cookie_value=' + res.data.token
          if (this.remember) {
            localStorage.setItem('user', this.form.u_id)
            localStorage.setItem('password', this.form.password)
            localStorage.setItem('remember', this.remember)
          } else {
            localStorage.removeItem('user')
            localStorage.removeItem('password')
            localStorage.removeItem('remember')
          }
          const loading = this.$vs.loading({
            type: "waves",
            text: "Loading...",
          })
          setTimeout(() => {
            this.$router.push({ path: '/' })
            loading.close();
          }, 3000);
          return;
        } else {
          this.$vs.notification({
            color: "warn",
            position: "top-center",
            text:res.data.message,
            duration: "3000",
            square: true,
            flat: true,
            icon: `<i class='bx bx-error' ></i>`,
          });
        }
      }).catch(() => {
        console.log('服务器连接失败!');
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import 'Login.less';
</style>

