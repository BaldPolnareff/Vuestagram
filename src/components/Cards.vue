<script setup lang="ts">

import Card from './Card.vue';
import { ref, onMounted } from 'vue';
import type { UserPost, User, UserInfo } from '../utils';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';

const store = useUsersStore();

const { user: loggedUser } = storeToRefs(store);

const postData = ref<UserPost[]>([]);

async function fetchData() {
    const {data: followedUsersIds} = await supabase
        .from('followers_following')
        .select('following_id')
        .eq('follower_id', loggedUser.value?.id)

    if (followedUsersIds) {
        const owner_ids: number[] = followedUsersIds.map((user: {following_id: number}) => user.following_id);

        const {data: postsData} = await supabase
                .from('posts')
                .select()
                .in('owner_id', owner_ids)

        if (postsData) {
            postData.value = postsData;
        }
    }
}

onMounted(() => {
    fetchData();
})

</script>

<template>
    <div class="container" @click="console.log(postData)">
                <Card 
                    v-for="post in postData"
                    :key="post.id"
                    :post="post"
                />
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
