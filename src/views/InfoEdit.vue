<template>

<div class="info-edit-view view">
    <VNavBar :title="title">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>

        <span class="nav-icon" slot="right" @click="saveInfo">
            <icon name="save" :scale="2" />
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup ref="title" :label="$t('title')" :initValue="currentInfo ? currentInfo.title : ''" />
        <VFormGroup ref="category" :label="$t('category')" :initValue=" currentInfo ? currentInfo.category : ''" />
        
        <div class="detail-list">
            <h3>{{$t("infoDetail")}}</h3>
            <VList :datas="(currentInfo && currentInfo.details) ? currentInfo.details : []" idProperty="id" labelProperty="name" @onClickItem="handleClickDetailItem">
            </VList>
        </div>
    </div>

    <div class="footer">
        <VButton :btnLabel="$t('add')" @btnClick="goAddInfoDetail" />
    </div>
</div>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { VNavBar, VButton, VFormGroup, VList } from "../components";
import InfoService from "@/services/InfoService";
import { isEmpty } from "@/tools";
import StatusCode from "@/configs/status-code-config";

export default {
    components: {
        VNavBar,
        VButton,
        VFormGroup,
        VList
    },

    data: function() {
        return {isListenSaveToLocal: false};
    },

    computed: {
        title: function() {
            if (this.isEditInfo()) {
                return this.$t("editInfo");
            }
            return this.$t("createInfo");
        },
        ...mapGetters(["getInfoByRouteParam", "allInfos", "currentUserPassword", "saveIntoToLocalStatusGetter"]),
        ...mapState("infoEditView", ["currentInfo"])
    },

    methods: {
        isEditInfo: function() {
            return this.$route.params.action === "edit";
        },

        backUp: function() {
            this.$router.go(-1);
        },

        goAddInfoDetail: function() {
            this.$router.push({name: "InfoDetailEdit", params: {action: "create"}});
        },

        handleClickDetailItem: function(id) {
            let detailItem = this.currentInfo.details.filter((item) => item.id === id)[0];
            this.$router.push({name: "InfoDetailEdit", params: {action: "edit", detailItem}});
        },

        saveInfo: function() {
            let title = this.$refs.title.getValue(),
                category = this.$refs.category.getValue();

            if (isEmpty(title)) {
                this.$toasted.show(this.$t("notice.titleCantBeEmpty"));
                return;
            }

            if (isEmpty(category)) {
                this.$toasted.show(this.$t("notice.categoryCantBeEmpty"));
                return;
            }
            this.currentInfo.title = title;
            this.currentInfo.category = category;

            if (this.isEditInfo()) {
                this.executeUpdateInfo(this.currentInfo);
            } else {
                this.executeAddInfo(this.currentInfo);
            }
        },

        executeUpdateInfo: function(info) {
            let infosCopy = JSON.parse(JSON.stringify(this.allInfos)),
                newInfos = infosCopy.map((item) => item.id === info.id ? info : item);

            this.saveInfoToLocal({infos: newInfos, password: this.currentUserPassword});  
        },

        executeAddInfo: function(info) {
            let infosCopy = JSON.parse(JSON.stringify(this.allInfos));
            infosCopy.push(info);
            this.saveInfoToLocal({infos: infosCopy, password: this.currentUserPassword});
        },

        ...mapActions("infoEditView", ["setCurrentInfo", "resetCurrentInfo"]),
        ...mapActions(["updateInfo", "addInfo", "saveInfoToLocal", "resetSaveInfoToLocalStatus"])
    },

    watch: {
        saveIntoToLocalStatusGetter: function(currentValue) {
            if (this.isListenSaveToLocal && currentValue !== null && currentValue !== StatusCode.SAVE_INFO_TO_LOCAL_BEGIN) {
                if (currentValue === StatusCode.SAVE_INFO_TO_LOCAL_SUCCESS) {
                    if (this.isEditInfo()) {
                        this.updateInfo({info: this.currentInfo});
                    } else {
                        this.addInfo({info: this.currentInfo});
                    }
                    this.$toasted.show(this.$t("notice.saveInfoToLocalSuccess"));
                } else if (currentValue === StatusCode.SAVE_INFO_TO_LOCAL_FAILED) {
                    this.$toasted.show(this.$t("notice.saveIntoToLocalFailed"));
                }
                this.resetSaveInfoToLocalStatus();
                setTimeout(() => this.$router.go(-1), 1200);
            }
        }
    },

    beforeRouteEnter: function(to, from, next) {
        if (from.name === "InfoList" || from.name === "InfoShow") {
            next((vm) => {
                let info = null;
                if (vm.isEditInfo()) {
                    info = vm.getInfoByRouteParam;
                } else {
                    info = InfoService.buildEmptyInfo();            
                }
                vm.setCurrentInfo({currentInfo: info});
                vm.isListenSaveToLocal = true;                
            });
        }
        next(true);
    },

    beforeRouteLeave: function(to, from, next) {
        if (to.name === "InfoList" || to.name === "InfoShow") {
            this.isListenSaveToLocal = false;            
            this.resetCurrentInfo();
        }
        next(true);
    }
}
</script>

<style lang="scss" scoped >

.info-edit-view {
    .content {
        padding: 1rem;

        .detail-list {
            margin-top: 2rem;

            h3 {
                margin: 0;
                font-size: 1.2rem;
                font-weight: 500;
            }
        }
    }

    .footer {
        position: fixed;
        text-align: right;
        right: 0;
        bottom: 1rem;

        .btn {
            margin-right: 1rem;
        }
    }
}

</style>