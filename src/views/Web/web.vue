<template>
  <div class="web">
    <div class="header_view">
      <div class="navList">
        <div
          class="nav"
          :class="{ nav_: navCode === item.name }"
          v-for="(item, index) in navList"
          :key="index"
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
              <vs-th v-for="(item, index) in headList" :key="index">
                {{ item }}
              </vs-th>
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
              <vs-td>
                {{ tr.id }}
              </vs-td>
              <vs-td>
                {{ tr.name }}
              </vs-td>
              <vs-td>
                {{ tr.describe }}
              </vs-td>
              <vs-td>
                {{ tr.type }}
              </vs-td>
              <vs-td>
                {{ tr.size }}
              </vs-td>
              <vs-td>
                {{ tr.creatime }}
              </vs-td>
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
                v-for="(item, index) in formList"
                :key="index"
              >
                <div class="formItem" v-if="item.creat === '本文'">
                  <vs-input primary :success="dialogType" :label="item.label">
                  </vs-input>
                </div>
                <div class="formItem" v-else-if="item.creat === '单选'">
                  <p class="label">{{ item.label }}</p>
                  <div class="value">
                    <vs-radio :success="dialogType" v-for="item in item.value" :key="item">
                      {{ item }}
                    </vs-radio>
                  </div>
                </div>
                <div class="formItem" v-else-if="item.creat === '多选'">
                  <p class="label">{{ item.label }}</p>
                  <div class="value">
                    <vs-checkbox
                    :success="dialogType"
                      v-for="item in item.value"
                      :key="item"
                      v-model="option"
                    >
                      {{ item }}
                    </vs-checkbox>
                  </div>
                </div>
                <div class="formItem" v-else-if="item.creat === '下拉'">
                  <vs-select :label="item.label" v-model="value">
                    <vs-option label="Vuesax" value="1"> Vuesax </vs-option>
                  </vs-select>
                </div>
                <div class="formItem" v-else-if="item.creat === '图片'">
                  <p class="label">{{ item.label }}</p>
                  <vs-button block :success="dialogType">
                  <img src="@/assets/common/image.png" /> image
                </vs-button>
                </div>
                <div class="formItem" v-else-if="item.creat === '音频'">
                  <p class="label">{{ item.label }}</p>
                  <vs-button block :success="dialogType">
                  <img src="@/assets/common/audio.png" /> audio
                </vs-button>
                </div>
                <div class="formItem" v-else-if="item.creat === '视频'">
                  <p class="label">{{ item.label }}</p>
                  <vs-button block :success="dialogType">
                  <img src="@/assets/common/video.png" /> video
                </vs-button>
                </div>
              </div>

              <!-- <div class="upload">
                <label>网站logo</label>
                <vs-button block :success="dialogType">
                  <img src="@/assets/manage/uploadButton.png" /> upload
                </vs-button>
              </div> -->
            </div>
            <div class="footer">
              <vs-button icon :success="dialogType">
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
            <div class="header">
              Remove Data
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
export default {
  name: "web",
  data() {
    return {
      navCode: "用户管理",
      navList: [{ name: "用户管理" }, { name: "菜单管理" }],
      headList: {
        id: "用户id",
        name: "用户名称",
        describe: "用户描述",
        type: "用户类型",
        size: "用户大小",
        creatime: "创建时间",
      },
      dataList: [
        {
          id: 111111111,
          name: "字段名称_1",
          describe: "字段描述_1",
          type: "字段类型_1",
          size: "字段大小_1",
          creatime: "创建时间_1",
        },
        {
          id: 111111111,
          name: "字段名称_2",
          describe: "字段描述_2",
          type: "字段类型_2",
          size: "字段大小_2",
          creatime: "创建时间_2",
        },
        {
          id: 111111111,
          name: "字段名称_3",
          describe: "字段描述_3",
          type: "字段类型_3",
          size: "字段大小_3",
          creatime: "创建时间_3",
        },
        {
          id: 111111111,
          name: "字段名称_4",
          describe: "字段描述_4",
          type: "字段类型_4",
          size: "字段大小_4",
          creatime: "创建时间_4",
        },
        {
          id: 111111111,
          name: "字段名称_5",
          describe: "字段描述_5",
          type: "字段类型_5",
          size: "字段大小_5",
          creatime: "创建时间_5",
        },
      ],
      page: 1,
      max: 5,
      allCheck: false,
      selected: [],
      dataDialog: false,
      dataTitle: "",
      dialogType: false,
      formList: [
        { id: 1, label: "user_1", creat: "本文", show: "文本", value: [] },
        {
          id: 2,
          label: "user_2",
          creat: "单选",
          show: "文本",
          value: ["男", "女"],
        },
        {
          id: 3,
          label: "user_3",
          creat: "多选",
          show: "文本",
          value: ["A", "B", "C"],
        },
        {
          id: 4,
          label: "user_4",
          creat: "下拉",
          show: "文本",
          value: ["!", "?", "%"],
        },
        { id: 5, label: "user_5", creat: "图片", show: "文本", value: [] },
        { id: 6, label: "user_6", creat: "音频", show: "文本", value: [] },
        { id: 7, label: "user_7", creat: "视频", show: "文本", value: [] },
      ],
      removeDialog:false,
    };
  },
  methods: {
    data(type) {
      if (type === "add") {
        this.dataTitle = "Add Data";
        this.dataDialog = true;
        this.dialogType = false;
      } else {
        this.dataTitle = "Edit Data";
        this.dataDialog = true;
        this.dialogType = true;
      }
    },
  },
};
</script>

<style lang="less">
@import "web.less";
</style>