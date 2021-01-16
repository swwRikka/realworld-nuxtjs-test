<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateSettings()">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" v-model="userInfo.image" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" v-model="userInfo.username" maxlength="20" minlength="1" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" v-model="userInfo.bio" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" v-model="userInfo.email" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" v-model="userInfo.password" minlength="8" type="text" placeholder="New Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { updateUser } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: ['authMiddleware'],
  name: 'SettingPage',
  methods: {
    async updateSettings() {
      const { data } = await updateUser({
        user: this.userInfo
      })
      Cookie.set('user', JSON.stringify(data.user))
      this.$store.commit('setUser', data.user)
      this.$router.push({
        path: `/profile/${data.user.username}`,
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    userInfo() {
      return Object.assign({}, this.currentUser)
    }
  }
}
</script>

<style>

</style>