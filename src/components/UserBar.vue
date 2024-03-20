<script setup lang="ts">
import { defineProps, defineEmits, ref, provide } from 'vue';
import type { UserInfo, UserPost } from '@/utils';
import UploadMediaModal from './UploadMediaModal.vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/UsersStore';
import { useRoute } from 'vue-router';

const userStore = useUsersStore();
const { user, loadingUser } = storeToRefs(userStore);
const route = useRoute();
const { username: profileUsername } = route.params;

const props = defineProps<{
    username: string,
    userInfo: UserInfo, 
    addNewPost: (post: UserPost) => void
}>();

const openUploadMediaModal = ref<boolean>(false);

provide('openUploadMediaModal', openUploadMediaModal);


</script>

<template>
    <UploadMediaModal v-if="user && profileUsername === user.username"
        :addNewPost="props.addNewPost"
    />
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.username }}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.userInfo?.posts }} posts</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo?.followers }} followers</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo?.following }} following</a-typography-title>
        </div>
        <div 
            class="add-post-button-container"
            v-if="user && profileUsername === user.username"
        >
            <a-button 
                type="primary"
                class="add-post-button"
                @click="openUploadMediaModal = true"
            >+</a-button>
        </div>
    </div>
</template>

<style scoped>
.userbar-container {
    justify-content: space-between;
    padding: 0 70px;
}

.top-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.bottom-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
}

.bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
}

.add-post-button-container {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
}

.add-post-button {
    width: 50px;
    height: 50px;
    font-size: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(186, 223, 255);
    color: #444444;
}
</style>