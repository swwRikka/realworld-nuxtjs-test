import { request } from '@/plugins/request'
// 获取用户信息
export const getUserProfiles = data => {
  return request({
    method: 'GET',
    url: `/api/profiles/${data.username}`,
  })
}

// 关注用户
export const followUser = data => {
  return request({
    method: 'POST',
    url: `/api/profiles/${data.username}/follow`,
  })
}

// 取消关注用户
export const unFollowUser = data => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${data.username}/follow`,
  })
}