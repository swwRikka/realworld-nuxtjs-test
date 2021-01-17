<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="publishArticle">
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" v-model="article.tags" :disabled="slug" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button :disabled="saveLoading" class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, createArticle, updateArticle } from '@/api/article';
import MarkdownIt from 'markdown-it'
export default {
  middleware: ['authMiddleware'],
  name: "EditorPage",
  data() {
    return {
      saveLoading: false,
      slug: '',
      article: {}
    }
  },
  methods: {
    async articleDetail() {
      const { data } = await getArticleDetail({
        slug: this.slug
      })
      this.article = data.article
    },
    async publishArticle() {
      this.saveLoading = true
      if (!this.slug) {
        this.article.tags = this.article.tags || ''
        const tagList = this.article.tags.split(',')
        const param = {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
        }
        console.log(tagList)
        if (tagList && tagList.length > 0) {
          param.tagList = tagList
        }
        const { data } = await createArticle(param)
        this.$router.replace({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } else {
        const { data } = await updateArticle(this.slug, {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body
        })
        this.$router.replace({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      }
      this.saveLoading = false
    }
  },
  mounted() {
    this.slug = this.$route.params.slug
    if (this.slug) {
      this.articleDetail()
    }
  }
}
</script>

<style>

</style>