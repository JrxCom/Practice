<template>
  <div class="music_user">
    <!-- 网站图标 -->
   <div class="tag">
    <vs-button
        icon
        dark
        shadow
      >
        <i class='bx bxs-music'></i>
      </vs-button>
   </div>
    <!-- 用户按钮组 -->
    <div class="btns">
      <!-- 添加用户按钮 -->
      <vs-button color="success" relief @click="add_user()">
        <i class="bx bx-message-square-add"></i> 添加用户
      </vs-button>
      <!-- 修改用户按钮 -->
      <vs-button color="warn" relief @click="edit_user()">
        <i class="bx bx-message-square-edit"></i> 修改用户
      </vs-button>
      <!-- 删除用户按钮 -->
      <vs-button color="danger" relief @click="remove_user()">
        <i class="bx bx-message-square-x"></i> 删除用户
      </vs-button>
    </div>
    <!-- 表格 -->
    <div style="margin: 10px 0 20px 0;">
      <vs-input v-model="user_table.search" placeholder="搜索用户"  primary state="primary">
            <template #icon>
              <i class='bx bx-search-alt'></i>
        </template>
      </vs-input>
    </div>
   

    <div class="table">
      <vs-table v-model="user_table.selected">
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox
                :indeterminate="
                  user_table.selected.length == user_table.data.length
                "
                v-model="user_table.allCheck"
                @change="
                  user_table.selected = $vs.checkAll(
                    user_table.selected,
                    user_table.data
                  )
                "
              />
            </vs-th>
            <vs-th
              sort
              @click="
                user_table.data = $vs.sortData($event, user_table.data, 'u_id')
              "
            >
              用户id
            </vs-th>
            <vs-th> 用户名称 </vs-th>
            <vs-th
              sort
              @click="
                user_table.data = $vs.sortData($event, user_table.data, 'u_age')
              "
            >
              用户年龄
            </vs-th>
            <vs-th
              sort
              @click="
                user_table.data = $vs.sortData($event, user_table.data, 'u_sex')
              "
            >
              用户性别
            </vs-th>
            <vs-th> 用户地址 </vs-th>
            <vs-th> 用户电话 </vs-th>
            <vs-th> 用户邮箱 </vs-th>
            <vs-th> 用户头像 </vs-th>
            <vs-th
              sort
              @click="
                user_table.data = $vs.sortData(
                  $event,
                  user_table.data,
                  'u_state'
                )
              "
            >
              用户状态
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(
              $vs.getSearch(user_table.data,user_table.search),
              user_table.page,
              user_table.max
            )"
            :data="tr"
            :is-selected="!!user_table.selected.includes(tr)"
            not-click-selected
            open-expand-only-td
          >
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="user_table.selected" />
            </vs-td>
            <vs-td>
              {{ tr.u_id }}
            </vs-td>
            <vs-td>
              {{ tr.u_name }}
            </vs-td>
            <vs-td>
              {{ tr.u_age }}
            </vs-td>
            <vs-td>
              <i
                v-if="tr.u_sex === 1"
                class="bx bx-male-sign"
                style="color: blue; font-size: 20px"
              ></i>
              <i
                v-else
                class="bx bx-female-sign"
                style="color: pink; font-size: 20px"
              ></i>
            </vs-td>
            <vs-td>
              {{ tr.u_address }}
            </vs-td>
            <vs-td>
              {{ tr.u_phone }}
            </vs-td>
            <vs-td>
              {{ tr.u_emil }}
            </vs-td>
            <vs-td>
              <vs-avatar history v-if="tr.u_photo === ''">
                <i class="bx bxs-user-rectangle"></i>
              </vs-avatar>
              <vs-avatar history v-else>
                <i class="bx bxs-user-circle"></i>
              </vs-avatar>
            </vs-td>
            <vs-td>
              <vs-switch v-model="tr.u_state">
                <template #off> <i class="bx bx-x"></i> </template>
                <template #on> <i class="bx bx-check"></i></template>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination
            v-model="user_table.page"
            :length="
              $vs.getLength($vs.getSearch(user_table.data,user_table.search), user_table.max)
            "
          />
        </template>
      </vs-table>
    </div>
    <!-- 添加或修改弹窗 -->
    <vs-dialog blur v-model="dialog_add_edit.code" not-close prevent-close>
      <template #header>
        <h4 class="not-margin">
          <b>{{ dialog_add_edit.title }}</b>
        </h4>
      </template>
      <div class="con-form">
        <!-- 用户名称 -->
        <div class="form-list">
          <vs-avatar size="34">
            <i class="bx bx-user" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-input v-model="dialog_add_edit.form.name" placeholder="名称">
          </vs-input>
        </div>
        <!-- 用户年龄 -->
        <div class="form-list">
          <vs-avatar size="34">
            <i class="bx bxs-hourglass" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-input
            v-model="dialog_add_edit.form.age"
            placeholder="年龄"
            min="0"
            type="number"
          >
          </vs-input>
        </div>
        <!-- 用户性别 -->
        <div class="form-list" style="margin: 6px 0;">
          <vs-avatar size="34">
            <i class="bx bx-male-female" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-select placeholder="性别" v-model="dialog_add_edit.form.sex">
                <vs-option label="男" value="1">
                  男
                </vs-option>
                <vs-option label="女" value="2">
                  女
                </vs-option>
              </vs-select>
        </div>
        <!-- 用户地址 -->
        <div class="form-list">
          <vs-avatar size="34">
            <i class="bx bx-map-alt" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-input v-model="dialog_add_edit.form.address" placeholder="地址">
          </vs-input>
        </div>
        <!-- 用户电话 -->
        <div class="form-list">
          <vs-avatar size="34">
            <i class="bx bx-phone" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-input v-model="dialog_add_edit.form.phone" placeholder="电话">
          </vs-input>
        </div>
        <!-- 用户邮箱 -->
        <div class="form-list">
          <vs-avatar size="34">
            <i class="bx bx-envelope" style="font-size: 16px"></i>
          </vs-avatar>
          <vs-input v-model="dialog_add_edit.form.emil" placeholder="邮箱">
          </vs-input>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="finsh_add_edit(dialog_add_edit.type)">
            确认
          </vs-button>
          <vs-button border dark @click="dialog_add_edit.code = false">
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <!-- 完成添加弹窗 -->
    <vs-dialog blur v-model="dialog_finsh.code" not-close prevent-close>
      <template #header>
        <h4 class="not-margin">
          <b>新增成功</b>
        </h4>
      </template>
      <div
        class="content"
        style="
          margin: 10px 0 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <vs-avatar size="60" history>
          <i class="bx bxs-user-rectangle"></i>
        </vs-avatar>
        <p>
          新增用户id为：<b>{{ dialog_finsh.id }}</b>
        </p>
        <p>
          新增用户密码为：<b>{{ dialog_finsh.password }}</b>
        </p>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="dialog_finsh.code = false"> 确认 </vs-button>
        </div>
      </template>
    </vs-dialog>
	<!-- 删除用户弹窗 -->
    <vs-dialog blur v-model="dialog_remove.code">
      <template #header>
        <h4 class="not-margin">
          <b>确认删除用户？</b>
        </h4>
      </template>
      <div style="margin: 20px 0 40px 0;">
        <h3>删除成功后该用户将无法找回并且id将永久删除！</h3>
      </div>
      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="finsh_remove()"> 确认 </vs-button>
          <vs-button border dark @click="dialog_remove.code = false"> 取消 </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      /* 表格数据 */
      user_table: {
        data: [
          {
            u_id: 111111111,
            u_name: "Leanne Graham",
            u_age: 20,
            u_sex: 1,
            u_address: "北京市",
            u_phone: "12345678910",
            u_emil: "223@qq.com",
            u_photo: "1",
            u_state: true,
          },
          {
            u_id: 222222222,
            u_name: "Ervin Howell",
            u_age: 22,
            u_sex: 2,
            u_address: "北京市",
            u_phone: "12345678910",
            u_emil: "223@qq.com",
            u_photo: "",
            u_state: false,
          },
        ],
        allCheck: false,
        page: 1,
        max: 4,
        selected: [],
        search:''
      },
      /* 添加、修改用户弹窗 */
      dialog_add_edit: {
        code: false,
        title: "",
        type: "",
        form: {
          name: "",
          age: "",
          sex: "",
          address: "",
          phone: "",
          emil: "",
        },
      },
      /* 添加完成弹窗 */
      dialog_finsh: {
        code: false,
        id: "123456789",
        password: "admin123",
      },
      /* 删除确认弹窗 */
      dialog_remove: {
        code: false,
      },
    };
  },
  watch: {},
  methods: {
    /* 添加用户 */
    add_user() {
      Object.keys(this.dialog_add_edit.form).forEach((key) => {
        this.dialog_add_edit.form[key] = "";
      });
      this.dialog_add_edit.type = "add";
      this.dialog_add_edit.title = "添加用户";
      this.dialog_add_edit.code = true;
    },
    /* 修改用户 */
    edit_user() {
      if (this.user_table.selected.length <= 0) {
        this.$vs.notification({
          color: "warn",
          position: "top-center",
          text: "请勾选一条数据",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-error'></i>`,
        });
      } else if (this.user_table.selected.length > 1) {
        this.$vs.notification({
          color: "warn",
          position: "top-center",
          text: "无法修改多条数据",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-error'></i>`,
        });
      } else {
        this.dialog_add_edit.type = "edit";
        this.dialog_add_edit.form = Object.assign(this.dialog_add_edit.form, {
          name: this.user_table.selected[0].u_name,
          age: this.user_table.selected[0].u_age,
          sex: this.user_table.selected[0].u_sex,
          address: this.user_table.selected[0].u_address,
          phone: this.user_table.selected[0].u_phone,
          emil: this.user_table.selected[0].u_emil,
        });
        this.dialog_add_edit.code = true;
      }
    },
    /* 添加、修改用户完成 */
    finsh_add_edit(type) {
      if (type === "add") {
        this.dialog_add_edit.code = false;
        this.dialog_finsh.code = true;
      } else {
        this.dialog_add_edit.code = false;
        this.$vs.notification({
          color: "success",
          position: "top-center",
          text: "修改成功",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-check'></i>`,
        });
      }
    },
    /* 删除用户 */
    remove_user() {
      if (this.user_table.selected.length <= 0) {
        this.$vs.notification({
          color: "warn",
          position: "top-center",
          text: "请勾选删除数据",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-error'></i>`,
        });
      } else {
        this.dialog_remove.code = true;
      }
    },
	/* 删除用户完成 */
	finsh_remove(){
		this.dialog_remove.code = false;
        this.$vs.notification({
          color: "success",
          position: "top-center",
          text: "删除成功",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-check'></i>`,
        });
	},
  },
};
</script>

<style lang="less" scoped>
.music_user {
	padding: 20px;
  .tag{
    position: fixed;
    right: 20px;
    top: 60px;
  }

  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.vs-switch {
  max-width: 48px;
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
  .form-list
     display flex
     align-items center
     .vs-avatar-content
      margin-right 10px
     .vs-select
      width 300px
      &:hover
        background none
        box-shadow none
        transform none
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
      width 300px

.footer-dialog
  display flex
  align-items center
  justify-content space-around
  flex-direction row
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
