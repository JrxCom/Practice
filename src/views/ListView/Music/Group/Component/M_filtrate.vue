<template>
    <div class="filtrate">
        <div class="btns">
            <vs-button success relief @click="showAddFiltrateDia()">
                <i class='bx bxs-message-alt-add'></i>添加歌单类别
            </vs-button>
            <vs-button warn relief @click="showEditFiltrateDia()">
                <i class='bx bxs-message-alt-edit'></i>修改歌单类别
            </vs-button>
            <vs-button danger relief @click="showDeleteFiltrateDia()">
                <i class='bx bxs-message-alt-x'></i>删除歌单类别
            </vs-button>
            <vs-button color="#3BDEC7" relief @click="showAddLabelDia()">
                <i class='bx bx-plus'></i>添加子标签
            </vs-button>
        </div>
        <vs-input v-model="search" placeholder="搜索标签" state="primary">
            <template #icon>
                <i class='bx bx-search-alt'></i>
            </template>
        </vs-input>
        <div class="table">
            <vs-table v-model="selected" striped>
                <template #thead>
                    <vs-tr>
                        <vs-th style="width: 20px;">
                            <vs-checkbox :indeterminate="selected.length == data.length" v-model="allCheck"
                                @change="selected = $vs.checkAll(selected, data)" />
                        </vs-th>
                        <vs-th>
                            <p>标签名称</p>
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
                            {{ tr.name }}
                        </vs-td>
                        <template #expand>
                            <div class="con-content">
                                <div style="display: flex;align-items: center;">
                                    <div class="tag" v-for="(item, index) in tr.chidren" :key="index">
                                        <p>{{ item.name }}</p>
                                        <div>
                                            <i class='bx bxs-edit' style="color: #FFF;font-size: 20px;"
                                                @click="showEditLabelDia(item.name, item.id)"></i>
                                            <i class='bx bxs-x-square' style="color: #FFF;font-size: 20px;"
                                                @click="showDeleteLabelDia(item.id)"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </vs-tr>
                </template>
                <template #footer>
                    <div style="height: 6px;"></div>
                </template>
            </vs-table>
        </div>
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
                <!-- 标签名称 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bxs-box" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input v-model="parent" placeholder="标签名称">
                    </vs-input>
                </div>
            </div>
            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="add_edit_filtrate(dialog_type)">
                        确认
                    </vs-button>
                    <vs-button border dark @click="dialog_add_edit = false">
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog blur v-model="dialog_delete" not-center prevent-close>
            <template #header>
                <h4 class="not-margin">
                    <b>确认删除类别?</b>
                </h4>
            </template>

            <div class="con-form">
                <div class="message">
                    <p>删除类别将无法找回!</p>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="delete_filtrate()">
                        确认
                    </vs-button>
                    <vs-button border dark @click="dialog_delete = false">
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog blur v-model="dialog_add_edit_child" not-center prevent-close auto-width>
            <template #header>
                <h4 class="not-margin">
                    <b>{{ dialog_title_child }}</b>
                </h4>
            </template>

            <div class="con-form">
                <!-- 标签名称 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bxs-file-blank" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input v-model="child" placeholder="标签名称">
                    </vs-input>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="add_edit_label(dialog_type_child)">
                        确认
                    </vs-button>
                    <vs-button border dark @click="dialog_add_edit_child = false">
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>

        <vs-dialog blur v-model="dialog_delete_child" not-center prevent-close>
            <template #header>
                <h4 class="not-margin">
                    <b>确认删除标签？</b>
                </h4>
            </template>

            <div class="con-form">
                <div class="message">
                    <p>删除子标签将无法找回!</p>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="delete_label()">
                        确认
                    </vs-button>
                    <vs-button border dark @click="dialog_delete_child = false">
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
import { getfiltrate, addfiltrate, editfiltrate, deletefiltrate } from '@/api/music/music_filtrate'
import { addlabel, editlabel, deletelabel } from '@/api/music/music_label'
export default {
    name: 'Component_user',
    data() {
        return {
            cId: '',
            search: '',
            allCheck: false,
            page: 1,
            max: 7,
            selected: [],
            data: [{}],
            dialog_add_edit: false,
            dialog_delete: false,
            dialog_type: '',
            dialog_title: '',
            parent: '',
            dialog_add_edit_child: false,
            dialog_delete_child: false,
            dialog_type_child: '',
            dialog_title_child: '',
            child: '',
        }
    },
    created() {
        this.get_filtrate()
    },
    methods: {
        get_filtrate() {
            getfiltrate().then(res => {
                this.selected = []
                this.data = res.data.obj.records
            })
        },
        showAddFiltrateDia() {
            this.parent = ''
            this.dialog_title = '添加类别'
            this.dialog_type = 'add'
            this.dialog_add_edit = true
        },
        showEditFiltrateDia() {
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
                this.parent = this.selected[0].name
                this.dialog_title = '修改类别'
                this.dialog_type = 'edit'
                this.dialog_add_edit = true
            }
        },
        add_edit_filtrate(type) {
            if (type === "add") {
                addfiltrate({ name: this.parent }).then(res => {
                    this.get_filtrate()
                    this.$vs.notification({
                        color: "success",
                        position: "top-center",
                        text: '添加成功',
                        duration: "4000",
                        square: true,
                        flat: true,
                        icon: `<i class='bx bx-check'></i>`,
                    })
                })
            } else {
                editfiltrate({ name: this.parent }, this.selected[0].id).then(res => {
                    this.get_filtrate()
                    this.$vs.notification({
                        color: "success",
                        position: "top-center",
                        text: '修改成功',
                        duration: "4000",
                        square: true,
                        flat: true,
                        icon: `<i class='bx bx-check'></i>`,
                    })
                })
            }
            this.dialog_add_edit = false;

        },
        showDeleteFiltrateDia() {
            if (this.selected.length <= 0) {
                this.$vs.notification({
                    color: "warn",
                    position: "top-center",
                    text: "请勾选删除数据",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-error'></i>`,
                });
            } else {
                this.dialog_delete = true;
            }
        },
        delete_filtrate() {
            let id_group = []
            this.selected.find(i => {
                id_group.push(i.id)
            })
            deletefiltrate({ id: id_group.join() }).then(res => {
                this.get_filtrate()
                this.dialog_delete = false;
                this.$vs.notification({
                    color: "success",
                    position: "top-center",
                    text: "删除成功",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-check'></i>`,
                });
            })
        },
        showAddLabelDia() {
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
                    text: "无法同时给多条数据添加子标签",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-error'></i>`,
                });
            } else {
                this.child = ''
                this.dialog_title_child = '添加标签'
                this.dialog_type_child = 'add'
                this.dialog_add_edit_child = true
            }
        },
        showEditLabelDia(name, id) {
            this.child = name
            this.cId = id
            this.dialog_title_child = '修改标签'
            this.dialog_type_child = 'edit'
            this.dialog_add_edit_child = true
        },
        add_edit_label(type) {
            if (type === "add") {
                addlabel({ name: this.child }, this.selected[0].id).then(res => {
                    this.get_filtrate()
                    this.$vs.notification({
                        color: "success",
                        position: "top-center",
                        text: '添加成功',
                        duration: "4000",
                        square: true,
                        flat: true,
                        icon: `<i class='bx bx-check'></i>`,
                    })
                })
            } else {
                editlabel({ name: this.child }, this.cId).then(res => {
                    this.get_filtrate()
                    this.$vs.notification({
                        color: "success",
                        position: "top-center",
                        text: '修改成功',
                        duration: "4000",
                        square: true,
                        flat: true,
                        icon: `<i class='bx bx-check'></i>`,
                    })
                })
            }
            this.dialog_add_edit_child = false;

        },
        showDeleteLabelDia(id) {
            this.dialog_delete_child = true;
            this.cId = id
        },
        delete_label() {
            deletelabel(this.cId).then(res => {
                this.get_filtrate()
                this.dialog_delete_child = false;
                this.$vs.notification({
                    color: "success",
                    position: "top-center",
                    text: "删除成功",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-check'></i>`,
                });
            })
        },
    }
}
</script>
<style lang="less" scoped>
@import 'M_compontent.less';
</style>