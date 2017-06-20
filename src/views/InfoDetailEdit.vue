<template>

<div class="info-detail-edit-view view">
    <VNavBar :title="title">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup ref="name" :label="$t('name')" :placeholder="$t('placeholder.pleaseInputName')" :initValue="currentDetailItem.name" />
        <VFormGroup ref="content" :label="$t('content')" :placeholder="$t('placeholder.pleaseInputContent')" :initValue="currentDetailItem.content" />
    </div>

    <div class="footer" :class="footerBtnLayoutClass">
        <VButton v-if="isEdit" :btnLabel="$t('delete')" btnType="danger" @btnClick="handleDeleteDetailItem" />
        <VButton :btnLabel="$t('save')" @btnClick="handleSaveDetailItem" />
    </div>
</div>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { VNavBar, VButton, VFormGroup } from "../components";
import InfoService from "@/services/InfoService";
import { isEmpty } from "@/tools";

export default {
    name: "InfoDetailEditView",

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
        },
        ...mapState("infoDetailEditView", ["currentDetailItem"])
    },

    methods: {
        backUp: function() {
            this.$router.go(-1);
        },
        handleSaveDetailItem: function() {
            let name = this.$refs.name.getValue(),
                content = this.$refs.content.getValue();

            if (isEmpty(name)) {
                this.$toasted.show(this.$t("notice.propertyNameCantBeEmpty"));
                return;
            }

            if (isEmpty(content)) {
                this.$toasted.show(this.$t("notice.propertyValueCantBeEmpty"));
                return;
            }
            this.currentDetailItem.name = name;
            this.currentDetailItem.content = content;

            if (this.isEdit) {
                this.updateDetailItem({detailItem: this.currentDetailItem});
            } else {
                this.addDetailItem({detailItem: this.currentDetailItem});
            }
            this.$router.go(-1);
        },

        handleDeleteDetailItem: function() {
            this.deleteDetailItem({detailItem: this.currentDetailItem});
            this.$router.go(-1);
        },

        ...mapActions("infoDetailEditView", ["setCurrentDetailItem"]),
        ...mapActions("infoEditView", ["addDetailItem", "updateDetailItem", "deleteDetailItem"])
    },

    created: function() {
        let detailItem = null;
        if (this.isEdit) {
            detailItem = this.$route.params.detailItem;
        } else {
            detailItem = InfoService.buildEmptyInfoDetail();            
        }
        this.setCurrentDetailItem({detailItem});
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