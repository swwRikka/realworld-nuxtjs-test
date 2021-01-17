<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      <router-link
        class="comment-author"
        :to="{ name: 'profile', params: { username: comment.author.username } }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ comment.createdAt | date }}</span>
      <span v-if="isCurrentUser" class="mod-options">
        <i class="ion-trash-a" @click="destroy(slug, comment.id)"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { deleteComment } from '@/api/comment';
export default {
  name: 'acticleComment',
  props: {
    slug: {
      type: String,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    isCurrentUser() {
      if (this.user && this.user.username && this.comment.author.username) {
        return this.comment.author.username === this.user.username;
      }
      return false;
    },
    ...mapState(['user'])
  },
  methods: {
    async destroy(slug, commentId) {
      await deleteComment({
        slug,
        commentId
      })
      this.$emit('getCommentList')
    }
  }
}
</script>

<style>

</style>