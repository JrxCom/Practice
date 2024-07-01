<template>
  <div class="web">
    <!-- 栏目展示 -->
    <div class="header_view">
      <div class="navList">
        <el-menu
          :default-active="navCode"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#F4F7F8"
          text-color="#2C3E50"
          active-text-color="#195BFF"
        >
          <el-menu-item
            v-for="(item, index) in navList"
            :index="item.id"
            :key="index"
            @click="navCode = item.id"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <!-- 数据展示 -->
    <div class="main_view">
      <div class="tools">
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          @click="data('add')"
          size="small"
          >Add Data</el-button
        >
        <el-button
          type="success"
          icon="el-icon-edit"
          @click="data('edit')"
          size="small"
          >Edit Data</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-remove"
          @click="removeDialog = true"
          size="small"
          >Remove Data</el-button
        >
      </div>
      <div class="table">
        <div>
          <vs-input
            placeholder="search"
            state="primary"
            v-model="search_id"
            @keyup.enter.native="search_data"
          >
            <template #icon>
              <img src="@/assets/common/search.png" alt="" />
            </template>
          </vs-input>
        </div>
        <el-table
          ref="multipleTable"
          :data="dataList"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="用户ID" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in headerList"
            :key="index"
            :prop="item.field"
            :label="item.name"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="creatime"
            label="创建时间"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{
              new Date(scope.row.creatime).toLocaleString()
            }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 数据添加、修改、删除弹窗 -->
    <div class="dialog_view">
      <el-collapse-transition>
        <div class="add_edit" v-if="dataDialog">
          <div class="card">
            <div
              class="close"
              :style="{
                'border-color':
                  buttonType === 'primary' ? '#195BFF' : '#46C93A',
              }"
              @click="dataDialog = false"
            >
              <el-link :type="buttonType" :underline="false"
                ><i class="el-icon-close"></i
              ></el-link>
            </div>
            <div class="header">
              {{ dataTitle }}
            </div>
            <div class="main">
              <div
                class="formList"
                v-for="(item, index) in headerList"
                :key="index"
              >
                <div class="formItem">
                  <label>{{ item.name }}：</label>
                  <el-input
                    v-model="dataForm[`${item.field}`]"
                    size="small"
                  >
                  </el-input>
                  <div class="radioView">
                    <el-radio label='男'>男</el-radio>
                    <el-radio label='女'>女</el-radio>
                   <!--  <el-radio
                      v-for="item_ in item.size.split(',')"
                      v-model="dataForm[item.field]"
                      :key="item_"
                      :val="item_"
                      :label="item_"
                      >{{ item_ }}</el-radio
                    > -->
                  </div>
                  <el-select
                    v-model="dataForm[`${item.field}`]"
                    size="small"
                  >
                  <el-option label='启用'></el-option>
                  <el-option label='禁用'></el-option>
                    <!-- <el-option
                      v-for="item_ in item.size.split(',')"
                      :key="item_"
                      :label="item_"
                      :value="item_"
                    >
                    </el-option> -->
                  </el-select>
                  <div class="radioView">
                    <el-checkbox-group v-model="dataForm[`${item.field}`]">
                      <el-checkbox label="A"></el-checkbox>
                      <el-checkbox label="B"></el-checkbox>
                      <el-checkbox label="C"></el-checkbox>
                      <!-- <el-checkbox
                        v-for="item_ in item.size.split(',')"
                        :key="item_"
                        :label="item_"
                      ></el-checkbox> -->
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div
                class="button"
                @click="controls_data_info()"
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
              <div class="cancel_button" @click="dataDialog = false">
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
      <el-collapse-transition>
        <div class="remove" v-show="removeDialog">
          <div class="card_remove">
            <div class="close" @click="removeDialog = false">
              <vs-button icon border danger>
                <img src="@/assets/common/removeClose.png" />
              </vs-button>
            </div>
            <div class="header">Remove Data</div>
            <div class="main">
              <p>是否确认删除该数据？</p>
              <span>说明：该操作不可逆，请谨慎删除</span>
            </div>
            <div class="footer">
              <vs-button icon danger @click="remove_data_info()">
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="removeDialog = false">
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
/* 引入栏目（表）列表api */
import { getTableList } from "@/api/table";
/* 引入表头（字段）信息api */
import { getFieldList } from "@/api/field";
/* 引入data qpi */
import {
  getDataList,
  getDataSearch,
  getDataInfo,
  getSelectData,
  addDataInfo,
  editDataInfo,
  removeDataInfo,
} from "@/api/data";
export default {
  name: "web",
  data() {
    return {
      navCode: "" /* 当前栏目（表） */,
      navList: [] /* 栏目列表 */,
      headerList: [] /* 表头列表 */,
      dataList: [] /* 数据列表表 */,
      search_id: "" /* 搜索输入id */,
      dataCount: 0 /* 数据总数 */,
      page: 1 /* 数据展示当前页 */,
      max: 5 /* 数据展示每页最大数据量 */,
      allCheck: false /* 全选 */,
      selected: [] /* 选择的数据 */,
      dataDialog: false /* 数据添加、修改弹窗显示参数 */,
      dataTitle: "" /* 弹窗标题 */,
      buttonType: "" /* 弹窗主题 */,
      dataForm: {} /* 数据表单 */,
      removeDialog: false /* 删除弹窗显示参数 */,
      apiUrl: process.env.VUE_APP_BASE_API /* api地址与端口号 */,
    };
  },
  watch: {
    /* 监控栏目切换 */
    navCode(newvalue) {
      this.page = 1;
      this.get_header(newvalue);
    },
    /* 监控页数切换 */
    page(newvalue) {
      this.page = newvalue;
      this.get_data_list(this.$route.query.id, this.navCode);
    },
  },
  created() {
    this.get_nav();
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
          buttonClose: false,
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
    /* 根据id搜索数据 */
    search_data() {
      if (this.search_id != "") {
        getDataSearch(this.$route.query.id, this.navCode, this.search_id).then(
          (res) => {
            this.dataList = res.data.obj.records;
            this.dataCount = 1;
          }
        );
      } else {
        this.get_data_list(this.$route.query.id, this.navCode);
      }
    },
    /* 获取栏目（表） */
    get_nav() {
      getTableList(this.$route.query.id).then((res) => {
        if (res.data.status === 200) {
          this.navList = res.data.obj.records;
          this.navCode =
            res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 获取表头（字段） */
    get_header(id) {
      getFieldList(id).then((res) => {
        if (res.data.status === 200) {
          this.headerList = res.data.obj.records;
          this.headerList.forEach((item) => {
            if (item.creatway === "多选") {
              this.dataForm[item.field] = [];
              this.$set(item, "size", []);
            } else if (item.creatway === "单选") {
              this.dataForm[item.field] = "";
              this.dataForm[item.size] = "";
            } else if (item.creatway === "下拉") {
              this.dataForm[item.field] = "";
              this.dataForm[item.size] = [];
            }
          });
          this.get_data_list(this.$route.query.id, this.navCode);
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 获取数据列表 */
    get_data_list(wid, tid) {
      getDataList(wid, tid, { page: this.page, max: this.max }).then((res) => {
        this.dataList = res.data.obj.records;
        this.dataCount = res.data.obj.count;
      });
    },
    /* 上传图片 */
    upload(event, field) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("resource", file);
      upload(formData, this.$route.query.id, this.navCode).then((res) => {
        if (res.data.status === 200) {
          this.dataForm[field] = res.data.path;
        }
        this.show_tips(res.data.status, res.data.message);
      });
    },
    /* 展示数据弹窗 */
    data(type) {
      type === "edit" ? this.get_data_info() : null;
      type === "add" ? this.get_select_data() : null;
      this.dataTitle = type === "add" ? "Add Data" : "Edit Data";
      this.buttonType = type === "add" ? "primary" : "success";
      this.dataForm = type === "add" ? {} : this.selected[0];
      this.dataDialog = true;
    },
    /* 获取数据信息 */
    get_data_info() {
      getDataInfo(this.$route.query.id, this.navCode, this.selected[0].id).then(
        (res) => {
          if (res.data.status === 200) {
            this.dataForm = res.data.obj;
            this.headerList.forEach((item) => {
              if (item.creatway === "多选") {
                this.dataForm[item.field] =
                  this.dataForm[item.field].split(",");
              } else if (item.creatway === "下拉" && item.relevance === "2") {
                getSelectData(this.$route.query.id, item.type, item.size).then(
                  (res) => {
                    this.$set(item, "size", res.data.obj.records.join());
                  }
                );
              }
            });
          } else {
            this.show_tips(res.data.status, res.data.message);
          }
        }
      );
    },
    /* 获取关联数据信息 */
    get_select_data() {
      this.headerList.forEach((item) => {
        if (item.creatway === "下拉" && item.relevance === "2") {
          getSelectData(this.$route.query.id, item.type, item.size).then(
            (res) => {
              this.$set(item, "size", res.data.obj.records);
            }
          );
        }
      });
    },
    /* 添加、修改数据 */
    controls_data_info() {
      if (this.dataTitle === "Add Data") {
        addDataInfo(this.$route.query.id, this.navCode, this.dataForm).then(
          (res) => {
            if (res.data.status === 200) {
              this.get_data_list(this.$route.query.id, this.navCode);
              this.dataDialog = false;
            }
            this.show_tips(res.data.status, res.data.message);
          }
        );
      } else {
        delete this.dataForm["id"];
        delete this.dataForm["creatime"];
        this.headerList.forEach((item) => {
          if (item.creatway === "多选") {
            this.dataForm[item.field] = this.dataForm[item.field].toString();
          }
        });
        editDataInfo(
          this.$route.query.id,
          this.navCode,
          this.selected[0].id,
          this.dataForm
        ).then((res) => {
          if (res.data.status === 200) {
            this.get_data_list(this.$route.query.id, this.navCode);
            this.selected = [];
            this.dataDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },
    /* 删除 */
    remove_data_info() {
      let ids = [];
      this.selected.forEach((item) => {
        ids.push(item.id);
      });
      removeDataInfo(this.$route.query.id, this.navCode, { ids }).then(
        (res) => {
          if (res.data.status === 200) {
            this.get_data_list(this.$route.query.id, this.navCode);
            this.removeDialog = false;
            this.selected = [];
          }
          this.show_tips(res.data.status, res.data.message);
        }
      );
    },
  },
};
</script>

<style lang="less">
@import "web.less";
</style>