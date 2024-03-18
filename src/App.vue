<script setup lang="ts">
import Nav from './components/Nav.vue'
import { onMounted } from 'vue';
import { useUsersStore } from './stores/UsersStore';

const userStore = useUsersStore();

onMounted(() => {
    userStore.fetchUser();
});

</script>

<template>
    <main>
        <Nav></Nav>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>

</style>
