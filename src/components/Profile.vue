<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/UsersStore';

import type { UserInfo, UserPost, User } from '@/utils';
import gsap from 'gsap/src';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useUsersStore();

const {user: loggedUser} = storeToRefs(store)

const username = ref<string>(route.params.username as string);

const posts = ref<UserPost[]>([])

const user = ref<User | null>(null);
const loadingUser = ref<boolean>(false);

const isFollowing = ref<boolean>(false);
const loadingIsFollowing = ref<boolean>(false);

const beforeEnter = (el: Element) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
}

const enter = (el: Element) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
    });
}

const leave = (el: Element) => {
    gsap.to(el, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out'
    });
}

function addPost(post: UserPost): void {
    posts.value.unshift(post);
}

async function fetchData (username: string) {
    loadingUser.value = true;
    const {data: userData} = await supabase 
        .from('users')
        .select()
        .eq('username', username)
        .single();

    if (userData) {
        user.value = userData;
        console.log(user.value);

        const {data: postsData} = await supabase 
            .from('posts')
            .select()
            .eq('owner_id', user.value?.id)
        console.log(user.value)
        console.log(postsData);

        if (postsData) {
            posts.value = postsData;
        }
    }

    else {
        loadingUser.value = false;
        return user.value = null;
    }
    loadingUser.value = false;
}

async function fetchIsFollowing() {
    loadingIsFollowing.value = true;
    if (loggedUser.value && loggedUser.value?.id !== user.value?.id) {
        const response = await supabase 
            .from('followers_following')
            .select()
            .eq('follower_id', loggedUser.value?.id)
            .eq('following_id', user.value?.id)
            .single();
        if (response.data) {
            isFollowing.value = true;
        }
    }
    loadingIsFollowing.value = false;
}

onMounted(async () => {
    await fetchData(username.value);
    await fetchIsFollowing();
});


const tmpUserInfo = ref<UserInfo>({
    posts: 0,
    followers: 69,
    following: 420
});
</script>

<template>
    <Container v-if="!loadingUser"> 
        <transition-group appear name="fade" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
            <div class="profile-container" :key="$route.params.username.toString()">
                <UserBar
                    :user="user"
                    :userInfo="tmpUserInfo"
                    :addNewPost="addPost"
                    :isFollowing="isFollowing"
                    :loadingIsFollowing="loadingIsFollowing"
                ></UserBar>
                <ImageGallery
                    :posts="posts"
                />
            </div>
        </transition-group>
    </Container>
    <Container v-else class="spinner-container">
        <div class="spinner-container">
            <a-spin size="large" />
        </div>
    </Container>
</template>

<style scoped>
.profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 20px;
    gap: 20px;
    flex-direction: column;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 80px;
}
</style>