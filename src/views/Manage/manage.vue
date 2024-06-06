<template>
  <div class="manage">
    <!-- 网站 -->
    <div class="web_view" :style="{'width':webArray.length?'37vw':'20vw'}">
      <vs-select
        placeholder="请添加网站"
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
      <vs-button icon color="success" relief @click="web('edit')" v-show="webArray.length">
        <img src="@/assets/manage/editButton.png" />
        Edit Web
      </vs-button>
      <vs-button icon color="danger" relief @click="remove('web')" v-show="webArray.length">
        <img src="@/assets/manage/removeButton.png" />
        Remove Web
      </vs-button>
    </div>
    <!-- 表 -->
    <div class="table_view">
      <vs-button icon @click="table('add')" v-show="webCode">
        <img src="@/assets/manage/addButton.png" /> Add Table
      </vs-button>
      <div class="table_list" v-if="tableArray.length">
        <div
          class="table_cell"
          :class="{ table_cell_: tableCode === item.id }"
          v-for="(item, index) in tableArray"
          :key="index"
          @click="tableCode = item.id"
        >
          <p>{{ item.name }}</p>
          <span>{{ item.table }}</span>
          <div class="table_tool">
            <img
              src="@/assets/manage/edit.png"
              @click="table('edit', item.id)"
            />
            <img
              src="@/assets/manage/remove.png"
              @click="remove('table', item.id)"
            />
          </div>
        </div>
      </div>
      <div class="no_data" v-else>
        <img src="@/assets/manage/noData.png" alt="" />
        <h4>NO DATA</h4>
      </div>
    </div>
    <!-- 字段 -->
    <div class="field_view">
      <vs-button icon @click="field('add')" v-show="webCode">
        <img src="@/assets/manage/addButton.png" /> Add Field
      </vs-button>
      <div class="field_list" v-if="fieldArray.length">
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
            <img
              src="@/assets/manage/edit.png"
              @click="field('edit', item.id)"
            />
            <img
              src="@/assets/manage/remove.png"
              alt=""
              @click="remove('field', item.id)"
            />
          </div>
        </div>
      </div>
      <div class="no_data" v-else>
        <img src="@/assets/manage/noData.png" alt="" />
        <h4>NO DATA</h4>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="dialog_view">
      <!-- 网站添加、修改弹窗 -->
      <transition name="dialog">
        <div class="add_edit_web" v-show="webDialog">
          <div class="card_web">
            <div class="close" @click="webDialog = false">
              <vs-button icon border :success="dialogTheme">
                <img v-if="dialogTheme" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ webTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogTheme"
                label="网站名称"
                placeholder="Web Name"
                v-model="webForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="网站简介"
                placeholder="Web Describe"
                v-model="webForm['describe']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="数据库"
                placeholder="Database"
                v-model="webForm['database']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="网站地址"
                placeholder="Web Website"
                v-model="webForm['website']"
              >
              </vs-input>
              <div class="upload">
                <label>网站logo</label>
                <vs-button
                  block
                  :success="dialogTheme"
                  @click="$refs.fileRef.click()"
                  v-if="!webUploadSrc"
                >
                  <img src="@/assets/common/image.png" /> image
                </vs-button>

                <vs-tooltip border top v-else>
                  <vs-button
                    block
                    :success="dialogTheme"
                    @click="$refs.fileRef.click()"
                  >
                    <img src="@/assets/common/check.png" />
                  </vs-button>
                  <template #tooltip>
                    <img :src="webUploadSrc" width="80" height="80" />
                  </template>
                </vs-tooltip>

                <input
                  v-show="false"
                  ref="fileRef"
                  type="file"
                  accept="image/*"
                  @change="upload_image"
                />
              </div>
            </div>
            <div class="footer">
              <vs-button
                icon
                :success="dialogTheme"
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
      <!-- 表添加、修改弹窗 -->
      <transition name="dialog">
        <div class="add_edit_table" v-show="tableDialog">
          <div class="card_table">
            <div class="close" @click="tableDialog = false">
              <vs-button icon border :success="dialogTheme">
                <img v-if="dialogTheme" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ tableTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogTheme"
                label="表格名称"
                placeholder="Table Name"
                v-model="tableForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="表格描述"
                placeholder="Table Describe"
                v-model="tableForm['describe']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="数据库"
                placeholder="Table"
                v-model="tableForm['table']"
              >
              </vs-input>
            </div>
            <div class="footer">
              <vs-button
                icon
                :success="dialogTheme"
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
      <!-- 字段添加、修改弹窗 -->
      <transition name="dialog">
        <div class="add_edit_field" v-show="fieldDialog">
          <div class="card_field">
            <div class="close" @click="fieldDialog = false">
              <vs-button icon border :success="dialogTheme">
                <img v-if="dialogTheme" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
            </div>
            <div class="header">
              {{ fieldTitle }}
            </div>
            <div class="main">
              <vs-input
                primary
                :success="dialogTheme"
                label="字段名称"
                placeholder="Field Name"
                v-model="fieldForm['name']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="字段描述"
                placeholder="Field Describe"
                v-model="fieldForm['describe']"
              >
              </vs-input>
              <vs-select
                primary
                :success="dialogTheme"
                label="创建方式"
                placeholder="Creat Way"
                v-model="creatWayCode"
                @change="fieldForm['creatway'] = creatWayCode"
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
                :success="dialogTheme"
                label="展示方式"
                placeholder="Show Way"
                v-model="showWayCode"
                @change="fieldForm['showay'] = showWayCode"
              >
                <vs-option
                  v-for="(item, index) in showWayArray"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                  {{ item }}
                </vs-option>
              </vs-select>
              <vs-select
                primary
                :success="dialogTheme"
                label="字段类型"
                placeholder="Field Type"
                v-model="fieldTypeCode"
                @change="fieldForm['type'] = fieldTypeCode"
              >
                <vs-option
                  v-for="(item, index) in fieldTypeArray"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                  {{ item }}
                </vs-option>
              </vs-select>
              <vs-input
                primary
                :success="dialogTheme"
                label="字段大小/值"
                placeholder="Field Size/Value"
                v-model="fieldForm['size']"
              >
              </vs-input>
              <vs-input
                primary
                :success="dialogTheme"
                label="数据库"
                placeholder="Field"
                v-model="fieldForm['field']"
              >
              </vs-input>
            </div>
            <div class="footer">
              <vs-button
                icon
                :success="dialogTheme"
                @click="controls_field_info()"
              >
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="fieldDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
      <!-- 网站、表、字段删除弹窗 -->
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
              <vs-button icon danger @click="do_remove()">
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
/* 引入web api */
import {
  getWebList,
  addWebInfo,
  getWebInfo,
  editWebInfo,
  removeWebInfo,
} from "@/api/web";
/* 引入table api */
import {
  getTableList,
  addTableInfo,
  getTableInfo,
  editTableInfo,
  removeTableInfo,
} from "@/api/table";
/* 引入field api */
import {
  getFieldList,
  addFieldInfo,
  getFieldInfo,
  editFieldInfo,
  removeFieldInfo,
} from "@/api/field";
/* 引入upload api */
import { upload } from "@/api/upload";
export default {
  name: "manage",
  data() {
    return {
      dialogTheme: false /* 弹窗主题（添加、修改） */,
      webCode: "" /* 当前选中网站id */,
      webArray: new Array(20) /* 网站列表（上限20个） */,
      webDialog: false /* 网站添加、修改弹窗显示参数 */,
      webTitle: "" /* 网站添加、修改标题（add web、edit web） */,
      webForm: {} /* 网站添加、修改提交表单 */,
      webUploadSrc: "" /* 网站上传logo显示路径 */,
      tableCode: "" /* 当前选中表id */,
      tableHandleCode: "" /* 修改、删除时保存的表id */,
      tableArray: [] /* 表列表 */,
      tableDialog: false /* 表添加、修改弹窗显示参数 */,
      tableTitle: "" /* 表添加、修改标题（add table、edit table） */,
      tableForm: {} /* 表添加、修改提交表单 */,
      fieldCode: "" /* 当前选中字段id */,
      fieldHandleCode: "" /* 修改、删除时保存的字段id */,
      fieldArray: [] /* 字段列表 */,
      fieldDialog: false /* 字段添加、修改弹窗显示参数 */,
      fieldTitle: "" /* 字段添加、修改标题（add field、edit field） */,
      fieldForm: {} /* 字段添加、修改提交表单 */,
      creatWayCode: "" /* 当前选中字段创建方式 */,
      creatWayArray: [
        "文本",
        "图片",
        "音频",
        "视频",
        "下拉",
        "单选",
        "多选",
      ] /* 全部字段创建方式 */,
      showWayCode: "" /* 当前选中字段显示方式 */,
      showWayArray: [
        "文本",
        "图片",
        "音频",
        "视频",
      ] /* 全部字段显示方式 */,
      fieldTypeCode: "" /* 当前选中字段类型 */,
      fieldTypeArray: [
        "bigint",
        "double",
        "varchar",
        "enum",
        "set",
        "datetime",
      ] /* 全部字段常用类型 */,
      removeDialog: false /* 删除弹窗显示参数 */,
      removeTitle: "" /* 删除弹窗标题（web、table、filed） */,
    };
  },
  watch: {
    /* 监听web选择 */
    webCode(newvalue) {
      if (newvalue) {
        this.get_table_list();
      } else {
        this.tableCode = 0;
      }
    },
    /* 监听table选择 */
    tableCode(newvalue) {
      if (newvalue) {
        this.get_field_list();
      } else {
        this.fieldArray = []
        this.fieldCode = 0;
      }
    },
  },
  created() {
    this.get_web_list();
  },
  methods: {
    /* 提示 */
    show_tips(status, message) {
      if (status === 200) {
        this.$vs.notification({
          flat: true,
          color: "primary",
          position: "top-center",
          duration: "1500",
          title: `${message}`,
        });
      } else if (status === 403) {
        this.$vs.notification({
          flat: true,
          color: "danger",
          position: "top-center",
          duration: "2000",
          buttonClose:false,
          title: `${message}`,
        });
      } else if (status === 500) {
        this.$vs.notification({
          flat: true,
          color: "warn",
          position: "top-center",
          duration: "1500",
          title: `${message}`,
        });
      }
      setTimeout(() => {
        status === 403 ? this.$router.push({ path: "/login" }) : null;
      }, 2000);
    },
    /* 获取网站列表 */
    get_web_list() {
      getWebList().then((res) => {
        if (res.data.status === 200) {
          this.webArray = res.data.obj.records;
          this.webCode =
            res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 展示网站弹窗 */
    web(type) {
      type === "edit" ? this.get_web_info() : null;
      this.webTitle = type === "add" ? "Add Web" : "Edit Web";
      this.dialogTheme = type === "add" ? false : true;
      this.webForm = type === "add" ? {} : this.webForm;
      this.webDialog = true;
      this.webUploadSrc = type === "add" ? "" : this.webUploadSrc;
    },
    /* 获取网站信息 */
    get_web_info() {
      getWebInfo(this.webCode).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, database, website, logo } = res.data.obj;
          this.webUploadSrc = process.env.VUE_APP_BASE_API + res.data.obj.logo;
          this.webForm = { name, describe, database, website, logo };
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 上传logo图 */
    upload_image(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("resource", file);
      upload(formData, 1, 1).then((res) => {
        if (res.data.status === 200) {
          this.webForm["logo"] = res.data.path;
          this.webUploadSrc = process.env.VUE_APP_BASE_API + res.data.path;
        }
        this.show_tips(res.data.status, res.data.message);
      });
    },
    /* 添加、修改网站 */
    controls_web_info() {
      if (this.webTitle === "Add Web") {
        addWebInfo(this.webForm).then((res) => {
          if (res.data.status === 200) {
            this.show_tips(res.data.status, res.data.message);
            this.webDialog = false;
            this.get_web_list();
            setTimeout(()=>{
              location.reload();
            },500)
          } else {
            this.show_tips(res.data.status, res.data.message);
          }
        });
      } else {
        editWebInfo(this.webCode, this.webForm).then((res) => {
          if (res.data.status === 200) {
            this.get_web_list();
            this.webDialog = false;
            this.$bus.$emit('update-menu')
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },
    /* 获取表列表 */
    get_table_list() {
      getTableList(this.webCode).then((res) => {
        if (res.data.status === 200) {
          this.tableArray = res.data.obj.records;
          this.tableCode =
            res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 展示表弹窗 */
    table(type, id) {
      type === "edit" ? this.get_table_info(id) : null;
      this.tableTitle = type === "add" ? "Add Table" : "Edit Table";
      this.dialogTheme = type === "add" ? false : true;
      this.tableForm = type === "add" ? {} : this.tableForm;
      this.tableDialog = true;
    },
    /* 获取表信息 */
    get_table_info(id) {
      this.tableHandleCode = id;
      getTableInfo(id).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, table } = res.data.obj;
          this.tableForm = { name, describe, table };
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 添加、修改表 */
    controls_table_info() {
      this.tableForm["wid"] = this.webCode;
      if (this.tableTitle === "Add Table") {
        addTableInfo(this.tableForm).then((res) => {
          if (res.data.status === 200) {
            this.get_table_list();
            this.tableDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      } else {
        editTableInfo(this.tableHandleCode, this.tableForm).then((res) => {
          if (res.data.status === 200) {
            this.get_table_list();
            this.tableDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },
    /* 获取字段列表 */
    get_field_list() {
      getFieldList(this.tableCode).then((res) => {
        if (res.data.status === 200) {
          this.fieldArray = res.data.obj.records;
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 展示字段弹窗 */
    field(type, id) {
      type === "edit" ? this.get_field_info(id) : null;
      this.fieldTitle = type === "add" ? "Add Field" : "Edit Field";
      this.dialogTheme = type === "add" ? false : true;
      this.fieldForm = type === "add" ? {} : this.fieldForm;
      this.fieldDialog = true;
      this.creatWayCode = type === "add" ? "" : this.fieldForm['creatway']
      this.showWayCode = type === "add" ? "" : this.fieldForm['showay']
      this.fieldTypeCode = type === "add" ? "" : this.fieldForm['type']
    },
    /* 获取字段信息 */
    get_field_info(id) {
      this.fieldHandleCode = id;
      getFieldInfo(id).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, creatway, showay, type, size, field } =
            res.data.obj;
          this.fieldForm = {
            name,
            describe,
            creatway,
            showay,
            type,
            size,
            field,
          };
          this.creatWayCode = creatway;
          this.showWayCode = showay;
          this.fieldTypeCode = type;
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 添加、修改字段 */
    controls_field_info() {
      this.fieldForm["wid"] = this.webCode;
      this.fieldForm["tid"] = this.tableCode;
      this.fieldForm["size"] =
        this.fieldForm["type"] === ("bigint" || "datetime")
          ? 0
          : this.fieldForm["size"];
      if (this.fieldTitle === "Add Field") {
        addFieldInfo(this.fieldForm).then((res) => {
          if (res.data.status === 200) {
            this.get_field_list();
            this.fieldDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      } else {
        this.fieldForm["wid"] = this.webCode;
        this.fieldForm["tid"] = this.tableCode;
        editFieldInfo(this.fieldHandleCode, this.fieldForm).then((res) => {
          if (res.data.status === 200) {
            this.get_field_list();
            this.fieldDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },
    /* 展示删除弹窗 */
    remove(type, id) {
      if (type === "web") {
        this.removeTitle = "Remove Web";
        this.removeDialog = true;
      } else if (type === "table") {
        this.removeTitle = "Remove Table";
        this.removeDialog = true;
        this.tableHandleCode = id;
      } else {
        this.removeTitle = "Remove Field";
        this.removeDialog = true;
        this.fieldHandleCode = id;
      }
    },
    /* 删除 */
    do_remove() {
      if (this.removeTitle === "Remove Table") {
        removeTableInfo(this.tableHandleCode, this.webCode).then((res) => {
          if (res.data.status === 200) {
            this.get_table_list();
            this.removeDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      } else if (this.removeTitle === "Remove Field") {
        removeFieldInfo(
          this.fieldHandleCode,
          this.tableCode,
          this.webCode
        ).then((res) => {
          if (res.data.status === 200) {
            this.get_field_list();
            this.removeDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      } else {
        removeWebInfo(this.webCode).then((res) => {
          if (res.data.status === 200) {
            this.get_web_list();
            this.removeDialog = false;
            setTimeout(()=>{
              location.reload();
            },500)
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },
  },
};
</script>

<style lang="less">
@import "manage.less";
</style>