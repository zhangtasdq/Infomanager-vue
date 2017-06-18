<template>

<div class="info-show-view view">
    <VNavBar :title="$t('showInfoTitle')">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup :label="$t('title')"/>
        <VFormGroup :label="$t('category')" />
    </div>

    <div class="footer">
        <VButton :btnLabel="$t('delete')" btnType="danger" />
        <VButton :btnLabel="$t('edit')" @btnClick="goEditInfo" />
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

        goEditInfo: function() {
            this.$router.push({name: "InfoEdit", params: {action: "edit"}});
        }
    }
}
</script>

<style lang="scss" scoped >

.info-show-view {
    .content {
        padding: 1.5em;
    }

    .footer {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        bottom: 1em;

        .btn {
            margin: 0 1.5em;
        }
    }
}

</style>