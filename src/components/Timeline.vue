<script setup lang="ts">
import Container from './Container.vue';
import Cards from './Cards.vue';
import LogInMessage from './LogInMessage.vue';
import type { UserPost } from '../utils'
import { ref } from 'vue';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';

const store = useUsersStore();

const { user: loggedUser, loadingUser: loadingTimeline } = storeToRefs(store);

</script>

<template>
    <Container>
        <div class="container" v-if="!loadingTimeline">
            <Cards v-if="loggedUser"></Cards>
            <LogInMessage v-else></LogInMessage>
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