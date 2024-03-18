<script lang="ts" setup>
import { HeartOutlined, HeartFilled, CommentOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { defineProps } from 'vue';
import type { UserPost } from '@/utils';

defineProps({
    post: {
        type: Object as () => UserPost,
        required: true
    }
});
</script>

<template>
    <a-card hoverable style="width: 300px" class="card">
        <template #cover>
            <img
                alt="example"
                :src="post.imgUrl"
            />
        </template>
        <template #actions>
            <HeartOutlined key="heart-outlined" />
            <CommentOutlined key="comment-outlined" />
            <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta :title="post.username" :description="post.caption">
            <template #avatar>
                <a-avatar :src="post.imgUrl" />
            </template>
        </a-card-meta>
    </a-card>
</template>

<style scoped>
card {
    margin-bottom: 20px;
}
</style>


