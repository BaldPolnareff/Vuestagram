<script lang="ts" setup>
import { ref, defineProps, reactive } from 'vue';
import Modal from './Modal.vue'

const { isLogin } = defineProps({
    isLogin: Boolean, 
});

const title: string = isLogin ? 'Login' : 'Sign Up';
const open = ref<boolean>(false);

const showModal = () => {
    open.value = true;
}
</script>

<template>
    <div>
        <a-button :type="isLogin ? 'primary': 'default'" @click="showModal" class="btn">{{ title }}</a-button>
        <Modal 
            :isLogin="isLogin"
            :title="title"
            :open="open"
            @close-modal="open = false"
        />
    </div>
</template>

<style scoped>
.btn {
    margin-left: 10px;
}
.input {
    margin-top: 10px;
}
</style>


