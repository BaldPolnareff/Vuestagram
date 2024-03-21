<script setup lang="ts">
import { ref, computed, inject, defineProps } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import message from 'ant-design-vue/es/message';
import MediaCarousel from './MediaCarousel.vue';
import SimpleCarousel from './SimpleCarousel.vue';
import type { UploadFile } from 'ant-design-vue/es/upload/interface';
import { supabase } from '@/supabase';
import { generateUniqueId } from '@/utils';
import type { UserPost } from '@/utils';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';

const open = inject('openUploadMediaModal')
const uploadStage = ref<boolean>(true);
const loadingUpload = ref<boolean>(false);

const fileList = ref<UploadFile[]>([]);

const mediaFiles = ref<File[]>([]);

const bucketUploadMessage = ref<string>('');

const userStore = useUsersStore();
const { user } = storeToRefs(userStore);

const props = defineProps<{
    addNewPost: (post: UserPost) => void
}>();

const handleChange = (info: UploadChangeParam) => {
    const status = info.file.status;

    if (status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
};

function handleDrop(e: DragEvent) {
    console.log(e);
}


const caption = ref<string>('');

const acceptedFileTypes: string = "'image/jpeg','image/png','image/gif'";

const primaryButtonTitle = computed(() => {
    return uploadStage.value ? 'Next' : 'Upload';
});

const defaultButtonTitle = computed(() => {
    return uploadStage.value ? 'Cancel' : 'Back';
});

const uploadMedia = async () => {
    console.log(`Uploading media with caption: ${caption.value}`);
    const imageUrls: string[] = [];
    if (fileList.value.length) {
        for (let i = 0; i < fileList.value.length; i++) {
            mediaFiles.value.unshift(fileList.value[i].originFileObj as File)
        }
    }
    console.log(mediaFiles.value);
    if (mediaFiles.value.length && user.value) {
        const uniqueName = generateUniqueId();
        const postPathName = user.value.username + '_' + generateUniqueId();
        
        loadingUpload.value = true;

        for (let i = 0; i < mediaFiles.value.length; i++) {
            const file = mediaFiles.value[i];
            const response = await supabase.storage
                .from('media')
                .upload(`public/${postPathName}/${uniqueName}_${file.name}`, file);
            if (response.error) {
                console.log(response.error);
            } else {
                bucketUploadMessage.value = `Media ${file.name} uploaded successfully`;
                console.log(bucketUploadMessage.value);

                imageUrls.unshift(response.data.path);
            }
        }

        if (imageUrls.length) {
            const { data, error } = await supabase.from('posts').insert({
                owner_id: user.value.id,
                caption: caption.value,
                urls: imageUrls
            });

            if (error) {
                loadingUpload.value = false;
                bucketUploadMessage.value = error.message;
                console.log(error);
            } else {
                loadingUpload.value = false;
                bucketUploadMessage.value = 'Post inserted successfully';
                console.log('Post inserted successfully');
            }
        }
    } else {
        loadingUpload.value = false;
        bucketUploadMessage.value = 'No media to upload';
        console.log('No media to upload');
    }

    goBack();
    props.addNewPost({
        caption: caption.value,
        urls: imageUrls
    })
    closeModal();
    bucketUploadMessage.value = '';
    fileList.value = [];
    mediaFiles.value = [];
    caption.value = '';
}

const goBack = () => {
    uploadStage.value = true;
}

const goNext = () => {
    uploadStage.value = false;
}

const showModal = () => {
    open.value = true;
}

const closeModal = () => {
    open.value = false;
}


</script>

<template>
    <div class="modal-backdrop" v-if="open" @openUploadModal="showModal">
        <div class="modal-wrapper">
            <div class="title-wrapper">
                <h5 class="upload-media">Upload media</h5>
            </div>
            <div class="content-wrapper">
                <div class="file-upload-wrapper" v-if="uploadStage">
                    <a-upload-dragger
                        class="file-upload"
                        v-model:fileList="fileList"
                        :accept="acceptedFileTypes"
                        name="file"
                        :multiple="true"
                        :action="'file uploaded'"
                        maxCount=4
                        listType="picture-card"
                        @change="handleChange"
                        @drop="handleDrop"
                    >
                        <p class="ant-upload-drag-icon">
                            <inbox-outlined class="inbox"></inbox-outlined>
                        </p>
                        <p class="ant-upload-hint">Click or drag</p>
                    </a-upload-dragger>
                </div>
                <div class="input-caption-wrapper" v-else>
                    <div v-if="!loadingUpload">
                        <div class="thumbnail-wrapper">
                            <!-- <MediaCarousel :files="fileList" /> -->
                            <SimpleCarousel :files="fileList" />
                            <div class="buffer"></div>
                        </div>
                        <div class="caption-wrapper">
                            <a-textarea
                                class="caption-area"
                                v-model:value="caption"
                                placeholder="Enter description..."
                                :rows="5"
                            />
                        </div>
                    </div>
                    <div class="spinner-wrapper" v-else>
                        <a-spin/>
                    </div>
                </div>
            </div>
            <div class="buttons-footer">
                <a-button
                    type="primary"
                    :disabled="!fileList.length"
                    @click="uploadStage ? goNext() : uploadMedia()"
                >{{ primaryButtonTitle }}</a-button>
                <a-button
                    type="default"
                    @click="uploadStage ? closeModal() : goBack()"
                >{{ defaultButtonTitle }}</a-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buffer {
    height: 50px;
}

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
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 98%;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
}

.title-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    font-size: smaller;
}

.content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.file-upload-wrapper {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.buttons-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
}

.file-upload {
    display: flex;
    padding: 5px;
    border-radius: 5px;
    gap: 5px;
    flex-direction: column;
    padding: 10px;
    margin: 5px;
}

.caption-area {
    margin-top: 20px;
    width: 400px;
    height: 70px;
    padding: 3px;
    border-radius: 5px;
    border: none;
    /* Remove weird decoration at bottom right corner */
    resize: none;
    font-size: 0.5rem;
}

.caption-area:focus {
    border: none !important;
}

.file-upload-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: absolute;
}

.thumbnail-wrapper {
    display: flex;
    flex-direction: column;
    height: 50px;
    align-items: center;
    margin-bottom: 150px;
}

.input-caption-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ant-upload-drag-icon {
    font-size: 14px;
    color: #1890ff;
    height: 20px;
}

.ant-upload-hint {
    font-size: 10px !important;
    padding: 10px !important;
}

.inbox {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 400px;
    height: 30px;
    padding: 10px !important;
}
</style>