<template>

<div class="loading" v-if="isShow">
    <div class="content">
        <icon style="color: #fff;" name="spinner" :scale="scale" spin />
    </div>
</div>

</template>

<script>

export default {
    props: {
        isShow: {
            type: Boolean,
            required: true,
        },

        scale: {
            type: Number,
            default: 1
        }
    }
}

</script>

<style lang="scss" scoped >

.loading {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, 0.5);

    .content {
        width: 100%;        
        text-align: center;
    }
}

</style>
