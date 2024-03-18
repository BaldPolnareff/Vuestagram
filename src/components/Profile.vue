<script setup lang="ts">
import { ref } from 'vue';
import Container from './Container.vue';
import UserBar from './UserBar.vue';
import ImageGallery from './ImageGallery.vue';
import { useRoute } from 'vue-router';

import type { UserInfo } from '@/utils';
import gsap from 'gsap/src';

const route = useRoute();

const username = ref<string>(route.params.username as string);

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

const tmpUserInfo = ref<UserInfo>({
    posts: 0,
    followers: 69,
    following: 420
});
</script>

<template>
    <Container>
        <transition-group appear name="fade" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
            <div class="profile-container">
                <UserBar
                    :key="$route.params.username.toString()"
                    :username="$route.params.username.toString()"
                    :userInfo="tmpUserInfo"
                ></UserBar>
                <ImageGallery 
                    :posts="[
                        {
                            id: 1,
                            imgUrl: 'https://picsum.photos/200/300',
                            username: 'ilporcoddio', 
                            title: 'Pisello nei jeans',
                            caption: 'porcoddio sono fuori di testa ma dottor pallaoro'
                        },
                        {
                            id: 2,
                            imgUrl: 'https://picsum.photos/200/301',
                            username: 'ilporcoddio',
                            title: 'lara momento',
                            caption: 'beh?'
                        },
                        {
                            id: 3,
                            imgUrl: 'https://picsum.photos/200/308',
                            username: 'ilporcoddio',
                            title: 'sono pelatp',
                            caption: 'e allora?'
                        }
                    ]"
                />
            </div>
        </transition-group>
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
</style>