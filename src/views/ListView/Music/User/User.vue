<template>
  <div class="music_user">
    <!-- 网站图标 -->
    <div class="tag">
      <vs-button icon dark shadow>
        <i class='bx bxs-music'></i>
      </vs-button>
    </div>
    <!-- 用户按钮组 -->
    <div class="btns">
      <!-- 添加用户按钮 -->
      <vs-button color="success" relief @click="showAddUserDia()">
        <i class="bx bx-message-square-add"></i> 添加用户
      </vs-button>
      <!-- 修改用户按钮 -->
      <vs-button color="warn" relief @click="showEditUserDia()">
        <i class="bx bx-message-square-edit"></i> 修改用户
      </vs-button>
      <!-- 删除用户按钮 -->
      <vs-button color="danger" relief @click="showDeleteUserDia()">
        <i class="bx bx-message-square-x"></i> 删除用户
      </vs-button>
    </div>
    <!-- 表格 -->
    <div style="margin: 10px 0 20px 0;">
      <vs-input v-model="user_table.search" placeholder="搜索用户" state="primary">
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
              <vs-checkbox :indeterminate="user_table.selected.length == user_table.data.length
                " v-model="user_table.allCheck" @change="
    user_table.selected = $vs.checkAll(
      user_table.selected,
      user_table.data
    )
    " />
            </vs-th>
            <vs-th sort @click="
              user_table.data = $vs.sortData($event, user_table.data, 'u_id')
              ">
              用户id
            </vs-th>
            <vs-th> 用户名称 </vs-th>
            <vs-th sort @click="
              user_table.data = $vs.sortData($event, user_table.data, 'age')
              ">
              用户年龄
            </vs-th>
            <vs-th sort @click="
              user_table.data = $vs.sortData($event, user_table.data, 'sex')
              ">
              用户性别
            </vs-th>
            <vs-th> 用户地址 </vs-th>
            <vs-th> 用户电话 </vs-th>
            <vs-th> 用户邮箱 </vs-th>
            <vs-th> 用户头像 </vs-th>
            <vs-th> 创建时间 </vs-th>
            <vs-th> 最后一次登录时间 </vs-th>
            <vs-th sort @click="
              user_table.data = $vs.sortData(
                $event,
                user_table.data,
                'state'
              )
              ">
              用户状态
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(tr, i) in $vs.getPage(
            $vs.getSearch(user_table.data, user_table.search),
            user_table.page,
            user_table.max
          )" :data="tr" :is-selected="!!user_table.selected.includes(tr)" not-click-selected open-expand-only-td>
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="user_table.selected" />
            </vs-td>
            <vs-td>
              {{ tr.u_id }}
            </vs-td>
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              {{ tr.age }}
            </vs-td>
            <vs-td>
              <i v-if="tr.sex == 1" class="bx bx-male-sign" style="color: blue; font-size: 20px"></i>
              <i v-else class="bx bx-female-sign" style="color: pink; font-size: 20px"></i>
            </vs-td>
            <vs-td>
              {{ tr.address }}
            </vs-td>
            <vs-td>
              {{ tr.phone }}
            </vs-td>
            <vs-td>
              {{ tr.emil }}
            </vs-td>
            <vs-td>
              <vs-avatar history v-if="tr.photo == ''">
                <i class="bx bxs-user-rectangle"></i>
              </vs-avatar>
              <vs-avatar history v-else>
                <img :src="tr.photo" alt="">
              </vs-avatar>
            </vs-td>
            <vs-td>
              {{ tr.creat_time }}
            </vs-td>
            <vs-td>
              {{ tr.login_time }}
            </vs-td>
            <vs-td>
              <vs-switch v-model="tr.state" @click="ban_state(tr.u_id, tr.state)">
                <template #off> <i class="bx bx-x"></i> </template>
                <template #on> <i class="bx bx-check"></i></template>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="user_table.page" :length="$vs.getLength($vs.getSearch(user_table.data, user_table.search), user_table.max)
            " />
        </template>
      </vs-table>
    </div>
    <!-- 添加或修改弹窗 -->
    <vs-dialog blur v-model="dialog_add_edit.code" prevent-close>
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
          <vs-input v-model="dialog_add_edit.form.age" placeholder="年龄" min="0" type="number">
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
          <vs-button @click="add_edit_user(dialog_add_edit.type)">
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
      <div class="content" style="
          margin: 10px 0 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        ">
        <vs-avatar size="60" history>
          <i class="bx bxs-user-rectangle"></i>
        </vs-avatar>
        <p>
          新增用户id为：<b>{{ dialog_finsh.id }}</b>
        </p>
        <p>
          新增用户密码为：<b>账号@abc</b>
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
          <vs-button @click="delete_user()"> 确认 </vs-button>
          <vs-button border dark @click="dialog_remove.code = false"> 取消 </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { getuser, adduser, edituser, deleteuser, banuser } from '@/api/music/music_user'
