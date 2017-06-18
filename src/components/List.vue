<template>

<ul class="list">
  <VListItem v-for="(item, index) in datas" 
            :key="idProperty ? item[idProperty] : index" 
            :label="labelProperty ? item[labelProperty] : item" 
            :id="idProperty ? item[idProperty] : index" 
            :isActive="item === activeItem"
            @onClickItem="handleClickItem" />
</ul>

</template>

<script>

import VListItem from "./ListItem";

export default {
    name: "v-list",
    props: {
        labelProperty: {
            type: String
        },

        idProperty: {
            type: String
        },

        datas: {
            type: Array,
            required: true
        },
        activeItem: null
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