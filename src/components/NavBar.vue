<template>

<div class="nav-bar">
    <div class="nav-item">
        <slot name="left"></slot>
    </div>
    <div class="nav-item">
        <h2> {{title}} </h2>
    </div>
    <div class="nav-item">
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
    padding: 0.25em 0;
    margin: 0;
    background-color: map-get($color, primary);

    .nav-item {
        flex: 1;
        color: #fff;

        &:first-child {
            text-align: left;
        }

        &:last-child {
            text-align: right;
        }
    }    
}

</style>