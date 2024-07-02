<template>
  <div class="manage">
    <!-- 网站 -->
    <div class="web_view" :style="{ width: webArray.length ? '39vw' : '22vw' }">
      <el-select
        v-model="webCode"
        filterable
        placeholder="请添加网站"
        @change="webCode = $event"
        size="small"
      >
        <el-option
          v-for="(item, index) in webArray"
          :key="index"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>

      <el-button
        type="primary"
        icon="el-icon-circle-plus"
        @click="web('add')"
        size="small"
        >Add Web</el-button
      >
      <el-button
        type="success"
        icon="el-icon-edit"
        @click="web('edit')"
        size="small"
        v-show="webArray.length"
        >Edit Web</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-remove"
        @click="remove('web')"
        size="small"
        v-show="webArray.length"
        >Remove Web</el-button
      >
    </div>
    <!-- 表 -->
    <div class="table_view">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        plain
        @click="table('add')"
        v-show="webCode"
        >Add Table</el-button
      >
      <div class="list" v-if="tableArray.length">
        <div
          class="cell"
          :class="{ cell_: tableCode === item.id }"
          v-for="(item, index) in tableArray"
          :key="index"
          @click="tableCode = item.id"
        >
          <p>{{ item.name }}</p>
          <p>{{ item.table }}</p>
          <div class="tool">
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
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="small"
        plain
        @click="field('add')"
        v-show="webCode"
        >Add Field</el-button
      >
      <div class="list" v-if="fieldArray.length">
        <div class="cell" v-for="(item, index) in fieldArray" :key="index">
          <h4>{{ item.name }}</h4>
          <span>{{ item.describe }}</span>
          <span>{{ item.type }}</span>
          <span>{{ item.size }}</span>
          <span>{{ item.field }}</span>
          <div class="tool">
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
      <el-collapse-transition>
        <div class="add_edit_web" v-show="webDialog">
          <div class="card_web">
            <div
              class="close"
              :style="{
                'border-color':
                  buttonType === 'primary' ? '#195BFF' : '#46C93A',
              }"
              @click="webDialog = false"
            >
              <el-link :type="buttonType" :underline="false"
                ><i class="el-icon-close"></i
              ></el-link>
            </div>
            <div class="header">
              {{ webTitle }}
            </div>
            <div class="main">
              <div class="item">
                <label
                  ><p>*</p>
                  网站名称：</label
                >
                <el-input
                  placeholder="Web Name"
                  v-model="webForm['name']"
                  prefix-icon="el-icon-monitor"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label>网站简介：</label>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="Web Describe"
                  v-model="webForm['describe']"
                >
                </el-input>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  数据库：</label
                >
                <el-input
                  placeholder="Database"
                  v-model="webForm['database']"
                  prefix-icon="el-icon-connection"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  网站地址：</label
                >
                <el-input
                  placeholder="Website"
                  v-model="webForm['website']"
                  prefix-icon="el-icon-s-flag"
                  size="small"
                >
                </el-input>
              </div>
              <div class="upload">
                <label
                  ><p>*</p>
                  网站logo：</label
                >
                <el-button
                  :type="buttonType"
                  icon="el-icon-upload"
                  size="small"
                  @click="$refs.fileRef.click()"
                  v-if="!webUploadSrc"
                  style="width: 100%"
                ></el-button>
                <el-popover placement="top" trigger="hover" border v-else>
                  <img :src="webUploadSrc" width="150" height="150" />
                  <el-button
                    slot="reference"
                    :type="buttonType"
                    icon="el-icon-success"
                    size="small"
                    @click="$refs.fileRef.click()"
                    style="width: 100%"
                  ></el-button>
                </el-popover>
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
              <div
                class="button"
                @click="controls_web_info()"
                :style="{
                  'background-color':
                    buttonType === 'primary' ? '#195BFF' : '#46C93A',
                }"
              >
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/confirm.png"
                  alt=""
                />
              </div>
              <div class="cancel_button" @click="webDialog = false">
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/cancel.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <!-- 表添加、修改弹窗 -->
      <el-collapse-transition>
        <div class="add_edit_table" v-show="tableDialog">
          <div class="card_table">
            <div
              class="close"
              :style="{
                'border-color':
                  buttonType === 'primary' ? '#195BFF' : '#46C93A',
              }"
              @click="tableDialog = false"
            >
              <el-link :type="buttonType" :underline="false"
                ><i class="el-icon-close"></i
              ></el-link>
            </div>
            <div class="header">
              {{ tableTitle }}
            </div>
            <div class="main">
              <div class="item">
                <label
                  ><p>*</p>
                  表格名称：</label
                >
                <el-input
                  placeholder="Table Name"
                  v-model="tableForm['name']"
                  prefix-icon="el-icon-files"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label>表格描述：</label>
                <el-input
                  placeholder="Table Describe"
                  v-model="tableForm['describe']"
                  prefix-icon="el-icon-tickets"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  数据库：</label
                >
                <el-input
                  placeholder="Table"
                  v-model="tableForm['table']"
                  prefix-icon="el-icon-s-flag"
                  size="small"
                >
                </el-input>
              </div>
            </div>
            <div class="footer">
              <div
                class="button"
                @click="controls_table_info()"
                :style="{
                  'background-color':
                    buttonType === 'primary' ? '#195BFF' : '#46C93A',
                }"
              >
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/confirm.png"
                  alt=""
                />
              </div>
              <div class="cancel_button" @click="tableDialog = false">
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/cancel.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <!-- 字段添加、修改弹窗 -->
      <el-collapse-transition>
        <div class="add_edit_field" v-show="fieldDialog">
          <div class="card_field">
            <div
              class="close"
              :style="{
                'border-color':
                  buttonType === 'primary' ? '#195BFF' : '#46C93A',
              }"
              @click="fieldDialog = false"
            >
              <el-link :type="buttonType" :underline="false"
                ><i class="el-icon-close"></i
              ></el-link>
            </div>
            <div class="header">
              {{ fieldTitle }}
            </div>
            <div class="main">
              <div class="item">
                <label
                  ><p>*</p>
                  字段名称：</label
                >
                <el-input
                  placeholder="Field Name"
                  v-model="fieldForm['name']"
                  prefix-icon="el-icon-collection"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label>字段描述：</label>
                <el-input
                  placeholder="Field Describe"
                  v-model="fieldForm['describe']"
                  prefix-icon="el-icon-tickets"
                  size="small"
                >
                </el-input>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  是否关联其他表：</label
                >
                <el-radio v-model="isRelevance" label="1">否</el-radio>
                <el-radio v-model="isRelevance" label="2">是</el-radio>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  创建方式：</label
                >
                <el-select
                  v-model="creatWayCode"
                  placeholder="Field Create"
                  @change="fieldForm['creatway'] = creatWayCode"
                  size="small"
                >
                  <el-option
                    v-for="item in creatWayArray"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="item">
                <label
                  ><p>*</p>
                  展示方式：</label
                >
                <el-select
                  v-model="showWayCode"
                  placeholder="Field Show"
                  @change="fieldForm['showay'] = showWayCode"
                  size="small"
                >
                  <el-option
                    v-for="item in showWayArray"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="item" v-if="isRelevance === '1'">
                <label
                  ><p>*</p>
                  字段类型：</label
                >
                <el-select
                  v-model="fieldTypeCode"
                  placeholder="Field Type"
                  size="small"
                >
                  <el-option
                    v-for="item in fieldTypeArray"
                    :key="item"
                    :label="item"
                    :value="item"
                    @change="fieldForm['type'] = fieldTypeCode"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="item" v-else>
                <label
                  ><p>*</p>
                  关联表：</label
                >
                <el-select
                  v-model="fieldTypeCode"
                  placeholder="Table Relevance"
                  size="small"
                  @change="fieldForm['type'] = fieldTypeCode"
                >
                  <el-option
                    v-for="item in relevanceTableArray"
                    :key="item"
                    :label="item.value + '(' + item.value + ')'"
                    :value="item.id"
                   
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="item" v-if="isRelevance === '1'">
                <label
                  ><p>*</p>
                  字段大小/值：</label
                >
                <el-input
                  placeholder="Field Size"
                  v-model="fieldForm['size']"
                  prefix-icon="el-icon-edit-outline"
                  size="small"
                >
                </el-input>
              </div>
              <div class="item" v-else>
                <label
                  ><p>*</p>
                  关联字段：</label
                >
                <el-select
                  v-model="fieldSizeCode"
                  placeholder="Field Relevance"
                  size="small"
                  @change="fieldForm['size'] = fieldSizeCode"
                >
                  <el-option
                    v-for="item in relevanceFieldArray"
                    :key="item"
                    :label="item.value + '(' + item.value + ')'"
                    :value="item.id"
                    
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="item">
                <label
                  ><p>*</p>
                  数据库：</label
                >
                <el-input
                  placeholder="Field"
                  v-model="fieldForm['field']"
                  prefix-icon="el-icon-s-flag"
                  size="small"
                >
                </el-input>
              </div>
            </div>
            <div class="footer">
              <div
                class="button"
                @click="controls_field_info()"
                :style="{
                  'background-color':
                    buttonType === 'primary' ? '#195BFF' : '#46C93A',
                }"
              >
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/confirm.png"
                  alt=""
                />
              </div>
              <div class="cancel_button" @click="fieldDialog = false">
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/cancel.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
      <!-- 网站、表、字段删除弹窗 -->
      <el-collapse-transition>
        <div class="remove" v-show="removeDialog">
          <div class="card_remove">
            <div class="close" @click="removeDialog = false">
              <el-link type="danger" :underline="false"
                ><i class="el-icon-close"></i
              ></el-link>
            </div>
            <div class="header">
              {{ removeTitle }}
            </div>
            <div class="main">
              <p>是否确认删除该数据？</p>
              <span>说明：该操作不可逆，请谨慎删除！</span>
            </div>
            <div class="footer">
              <div class="button" @click="do_remove()">
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/confirm.png"
                  alt=""
                />
              </div>
              <div class="cancel_button" @click="removeDialog = false">
                <img
                  width="14"
                  height="14"
                  src="@/assets/common/cancel.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
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
  getSelectTable,
  getSelectField,
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
      buttonType: "primary",
      webCode: "" /* 当前选中网站id */,
      webArray: [] /* 网站列表 */,
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
      isRelevance: "1" /* 是否关联其他表参数 */,
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
      showWayArray: ["文本", "图片", "音频", "视频"] /* 全部字段显示方式 */,
      fieldTypeCode: "" /* 当前选中字段类型 */,
      fieldTypeArray: [
        "bigint",
        "double",
        "varchar",
        "enum",
        "set",
        "datetime",
      ] /* 全部字段常用类型 */,
      relevanceTableArray: [] /* 关联表列表 */,
      relevanceFieldArray: [] /* 关联字段列表 */,
      fieldSizeCode: "" /* 当前选中关联字段 */,
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
        this.fieldArray = [];
        this.fieldCode = 0;
      }
    },
    /* 监听关联变化 */
    isRelevance(newvalue) {
      if (newvalue == "2") {
        this.fieldForm["creatway"] = this.creatWayCode = "下拉";
        this.creatWayArray = ["下拉"];
        this.get_select_table();
      } else {
        this.fieldForm["creatway"] = this.creatWayCode = "";
        this.creatWayArray = [
          "文本",
          "图片",
          "音频",
          "视频",
          "下拉",
          "单选",
          "多选",
        ];
      }
      this.fieldForm["showay"] = this.showWayCode = "";
      this.fieldForm["type"] = this.fieldTypeCode = "";
      this.fieldForm["size"] = this.fieldSizeCode = "";
    },
    /* 监听选中类型 */
    fieldTypeCode(newvalue) {
      if (typeof newvalue === "number") {
        this.get_select_field(newvalue);
      } else {
        return;
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
        this.$message({
          message,
          type: "success",
        });
      } else if (status === 403) {
        this.$message({
          message,
          type: "error",
        });
      } else if (status === 500) {
        this.$message({
          message,
          type: "warning",
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
      this.buttonType = type === "add" ? "primary" : "success";
      this.webForm = type === "add" ? {} : this.webForm;
      this.webDialog = true;
      this.webUploadSrc = type === "add" ? "" : this.webUploadSrc;
    },
    /* 获取网站信息 */
    get_web_info() {
      getWebInfo(this.webCode).then((res) => {
        if (res.data.status === 200) {
          const { name, describe, database, website, logo } = res.data.obj;
          this.webUploadSrc =  res.data.obj.logo;
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
          this.webUploadSrc =  res.data.path;
        }
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
            this.$bus.$emit("update-menu");
          } else {
            this.show_tips(res.data.status, res.data.message);
          }
        });
      } else {
        editWebInfo(this.webCode, this.webForm).then((res) => {
          if (res.data.status === 200) {
            this.get_web_list();
            this.webDialog = false;
            this.$bus.$emit("update-menu");
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
      this.buttonType = type === "add" ? "primary" : "success";
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
    /* 获取关联表信息 */
    get_select_table() {
      getSelectTable(this.webCode, this.tableCode).then((res) => {
        if (res.data.status === 200) {
          this.relevanceTableArray = res.data.obj.records;
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 获取关联字段信息 */
    get_select_field(id) {
      getSelectField(id).then((res) => {
        if (res.data.status === 200) {
          this.relevanceFieldArray = res.data.obj.records;
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 展示字段弹窗 */
    field(type, id) {
      type === "edit" ? this.get_field_info(id) : null;
      this.fieldTitle = type === "add" ? "Add Field" : "Edit Field";
      this.buttonType = type === "add" ? "primary" : "success";
      this.fieldForm = type === "add" ? {} : this.fieldForm;
      this.fieldDialog = true;
      this.creatWayCode = type === "add" ? "" : this.fieldForm["creatway"];
      this.showWayCode = type === "add" ? "" : this.fieldForm["showay"];
      this.fieldTypeCode = type === "add" ? "" : this.fieldForm["type"];
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
      this.fieldForm["relevance"] = this.isRelevance;
      this.fieldForm["type"] = this.fieldTypeCode;
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
            this.$bus.$emit("update-menu");
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