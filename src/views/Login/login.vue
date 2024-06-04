<template>
  <div class="login" :style="themeStyle">
    <!-- logo -->
    <div class="header_view">
      <img v-if="!themeCode" src="@/assets/common/lightLogo.png" />
      <img v-else src="@/assets/common/darkLogo.png" />
      <h3>LeaRneR</h3>
    </div>
    <!-- 整体内容 -->
    <div class="main_view">
      <div class="left_view">
        <p>We will</p>
        <p>Continue</p>
        <p>To working hard.</p>
        <span>{{ year }}y</span>
        <span>{{ month }}m</span>
        <span>{{ date }}d</span>
        <!-- 登录开始按钮 -->
        <vs-button
          size="large"
          @click="
            dialogCode = true;
            get_code();
          "
        >
          <img src="@/assets/login/loginButton.png" /> Log In
        </vs-button>
      </div>
      <div class="right_view">
        <div class="Java">
          <vs-checkbox> Java </vs-checkbox>
          <vs-checkbox> Node.js </vs-checkbox>
          <vs-checkbox> Python </vs-checkbox>
          <vs-checkbox> Go </vs-checkbox>
          <vs-checkbox> PHP </vs-checkbox>
          <vs-checkbox> Ruby </vs-checkbox>
        </div>

        <div class="React">
          <img src="@/assets/login/React.png" alt="" />
          <p><span>React</span>用于构建 Web 和原生交互界面的库</p>
        </div>

        <div class="JavaScript">
          <vs-switch color="#1A5CFF">
            <template #off> JavaScript </template>
            <template #on> TypeScript </template>
          </vs-switch>
        </div>

        <div class="Angular">
          <img src="@/assets/login/Angular.png" alt="" />
          <p><span>Angular</span>构建未来的 Web 开发框架</p>
        </div>

        <div class="Vue">
          <img src="@/assets/login/Vue.png" alt="" />
          <p><span>Vue</span>是一套用于构建用户界面的渐进式框架</p>
        </div>

        <div class="HomeLogo">
          <img v-show="!themeCode" src="@/assets/login/light.png" alt="" />
          <img v-show="themeCode" src="@/assets/login/dark.png" alt="" />
        </div>

        <div class="HTML">
          <img src="@/assets/login/HTML.png" alt="" />
          <img src="@/assets/login/CSS.png" alt="" />
        </div>

        <div class="UI">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> UI </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr>
                <vs-td> Element </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td> Ant Design </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td> Vant 4 </vs-td>
              </vs-tr>
              <vs-tr>
                <vs-td> Vuesax </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>

        <div class="Less">
          <vs-radio>Less</vs-radio>
          <vs-radio>Sass</vs-radio>
          <vs-radio>Stylus</vs-radio>
          <vs-radio>PostCSS</vs-radio>
        </div>

        <div class="Compiler">
          <vs-input loading disabled placeholder="HBuilderX" />
          <vs-input loading disabled placeholder="Vs code" />
          <vs-input loading disabled placeholder="Intellij IDEA" />
          <vs-input loading disabled placeholder="Navicat Premium" />
        </div>

        <div class="IOS">
          <img v-if="!themeCode" src="@/assets/login/lightIOS.png" alt="" />
          <img v-else src="@/assets/login/darkIOS.png" alt="" />
        </div>

        <div class="Android">
          <img v-if="!themeCode" src="@/assets/login/lightAndroid.png" alt="" />
          <img v-else src="@/assets/login/darkAndroid.png" alt="" />
        </div>

        <div class="Windows">
          <img v-if="!themeCode" src="@/assets/login/lightWindows.png" alt="" />
          <img v-else src="@/assets/login/darkWindows.png" alt="" />
        </div>

        <div class="dot">
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
          <span>·</span>
        </div>

        <div class="pulse">
          <img src="@/assets/login/pulse.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 切换主题 -->
    <div class="footer_view">
      <div class="Theme">
        <vs-switch v-model="themeCode">
          <template #circle>
            <img v-if="!themeCode" src="@/assets/login/darkSwitch.png" />
            <img v-else src="@/assets/login/lightSwitch.png" />
          </template>
        </vs-switch>
      </div>
    </div>

    <!-- 登录弹窗 -->
    <transition name="dialog">
      <div class="dialog_view" v-show="dialogCode">
        <div class="goLogin">
          <div class="close" @click="dialogCode = false">
            <vs-button icon border>
              <img src="@/assets/common/addClose.png" />
            </vs-button>
          </div>
          <div class="header">Log In</div>
          <div class="main">
            <vs-input
              primary
              placeholder="User name"
              v-model="form['username']"
            >
              <template #icon>
                <img v-if="!themeCode" src="@/assets/login/lightUser.png" />
                <img v-else src="@/assets/login/darkUser.png" />
              </template>
            </vs-input>
            <vs-input
              primary
              type="password"
              placeholder="Password"
              v-model="form['password']"
            >
              <template #icon>
                <img v-if="!themeCode" src="@/assets/login/lightLock.png" />
                <img v-else src="@/assets/login/darkLock.png" />
              </template>
            </vs-input>
            <div class="code">
              <vs-input primary placeholder="Auth code" v-model="form['code']">
                <template #icon>
                  <img v-if="!themeCode" src="@/assets/login/lightCode.png" />
                  <img v-else src="@/assets/login/darkCode.png" />
                </template>
              </vs-input>
              <div v-html="authSvgSrc" @click="get_code()"></div>
            </div>
            <vs-checkbox v-model="form['remember']">
              <template #icon>
                <img v-if="!themeCode" src="@/assets/common/lightCheck.png" />
                <img v-else src="@/assets/common/darkCheck.png" />
              </template>
              Remember me
            </vs-checkbox>
          </div>
          <div class="footer">
            <vs-button icon @click="log_in()">
              <img src="@/assets/login/loginButton.png" />
            </vs-button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
