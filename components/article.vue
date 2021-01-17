<template>
  <div class="article-preview">
    <article-metaView :article="article"></article-metaView>
    <nuxt-link
      :to="{
        name: 'article',
        params: {
          slug: article.slug
        }
      }" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </nuxt-link>  
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { favoriteArticle, unFavoriteArticle } from '@/api/article'
import articleMetaView from '@/components/articleMeta'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
  },
  components: {
    articleMetaView
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>