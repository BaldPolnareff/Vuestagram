<script setup lang="ts">
import { defineProps } from 'vue';
import type { UserPost } from '@/utils';

defineProps({
    posts: Array as () => UserPost[]
})

</script>

<template>
    <div class="image-gallery-container">
        <img
            v-for="post in posts"
            :key="post.id"
            :src="post.imgUrl"
        ></img>
    </div>
</template>

<style scoped>
.image-gallery-container {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    /* background-color: #f0f0f0; */
    padding: 20px;
    gap: 20px;
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
