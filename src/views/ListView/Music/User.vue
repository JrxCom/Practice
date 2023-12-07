<template>
  <div class="music_user">
    <div class="top">
      <div class="filtrate">
        <i class="bx bx-filter-alt"></i>
        <vs-select state="primary" placeholder="请选择筛选条件" v-model="filtrateCode" @change="a">
          <vs-option v-for="(item, index) in filtrateArr" :key="index" :label="item.label"
            :value="item.value + '-' + item.label">
            <h4>{{ item.label }}</h4>
          </vs-option>
        </vs-select>
      </div>
      <div class="search">
        <i v-if="filtrateClass === 'radio_'" class="bx bx-radio-circle-marked"></i>
        <i v-else class="bx bx-search"></i>

        <div class="radio" v-if="searchClass === 'sex_'">
          <vs-radio v-model="radioCode" val="1">
            <i class="bx bx-male-sign"></i>
          </vs-radio>
          <vs-radio v-model="radioCode" val="2"><i class="bx bx-female-sign"></i></vs-radio>
        </div>

        <div class="radio" v-else-if="searchClass === 'state_'">
          <vs-radio v-model="radioCode" val="1"><i class="bx bx-check"></i></vs-radio>
          <vs-radio v-model="radioCode" val="2"><i class="bx bx-x"></i></vs-radio>
        </div>

        <vs-input v-else-if="searchClass === 'age_'" state="primary" type="number" v-model="searchVal" min="0"
          :placeholder="searchPlaceholder"></vs-input>

        <vs-input v-else-if="searchClass === 'creat_'" state="primary" type="date" v-model="searchVal"></vs-input>

        <vs-input v-else :disabled="disabledCode" primary v-model="searchVal" state="primary"
          :placeholder="searchPlaceholder">
        </vs-input>
      </div>
    </div>
    <div class="btns">
      <vs-button color="success" relief>
        <i class="bx bx-message-square-add"></i> 添加用户
      </vs-button>
      <vs-button color="warn" relief>
        <i class="bx bx-message-square-edit"></i> 修改用户
      </vs-button>
      <vs-button color="danger" relief>
        <i class="bx bx-message-square-x"></i> 删除用户
      </vs-button>
    </div>
    <div class="table">
      <vs-table v-model="selected">
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox :indeterminate="selected.length == users_data.length" v-model="allCheck"
                @change="selected = $vs.checkAll(selected, users_data)" />
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_id')">
              用户id
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_name')">
              用户名称
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_age')">
              用户年龄
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_sex')">
              用户性别
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_address')">
              用户地址
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_phone')">
              用户电话
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_emil')">
              用户邮箱
            </vs-th>
            <vs-th sort @click="users_data = $vs.sortData($event, users_data, 'u_state')">
              用户状态
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(users_data), page, max)" :data="tr"
            :is-selected="!!selected.includes(tr)" not-click-selected open-expand-only-td>
            <vs-td checkbox>
              <vs-checkbox :val="tr" v-model="selected" />
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
              <i v-if="tr.u_sex === 1" class="bx bx-male-sign" style="color: blue; font-size: 20px"></i>
              <i v-else class="bx bx-female-sign" style="color: pink; font-size: 20px"></i>
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
              <vs-switch v-model="tr.u_state">
                <template #off> <i class="bx bx-x"></i> </template>
                <template #on> <i class="bx bx-check"></i></template>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(users_data), max)" />
        </template>
      </vs-table>
    </div>

    <vs-dialog blur v-model="add">
      <template #header>
        <h4 class="not-margin">
          <b>添加用户</b>
        </h4>
      </template>
      <div class="con-form">
        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-user' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-input v-model="input1" placeholder="名称">
          </vs-input>
        </div>

        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-cake' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-input v-model="input1" placeholder="年龄" min="0" type="number">
          </vs-input>
        </div>

        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-male-female' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-radio v-model="picked" val="1">
            男
          </vs-radio>
          <vs-radio v-model="picked" val="2">
            女
          </vs-radio>
        </div>

        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-map-alt' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-input v-model="input1" placeholder="地址">
          </vs-input>
        </div>

        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-phone' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-input v-model="input1" placeholder="电话">
          </vs-input>
        </div>

        <div class="form-list">
          <vs-avatar size="34">
            <i class='bx bx-envelope' style="font-size: 16px;"></i>
          </vs-avatar>
          <vs-input v-model="input1" placeholder="邮箱">
          </vs-input>
        </div>


      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button>
            确认
          </vs-button>
          <vs-button dark>
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog blur v-model="del">
      <template #header>
        <h4 class="not-margin">
          <b>确认删除用户？</b>
        </h4>
      </template>
      <div style="margin: 20px 0 40px 0; ">
        <p>删除成功后该用户将无法找回并且id将永久删除！</p>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button>
            确认
          </vs-button>
          <vs-button dark>
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog blur v-model="fis" not-close>
      <template #header>
        <h4 class="not-margin">
          <b>新增成功</b>
        </h4>
      </template>
      <div style="margin: 20px 0 40px 0;">
        <p>新增用户id为：111111111</p>
        <p>新增用户密码为：1111111</p>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button>
            确认
          </vs-button>
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
      filtrateCode: "",
      filtrateClass: "",
      filtrateArr: [
        { label: "Id", value: "u_id" },
        { label: "名称", value: "u_name" },
        { label: "年龄", value: "u_age" },
        { label: "性别", value: "u_sex" },
        { label: "地址", value: "u_address" },
        { label: "电话", value: "u_phone" },
        { label: "邮箱", value: "u_emil" },
        { label: "创建时间", value: "u_creat" },
        { label: "状态", value: "u_state" },
      ],
      searchClass: "",
      searchPlaceholder: "请先选择搜索类型",
      searchVal: "",
      radioCode: "",
      disabledCode: true,
      editActive: false,
      users_data: [
        {
          u_id: 111111111,
          u_name: "Leanne Graham",
          u_age: 20,
          u_sex: 1,
          u_address: "北京市",
          u_phone: "12345678910",
          u_emil: "223@qq.com",
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
          u_state: false,
        },
        {
          u_id: 222222222,
          u_name: "Ervin Howell",
          u_age: 22,
          u_sex: 2,
          u_address: "北京市",
          u_phone: "12345678910",
          u_emil: "223@qq.com",
          u_state: false,
        },
        {
          u_id: 222222222,
          u_name: "Ervin Howell",
          u_age: 22,
          u_sex: 2,
          u_address: "北京市",
          u_phone: "12345678910",
          u_emil: "223@qq.com",
          u_state: false,
        },
        {
          u_id: 222222222,
          u_name: "Ervin Howell",
          u_age: 22,
          u_sex: 2,
          u_address: "北京市",
          u_phone: "12345678910",
          u_emil: "223@qq.com",
          u_state: false,
        },
        {
          u_id: 222222222,
          u_name: "Ervin Howell",
          u_age: 22,
          u_sex: 2,
          u_address: "北京市",
          u_phone: "12345678910",
          u_emil: "223@qq.com",
          u_state: false,
        },
      ],
      allCheck: false,
      page: 1,
      max: 4,
      selected: [],
      add: false,
      del: false,
      fis: true,
    };
  },
  watch: {},
  methods: {
    a(val) {
      val = val.split("-");
      if (val[0] === "u_sex") {
        this.filtrateClass = "radio_";
        this.searchClass = "sex_";
      } else if (val[0] === "u_state") {
        this.filtrateClass = "radio_";
        this.searchClass = "state_";
      } else if (val[0] === "u_creat") {
        this.filtrateClass = "search_";
        this.searchClass = "creat_";
        this.searchPlaceholder = `请输入用户${val[1]}`;
        this.disabledCode = false;
      } else {
        this.filtrateClass = "search_";
        this.searchClass = "other_";
        this.searchPlaceholder = `请输入用户${val[1]}`;
        this.disabledCode = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.music_user {
  .top {
    display: flex;
    flex-direction: row;
    align-items: center;

    .filtrate {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .search {
      .filtrate();
      margin-left: 40px;

      .radio {
        display: flex;
        background-color: #e9eff8;
        padding: 7px 13px;
        border-radius: 12px;
      }
    }
  }

  .btns {
    margin: 20px 0;
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