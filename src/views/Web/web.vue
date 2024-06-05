<template>
  <div class="web">
    <div class="header_view">
      <div class="navList">
        <div
          class="nav"
          :class="{ nav_: navCode === item.id }"
          v-for="(item, index) in navList"
          :key="index"
          @click="navCode = item.id"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="main_view">
      <div class="tools">
        <vs-button icon color="primary" relief @click="data('add')">
          <img src="@/assets/web/add.png" /> Add Data
        </vs-button>
        <vs-button icon color="success" relief @click="data('edit')">
          <img src="@/assets/web/edit.png" alt="" /> Edit Data
        </vs-button>
        <vs-button icon color="danger" relief @click="removeDialog = true">
          <img src="@/assets/web/remove.png" alt="" />
          Remove Data
        </vs-button>
      </div>

      <div class="table">
        <div>
          <vs-input v-model="value1" placeholder="search" state="primary">
            <template #icon>
              <img src="@/assets/common/search.png" alt="" />
            </template>
          </vs-input>
        </div>
        <vs-table v-model="selected">
          <template #thead>
            <vs-tr>
              <vs-th>
                <vs-checkbox
                  :indeterminate="selected.length == dataList.length"
                  v-model="allCheck"
                  @change="selected = $vs.checkAll(selected, dataList)"
                />
              </vs-th>
              <vs-th style="width: 200px"> ID </vs-th>
              <vs-th v-for="(item, index) in headerList" :key="index">
                {{ item.name }}
              </vs-th>
              <vs-th style="width: 200px"> 创建时间 </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr
              :key="i"
              v-for="(tr, i) in dataList"
              :data="tr"
              :is-selected="!!selected.includes(tr)"
            >
              <vs-td checkbox>
                <vs-checkbox :val="tr" v-model="selected" />
              </vs-td>
              <vs-td>{{ tr["id"] }}</vs-td>
              <vs-td v-for="item in headerList" :key="item">
                <p>{{ tr[`${item.field}`] }}</p>
              </vs-td>
              <vs-td>{{ new Date(tr["creatime"]).toLocaleString()}}</vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <vs-pagination
              v-model="page"
              :length="$vs.getLength($vs.getSearch(dataList), max)"
            />
          </template>
        </vs-table>
      </div>
    </div>
    <div class="dialog_view">
      <transition name="dialog">
        <div class="add_edit" v-show="dataDialog">
          <div class="card">
            <div class="close" @click="dataDialog = false">
              <vs-button icon border :success="dialogType">
                <img v-if="dialogType" src="@/assets/common/editClose.png" />
                <img v-else src="@/assets/common/addClose.png" />
              </vs-button>
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
                <div class="formItem" v-if="item.creatway === '文本'">
                  <vs-input
                    primary
                    :success="dialogType"
                    :label="item.name"
                    v-model="dataForm[`${item.field}`]"
                  >
                  </vs-input>
                </div>
                <div class="formItem" v-else-if="item.creatway === '单选'">
                  <p class="label">{{ item.name }}</p>
                  <div class="value">
                    <vs-radio
                      :success="dialogType"
                      v-for="item_ in item.size.split(',')"
                      :key="item_"
                      :val="item_"
                      v-model="dataForm[`${item.field}`]"
                    >
                      {{ item_ }}
                    </vs-radio>
                  </div>
                </div>
                <div class="formItem" v-else-if="item.creatway === '多选'">
                  <p class="label">{{ item.name }}</p>
                  <div class="value">
                    <vs-checkbox
                      :success="dialogType"
                      v-for="item_ in item.size.split(',')"
                      :key="item_"
                      :val="item_"
                      v-model="dataForm[`${item.field}`]"
                      @change.native="checkbox_change"
                    >
                      {{ item_ }}
                    </vs-checkbox>
                  </div>
                </div>
                <div class="formItem" v-else-if="item.creatway === '下拉'">
                  <vs-select
                    :label="item.name"
                    v-model="dataForm[`${item.field}`]"
                  >
                    <vs-option
                      v-for="item_ in item.size.split(',')"
                      :key="item_"
                      :label="item_"
                      :value="item_"
                    >
                      {{ item_ }}
                    </vs-option>
                  </vs-select>
                </div>
                <div class="formItem" v-else-if="item.creatway === '图片'">
                  <p class="label">{{ item.name }}</p>

                  <vs-button
                    block
                    :success="dialogType"
                    @click="$refs.imageRef.click()"
                    v-if="!dataForm[`${item.field}`]"
                  >
                    <img src="@/assets/common/image.png" /> image
                  </vs-button>

                  <vs-tooltip border top v-else>
                    <vs-button
                      block
                      :success="dialogType"
                      @click="$refs.imageRef.click()"
                    >
                      <img src="@/assets/common/check.png" />
                    </vs-button>
                    <template #tooltip>
                      <img
                        :src="apiUrl + dataForm[`${item.field}`]"
                        width="80"
                        height="80"
                      />
                    </template>
                  </vs-tooltip>

                  <input
                    v-show="false"
                    ref="imageRef"
                    type="file"
                    accept="image/*"
                    @change="upload($event, item.field)"
                  />
                </div>
                <div class="formItem" v-else-if="item.creatway === '音频'">
                  <p class="label">{{ item.name }}</p>

                  <vs-button
                    block
                    :success="dialogType"
                    v-if="!dataForm[`${item.field}`]"
                  >
                    <img src="@/assets/common/audio.png" /> audio
                  </vs-button>

                  <vs-tooltip border top v-else>
                    <vs-button
                      block
                      :success="dialogType"
                      @click="$refs.audioRef.click()"
                    >
                      <img src="@/assets/common/check.png" />
                    </vs-button>
                    <template #tooltip>
                      <audio :src="apiUrl + dataForm[`${item.field}`]"></audio>
                    </template>
                  </vs-tooltip>

                  <input
                    v-show="false"
                    ref="audioRef"
                    type="file"
                    accept="audio/*"
                    @change="upload($event, item.field)"
                  />
                </div>
                <div class="formItem" v-else-if="item.creatway === '视频'">
                  <p class="label">{{ item.name }}</p>

                  <vs-button
                    block
                    :success="dialogType"
                    v-if="!dataForm[`${item.field}`]"
                  >
                    <img src="@/assets/common/video.png" /> video
                  </vs-button>

                  <vs-tooltip border top v-else>
                    <vs-button
                      block
                      :success="dialogType"
                      @click="$refs.videoRef.click()"
                    >
                      <img src="@/assets/common/check.png" />
                    </vs-button>
                    <template #tooltip>
                      <img
                        :src="apiUrl + dataForm[`${item.field}`]"
                        width="80"
                        height="80"
                      />
                    </template>
                  </vs-tooltip>

                  <input
                    v-show="false"
                    ref="videoRef"
                    type="file"
                    accept="video/*"
                    @change="upload($event, item.field)"
                  />
                </div>
              </div>
            </div>
            <div class="footer">
              <vs-button
                icon
                :success="dialogType"
                @click="controls_data_info()"
              >
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="dataDialog = false">
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
      </transition>
    </div>
  </div>
