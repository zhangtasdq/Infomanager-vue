<template>

<li class="list-item" :class="{active: isActive}" @click="handleClickItem">{{label}}</li>

</template>

<script>

export default {
    name: "v-list-item",
    props: {
        id: {
            type: [String, Number],
            required: true
        },

        label: {
            type: String,
            required: true
        },

        isActive: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        handleClickItem: function() {
            this.$emit("onClickItem", this.id);
        }
    }

};

</script>

<style lang="scss" scoped>
@import "../assets/css/variable.scss";

.list-item {
    padding: 0.8em 0 0.8em 0.8em;
    text-align: left;
    background-color: #fff;
    cursor: pointer;
    color: $font-color;
    list-style-type: none;
    border-top: 1px solid $list-item-split-color;

    &.active {
        background-color: map-get($color, primary);
        color: #fff;
    }
}
</style>