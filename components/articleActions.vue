<template>
  <div class="article-actions">
    <!-- 文章是当前用户 编辑、删除 -->
    <span v-if="canModify">
      <!-- 文章编辑 -->
      <nuxt-link
        class="btn btn-sm btn-outline-secondary"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug
          }
        }">
        <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
      </nuxt-link>
      <span>&nbsp;&nbsp;</span>
      <!-- 删除 -->
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
      </button>
    </span>

    <!-- 文章不是当前用户 关注作者 点赞文章 -->
    <span v-else>
      <!-- 关注作者 -->
      <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
        <i class="ion-plus-round"></i> <span>&nbsp;</span>
        <span v-text="followUserLabel" />
        <!-- 作者名 -->
      </button>
      <span>&nbsp;&nbsp;</span>
      <!-- 点赞 -->
      <button
        class="btn btn-sm"
        @click="toggleFavorite"
        :class="toggleFavoriteButtonClasses"
      >
        <i class="ion-heart"></i> <span>&nbsp;</span>
        <span v-text="favoriteArticleLabel" /> <span>&nbsp;</span>
        <span class="counter">
          {{article.favoritesCount}}
        </span>
      </button>

    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import ArticleActions from '@/components/articleActions.vue'
import { favoriteArticle, unFavoriteArticle, deleteArticle } from '@/api/article';
import { followUser, unFollowUser } from '@/api/profile';
export default {
  name: 'articleActions',
  props: {
    article: {
      type: Object,
      required: true
    },
    canModify: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // 关注作者切换
    async toggleFollow() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      if (!this.article.following) {
        const { data } = await followUser({
          slug: this.article.slug
        })
        this.article.following = true
      } else {
        const { data } = await unFollowUser({
          slug: this.article.slug
        })
        this.article.following = false
      }
    },
    // 关注文章切换
    async toggleFavorite() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }
      // todo
      this.article.favoriteDisable = true
      if (!this.article.favorited) {
        const { data } = await favoriteArticle({
          slug: this.article.slug
        })
        this.article.favorited = true
      } else {
        const { data } = await unFavoriteArticle({
          slug: this.article.slug
        })
        this.article.favorited = false
      }
      this.article.favoriteDisable = false
    },
    // 删除文章
    async deleteArticle() {
      const { data } = await deleteArticle({
        slug: this.article.slug
      })
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user']),
    followUserLabel() {
      return `${this.article.author.following ? "Unfollow" : "Follow"} ${
        this.article.author.username
      }`;
    },
    favoriteArticleLabel() {
      return this.article.favorited ? "Unfavorite Article" : "Favorite Article";
    },
    toggleFavoriteButtonClasses() {
      return {
        "btn-primary": this.article.favorited,
        "btn-outline-primary": !this.article.favorited
      };
    },
  }
}
</script>

<style>

</style>