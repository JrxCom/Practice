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
            <vs-th sort @click="
              users_data = $vs.sortData($event, users_data, 'u_address')
              ">
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
                <template #off> No </template>
                <template #on> Yes</template>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(users_data, search), max)" />
        </template>
      </vs-table>
    </div>
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
      ],
      edit: null,
      editProp: {},
      search: "",
      allCheck: false,
      page: 1,
      max: 5,
      active: 0,
      selected: [],
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