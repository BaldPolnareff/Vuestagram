<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate } from 'vue';
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';
import { useRoute } from 'vue-router';
import { supabase } from '@/supabase';
import { useUsersStore } from '@/stores/UsersStore';

import type { UserInfo, UserPost, User } from '@/utils';
import gsap from 'gsap/src';

const route = useRoute();
const store = useUsersStore();

const loggedUser = store.user;

const username = ref<string>(route.params.username as string);

const posts = ref<UserPost[]>([])

const user = ref<User | null>(null);
const loadingUser = ref<boolean>(false);

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

onMounted(() => {
    fetchData(username.value);
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