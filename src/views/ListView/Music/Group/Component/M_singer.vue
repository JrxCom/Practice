<template>
    <div class="singer">
        <div class="btns">
            <vs-button success relief @click="showAddSingerDia()">
                <i class='bx bxs-user'></i>添加歌手
            </vs-button>
            <vs-button warn relief @clik="showEditSingerDia()">
                <i class='bx bxs-message-alt-edit'></i>修改歌手信息
            </vs-button>
            <vs-button danger relief @click="showDeleteSingerDia()">
                <i class='bx bxs-message-alt-x'></i>删除歌手
            </vs-button>

        </div>
        <vs-input v-model="search" placeholder="搜索歌手" state="primary">
            <template #icon>
                <i class='bx bx-search-alt'></i>
            </template>
        </vs-input>
        <div class="table">
            <vs-table v-model="selected">

                <template #thead>
                    <vs-tr>
                        <vs-th>
                            <vs-checkbox :indeterminate="selected.length == data.length" v-model="allCheck"
                                @change="selected = $vs.checkAll(selected, data)" />
                        </vs-th>
                        <vs-th>
                            歌手Id
                        </vs-th>
                        <vs-th>
                            姓名
                        </vs-th>
                        <vs-th>
                            头像
                        </vs-th>
                        <vs-th>
                            性别
                        </vs-th>
                        <vs-th>
                            简介
                        </vs-th>
                        <vs-th>
                            国籍
                        </vs-th>
                        <vs-th>
                            歌手标签
                        </vs-th>
                        <vs-th>
                            生日
                        </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(data, search), page, max)" :data="tr"
                        :is-selected="!!selected.includes(tr)" not-click-selected open-expand-only-td>
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
                            {{ tr.header }}
                        </vs-td>
                        <vs-td>
                            <i class='bx bx-male-sign' v-if="tr.sex === 1"></i>
                            <i class='bx bx-female-sign' v-else></i>
                        </vs-td>
                        <vs-td>
                            <vs-avatar v-if="tr.intro != ''" @click=" intro = tr.intro, dialog_intro = true">
                                <i class='bx bx-receipt'></i>
                            </vs-avatar>
                            <vs-avatar v-else>
                                <i class='bx bx-task-x'></i>
                            </vs-avatar>
                        </vs-td>
                        <vs-td>
                            {{ tr.country }}
                        </vs-td>
                        <vs-td>
                            {{ tr.label }}
                        </vs-td>
                        <vs-td>
                            {{ tr.birthday }}
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <div style="height: 6px;"></div>
                </template>
            </vs-table>
        </div>

        <vs-dialog v-model="dialog_intro">
            <template #header>
                歌手简介
            </template>

            <div class="con-form">
                <div class="text">
                    <p>{{ intro }}</p>
                </div>
            </div>
        </vs-dialog>
        <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(data, search), max)">
            <vs-select v-model="page">
                <vs-option v-for="numberPage in max" :label="numberPage" :value="numberPage" :key="numberPage">
                    {{ numberPage }}
                </vs-option>
            </vs-select>
        </vs-pagination>
        <vs-dialog blur v-model="dialog_add_edit" not-center prevent-close auto-width>
            <template #header>
                <h4 class="not-margin">
                    <b>{{ dialog_title }}</b>
                </h4>
            </template>

            <div class="con-form">
                <!-- 姓名 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bxs-user-pin" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input v-model="form.name" placeholder="姓名">
                    </vs-input>
                </div>

                <!-- 头像上传 -->
                <vs-button block dark border animation-type="vertical" @click="showUplaodSingerDia()">
                    头像上传
                    <template #animate>
                        <i class='bx bx-image'></i>
                    </template>
                </vs-button>
                <input type="file" ref="file_singer" accept="image/jpeg,image/jpg,image/png" style="display: none"
                    @change="upload_singer($event)">

                <!-- 歌手性别 -->
                <div class="form-list" style="margin: 6px 0;">
                    <vs-avatar size="34">
                        <i class="bx bx-male-female" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-select placeholder="性别" v-model="form.sex">
                        <vs-option label="男" value="1">
                            男
                        </vs-option>
                        <vs-option label="女" value="2">
                            女
                        </vs-option>
                    </vs-select>
                </div>

                <!-- 简介 -->
                <div class="form-list" style="margin: 10px 0;">
                    <vs-avatar size="34">
                        <i class="bx bxs-receipt" style="font-size: 16px"></i>
                    </vs-avatar>
                    <textarea v-model="form.intor" placeholder="简介" class="vs-textarea" cols="37" rows="6 "></textarea>
                </div>

                <!-- 国籍 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bxs-flag" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input v-model="form.country" placeholder="国籍">
                    </vs-input>
                </div>

                <!-- 歌手类型 -->
                <div class="form-list" style="margin: 6px 0;">
                    <vs-avatar size="34">
                        <i class="bx bxs-label" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-select placeholder="歌手类型" v-model="form.sex">
                        <vs-option label="男歌手" value="男歌手">
                            男歌手
                        </vs-option>
                        <vs-option label="女歌手" value="女歌手">
                            女歌手
                        </vs-option>
                    </vs-select>
                </div>

                <!-- 生日 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bxs-cake" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input type="date" v-model="form.birthday" placeholder="生日">
                    </vs-input>
                </div>


            </div>
            <template #footer>
                <div class="footer-dialog">
                    <vs-button>
                        确认
                    </vs-button>
                    <vs-button border dark>
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog blur v-model="dialog_remove" not-center prevent-close>
            <template #header>
                <h4 class="not-margin">
                    <b>确认删除歌手信息</b>
                </h4>
            </template>

            <div class="con-form">
                <div class="message">
                    <p>删除歌手将无法找回!</p>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button>
                        确认
                    </vs-button>
                    <vs-button border dark>
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
import { getsinger, uploadsinger, addsinger, editsinger, deletesinger } from '@/api/music/music_singer'
export default {
    name: 'Component_singer',
    data() {
        return {
            search: '',
            allCheck: false,
            page: 1,
            max: 7,
            selected: [],
            data: [{}],
            dialog_type: '',
            dialog_title: '',
            dialog_add_edit: false,
            dialog_remove: false,
            dialog_intro: false,
            intro: '',
            form: {
                name: '',
                photo: '',
                sex: '',
                intor: '',
                country: '',
                label: '',
                birthday: ''
            },
        }
    },
    created() {
        this.get_singer()
    },
    methods: {
        get_singer() {
            getsinger().then(res => {
                this.data = res.data.obj.records
            })
        },
        showAddSingerDia() {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = "";
            });
            this.dialog_type = 'add'
            this.dialog_title = '添加歌手信息'
            this.dialog_add_edit = true
        },
        showEditSingerDia() {
            if (this.selected.length <= 0) {
                this.$vs.notification({
                    color: "warn",
                    position: "top-center",
                    text: "请勾选一条数据",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-error'></i>`,
                });
            } else if (this.selected.length > 1) {
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
                this.form = Object.assign(this.form, {
                    name: this.selected[0].name,
                    photo: this.selected[0].photo,
                    sex: this.selected[0].sex,
                    intor: this.selected[0].intor,
                    country: this.selected[0].country,
                    label: this.selected[0].label,
                    birthday: this.selected[0].birthday,
                });
                this.dialog_title = '修改歌手信息'
                this.dialog_type = 'edit'
                this.dialog_add_edit = true
            }
        },
        showUplaodSingerDia() {
            this.$refs.file_singer.click()
        },
        upload_singer(event) {
            const file = new FormData()
            file.append('singer', event.target.files[0])
            uploadsinger(file).then(res => {
                this.form.photo = res.data.url
            })
        },
        add_edit_singer(type) {
            if (type === "add") {
                addsinger(this.form).then(res => {
                    this.get_singer()
                    this.dialog_add_edit = false
                    this.$vs.notification({
                        color: "success",
                        position: "top-center",
                        text: "添加成功",
                        duration: "4000",
                        square: true,
                        flat: true,
                        icon: `<i class='bx bx-check'></i>`,
                    });
                })
            } else {
                editsinger(this.dialog_add_edit.form, this.user_table.selected[0].u_id).then(res => {
                    this.get_singer()
                    this.dialog_add_edit = false
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
        showDeleteSingerDia() { },
        delete_singer() { }
    }

}
</script>
<style lang="less" scoped>
@import 'M_compontent.less';
</style>