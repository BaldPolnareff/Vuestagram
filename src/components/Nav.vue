<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import Container from './Container.vue';
import AuthModal from './AuthModal.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/UsersStore';

const router = useRouter();
const route = useRoute();
const searchUsername = ref<string>('');
const userStore = useUsersStore();
const { user, loadingUser } = storeToRefs(userStore);

const { username: profileUsername } = route.params;

const onSearch = () => {
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`);
        searchUsername.value = '';
    }
}

const navigateToProfile = () => {
    if (user.value) {
        router.push(`/profile/${user.value.username}`);
    }
}
</script>

<template>
    <div>
        <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
            <a-layout>
                <a-layout-header>
                    <Container>
                        <div class="nav-container">
                            <div class="left">
                                <router-link to="/">Instagram</router-link>
                                <a-input-search v-model:value="searchUsername" placeholder="user..." @search="onSearch" style="width: 200px"/>
                            </div>
                            <div v-if="!loadingUser">
                                <div class="right" v-if="!user">
                                    <AuthModal :isLogin="false"></AuthModal>
                                    <AuthModal :isLogin="true"></AuthModal>
                                </div>
                                <div class="right-authenticated" v-else>
                                    <a-button 
                                        type="primary"
                                        @click="navigateToProfile"
                                    >
                                        Profile
                                    </a-button>
                                    <a-button 
                                        type="default"
                                        @click="userStore.handleLogout()"
                                    >
                                        Logout
                                    </a-button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </a-layout-header>
            </a-layout>
        </a-space>
    </div>
</template>

<style scoped>
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left {
    display: flex;
    align-items: center;
    padding: 0 10px; 
    gap: 15px;
}

.right {
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 15px;
}

.right-authenticated {
    display: flex;
    align-items: center;
    padding: 0 10px;
    gap: 15px;
}

</style>