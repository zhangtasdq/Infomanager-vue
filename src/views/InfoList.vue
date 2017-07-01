<template>

<div class="info-list-view view">
    <VDrawerLayout v-bind:show.sync="showDrawlayout" :expandWidth="200" ref="drawlayout">
        <VNavBar :title="$t('category')" />
        <VList :datas="allCategories" :activeItem="activeCategory" @onClickItem="handleClickCategory">
        </VList>
    </VDrawerLayout>
    <VNavBar :title="$t('infoList')">
        <span class="nav-icon" @click="handleClickBars" slot="left">
            <icon name="bars" :scale="2" />        
        </span>
    </VNavBar>
    <div class="content">
        <VList :datas="infos" idProperty="id" labelProperty="title" @onClickItem="handleClickInfoItem">
        </VList>
    </div>
    <VTab :tabs="tabs" :scale="2.5" @onClickItem="handleClickTab" />
    <VDialog :msg="backupDialog.msg" :buttons="backupDialog.btns" :isShow="backupDialog.isShow"  />
    <VDialog :msg="restoreDialog.msg" :buttons="restoreDialog.btns" :isShow="restoreDialog.isShow"  />
    <VLoading :isShow="isShowLoading" />
</div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StatusCode from "@/configs/status-code-config";
import { VNavBar, VList, VDrawerLayout, VTab, VDialog, VLoading } from "../components";
import { SET_CURRENT_INFO } from "@/stores/modules/info";

export default {
    data: function() {
        var self = this;

        return {
            showDrawlayout: false,
            isShowLoading: false,
            infos: [],
            tabs: [
                {
                    id: 1,
                    icon: "cloud-download"
                },
                {
                    id: 2,
                    icon: "cloud-upload"
                },
                {
                    id: 3,
                    icon: "plus"
                }
            ],

            backupDialog: {
                isShow: false,
                msg: this.$t("dialog.backup.content"),
                btns: [{
                    type: "success",
                    label: this.$t("cancel"),
                    onClick: function() {
                        self.backupDialog.isShow = false;
                    }
                }, {
                    label: this.$t("backup"),
                    onClick: function() {
                        self.backupDialog.isShow = false;
                        self.tryBackupInfo();
                    }
                }]
            },

            restoreDialog: {
                isShow: false,
                msg: this.$t("dialog.restore.content"),
                btns: [{
                    type: "success",
                    label: this.$t("cancel"),
                    onClick: function() {
                        self.restoreDialog.isShow = false;
                    }
                }, {
                    label: this.$t("restore"),
                    onClick: function() {
                        self.restoreDialog.isShow = false;
                        self.tryRestoreInfo();
                    }
                }]
            }
        };
    },

    components: {
        VNavBar,
        VList,
        VDrawerLayout,
        VTab,
        VDialog,
        VLoading
    },

    computed: {
        ...mapState("infoListView", ["activeCategory", "loadLocalInfoStatus", "backupInfoStatus", "restoreInfoStatus", "loadInfos"]),
        ...mapGetters("infoListView", ["currentInfosGetter"]),
        ...mapGetters(["allCategories", "allInfos"]),   
        ...mapGetters(["currentUserPassword"])
    },

    created: function() {
        let password = this.currentUserPassword;
        this.loadLocalInfo({password: password});
    },

    methods: {
        handleClickTab: function(id) {
            if (id === 3) {
                this.goCreateInfo();
                return;
            }

            if (id === 2) {
                this.backupDialog.isShow = true;
            }

            if (id === 1) {
                this.restoreDialog.isShow = true;
            }
        },

        goCreateInfo() {
            this.$router.push({name: "InfoEdit", params: {action: "create"}});
        },

        handleClickBars: function() {
            this.showDrawlayout = true;
        },

        handleClickCategory: function(id) {
            this.setActiveCategory({activeCategory: this.allCategories[id]});
            this.showDrawlayout = false;
        },

        handleClickInfoItem: function(id) {
            this.$router.push({name: "InfoShow", params: {id}});
        },

        tryBackupInfo: function() {
            this.backupInfo();
        },

        tryRestoreInfo: function() {
            this.restoreInfo();

        },

        ...mapActions("infoListView", [
            "loadLocalInfo", 
            "resetLoadLocalStatus", 
            "setActiveCategory", 
            "restoreInfo", 
            "backupInfo",
            "resetRestoreInfoStatus",
            "resetBackupInfoStatus"
        ]),
        ...mapActions(["setAllInfos"])
    },

    watch: {
        loadLocalInfoStatus: function(currentValue) {
            if (currentValue) {
                if (currentValue === StatusCode.LOAD_LOCAL_INFO_FAILED) {
                    this.resetLoadLocalStatus();
                    this.$toasted.show(this.$t("notice.loadLocalInfoFailed"));
                } else if (currentValue === StatusCode.LOAD_LOCAL_INFO_SUCCESS){
                    this.setAllInfos({infos: this.loadInfos});
                    if (this.allCategories.length > 0) {
                        this.setActiveCategory({activeCategory: this.allCategories[0]});
                    }
                    this.resetLoadLocalStatus();                    
                }
            }
        },

        activeCategory: function() {
            this.infos = this.currentInfosGetter;
        },

        allInfos: function() {
            if (this.allCategories.length > 0 && this.allCategories.indexOf(this.activeCategory) === -1) {
                this.setActiveCategory({activeCategory: this.allCategories[0]});
            } else {
                this.infos = this.currentInfosGetter;                
            }
        },

        backupInfoStatus: function(currentValue) {
            if (currentValue !== null) {
                if (currentValue === StatusCode.BACKUP_INFO_BEGIN) {
                    this.isShowLoading = true;
                } else {
                    if (currentValue === StatusCode.BACKUP_INFO_SUCCESS) {
                        this.$toasted.show(this.$t("notice.backupInfoSuccess"));
                    } else {
                        this.$toasted.show(this.$t("notice.backupInfoFailed"));
                    }
                    this.isShowLoading = false;
                    this.resetBackupInfoStatus();
                }
            }
        },

        restoreInfoStatus: function(currentValue) {
            if (currentValue !== null) {
                if (currentValue === StatusCode.RESTORE_INFO_BEGIN) {
                    this.isShowLoading = true;
                } else {
                    if (currentValue === StatusCode.RESTORE_INFO_SUCCESS) {
                        this.$toasted.show(this.$t("notice.restoreInfoSuccess"));
                    } else {
                        this.$toasted.show(this.$t("notice.restoreInfoFailed"));
                    }
                    this.isShowLoading = false;
                    this.resetRestoreInfoStatus();
                }
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.info-list-view {
    display: flex;
    flex: 1;
    flex-direction: column;

    .content {
        flex: 2;
    }    
}
</style>