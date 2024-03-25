<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { LeftCircleOutlined, RightCircleOutlined, HeartOutlined, HeartFilled, CommentOutlined, EllipsisOutlined } from '@ant-design/icons-vue';


const envs = import.meta.env;
const publicFileBucketBaseUrl: string = envs.VITE_PUBLIC_FILE_BUCKET_BASE_URL;
const props = defineProps<{
    imgUrls: string[],
    title?: string,
    description?: string
    avatarUrl: string
}>();
</script>

<template>
    <div class="card-container">
        <a-card hoverable style="width: 300px" class="card">
            <div class="carousel-wrapper">
                <a-carousel class="carousel" arrows>
                    <template #prevArrow>
                        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                            <left-circle-outlined />
                        </div>
                    </template>
                    <template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 10px">
                            <right-circle-outlined />
                        </div>
                    </template>
                    <div v-for="url in props.imgUrls" class="img-wrapper">
                        <div class="img-container">
                            <img :src="`${publicFileBucketBaseUrl}${url}`" />
                        </div>
                    </div>
                </a-carousel>
            </div>
            <template #actions>
                <HeartOutlined key="heart-outlined" />
                <CommentOutlined key="comment-outlined" />
                <ellipsis-outlined key="ellipsis" />
            </template>
            <a-card-meta :title="props.title" :description="props.description">
                <template #avatar>
                    <a-avatar :src="props.avatarUrl" />
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<style scoped>
:deep(.slick-slide) {
    text-align: center;
    height: max-content;
    width: 350px;
    line-height: 0px;
    background: #6c6c6c;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
}

:deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #292929;
    background-color: rgba(255, 255, 255, 0.822);
    border-radius: 50%;
    transition: ease all 0.3s;
    opacity: 0.3;
    z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 0.5;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.carousel-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-width: 300px;
}

.carousel {
    height: max-content;
    object-fit: fill;
    width: 300px;
    margin-bottom: 25px;
}

.img-wrapper {
    display: flex;
    justify-content: center;
}

.img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

img {
    width: 100%;
    height: 100%;
}
</style>