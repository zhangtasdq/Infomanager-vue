<template>

<div class="info-detail-edit-view view">
    <VNavBar :title="title">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup :label="$t('name')" :placeholder="$t('placeholder.pleaseInputName')" />
        <VFormGroup :label="$t('content')" :placeholder="$t('placeholder.pleaseInputContent')" />
    </div>

    <div class="footer" :class="footerBtnLayoutClass">
        <VButton v-if="isEdit" :btnLabel="$t('delete')" btnType="danger" />
        <VButton :btnLabel="$t('add')" />
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
            if (this.isEdit) {
                return this.$t("editInfoDetail");
            }
            return this.$t("addInfoDetail");
        },

        isEdit: function() {
            return this.$route.params.action === "edit";
        },

        footerBtnLayoutClass: function() {
            return {"edit": this.isEdit, "add": !this.isEdit};
        } 
    },

    methods: {
        backUp: function() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped >

.info-detail-edit-view {
    .content {
        padding: 1.5em;
    }
    
    .footer {
        position: fixed;
        display: flex;
        flex-direction: row;
        width: 100%;
        bottom: 1em;

        .btn {
            margin: 0 1.5em;
        }

        &.edit {
            justify-content: space-between;
        }

        &.add {
            justify-content: flex-end;
        }
    }
}

</style>