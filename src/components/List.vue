<template>

<ul class="list">
  <VListItem v-for="item in datas" :key="item[idProperty]" :label="item[labelProperty]" :id="item[idProperty]" @onClickItem="handleClickItem" />
</ul>

</template>

<script>

import VListItem from "./ListItem";

export default {
    name: "v-list",
    props: {
        labelProperty: {
            type: String,
            required: true
        },

        idProperty: {
            type: String,
            required: true
        },

        datas: {
            type: Array,
            required: true
        }
    },

    components: {
        VListItem
    },

    methods: {
        handleClickItem: function(id) {
            this.$emit("onClickItem", id);
        }
    }
};

</script>

<style lang="scss" scoped>

.list {
    padding: 0;
    margin: 0;
}

</style>