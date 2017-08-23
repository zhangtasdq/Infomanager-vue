<template>

<div class="nav-bar">
    <div class="nav-item left">
        <slot name="left"></slot>
    </div>
    <div class="nav-item center">
        <h2> {{title}} </h2>
    </div>
    <div class="nav-item right">
        <slot name="right"></slot>
    </div>
</div>

</template>

<script>

import VTabItem from "./TabItem";

export default {
    name: "v-nav-bar",
    props: {
        title: {
            type: String,
            required: true
        }
    },

    methods: {
        handleClickItem: function(id) {
            this.$emit("onClickItem", id);
        }
    }
};

</script>

<style lang="scss" scoped>
@import "../assets/css/variable.scss";

.nav-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    padding: 0.5rem 0;
    margin: 0;
    background-color: map-get($color, primary);

    .nav-item {
        flex: 1;
        color: #fff;
        align-items: center;
        
        h2 {
            margin: 0;
            text-align: center;
            font-size: $title-size;
        }


        &.left {
            text-align: left;

            .nav-icon {
                cursor: pointer;
                padding-left: 1rem;
            }
        }

        &.center {
            flex: 2;
        }

        &.right {
            text-align: right;

            .nav-icon {
                cursor: pointer;
                padding-right: 1rem;
            }
        }
    }    
}

</style>