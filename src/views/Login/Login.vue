<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo_.png" width="186" height="30" alt="" />
    </div>
    <div class="time">
      <div>23<span>y</span></div>
      <div>11<span>m</span></div>
      <div>23<span>d</span></div>
    </div>
    <div class="word">
      <div>We will</div>
      <div>Continue</div>
      <div>To work hard.</div>
    </div>
    <div class="botton">
      <vs-button color="warn" relief block @click="showLoginDia()">
        <i class='bx bx-log-in-circle' ></i>
        登录
      </vs-button>
    </div>

    <vs-dialog v-model="login_dia">
      <template #header>
        <h4 class="not-margin"><b>Login</b></h4>
      </template>

      <div class="con-form">
        <vs-input v-model="user" placeholder="User">
          <template #icon>
            <i class="bx bxs-user"></i>
          </template>
        </vs-input>
        <vs-input type="password" v-model="password" placeholder="Password">
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
          <vs-button block @click="login()"> Log In </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_dia: false,
      user: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    showLoginDia() {
      this.login_dia = true;
	  if(localStorage.getItem('remember')){
		this.user = localStorage.getItem('user')
		this.password = localStorage.getItem('password')
		this.remember = Boolean(localStorage.getItem('remember'))
	  }else{
		this.user = ''
		this.password = ''
		this.remember = false
	  }
    },
    login() {
      let text = "";
      if (this.user === "") {
        text = "Please Enter Your Username";
      } else {
        if (this.password === "") {
          text = "Please Enter Your Password";
        } else {
          if (this.user != "admin") {
            text = "Please Enter The Correct Username";
          } else {
            if (this.password != "admin@123") {
              text = "Please Enter The Correct Username";
            } else {
				if(this.remember){
					localStorage.setItem('user',this.user)
					localStorage.setItem('password',this.password)
					localStorage.setItem('remember',this.remember)
				}else{
					localStorage.removeItem('user')
					localStorage.removeItem('password')
					localStorage.removeItem('remember')
				}
              const loading = this.$vs.loading({
                type: "waves",
                text: "Loading...",
              });
              setTimeout(() => {
                this.$router.push({path:'/'})
                loading.close();
              }, 3000);
              return;
            }
          }
        }
      }
      this.$vs.notification({
        color: "warn",
        position: "top-center",
        text,
        duration: "4000",
        square: true,
        flat: true,
        icon: `<i class='bx bx-error' ></i>`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "show_date";
  src: url("../../font/ShowDate.otf");
}
.login {
  width: 100%;
  height: 100vh;
  background-color: #fffef8;
  .logo {
    width: 186px;
    height: 50px;
    margin: auto;
    padding-top: 30px;
  }
  .time {
    display: flex;
    flex-direction: row;
    font-family: "show_date";
    justify-content: space-evenly;
    div {
      font-size: 400px;
      color: #cccbc6;
    }
    span {
      font-size: 100px;
      color: #cccbc6;
    }
  }
  .word {
    color: #eb5757;
    font-size: 60px;
    font-family: "show_time";
    position: absolute;
    top: 45%;
    left: 20%;
  }
  .botton {
    width: 15%;
    position: absolute;
    top: 70%;
    right: 20%;
  }
}
</style>
<style lang="stylus">
getColor(vsColor, alpha = 1)
    unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
    unquote("var(--vs-"+var+")")
.not-margin
  margin 0px
  font-weight normal
  padding 10px
.con-form
  width 100%
  .flex
    display flex
    align-items center
    justify-content space-between
    a
      font-size .8rem
      opacity .7
      &:hover
        opacity 1
  .vs-checkbox-label
    font-size .8rem
  .vs-input-content
    margin 10px 0px
    width calc(100%)
    .vs-input
      width 100%
.footer-dialog
  display flex
  align-items center
  justify-content center
  flex-direction column
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>
