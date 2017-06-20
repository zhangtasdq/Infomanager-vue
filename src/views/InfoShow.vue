<template>

<div class="info-show-view view">
    <VNavBar :title="$t('showInfoTitle')">
        <span class="nav-icon" slot="left" @click="backUp">
            <icon name="chevron-left" :scale="2" /> 
        </span>
    </VNavBar>

    <div class="content">
        <VFormGroup :initValue="currentInfo ? currentInfo.title : ''" :label="$t('title')"/>
        <VFormGroup :initValue="currentInfo ? currentInfo.category : ''" :label="$t('category')" />

        <div class="detail-list">
            <h3>{{$t("infoDetail")}}</h3>
            <VList :datas="(currentInfo && currentInfo.details) ? currentInfo.details : []" idProperty="id" labelProperty="name">
            </VList>
        </div>
    </div>

    <div class="footer">
        <VButton :btnLabel="$t('delete')" btnType="danger" @btnClick="tryDeleteInfo" />
        <VButton :btnLabel="$t('edit')" @btnClick="goEditInfo" />
    </div>
</div>

</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { VNavBar, VButton, VFormGroup, VList } from "../components";
import StatusCode from "@/configs/status-code-config";

export default {
    components: {
        VNavBar,
        VButton,
        VFormGroup,
        VList
    },

    data: function() {
        return {isListenSaveToLocalStatus: false};
    },

    computed: {
        title: function() {
            if (this.$route.params.action === "create") {
                return this.$t("createInfo");
            }
            return this.$t("editInfo");
        },
        ...mapGetters(["getInfoByRouteParam", "allInfos", "currentUserPassword", "saveIntoToLocalStatusGetter"]),
        ...mapState("infoShowView", ["currentInfo"])
    },

    methods: {
        backUp: function() {
            this.$router.go(-1);
        },

        goEditInfo: function() {
            this.$router.push({name: "InfoEdit", params: {action: "edit", id: this.currentInfo.id}});
        },

        tryDeleteInfo: function() {
            this.executeDeleteInfo(this.currentInfo.id);;
        },

        executeDeleteInfo: function(id) {
            let infosCopy = JSON.parse(JSON.stringify(this.allInfos)),
                newInfos = infosCopy.filter((item) => item.id !== id);

            this.saveInfoToLocal({infos: newInfos, password: this.currentUserPassword});
        },

        ...mapActions("infoShowView", ["setCurrentInfo", "resetCurrentInfo"]),
        ...mapActions(["deleteInfo", "saveInfoToLocal", "resetSaveInfoToLocalStatus"])
    },

    watch: {
        saveIntoToLocalStatusGetter: function(currentValue) {
             if (this.isListenSaveToLocalStatus && currentValue !== null && currentValue !== StatusCode.SAVE_INFO_TO_LOCAL_BEGIN) {
                if (currentValue === StatusCode.SAVE_INFO_TO_LOCAL_SUCCESS) {
                    this.deleteInfo({id: this.currentInfo.id});
                    this.$toasted.show(this.$t("notice.deleteInfoSuccess"));
                } else {
                    this.$toasted.show(this.$t("notice.deleteInfoFailed"));
                }
                this.resetSaveInfoToLocalStatus();
                setTimeout(() => this.$router.go(-1), 1200);
            }
        }
    },

    beforeRouteEnter: function(to, from, next) {
        if (from.name === "InfoList") {
            next((vm) => {
                let info = vm.getInfoByRouteParam;
                vm.setCurrentInfo({currentInfo: info});
                vm.isListenSaveToLocalStatus = true;
            });
        }
        next(true);
    },

    beforeRouteLeave: function(to, from, next) {
        if (to.name === "InfoList") {
            this.isListenSaveToLocalStatus = false;
            this.resetCurrentInfo();
        }
        next(true);
    }
}
</script>

<style lang="scss" scoped >

.info-show-view {
    .content {
        padding: 1.5em;
        .detail-list {
            margin-top: 2em;

            h3 {
                margin: 0;
            }
        }
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