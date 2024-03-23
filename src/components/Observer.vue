<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

const observer = ref<IntersectionObserver | null>(null);
const observerElement = ref<HTMLElement | null>(null);

const emits = defineEmits(['intersect']);

onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            emits('intersect');
        }
    });

    observer.value.observe(observerElement.value!);
})
</script>

<template>
    <div class="observer" ref="observerElement"></div>
</template>

<style scoped>
.observer {
    height: 20px;
    width: 100%;
    background: linear-gradient(360deg, #ffffff00 25%, #8497ff48 75%);
    border-radius: 5px;
}
</style>