<script lang="ts" setup>
import { defineProps } from 'vue';
import type { UploadFile } from 'ant-design-vue/lib/upload/interface';

const props = defineProps<{
    files: UploadFile[];
}>()

const onChange = (current: number) => {
    console.log(current);
};

function extractThumbnailUrl(file: UploadFile) {
    console.log(file);
    return file.thumbUrl;
};
</script>

<template>
    <div class="carousel-wrapper">
        <a-carousel class="carousel" :after-change="onChange">
            <div v-for="item in files" class="img-wrapper">
                <img
                    :src="extractThumbnailUrl(item)" 
                />
            </div>
        </a-carousel>
    </div>
</template>

<style scoped>
/* For demo */
:deep(.slick-slide) {
    text-align: center;
    height: 200px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #fff;
}

.carousel {
    max-width: 250px;
    margin: 10px auto;
    justify-content: center;
    align-items: center;
}

.carousel-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 250px;
}
</style>
