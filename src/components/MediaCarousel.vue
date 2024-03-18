<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { UploadFile } from 'ant-design-vue/lib/upload/interface';

const props = defineProps<{
    files: UploadFile[];
}>()

function extractThumbnailUrl(file: UploadFile) {
    console.log(file);
    return file.thumbUrl;
}


</script>

<template>
    <div class="container" @click="console.log(props.files[0].thumbUrl)">
        <a-carousel arrows dots-class="slick-dots slick-thumb">
            <template>
                <a>
                    <img :src="extractThumbnailUrl(props.files[0])" />
                </a>
            </template>
            <div>
                <img
                    v-for="item in props.files"
                    :src="extractThumbnailUrl(item)" 
                />
            </div>
        </a-carousel>
    </div>
</template>

<style scoped>
    /* For demo */
    :deep(.slick-dots) {
        position: relative;
        height: auto;
    }
    :deep(.slick-slide img) {
        border: 3px solid #ffffff;
        border-radius: 10px;
        display: block;
        margin: auto;
        max-width: 70%;
    }
    :deep(.slick-arrow) {
        display: none !important;
    }
    :deep(.slick-thumb) {
        bottom: 0px;
    }
    :deep(.slick-thumb li) {
        width: 40px;
        height: 25px;
    }
    :deep(.slick-thumb li img) {
        width: 100%;
        height: 100%;
        filter: grayscale(100%);
        display: block;
        border-radius: 5px;
    }
    :deep .slick-thumb li.slick-active img {
        filter: grayscale(0%);
    }

    .container {
        max-width: 250px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>