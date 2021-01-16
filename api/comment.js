import { request } from '@/plugins/request'
// 获取文章评论
export const getArticleComment = params => {
  return request({
    method: 'GET',
    url: `/api/articles/${params.slug}/comments`
  })
}
// 添加文章评论
export const createComment = (slug, params) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: params
  })
}
// 删除文章评论
export const deleteComment = params => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}/comments/${params.commentId}`
  })
}