</template>

<script>
import { getTableList } from "@/api/table";
import { getFieldList } from "@/api/field";
import {
  getDataList,
  getDataInfo,
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
      headerList: [],
      dataList: new Array(1),
      page: 1,
      max: 5,
      allCheck: false,
      selected: [],
      dataDialog: false,
      dataTitle: "",
      dialogType: false,
      dataForm: {},
      removeDialog: false,
      apiUrl: process.env.VUE_APP_BASE_API,
      a: [],
    };
  },
  watch: {
    navCode(newvalue) {
      this.get_header(newvalue);
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
    /* 获取栏目（表） */
    get_nav() {
      getTableList(this.$route.query.id).then((res) => {
        if (res.data.status === 200) {
          this.navList = res.data.obj.records;
          this.navCode =
            res.data.obj.records.length > 0 ? res.data.obj.records[0].id : "";
          this.get_header(this.navCode);
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
            }
          });
          this.get_data_list(this.$route.query.id, this.navCode);
        } else {
          this.show_tips(res.data.status, res.data.message);
        }
      });
    },
    /* 获取数据 */
    get_data_list(wid, tid) {
      getDataList(wid, tid).then((res) => {
        this.dataList = res.data.obj.records;
      });
    },
    checkbox_change(val) {
      console.log(val);
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

    data(type) {
      type === "edit" ? this.get_data_info() : null;
      this.dataTitle = type === "add" ? "Add Data" : "Edit Data";
      this.dialogTheme = type === "add" ? false : true;
      this.dataForm = type === "add" ? {} : this.selected[0];
      this.dataDialog = true;
    },

    get_data_info() {
      getDataInfo(this.$route.query.id, this.navCode, this.selected[0].id).then(
        (res) => {
          if (res.data.status === 200) {
            this.dataForm = res.data.obj;
            this.headerList.forEach((item) => {
              if (item.creatway === "多选") {
                this.dataForm[item.field] =
                  this.dataForm[item.field].split(",");
              }
            });
          } else {
            this.show_tips(res.data.status, res.data.message);
          }
        }
      );
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
            this.dataDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
      }
    },

    /* 删除 */
    remove_data_info() {
      let ids = []
      this.selected.forEach(item=>{
        ids.push(item.id)
      })
      removeDataInfo(this.$route.query.id, this.navCode,{ids}).then((res) => {
          if (res.data.status === 200) {
            this.get_data_list(this.$route.query.id, this.navCode);
              this.removeDialog = false;
          }
          this.show_tips(res.data.status, res.data.message);
        });
    },
  },
};
</script>

<style lang="less">
@import "web.less";
</style>