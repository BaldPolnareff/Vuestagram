<script setup lang="ts">
import { defineProps } from 'vue';
import type { UserPost } from '@/utils';
import gsap from 'gsap';

const props = defineProps<{
    posts: UserPost[]
}>();

const beforeEnter = (el: HTMLElement) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
}

const enter = (el: Element) => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.2 * el.dataset.index
    });
}

const leave = (el:Element) => {
    gsap.to(el, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
    });
}

</script>

<template>
    <transition-group
        name="image-gallery-transition"
        appear 
        @beforeEnter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
        <div class="image-gallery-container" key="img-gallery">
            <img
                v-for="(post, index) in props.posts"
                :key="$route.params.username.toString() + index"
                :src="`https://scspgajzrecjkjevzmcb.supabase.co/storage/v1/object/public/media/${post.urls[0]}`"
                :data-index="index"
            ></img>
        </div>
    </transition-group>
</template>

<style scoped>
.image-gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    height: 100%;
    width: 100%;
    padding: 20px;
    grid-gap: 20px;
}

img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    margin: 5px;
}

img:hover {
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
}
</style>
