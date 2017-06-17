<template>

<ul class="tab-list">
  <VTabItem v-for="item in tabs" :key="item.id" :icon="item.icon" :id="item.id" :scale="scale" @onClickItem="handleClickItem" />
</ul>

</template>

<script>

import VTabItem from "./TabItem";

export default {
    name: "v-tab",
    props: {
        tabs: {
            type: Array,
            required: true
        },
        scale: {
            type: Number,
            default: 1
        }
    },

    components: {
        VTabItem
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

.tab-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    padding: 0.25em 0;
    margin: 0;
    background-color: map-get($color, primary);

    .tab-item {
        flex: 1;
        color: #fff;
    }    
}

</style>