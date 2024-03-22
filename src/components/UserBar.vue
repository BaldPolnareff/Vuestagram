<script setup lang="ts">
import { defineProps, defineEmits, ref, provide } from 'vue';
import type { UserInfo, UserPost, User } from '@/utils';
import UploadMediaModal from './UploadMediaModal.vue';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/UsersStore';
import { useRoute } from 'vue-router';
import { supabase } from '@/supabase';

const userStore = useUsersStore();
const { user: loggedUser, loadingUser } = storeToRefs(userStore);
const route = useRoute();
const { username: profileUsername } = route.params;
const hover = ref<boolean>(false);

const props = defineProps<{
    user: User | null,
    userInfo: UserInfo, 
    addNewPost: (post: UserPost) => void, 
    isFollowing: boolean, 
    loadingIsFollowing: boolean
}>();

const openUploadMediaModal = ref<boolean>(false);

provide('openUploadMediaModal', openUploadMediaModal);


async function followUser() {
    await supabase 
        .from('followers_following')
        .insert({
            follower_id: loggedUser.value?.id, 
            following_id: props.user?.id
        })
} 

</script>

<template>
    <UploadMediaModal v-if="props.user && profileUsername === props.user.username"
        :addNewPost="props.addNewPost"
    />
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.user.username }}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.userInfo?.posts }} posts</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo?.followers }} followers</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo?.following }} following</a-typography-title>
        </div>
        <div class="buttons-container" v-if="loggedUser && !loadingIsFollowing">
            <div 
                class="add-post-button-container"
                v-if="profileUsername === loggedUser?.username"
            >
                <a-button 
                    type="primary"
                    class="add-post-button"
                    @click="openUploadMediaModal = true"
                >+</a-button>
            </div>
            <div class="follow-button-container" v-else>
                <a-button
                    type="primary"
                    @click="followUser"
                    v-if="!props.isFollowing"
                >
                    Follow
                </a-button>
                <a-button
                    class="unfollow-button"
                    type="default"
                    :danger="hover"
                    @mouseover="hover = true"
                    @mouseleave="hover = false"
                    v-else
                >
                    Unfollow
                </a-button>
            </div>
        </div>
        <div class="follow-button-container">
            <a-spin v-if="loadingIsFollowing" />
        </div>
    </div>
    <div class="user-not-found-container" v-else>
        <a-typography-title :level="2">User not found</a-typography-title>
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

.follow-button-container {
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