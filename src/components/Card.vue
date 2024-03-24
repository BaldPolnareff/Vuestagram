<script lang="ts" setup>
import { HeartOutlined, HeartFilled, CommentOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { defineProps, ref, onMounted } from 'vue';
import type { UserPost, User } from '@/utils';
import { supabase } from '@/supabase';
import CardWithCarousel from './CardWithCarousel.vue';


const props = defineProps<{
    post: UserPost, 
}>();

const publicFileBucketBaseUrl: string = 'https://scspgajzrecjkjevzmcb.supabase.co/storage/v1/object/public/media/';
const assetsFileBucketBaseUrl: string = 'https://scspgajzrecjkjevzmcb.supabase.co/storage/v1/object/sign/assets/';
const defaultAvatarUrl: string = `${assetsFileBucketBaseUrl}/default_avatar.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvZGVmYXVsdF9hdmF0YXIuanBlZyIsImlhdCI6MTcxMTIxNjI0OCwiZXhwIjoyMDI2NTc2MjQ4fQ.aB_GUKn7RQ7IUVG41n-BYvGO5yq6S_DUn21ULhsfON4`;


const user = ref<User | null>(null);

async function fetchUserFromPost() {
    const {data: userData} =  await supabase 
        .from('users')
        .select()
        .eq('id', props.post.owner_id)
        .single()
        
    if (userData) {
        user.value = userData;
    }
}

onMounted(() => {
    fetchUserFromPost();
})
</script>

<template>
    <a-card hoverable style="width: 300px" class="card" v-if="props.post.urls.length === 1">
        <template #cover>
            <img
                alt="example"
                :src="`${publicFileBucketBaseUrl}${props.post.urls[0]}`"
            />
            
        </template>
        <template #actions>
            <HeartOutlined key="heart-outlined" />
            <CommentOutlined key="comment-outlined" />
            <ellipsis-outlined key="ellipsis" />
        </template>
        <a-card-meta :title="user?.username" :description="props.post.caption">
            <template #avatar>
                <a-avatar :src="defaultAvatarUrl" />
            </template>
        </a-card-meta>
    </a-card>
    <CardWithCarousel 
        v-else 
        :imgUrls="props.post.urls"
        :title="user?.username"
        :description="props.post.caption ? props.post.caption : ''"
        :avatarUrl="defaultAvatarUrl"
    />
</template>

<style scoped>
card {
    margin-bottom: 20px;
}
</style>


