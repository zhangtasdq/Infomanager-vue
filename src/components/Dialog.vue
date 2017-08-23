<template>

<div class="dialog" v-if="isShow">
    <div class="content-wrapper">
        <div class="content">
            <h2>{{msg}}</h2>
            <div class="footer">
                <VButton :key="index" v-for="(btn, index) in buttons" :btnLabel="btn.label" :btnType="btn.type" @btnClick="btn.onClick"  />
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

        buttons: {
            type: Array,
            required: true
        }
    },

    components: {
        VButton
    }
}

</script>

<style lang="scss" scoped >
@import "../assets/css/variable.scss";

.dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, 0.5);

    .content-wrapper {
        box-sizing: border-box;
        position: relative;
        width: 85%;
        height: 10rem;
        border-radius: 4px;
        background-color: #fff;  

        .content {
            margin: 1em;
            
            h2 {
                font-size: 1.2rem;
                margin: 0;
                color: $font-color;
            }      

            .footer {
                box-sizing: border-box;
                position: absolute;
                left: 1em;
                right: 1em;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                bottom: 1em;
            }
        }

       
    }
}

</style>