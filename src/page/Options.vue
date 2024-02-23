<template>
  <div class="container-fluid">
    <spinner-modal ref="spinnerModal"></spinner-modal>
    <div class="card mt-3">
      <div class="card-header">
        服务端设置
      </div>
      <div class="card-body">
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="非必填:User Agent" v-model="config.user_agent">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="非必填:图书馆Cookie,游客cookie即可" v-model="config.library_cookie">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="非必填:公交车Cookie,游客cookie即可" v-model="config.bus_cookie">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="非必填:代理:示范：http://localhost:8030 或 socks5://user:pass@host:port" v-model="config.proxy">
        </div>
        <div class="mb-3">
          <label class="form-label">下载路径(与下载分类二选一)</label>
          <select class="form-select" v-model="config.download_path">
            <option v-for="(path,index) in media_path_list" :value="path.download_path" :key="index">{{ path.download_path }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="下载分类(与下载路径二选一)" v-model="config.category">
        </div>
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="非必填:限制最大体积" v-model="config.max_size">
          <span class="input-group-text">MB</span>
        </div>
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="非必填:限制最小体积" v-model="config.min_size">
          <span class="input-group-text">MB</span>
        </div>
        <div class="mb-3">
          <label class="form-label">站点(必填)</label>
          <select class="form-select" multiple v-model="site_id">
            <option v-for="(site,index) in site_list" :value="site" :key="index">{{ site }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">飞天拉面神教(非必填)</label>
          <input type="text" class="form-control" placeholder="token" v-model="config.fsm_token">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="passkey" v-model="config.fsm_passkey">
        </div>
        <div class="mb-3 row g-2">
          <div class="col-8">
            <input type="text" class="form-control" placeholder="salt(盐值)" v-model="config.fsm_salt">
          </div>
          <div class="col-4">
            <button class="btn btn-primary" @click="getSalt">获取盐值</button>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">推送用户(非必填)</label>
          <select class="form-select" multiple v-model="msg_uid">
            <option v-for="(user,index) in user_list" :value="user.uid" :key="index">{{ user.nickname }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">推送通道(非必填)</label>
          <select class="form-select" multiple v-model="msg_channel">
            <option v-for="(channel,index) in channel_list" :value="channel.name" :key="index">{{ channel.name }}
            </option>
          </select>
        </div>
        <toast ref="toast"></toast>
        <div class="mb-3">
          <label class="form-label">下载器(必填)</label>
          <select class="form-select" v-model="config.download_client_name">
            <option v-for="(client,index) in download_client_list" :value="client.name" :key="index">{{ client.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">媒体服务器配置，用于同步数据库</label>
          <input type="text" class="form-control" placeholder="emby配置中小姐姐目录,多个目录用逗号分隔" v-model="config.emby_folders">
        </div>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="plex小姐姐媒体库名称(非目录),多个媒体库用逗号分隔" v-model="config.plex_titles">
        </div>
        <div class="mb-3">
        </div>
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" v-model="only_chinese">
          <label class="form-check-label" for="flexSwitchCheckDefault">中文爱好者</label>
        </div>
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" v-model="auto_sub">
          <label class="form-check-label" for="flexSwitchCheckDefault">自动订阅top20</label>
        </div>
        <div>
          <button class="btn btn-primary mb-3" @click="saveConfig">保存配置</button>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        客户端设置
      </div>
      <div class="card-body">
        <div class="mb-3 form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" v-model="showImage" @change="changeImageMode">
          <label class="form-check-label" for="flexSwitchCheckDefault">有图模式</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getConfig, setConfig, getSite, getUser, getChannel, getDownloadClient, getMediaPath} from "../api/api";
import Toast from "../components/Toast.vue";
import get_salt from "../utils/salt";

export default {
  name: "Options",
  components:[Toast],
  data() {
    return {
      showImage: localStorage.getItem('showImage'),
      darkTheme: localStorage.getItem('xx_theme') === 'dark',
      site_id: [],
      msg_uid: [],
      msg_channel: [],
      only_chinese: false,
      auto_sub: false,
      site_list: [],
      user_list: [],
      download_client_list: [],
      channel_list: [],
      media_path_list:[],
      config: {
        proxy: '',
        user_agent: '',
        library_cookie: '',
        bus_cookie: '',
        download_path: '',
        category: '',
        site_id: '',
        fsm_token: '',
        fsm_passkey: '',
        fsm_salt: '',
        only_chinese: '',
        auto_sub: '',
        max_size: '',
        min_size: '',
        download_client_name: '',
        channel: '',
        msg_uid: '',
        msg_channel: '',
        msg_img: '',
        emby_folders: '',
        plex_titles: ''
      }
    }
  },
  async mounted() {
    await this.getOptions()
    await this.getConfig()
  },
  methods: {
    getSalt() {
      const salt = get_salt()
      this.config.fsm_salt = salt
    },
    async getOptions() {
      let siteRes = await getSite()
      this.site_list = siteRes.data
      let userRes = await getUser()
      this.user_list = userRes.data
      let channelRes = await getChannel()
      this.channel_list = channelRes.data
      let downloadRes = await getDownloadClient()
      this.download_client_list = downloadRes.data
      let mediaPathRes = await getMediaPath()
      this.media_path_list = mediaPathRes.data
    },
    async getConfig() {
      let res = await getConfig()
      if (res.code === 200 && res.data) {
        this.config = res.data
        this.site_id = this.config.site_id.split(',')
        this.msg_uid = this.config.msg_uid.split(',')
        this.msg_channel = this.config.msg_channel.split(',')
        this.only_chinese = this.config.only_chinese === 1
        this.auto_sub = this.config.auto_sub === 1
      }
    },
    async saveConfig() {
      this.$refs.spinnerModal.show()
      this.config.site_id = this.site_id.join(',')
      this.config.msg_uid = this.msg_uid.join(',')
      this.config.msg_channel = this.msg_channel.join(',')
      this.config.only_chinese = this.only_chinese ? 1 : 0
      this.config.auto_sub = this.auto_sub ? 1 : 0
      if(this.config.max_size){
        this.config.max_size = parseInt(this.config.max_size)
      }
      if (this.config.min_size){
        this.config.min_size = parseInt(this.config.min_size)
      }
      let res = await setConfig(this.config)
      this.$refs.spinnerModal.hide()
      if (res.code === 200) {
        this.$refs.toast.show("保存成功")
        await this.getConfig()
      }else {
        this.$refs.toast.show("保存失败")
      }
    },
    changeImageMode() {
      if (this.showImage) {
        localStorage.setItem('showImage', this.showImage)
      } else {
        localStorage.removeItem('showImage')
      }
    },
  }
}
</script>

<style scoped>

</style>