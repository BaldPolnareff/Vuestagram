<script setup lang="ts">
import Card from './Card.vue';
import Observer from './Observer.vue';
import { ref, onMounted } from 'vue';
import type { UserPost, User, UserInfo } from '../utils';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';

const store = useUsersStore();

const { user: loggedUser } = storeToRefs(store);

const postData = ref<UserPost[]>([]);

const lastPostIndex = ref<number>(3);
const postsBatchSize = 3;
const ownerIds = ref<number[]>([]);
const reachedEndOfPosts = ref<boolean>(false);

async function fetchData() {
    const {data: followedUsersIds} = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', loggedUser.value?.id)

    if (followedUsersIds) {
        const owner_ids: number[] = followedUsersIds.map((user: {following_id: number}) => user.following_id);
        ownerIds.value = owner_ids;
        const {data: postsData} = await supabase
                .from('posts')
                .select()
                .in('owner_id', owner_ids)
                .range(0, lastPostIndex.value)
                .order('created_at', {ascending: false})

        if (postsData) {
            postData.value = postsData;
        }
    }
}

async function fetchNextBatch() {
    if (!reachedEndOfPosts.value) {
        const startIndex: number = lastPostIndex.value + 1;
        const { data: postsData } = await supabase
            .from('posts')
            .select()
            .in('owner_id', ownerIds.value)
            .range(startIndex, startIndex + postsBatchSize - 1)
            .order('created_at', { ascending: false }); // Add this line to order the posts by created_at in descending order

        if (postsData) {
            postData.value = [...postData.value, ...postsData];
            lastPostIndex.value = startIndex + postsData.length - 1;
        }

        if (postsData?.length) {
            lastPostIndex.value = startIndex + postsData.length - 1;
        } else {
            reachedEndOfPosts.value = true;
        }
    }
}

onMounted(() => {
    fetchData();
})

</script>

<template>
    <div class="container">
        <Card 
            v-for="post in postData"
            :key="post.id"
            :post="post"
        />
        <Observer v-if="postData.length && !reachedEndOfPosts" @intersect="fetchNextBatch"/>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px;
}
</style>
