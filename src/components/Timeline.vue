<script setup lang="ts">
import Container from './Container.vue';
import Card from './Card.vue';
import type { UserPost } from '../utils'
import { ref } from 'vue';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';

const store = useUsersStore();

const { user: loggedUser, loadingUser: loadingTimeline } = storeToRefs(store);


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
    <Container>
        <div class="container" v-if="!loadingTimeline">
            <div class="container" v-if="loggedUser">
                <Card 
                    v-for="post in postData"
                    :key="post.id"
                    :post="post"
                />
            </div>
            <div class="container" v-else>
                <p>Log in to see your timeline</p>
            </div>
        </div>
        <div class="spinner-container" v-else>
            <a-spin class="spinner"></a-spin>
        </div>
    </Container>
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

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 80px;
}
</style>