/* 引入主题混入 */
import theme from "@/mixin/theme.js";
/* 引入log api */
import { getCode, login } from "@/api/log";
export default {
  name: "login",
  mixins: [theme],
  data() {
    return {
      year: new Date().getFullYear().toString().slice(2) /* 年份 */,
      month: (new Date().getMonth() + 1).toString().padStart(2, "0") /* 月份 */,
      date: new Date().getDate().toString().padStart(2, "0") /* 日期 */,
      authSvgSrc: "" /* 验证码 svg 路径 */,
      dialogCode: false /* 登录弹窗显示参数 */,
      form: {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
        code: "",
        remember: Boolean(localStorage.getItem("remember")),
      } /* 用户登录表单 */,
    };
  },
  methods: {
    /* 获取验证码 */
    get_code() {
      getCode().then((res) => {
        this.authSvgSrc = res.data;
      });
    },
    /* 登录 */
    log_in() {
      login(this.form).then((res) => {
        if (res.data.status === 200) {
          if (this.form["remember"]) {
            localStorage.setItem("username", this.form["username"]);
            localStorage.setItem("password", this.form["password"]);
            localStorage.setItem("remember", this.form["remember"]);
            this.$vs.notification({
              flat: true,
              color: "primary",
              progress: "auto",
              position: "top-center",
              duration: "2000",
              buttonClose:false,
              title: `${res.data.message}`,
            });
            setTimeout(() => {
              this.dialogCode = false;
              this.$router.push({ path: "/" });
            }, 2000);
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("remember");
          }
        } else {
          this.$vs.notification({
            flat: true,
            color: "warn",
            progress: "auto",
            position: "top-center",
            duration: "2000",
            title: `${res.data.message}`,
          });
        }
      });
    },
  },
};
</script>

<style lang='less'>
@import "login.less";
</style>