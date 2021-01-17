<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <!-- 用户关注文章 -->
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }">Your Feed</nuxt-link>
              </li>
              <!-- 系统文章 -->
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }">Global Feed</nuxt-link>
              </li>
              <!-- 标签文章 -->
              <li v-if="tag" class="nav-item active">
                <nuxt-link 
                  :class="{
                    active: tab === 'tag'
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }">#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <template v-if="articlesLoading">Loading articles...</template>
          <template>
            <template v-if="articles && articles.length > 0">
              <articleView v-for="article in articles" :key="article.slug" :article="article" >
              </articleView>
            </template>
            <div class="article-preview" v-else>No articles are here... yet.</div>
          </template>

          <!-- 分页 -->
          <ul class="pagination">
            <li
              v-for="item in totalPage"
              :key="item"
              :class="{
                active: item === page
              }"
              class="page-item">
              <nuxt-link class="page-link" :to="{
                name: 'home',
                query: {
                  page: item,
                  tag: $route.query.tag,
                  tab: tab
                }
              }">{{ item }}</nuxt-link>
            </li>
          </ul>

        </div>

        <!-- 标签 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag'
                  }
                }"
                class="tag-pill tag-default">
                {{tag}}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import articleView from '@/components/article'
import { getArticles, getFeedArticles } from '@/api/article'
import { getTags } from '@/api/tags'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({ store, query }) {
    const page = parseInt(query.page || 1)
    const limit = 10
    const tag = query.tag || ''
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed'
    ? getFeedArticles
    : getArticles
    let articlesLoading = true
    const [articlesData, tagsData] = await Promise.all([
      loadArticles({
        limit,
        tag,
        offset: (page - 1) * limit
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesData.data || []
    const { tags } = tagsData.data || []
    articles.forEach(item => item.favoriteDisable = false)
    articlesLoading = false
    return {
      articles: articles,
      articlesCount: articlesCount,
      page,
      limit,
      tags,
      tag,
      tab,
      articlesLoading
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
  },
  components: {
    articleView
  }
}
</script>

<style>

</style>