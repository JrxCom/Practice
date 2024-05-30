<template>
  <div class="manage">
    <div class="web_view">
      <vs-select
        placeholder="请选择"
        v-model="webCode"
        state="primary"
        @change="webCode = $event"
      >
        <vs-option
          v-for="(item, index) in webArray"
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
          :class="{ table_cell_: tableCode === item.id }"
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
                <vs-button
                  block
                  :success="dialogType"
                  @click="$refs.fileRef.click()"
                  v-if="!webShowUpload"
                >
                  <img src="@/assets/common/image.png" /> image
                </vs-button>

                <vs-tooltip border top v-else>
                  <vs-button
                    block
                    :success="dialogType"
                    @click="$refs.fileRef.click()"
                  >
                    <img src="@/assets/common/check.png" />
                  </vs-button>
                  <template #tooltip>
                    <img :src="webShowUpload" width="80" height="80" />
                  </template>
                </vs-tooltip>

                <input
                  v-show="false"
                  ref="fileRef"
                  type="file"
                  @change="upload_image"
                />
              </div>
            </div>
            <div class="footer">
              <vs-button
                icon
                :success="dialogType"
                @click="controls_web_info()"
              >
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
              <vs-button
                icon
                :success="dialogType"
                @click="controls_table_info()"
              >
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
                <vs-option
                  v-for="(item, index) in creatWayArray"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                  {{ item }}
                </vs-option>
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

    <div class="alert_view">
      <vs-alert v-if="tipsCode" solid :color="tipsType">
        <h4>{{ tipsMessage }}</h4>
      </vs-alert>
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
import {
  getTableList,
  addTableInfo,
  getTableInfo,
  editTableInfo,
  removeTableInfo,
} from "@/api/table";
import { upload } from "@/api/upload";
export default {
  name: "manage",
  data() {
    return {
      dialogType: Boolean(),
      webCode: new String(),
      webArray: new Array(20),
      webDialog: Boolean(),
      webTitle: new String(),
      webForm: Object.create(null),
      webShowUpload: new String(),
      tableCode: new String(),
      tableArray: new Array(30),
      tableDialog: Boolean(),
      tableTitle: new String(),
      tableForm: Object.create(null),
      fieldCode: new String(),
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
      fieldDialog: Boolean(),
      fieldTitle: new String(),
      fieldForm: Object.create(null),
      creatWayArray: new Array(
        "文本",
        "上传图片",
        "上传音频",
        "上传视频",
        "下拉",
        "单选",
        "多选"
      ),
      showWayArray: new Array("文本", "图片", "音频", "视频", "下拉"),
      fieldTypeArray: new Array(
        "bigint",
        "int",
        "float",
        "double",
        "char",
        "varchar",
        "enum",
        "year",
        "date",
        "datetime",
        "time"
      ),
      removeDialog: Boolean(),
      removeTitle: new String(),
      themeCode: Boolean(),
      tipsCode: Boolean(),
      tipsMessage: new String(),
      tipsType: new String(),
    };
  },
  watch: {
    webCode() {
      this.get_table_list();
    },
  },
  created() {
    this.get_web_list();
  },
  mounted() {
    this.webCode = this.webArray[0].id;
    console.log(this.webCode);
  },
  methods: {
    get_web_list() {
      getWebList().then((res) => {
        if (res.data.status === 200) {
          this.webArray = res.data.obj.records;
          this.webCode = res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
        } else {
          this.tipsType = "danger";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
            this.$router.push({ path: "/login" });
          }, 2000);
        }
      });
    },

    web(type) {
      if (type === "add") {
        this.webTitle = "Add Web";
        this.webDialog = true;
        this.dialogType = false;
        this.webForm = Object.create(null);
      } else {
        this.webTitle = "Edit Web";
        this.webDialog = true;
        this.dialogType = true;
        this.get_web_info();
      }
    },

    get_web_info() {
      getWebInfo(this.webCode).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, database, website, logo } = res.data.obj;
          this.webForm = { name, describe, database, website, logo };
          this.webShowUpload = res.data.obj.logo;
        } else {
          this.tipsType = "danger";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
          }, 2000);
        }
      });
    },

    upload_image(event) {
      const file = event.target.files[0];
      let formData = new FormData();
      formData.append("resource", file);
      upload(formData, 1, 1).then((res) => {
        if (res.data.status === 200) {
          this.webForm["logo"] = res.data.path;
          this.webShowUpload = "http://localhost:5678" + res.data.path;
          this.tipsType = "primary";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
          }, 2000);
        } else if (res.data.status === 403) {
          this.tipsType = "danger";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
          }, 2000);
        }
      });
    },

    controls_web_info() {
      if (this.webTitle === "Add Web") {
        addWebInfo(this.webForm).then((res) => {
          if (res.data.status === 200) {
            this.tipsType = "primary";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            this.get_web_list();
            this.webDialog = false;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else if (res.data.status === 403) {
            this.tipsType = "danger";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else {
            this.tipsType = "warn";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          }
        });
      } else {
        editWebInfo(this.webCode, this.webForm).then((res) => {
          if (res.data.status === 200) {
            this.tipsType = "primary";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            this.get_web_list();
            this.webDialog = false;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else if (res.data.status === 403) {
            this.tipsType = "danger";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else {
            this.tipsType = "warn";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          }
        });
      }
    },

    get_table_list() {
      getTableList(this.webCode).then((res) => {
        if (res.data.status === 200) {
          this.tableArray = res.data.obj.records;
          this.tableCode =
            res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
        } else {
          this.tipsType = "danger";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
            this.$router.push({ path: "/login" });
          }, 2000);
        }
      });
    },

    table(type) {
      if (type === "add") {
        this.tableTitle = "Add Table";
        this.tableDialog = true;
        this.dialogType = false;
        this.tableForm = Object.create(null);
      } else {
        this.tableTitle = "Edit Table";
        this.tableDialog = true;
        this.dialogType = true;
        this.get_table_info();
      }
    },

    get_table_info() {
      getTableInfo(this.tableCode).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, table } = res.data.obj;
          this.tableForm = { name, describe, table };
        } else {
          this.tipsType = "danger";
          this.tipsMessage = res.data.message;
          this.tipsCode = true;
          setTimeout(() => {
            this.tipsCode = false;
          }, 2000);
        }
      });
    },

    controls_table_info() {
      this.tableForm["wid"] = this.webCode;
      if (this.webTitle === "Add Table") {
        addTableInfo(this.tableForm).then((res) => {
          if (res.data.status === 200) {
            this.tipsType = "primary";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            this.get_table_list();
            this.tableDialog = false;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else if (res.data.status === 403) {
            this.tipsType = "danger";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else {
            this.tipsType = "warn";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          }
        });
      } else {
        editTableInfo(this.tableCode, this.tableForm).then((res) => {
          if (res.data.status === 200) {
            this.tipsType = "primary";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            this.get_web_list();
            this.tableDialog = false;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else if (res.data.status === 403) {
            this.tipsType = "danger";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          } else {
            this.tipsType = "warn";
            this.tipsMessage = res.data.message;
            this.tipsCode = true;
            setTimeout(() => {
              this.tipsCode = false;
            }, 2000);
          }
        });
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