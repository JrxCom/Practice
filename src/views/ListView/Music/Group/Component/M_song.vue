<template>
    <div class="song">
        <div class="btns">
            <vs-button success relief @click="showAddSongDia()">
                <i class='bx bxs-message-alt-add'></i>添加歌曲
            </vs-button>
            <vs-button warn relief @click="dialog_add_edit = true">
                <i class='bx bxs-message-alt-edit'></i>修改歌曲信息
            </vs-button>
            <vs-button danger relief @click="dialog_delete = true">
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
                            发行时间
                        </vs-th>
                        <vs-th>
                            时长
                        </vs-th>
                        <vs-th>
                            歌词
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
                            {{ tr.s_id }}
                        </vs-td>
                        <vs-td>
                            {{ tr.s_name }}
                        </vs-td>
                        <vs-td>
                            {{ tr.s_singer }}
                        </vs-td>
                        <vs-td>
                            {{ tr.duration }}
                        </vs-td>
                        <vs-td>
                            {{ tr.s_creatime }}
                        </vs-td>
                        <vs-td>
                            <vs-avatar v-if="tr.s_lyric">
                                <i class='bx bxs-checkbox-checked'></i>
                            </vs-avatar>
                            <vs-avatar v-else>
                                <i class='bx bxs-x-square'></i>
                            </vs-avatar>
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
                    <b>添加歌曲</b>
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
                    <vs-select placeholder="歌手" v-model="form.singer" filter>
                        <vs-option label="男" value="1">
                            男
                        </vs-option>
                    </vs-select>
                </div>

                <!-- 歌曲上传 -->
                <vs-button block dark border v-if="form.song_path">
                    <i class='bx bx-check'></i>
                </vs-button>
                <vs-button block dark border animation-type="vertical" @click="showUplaodSongDia()" v-else>
                    歌曲上传
                    <template #animate>
                        <i class='bx bx-cloud-upload'></i>
                    </template>
                </vs-button>
                <input type="file" ref="file_song" accept=".mp3" style="display: none" @change="upload_song($event)">


                <!-- 歌词上传 -->
                <vs-button block dark border v-if="form.lyric_path">
                    <i class='bx bx-check'></i>
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
                    <vs-button>
                        确认
                    </vs-button>
                    <vs-button border dark>
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
import { uploadsong, uploadlyric } from '@/api/music/music_song'
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
            form: {
                name: '',
                singer: '',
                song_path: '',
                lyric_path: '',
                duration: ''
            },
            dialog_add_type: '',
            dialog_add_edit: false,
            dialog_delete: false,
            form_add_edit: {},
        }
    },
    created() {
    },
    methods: {
        get_song() { },
        showAddSongDia() {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = "";
            });
            console.log(this.form);
            this.dialog_add_type = 'add'
            this.dialog_add_edit = true
        },
        
        showEditSongDia() { },
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
        add_edit_song() { },
        showDeleteSongDia() { },
        delete_song() { }
    }

}
</script>
<style lang="less" scoped>
@import 'M_compontent.less';
</style>