<template>

<div class="info-edit-view view">
    <VNavBar :title="title">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>

        <span class="nav-icon" slot="right">
            <icon name="save" :scale="2" />
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup :label="$t('title')"/>
        <VFormGroup :label="$t('category')" />
    </div>

    <div class="footer">
        <VButton :btnLabel="$t('add')" @btnClick="goAddInfoDetail" />
    </div>
</div>

</template>

<script>

import { VNavBar, VButton, VFormGroup } from "../components";

export default {
    components: {
        VNavBar,
        VButton,
        VFormGroup
    },

    computed: {
        title: function() {
            if (this.$route.params.action === "create") {
                return this.$t("createInfo");
            }
            return this.$t("editInfo");
        }
    },

    methods: {
        backUp: function() {
            this.$router.go(-1);
        },

        goAddInfoDetail: function() {
            this.$router.push({name: "InfoDetailEdit", params: {action: "create"}});
        }
    }
}
</script>

<style lang="scss" scoped >

.info-edit-view {
    .content {
        padding: 1.5em;
    }

    .footer {
        position: fixed;
        text-align: right;
        right: 0;
        bottom: 1em;

        .btn {
            margin-right: 1em;
        }
    }
}

</style>