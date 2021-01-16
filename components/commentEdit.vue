<template>
  <div>
    <form @submit.prevent="onSubmit(slug, comment)" class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" v-model="comment" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { createComment } from '@/api/comment';
export default {
  props: {
    slug: {
      type: String
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async onSubmit(slug, comment) {
      await createComment(
        this.slug, {
          comment: {
            body: comment
          }
        }
      )
      this.comment = ''
      this.$emit('getCommentList')
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>