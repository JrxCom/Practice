<template>
    <div class="song">
        <div class="btns">
            <vs-button success relief @click="showAddSongDia()">
                <i class='bx bxs-message-alt-add'></i>添加歌曲
            </vs-button>
            <vs-button warn relief @click="showEditSongDia()">
                <i class='bx bxs-message-alt-edit'></i>修改歌曲信息
            </vs-button>
            <vs-button danger relief @click="showDeleteSongDia()">
                <i class='bx bxs-message-alt-x'></i>删除歌曲
            </vs-button>
        </div>

        <vs-input v-model="search" placeholder="搜索歌曲" state="primary">
            <template #icon>
                <i class='bx bx-search-alt'></i>
            </template>
        </vs-input>


        <div class="table">
            <vs-table v-model="selected" striped>
                <template #thead>
                    <vs-tr>
                        <vs-th>
                            <vs-checkbox :indeterminate="selected.length == data.length" v-model="allCheck"
                                @change="selected = $vs.checkAll(selected, data)" />
                        </vs-th>
                        <vs-th>
                            歌曲Id
                        </vs-th>
                        <vs-th>
                            歌曲名称
                        </vs-th>
                        <vs-th>
                            歌手
                        </vs-th>
                        <vs-th>
                            时长
                        </vs-th>
                        <vs-th>
                            歌词
                        </vs-th>
                        <vs-th>
                            发行时间
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
                            {{ tr.singer }}
                        </vs-td>
                        <vs-td>
                            {{ tr.duration }}
                        </vs-td>
                        <vs-td>
                            {{ tr.lyric }}
                            <vs-avatar v-if="tr.lyric_path">
                                <i class='bx bxs-checkbox-checked'></i>
                            </vs-avatar>
                            <vs-avatar v-else>
                                <i class='bx bxs-x-square'></i>
                            </vs-avatar>
                        </vs-td>
                        <vs-td>
                            {{ tr.creat_time }}
                        </vs-td>

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
                <!-- 歌曲名称 -->
                <div class="form-list">
                    <vs-avatar size="34">
                        <i class="bx bx-paint" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-input v-model="form.name" placeholder="歌曲名称">
                    </vs-input>
                </div>

                <!-- 歌手 -->
                <div class="form-list" style="margin: 6px 0;">
                    <vs-avatar size="34">
                        <i class="bx bxs-user-circle" style="font-size: 16px"></i>
                    </vs-avatar>
                    <vs-select placeholder="歌手" v-model="selectVal" filter @change="changeSinger()">
                        <vs-option v-for="(item, index) in singer_select" :key="index" :label="item.name"
                            :value="item.id + item.name">
                            {{ item.name }}
                        </vs-option>
                    </vs-select>
                </div>

                <!-- 歌曲上传 -->
                <vs-button block dark border v-if="form.song_path">
                    <i class='bx bxs-music'></i> <i class='bx bx-check'></i>
                </vs-button>
                <vs-button block dark border animation-type="vertical" @click="showUplaodSongDia()" v-else>
                    歌曲上传
                    <template #animate>
                        <i class='bx bxs-music'></i>
                    </template>
                </vs-button>
                <input type="file" ref="file_song" accept=".mp3" style="display: none" @change="upload_song($event)">


                <!-- 歌词上传 -->
                <vs-button block dark border v-if="form.lyric_path">
                    <i class='bx bx-file'></i> <i class='bx bx-check'></i>
                </vs-button>
                <vs-button block dark border animation-type="vertical" @click="showUplaodLyricDia()" v-else>
                    歌词上传
                    <template #animate>
                        <i class='bx bx-file'></i>
                    </template>
                </vs-button>
                <input type="file" ref="file_lyric" accept=".lrc" style="display: none" @change="upload_lyric($event)">
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="add_edit_song(dialog_type)">
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
                    <b>确认删除歌曲</b>
                </h4>
            </template>

            <div class="con-form">
                <div class="message">
                    <p>删除歌曲将无法找回!</p>
                </div>
            </div>

            <template #footer>
                <div class="footer-dialog">
                    <vs-button @click="delete_song()">
                        确认
                    </vs-button>
                    <vs-button border dark @click="dialog_delete = false">
                        取消
                    </vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
import { getsong, selectsinger, uploadsong, uploadlyric, addsong, editsong, deletesong } from '@/api/music/music_song'
export default {
    name: 'Component_song',
    data() {
        return {
            search: '',
            allCheck: false,
            page: 1,
            max: 6,
            selected: [],
            data: [{}],
            singer_select: [],
            selectVal: '',
            form: {
                name: '',
                s_id: '',
                singer: '',
                song_path: '',
                lyric_path: '',
                duration: ''
            },
            dialog_title: '',
            dialog_type: '',
            dialog_add_edit: false,
            dialog_delete: false,
            form_add_edit: {},
        }
    },
    created() {
        this.get_song()
        this.get_singer_select()
    },
    methods: {
        get_song() {
            getsong().then(res => {
                this.selected = []
                this.data = res.data.obj.records
            })
        },
        get_singer_select() {
            selectsinger().then(res => {
                this.singer_select = res.data.obj.records
            })
        },
        changeSinger() {
            this.form.singer = this.selectVal.slice(9)
            this.form.s_id = this.selectVal.slice(0, 9)
        },
        showAddSongDia() {
            if (this.singer_select.length == 0) {
                this.$vs.notification({
                    color: "warn",
                    position: "top-center",
                    text: "还未添加歌手信息!",
                    duration: "4000",
                    square: true,
                    flat: true,
                    icon: `<i class='bx bx-error'></i>`,
                });
            } else {
                Object.keys(this.form).forEach((key) => {
                    this.form[key] = "";
                });
                this.selectVal = ''
                this.dialog_title = '添加歌曲信息'
                this.dialog_type = 'add'
                this.dialog_add_edit = true
            }
        },
        showEditSongDia() {
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
                console.log(this.selected[0], 'this.selected[0]');
                this.form = Object.assign(this.form, {
                    name: this.selected[0].name,
                    song_path: this.selected[0].song_path,
                    lyric_path: this.selected[0].lyric_path,
                    duration: this.selected[0].duration,
                });
                this.selectVal = this.selected[0].s_id + this.selected[0].singer
                this.dialog_title = '修改歌手信息'
                this.dialog_type = 'edit'
                this.dialog_add_edit = true
            }
        },
        showUplaodSongDia() {
            this.$refs.file_song.click()
        },
        upload_song(event) {
            const file = new FormData()
            file.append('song', event.target.files[0])
            uploadsong(file).then(res => {
                this.form.song_path = res.data.url
                this.form.duration = res.data.duration
            })
        },
        showUplaodLyricDia() {
            this.$refs.file_lyric.click()
        },
        upload_lyric(event) {
            const file = new FormData()
            file.append('lyric', event.target.files[0])
            uploadlyric(file).then(res => {
                this.form.lyric_path = res.data.url
            })
        },
        add_edit_song(type) {
            if (type === "add") {
                addsong(this.form).then(res => {
                    this.get_song()
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
                editsong(this.form, this.selected[0].id).then(res => {
                    this.get_song()
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
        showDeleteSongDia() {
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
                this.dialog_delete = true
            }
        },
        delete_song() {
            let id_group = []
            this.selected.find(i => {
                id_group.push(i.id)
            })
            deletesong({ id: id_group.join() }).then(res => {
                this.get_song()
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
        }
    }

}
</script>
<style lang="less" scoped>
@import 'M_compontent.less';
</style>