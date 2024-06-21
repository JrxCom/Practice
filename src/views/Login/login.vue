<template>
  <div class="login_view" :style="themeStyle">
    <!-- logo -->
    <div class="header_view">
      <img src="@/assets/common/logo.png" />
      <h3>LeaRneR</h3>
    </div>
    <!-- 整体内容 -->
    <div class="main_view">
      <div class="left_view">
        <p>We will</p>
        <p>Continue</p>
        <p>To working hard.</p>
        <span class="date_view">{{ year }}y</span>
        <span class="date_view">{{ month }}m</span>
        <span class="date_view">{{ date }}d</span>
        <!-- 登录开始按钮 -->
        <div
            class="login_btn"
            @click="
              dialogCode = true;
              get_code();
            "
          >
          <img width="20" height="20" src="@/assets/login/login.png" alt="">
          Log in
        </div>
      </div>
      <div class="right_view">
        <div class="Java">
          <el-checkbox> Java </el-checkbox>
          <el-checkbox> Node.js </el-checkbox>
          <el-checkbox> Python </el-checkbox>
          <el-checkbox> Go </el-checkbox>
          <el-checkbox> PHP </el-checkbox>
          <el-checkbox> Ruby </el-checkbox>
        </div>

        <div class="React">
          <img src="@/assets/login/React.png" alt="" />
          <p><span>React</span>用于构建 Web 和原生交互界面的库</p>
        </div>

        <div class="JavaScript">
          <el-switch
            active-text="JavaScript"
            inactive-text="TypeScript"
            v-model="switchValue"
          >
          </el-switch>
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
          <el-table :data="tableValue" size="mini">
            <el-table-column type="selection"> </el-table-column>
            <el-table-column prop="UI" label="UI"> </el-table-column>
          </el-table>
        </div>

        <div class="Less">
          <el-radio v-model="radioValue" label="Less">Less</el-radio>
          <el-radio v-model="radioValue" label="Sass">Sass</el-radio>
          <el-radio v-model="radioValue" label="Stylus">Stylus</el-radio>
          <el-radio v-model="radioValue" label="PostCSS">PostCSS</el-radio>
        </div>

        <div class="Compiler">
          <el-input
            placeholder="HBuilderX"
            suffix-icon="el-icon-star-off"
            :disabled="true"
            size="small"
          >
          </el-input>
          <el-input
            placeholder="Vs Code"
            suffix-icon="el-icon-star-off"
            :disabled="true"
            size="small"
          >
          </el-input>
          <el-input
            placeholder="Intellij IDEA"
            suffix-icon="el-icon-star-off"
            :disabled="true"
            size="small"
          >
          </el-input>
          <el-input
            placeholder="Navicat Premium"
            suffix-icon="el-icon-star-off"
            :disabled="true"
            size="small"
          >
          </el-input>
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
    <!-- 登录弹窗 -->
    <el-collapse-transition>
      <div class="dialog_view" v-show="dialogCode">
        <div class="card_view">
          <div class="close_view" @click="dialogCode = false">
            <el-link type="primary" :underline="false"
              ><i class="el-icon-close"></i
            ></el-link>
          </div>
          <div class="title_view">Log In</div>
          <div class="main_view">
            <el-input
              placeholder="User name"
              v-model="form['username']"
              prefix-icon="el-icon-user"
              size="small"
              @keyup.enter.native="log_in()"
            >
            </el-input>

            <el-input
              placeholder="password"
              v-model="form['password']"
              prefix-icon="el-icon-lock"
              show-password
              size="small"
              @keyup.enter.native="log_in()"
            >
            </el-input>

            <div class="code">
              <el-input
                placeholder="Code"
                v-model="form['code']"
                prefix-icon="el-icon-c-scale-to-original"
                size="small"
                @keyup.enter.native="log_in()"
              >
              </el-input>
              <div v-html="authSvgSrc" @click="get_code()"></div>
            </div>
            <el-checkbox v-model="form['remember']"> Remember me </el-checkbox>
          </div>
          <div class="footer_view">
            <div class="login_button" @click="log_in()">
              <img width="14" height="14" src="@/assets/login/login.png" alt="">
            </div>
          
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
/* 引入log api */
import { getCode, login } from "@/api/log";
export default {
  name: "login",
  data() {
    return {
      year: new Date().getFullYear().toString().slice(2) /* 年份 */,
      month: (new Date().getMonth() + 1).toString().padStart(2, "0") /* 月份 */,
      date: new Date().getDate().toString().padStart(2, "0") /* 日期 */,
      radioValue: "" /* 单选展示参数 */,
      switchValue: true /* 开关展示参数 */,
      tableValue: [
        { UI: "Element UI" },
        { UI: "Ant Design" },
        { UI: "Vant 4" },
        { UI: "Vuesax" },
      ] /* 表格展示参数 */,
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
            this.$message({
              message: res.data.message,
              type: "success",
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
          this.$message({
            message: res.data.message,
            type: "warning",
          });
          this.get_code();
        }
      });
    },
  },
};
</script>

<style lang='less'>
@import "login.less";
</style>