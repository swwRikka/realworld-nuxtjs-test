<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img" />
            <h4>{{userProfile.username}}</h4>
            <p>
              {{userProfile.bio}}
            </p>
            <button :disabled="followingLoading" v-if="!isCurrentUser" class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
              <i class="ion-plus-round"></i> <span>&nbsp;</span>
              <span v-text="followUserLabel" />
            </button>
          </div>

        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span class="nav-link"
                  :class="{
                    active: !favorites
                  }"
                  @click="$router.push(`/profile/${userProfile.username}`)"
                >My Artices</span>
              </li>
              <li class="nav-item">
                <span class="nav-link"
                  :class="{
                    active: favorites
                  }"
                  @click="$router.push(`/profile/${userProfile.username}/favorites`)"
                >Favorited Artices</span>
              </li>
            </ul>
          </div>
          <template v-if="articleLoading">
            <div class="article-preview">Loading articles...</div>
          </template>
          <template v-else>
            <template v-if="articles && articles.length > 0">
              <articleView v-for="article in articles" :key="article.slug" :article="article" >
              </articleView>
              <!-- 分页 -->
              <ul class="pagination">
                <li
                  v-for="item in totalPage"
                  :key="item"
                  :class="{
                    active: item === page
                  }"
                  class="page-item">
                  <span class="page-link" @click="userArticle(item)">{{ item }}</span>
                </li>
              </ul>
            </template>
            <div class="article-preview" v-else>No articles are here... yet.</div>
          </template>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import articleView from '@/components/article'
import { mapState } from 'vuex'
import { getUserProfiles, followUser, unFollowUser } from '@/api/profile'
import { getArticles } from '@/api/article'
export default {
  middleware: ['authMiddleware'],
  name: 'UserProfile',
  data() {
    return {
      followingLoading: false,
      articleLoading: false,
      favorites: false,
      articles: [],
      articlesCount: 0,
      limit: 5,
      page: 1,
      userProfile: {}
    }
  },
  methods: {
    async userProfiles() {
      const { data } = await getUserProfiles({
        username: this.$route.params.username
      })
      console.log('userProfiles', data.profile)
      this.userProfile = data.profile
      this.userArticle(1)
    },
    async toggleFollow() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      this.followingLoading = true
      if (!this.userProfile.following) {
        const { data } = await followUser({
          username: this.userProfile.username
        })
        this.userProfile.following = true
      } else {
        const { data } = await unFollowUser({
          username: this.userProfile.username
        })
        this.userProfile.following = false
      }
      this.followingLoading = false
    },
    async userArticle(pageParam) {
      this.page = parseInt(pageParam || 1)
      const param = {
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }
      if (this.favorites) {
        param.favorited = this.userProfile.username
      } else {
        param.author = this.userProfile.username
      }
      this.articleLoading = true
      const { data } = await getArticles(param)
      this.articles = data.articles
      this.articlesCount = data.articlesCount
      this.articleLoading = false
    }
  },
  watch: {
    '$route.path'(val) {
      this.favorites = /favorites$/.test(val)
      this.userProfiles()
    }
  },
  mounted() {
    this.favorites = /favorites$/.test(this.$route.path)
    this.userProfiles()
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    followUserLabel() {
      return `${this.userProfile.following ? "Unfollow" : "Follow"} ${
        this.userProfile.username
      }`;
    },
    isCurrentUser() {
      if (this.user && this.user.username && this.userProfile.username) {
        return this.user.username === this.userProfile.username;
      }
      return false;
    },
    toPageUrl() {
      return this.favorites ? `/profile/${this.userProfile.username}/favorites` : `/profile/${this.userProfile.username}`
    }
  },
  components: {
    articleView,
  }
}
</script>

<style>

</style>