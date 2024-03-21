<script setup lang="ts">
import Profile from '../components/Profile.vue';

</script>

<template>
    <main>
        <Profile 
            :key="$route.params.username.toString()"
        />
    </main>
</template>

<style scoped>

</style>