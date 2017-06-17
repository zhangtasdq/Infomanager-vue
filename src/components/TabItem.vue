<template>

<li class="tab-item" @click="handleClickItem">
   <icon :name="icon" :scale="scale" />
</li>

</template>

<script>

export default {
    name: "v-tab-item",

    props: {
        icon: {
            type: String,
            required: true
        },

        id: {
            type: [String, Number],
            required: true
        },

        scale: {
            type: Number,
            default: 1
        }
    },

    methods: {
        handleClickItem: function() {
            this.$emit("onClickItem", this.id);
        }
    }
}

</script>

<style lang="scss" scoped>

.tab-item {
    cursor: pointer;
}

</style>