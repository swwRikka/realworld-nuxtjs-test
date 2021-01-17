<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <!-- 文章详情操作 点赞和关注 -->
    <article-actions
      v-if="actions"
      :canModify="isCurrentUser"
      :article="article">
    </article-actions>
    <!-- 首页文章列表点赞 -->
    <button
      v-else
      @click="onFavorite(article)"
      class="btn btn-outline-primary btn-sm pull-xs-right"
      :disabled="article.favoriteDisable"
      :class="{
        active: article.favorited
      }">
      <i class="ion-heart"></i> {{ article.favoritesCount }}
    </button>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import articleActions from '@/components/articleActions';
import { favoriteArticle, unFavoriteArticle } from '@/api/article';
export default {
  name: 'articleMeta',
  props: {
    article: {
      type: Object,
      required: true
    },
    actions: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    async onFavorite(article) {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      article.favoriteDisable = true
      if (article.favorited) {
        // 取消点赞
        const { data } = await unFavoriteArticle({
          slug: article.slug
        })
        article.favoritesCount--
        article.favorited = false
      } else {
        // 点赞
        const { data } = await favoriteArticle({
          slug: article.slug
        })
        article.favoritesCount++
        article.favorited = true
      }
      article.favoriteDisable = false
    }
  },
  components: {
    articleActions
  },
  computed: {
    isCurrentUser() {
      if (this.user && this.user.username && this.article.author.username) {
        return this.user.username === this.article.author.username;
      }
      return false;
    },
    ...mapState(['user'])
  }
}
</script>

<style>

</style>