<template>

<div class="dialog" v-if="isShow">
    <div class="content-wrapper">
        <div class="content">
            <h2>{{msg}}</h2>
            <div class="footer">
                <VButton :label="btn.left.label" :type="btn.left.type" />
                <VButton :label="btn.right.label"/>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import VButton from "./Button";

export default {
    name: "v-dialog",
    
    props: {
        isShow: {
            type: Boolean,
            required: true
        },

        msg: {
            type: String,
            required: true
        },

        btn: {
            type: Object,
            required: true
        }
    },

    components: {
        VButton
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
        position: relative;
        width: 100%;
        text-align: center;

        .footer {
            position: absolute;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            bottom: 1em;
        }
    }
}

</style>