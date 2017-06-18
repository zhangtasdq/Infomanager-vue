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
    name: "v-dialog",
    
    props: {
        isShow: {
            type: Boolean,
            required: true
        }
    }

}

</script>

<style lang="scss" scoped >

.dialog {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, 0.5);

    .content-wrapper {
        width: 100%;
        text-align: center;
    }
}

</style>