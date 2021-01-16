<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <articleMetaView :article="article" :actions="true"></articleMetaView>

      </div>
    </div>
    <div class="container page">
      
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />
      <div class="article-actions">
        <articleMetaView :article="article" :actions="true"></articleMetaView>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 发布评论区 -->
          <commentEdit
            v-if="user"
            :slug="slug"
            @getCommentList="getCommentList"
          ></commentEdit>
          <p v-else>
            <nuxt-link :to="{ name: 'login' }">Sign in</nuxt-link>
            or
            <nuxt-link :to="{ name: 'register' }">sign up</nuxt-link>
            to add comments on this article.
          </p>
          <!-- 评论区 -->
          <articlCommentView
            v-for="(comment, index) in comments"
            :slug="slug"
            :comment="comment"
            :key="index"
            @getCommentList="getCommentList"
          ></articlCommentView>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
import { getArticleDetail } from '@/api/article'
import { getArticleComment, createComment, deleteComment } from '@/api/comment'
import articlCommentView from '@/components/articlComment';
import articleMetaView from '@/components/articleMeta'
import commentEdit from '@/components/commentEdit';
import MarkdownIt from 'markdown-it'
import {mapState} from 'vuex';
export default {
  name: 'ArticlePage',
  async asyncData({params}) {
    const [activeData, commentsData] = await Promise.all([
      getArticleDetail({
        slug: params.slug
      }),
      getArticleComment({
        slug: params.slug
      })
    ])
    const md = new MarkdownIt()
    const { article } = activeData.data || {}
    article.body = md.render(article.body)
    const { comments } = commentsData.data || []
    return {
      article,
      comments,
      slug: params.slug
    }
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description', name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  methods: {
    async getCommentList() {
      const { data } = await getArticleComment({
        slug: this.slug
      })
      this.comments = data.comments || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {
    articlCommentView,
    articleMetaView,
    commentEdit
  }
}
</script>

<style>

</style>