export default {
  name: "user",
  data() {
    return {
      /* 表格数据 */
      user_table: {
        data: [{}],
        allCheck: false,
        page: 1,
        max: 4,
        selected: [],
        search: ''
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
        id: ""
      },
      /* 删除确认弹窗 */
      dialog_remove: {
        code: false,
      },
    };
  },
  created() {
    this.get_user()
  },
  methods: {
    // 获取用户信息列表
    get_user() {
      getuser().then(res => {
        this.user_table.data = res.data.obj.records
        this.user_table.data.filter((i => {
          i.state = Boolean(Number(i.state))
          i.creat_time = i.creat_time.slice(0, 9)
        }))
      })
    },
    /* 打开添加用户弹窗 */
    showAddUserDia() {
      Object.keys(this.dialog_add_edit.form).forEach((key) => {
        this.dialog_add_edit.form[key] = "";
      });
      this.dialog_add_edit.type = "add";
      this.dialog_add_edit.title = "添加用户";
      this.dialog_add_edit.code = true;
    },
    /* 打开修改用户弹窗 */
    showEditUserDia() {
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
          text: "无法同时修改多条数据",
          duration: "4000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-error'></i>`,
        });
      } else {
        this.dialog_add_edit.type = "edit";
        this.dialog_add_edit.title = "修改用户";
        this.dialog_add_edit.form = Object.assign(this.dialog_add_edit.form, {
          name: this.user_table.selected[0].name,
          age: this.user_table.selected[0].age,
          sex: this.user_table.selected[0].sex,
          address: this.user_table.selected[0].address,
          phone: this.user_table.selected[0].phone,
          emil: this.user_table.selected[0].emil,
        });
        this.dialog_add_edit.code = true;
      }
    },
    /* 添加、修改用户完成 */
    add_edit_user(type) {
      if (type === "add") {
        adduser(this.dialog_add_edit.form).then(res => {
          this.get_user()
          this.dialog_finsh.id = res.data.id
          this.dialog_add_edit.code = false;
          this.dialog_finsh.code = true;
        })
      } else {
        edituser(this.dialog_add_edit.form, this.user_table.selected[0].u_id).then(res => {
          this.get_user()
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
        })
      }
    },
    /* 删除用户 */
    showDeleteUserDia() {
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
    delete_user() {
      let id_group = []
      this.user_table.selected.find(i => {
        id_group.push(i.u_id)
      })
      deleteuser({ id: id_group.join() }).then(res => {
        this.get_user()
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
      })
    },
    /* 禁止用户 */
    ban_state(id, val) {
      const isban = val == true ? '0' : '1'
      banuser({state:isban},id).then(res=>{
        this.$vs.notification({
            color: "success",
            position: "top-center",
            text: res.data.message,
            duration: "4000",
            square: true,
            flat: true,
            icon: `<i class='bx bx-check'></i>`,
          });
      })
    }
  },
};
</script>

<style lang="less" scoped>
@import 'User.less';
</style>

