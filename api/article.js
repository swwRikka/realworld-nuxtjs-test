import { request } from '@/plugins/request'
// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 获取文章详情
export const getArticleDetail = params => {
  return request({
    method: 'GET',
    url: `/api/articles/${params.slug}`
  })
}

// 创建文章
export const createArticle = params => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data: params
  })
}

// 更新文章
export const updateArticle = (slug, params) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data: params
  })
}

// 删除文章
export const deleteArticle = params => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}`
  })
}

// 点赞文章
export const favoriteArticle = params => {
  console.log(params)
  return request({
    method: 'POST',
    url: `/api/articles/${params.slug}/favorite`
  })
}

// 取消点赞文章
export const unFavoriteArticle = params => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}/favorite`
  })
}