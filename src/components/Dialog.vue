<template>

<div class="dialog" v-if="isShow">
    <div class="content-wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</div>

</template>

<script>

export default {
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    }

}

</script>

<style scoped >

.dialog {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, 0.5);
}

.dialog .content-wrapper {
    width: 100%;
    text-align: center;
}

</style>