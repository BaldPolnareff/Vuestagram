<script setup lang="ts">

import Card from './Card.vue';
import { ref } from 'vue';
import type { UserPost } from '../utils';

const postData = ref<UserPost[]>([
    {
        id: 1,
        username: 'damiano',
        imgUrl: 'https://img.ilgcdn.com/sites/default/files/styles/xl/public/foto/2024/02/26/1708951008-loredana-bert.jpg?_=1708951042',
        title: 'Pisello nei jeans',
        caption: 'porcoddio sono fuori di testa ma dottor pallaoro'
    }, 
    {
        id: 2,
        username: 'sabaku',
        imgUrl: 'https://directus.luccacomicsandgames.com/lucca-comics-2023/assets/dyd6wv30wbso0w4k?key=directus-large-contain',
        title: 'lara momento',
        caption: 'beh?'
    },
    {
        id: 3,
        username: 'mario palladino',
        imgUrl: 'https://cdn.openart.ai/stable_diffusion/09490bad4c8bc73523f549bfa3e215da44f38007_2000x2000.webp',
        title: 'sono pelatp', 
        caption: 'e allora?'
    }
]);

</script>

<template>
    <div class="container">
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
