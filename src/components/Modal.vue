<script setup lang="ts">
import { ref, defineProps, computed, reactive, defineEmits } from 'vue';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';

const userStore = useUsersStore();

const {errorMessage, loading, user} = storeToRefs(userStore);

const { isLogin, open, title } = defineProps<{
    isLogin: boolean,
    open: boolean,
    title: string
}>();


const userCredentials = reactive({
    username: '',
    email: '',
    password: ''
});

const emit = defineEmits<{
  // <eventName>: <expected arguments>
    closeModal: [value: boolean] 
}>()

const handleOk = async () => {
    switch (title) {
        case 'Sign Up': {
            await userStore.handleSignup(userCredentials);
            if (user.value) {
                emit('closeModal', false);
                clearUserCredentials();
            }
            break;
        }
        case 'Login': {
            await userStore.handleLogin(userCredentials);
            if (user.value) {
                emit('closeModal', false);
                clearUserCredentials();
            }
            break;
        }
    }
};

const clearUserCredentials = () => {
    userCredentials.username = '';
    userCredentials.email = '';
    userCredentials.password = '';
}

const beforeEnter = (el: Element) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(80px)"
    }

const enter = (el: Element) => {
    gsap.to(el, {
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        ease: "power3.out",
    })
}

const leave = (el: Element, done: () => void) => {
    gsap.to(el, {
        opacity: 0, 
        y: 30, 
        duration: 0.5,
        ease: "power3.out",
        onComplete: done
    })
}


</script>


<template>
    <transition-group name="modal-transition"
        appear
        @beforeEnter="beforeEnter"
        @enter="enter"
        @leave="leave"

    >

        <div class="modal-backdrop" v-if="open">
            <div class="modal-wrapper">
                <h3>{{ title }}</h3>
                <div class="inputs-wrapper" v-if="!loading">
                    <a-input
                        v-if="!isLogin"
                        type="text"
                        placeholder="Username"
                        v-model:value="userCredentials.username"
                    />
                    <a-input
                        type="text"
                        placeholder="Email"
                        v-model:value="userCredentials.email"
                    />
                    <a-input
                        type="password"
                        placeholder="Password"
                        v-model:value="userCredentials.password"
                    />
                    <div class="error-wrapper">
                        <a-typography-text
                            v-if="errorMessage !== ''"
                            type="danger"
                        >{{ errorMessage }}</a-typography-text>
                    </div>
                </div>
                <div v-else class="spinner-wrapper">
                    <a-spin />
                </div>
                <div class="buttons-wrapper">
                    <a-button
                        :type="isLogin ? 'primary': 'default'"
                        class="btn"
                        @click="handleOk"
                        :disabled="loading"
                    >{{ title }}</a-button>
                    <a-button
                        type="default"
                        @click="{$emit('closeModal', false); userStore.clearErrorMessage()}"
                        class="btn-close"
                    >
                        Close
                    </a-button>
                </div>
            </div>
        </div>
    </transition-group>
</template>
    

<style scoped>
.modal-backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    backdrop-filter: blur(5px);
}

.modal-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
}

.inputs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.buttons-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

input {
    width: 200px;
    height: 30px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}


.btn-close {
    background-color: #ff6b6b;
    color: #000;
}

h5 {
    color: #ff6b6b;
}
</style>