<template>
  <div class="manage">
    <div class="web_view">
      <vs-select
        placeholder="请选择"
        v-model="webCode"
        state="primary"
      >
        <vs-option
          v-for="(item,index) in webArray"
          :key="index"
          :label="item.name" 
          :value="item.id"
        >
          {{ item.name }}
        </vs-option>
      </vs-select>
      <vs-button icon color="primary" relief @click="web('add')">
        <img src="@/assets/manage/addButton.png" />
        Add Web
      </vs-button>
      <vs-button icon color="success" relief @click="web('edit')">
        <img src="@/assets/manage/editButton.png" />
        Edit Web
      </vs-button>
      <vs-button icon color="danger" relief @click="remove('web')">
        <img src="@/assets/manage/removeButton.png" />
        Remove Web
      </vs-button>
    </div>
    <div class="table_view">
      <vs-button icon @click="table('add')">
        <img src="@/assets/manage/addButton.png" /> Add Table
      </vs-button>
      <div class="table_list">
        <div
          class="table_cell"
          v-for="(item, index) in tableArray"
          :key="index"
        >
          <p>{{ item.name }}</p>
          <span>{{ item.table }}</span>
          <div class="table_tool">
            <img src="@/assets/manage/edit.png" @click="table('edit')" />
            <img src="@/assets/manage/remove.png" @click="remove('table')" />
          </div>
        </div>
      </div>
    </div>
    <div class="field_view">
      <vs-button icon @click="field('add')">
        <img src="@/assets/manage/addButton.png" /> Add Field
      </vs-button>
      <div class="field_list">
        <div
          class="field_cell"
          v-for="(item, index) in fieldArray"
          :key="index"
        >
          <h4>{{ item.name }}</h4>
          <p>{{ item.describe }}</p>
          <span>{{ item.type }}</span>
          <span>{{ item.size }}</span>
          <span>{{ item.field }}</span>
          <div class="field_tool">
            <img src="@/assets/manage/edit.png" @click="field('edit')" />
            <img
              src="@/assets/manage/remove.png"
              alt=""
              @click="remove('field')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="dialog_view">
      <transition name="dialog">
        <div class="add_edit_web" v-show="webDialog">
          <div class="card_web">
            <div class="close" @click="webDialog = false">
              <vs-button icon border :success="dialogType">
                <img v-if="dialogType" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ webTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogType"
                label="网站名称"
                placeholder="Web Name"
                v-model="webForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="网站简介"
                placeholder="Web Describe"
                v-model="webForm['describe']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="数据库"
                placeholder="Database"
                v-model="webForm['database']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="网站地址"
                placeholder="Web Website"
                v-model="webForm['website']"
              >
              </vs-input>
              <div class="upload">
                <label>网站logo</label>
                <vs-button block :success="dialogType">
                  <img src="@/assets/common/image.png" /> image
                </vs-button>
              </div>
            </div>
            <div class="footer">
              <vs-button icon :success="dialogType">
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="webDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="dialog">
        <div class="add_edit_table" v-show="tableDialog">
          <div class="card_table">
            <div class="close" @click="tableDialog = false">
              <vs-button icon border :success="dialogType">
                <img v-if="dialogType" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ tableTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogType"
                label="表格名称"
                placeholder="Table Name"
                v-model="tableForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="表格描述"
                placeholder="Table Describe"
                v-model="tableForm['describe']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="数据库"
                placeholder="Table"
                v-model="tableForm['table']"
              >
              </vs-input>
            </div>
            <div class="footer">
              <vs-button icon :success="dialogType">
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="tableDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="dialog">
        <div class="add_edit_field" v-show="fieldDialog">
          <div class="card_field">
            <div class="close" @click="fieldDialog = false">
              <vs-button icon border :success="dialogType">
                <img v-if="dialogType" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ fieldTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogType"
                label="字段名称"
                placeholder="Field Name"
                v-model="fieldForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="字段描述"
                placeholder="Field Describe"
                v-model="fieldForm['describe']"
              >
              </vs-input>
              <vs-select
                primary
                :success="dialogType"
                label="创建方式"
                placeholder="Creat Way"
                v-model="fieldForm['creatway']"
              >
                <vs-option label="Vuesax" value="1"> 上传 </vs-option>
              </vs-select>
              <vs-select
                primary
                :success="dialogType"
                label="展示方式"
                placeholder="Show Way"
                v-model="fieldForm['showay']"
              >
                <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
              </vs-select>
              <vs-select
                primary
                :success="dialogType"
                label="字段类型"
                placeholder="Field Type"
                v-model="fieldForm['type']"
              >
                <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
              </vs-select>
              <vs-input
                primary
                :success="dialogType"
                label="字段大小"
                placeholder="Field Size"
                v-model="fieldForm['size']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogType"
                label="数据库"
                placeholder="Field"
                v-model="fieldForm['field']"
              >
              </vs-input>
            </div>
            <div class="footer">
              <vs-button icon :success="dialogType">
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="fieldDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="dialog">
        <div class="remove" v-show="removeDialog">
          <div class="card_remove">
            <div class="close" @click="removeDialog = false">
              <vs-button icon border danger>
                <img src="@/assets/common/removeClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ removeTitle }}
            </div>
            <div class="main">
              <p>是否确认删除该数据？</p>
              <span>说明：该操作不可逆，请谨慎删除</span>
            </div>
            <div class="footer">
              <vs-button icon danger>
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="removeDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  getWebList,
  addWebInfo,
  getWebInfo,
  editWebInfo,
  removeWebInfo,
} from "@/api/web";
export default {
  name: "manage",
  data() {
    return {
      dialogType: false,
      webCode: "",
      webArray: new Array(20),
      webDialog: false,
      webTitle: "",
      webForm: {
        name: "",
        describe: "",
        database: "",
        website: "",
        logo: "",
      },
      tableCode: "",
      tableArray: [
        { id: 1, name: "用户管理", table: "user" },
        { id: 2, name: "音乐管理", table: "music" },
      ],
      tableDialog: false,
      tableTitle: "",
      tableForm: {
        name: "",
        describe: "",
        table: "",
      },
      fieldCode: "",
      fieldArray: [
        {
          id: 1,
          name: "名称",
          describe: "用户名称",
          type: "int",
          size: "11",
          field: "name",
        },
        {
          id: 2,
          name: "性别",
          describe: "用户性别",
          type: "enum",
          size: "男,女",
          field: "sex",
        },
      ],
      fieldDialog: false,
      fieldTitle: "",
      fieldForm: {
        name: "",
        describe: "",
        creatway: "",
        showay: "",
        type: "",
        size: "",
        field: "",
      },
      removeDialog: false,
      removeTitle: "",
      themeCode: false,
    };
  },
  created() {
    this.get_web_list();
    
  },
  methods: {
    get_web_list() {
      getWebList().then((res) => {
        this.webArray = res.data.obj.records;
        this.webCode = this.webArray[0].id;
      });
    },
    web(type) {
      if (type === "add") {
        this.webTitle = "Add Web";
        this.webDialog = true;
        this.dialogType = false;
      } else {
        this.webTitle = "Edit Web";
        this.webDialog = true;
        this.dialogType = true;
      }
    },
    table(type) {
      if (type === "add") {
        this.tableTitle = "Add Table";
        this.tableDialog = true;
        this.dialogType = false;
      } else {
        this.tableTitle = "Edit Table";
        this.tableDialog = true;
        this.dialogType = true;
      }
    },
    field(type) {
      if (type === "add") {
        this.fieldTitle = "Add field";
        this.fieldDialog = true;
        this.dialogType = false;
      } else {
        this.fieldTitle = "Edit field";
        this.fieldDialog = true;
        this.dialogType = true;
      }
    },
    remove(type) {
      if (type === "web") {
        this.removeTitle = "Remove Web";
        this.removeDialog = true;
      } else if (type === "table") {
        this.removeTitle = "Remove Table";
        this.removeDialog = true;
      } else {
        this.removeTitle = "Remove Field";
        this.removeDialog = true;
      }
    },
  },
};
</script>

<style lang="less">
@import "manage.less";
</style>