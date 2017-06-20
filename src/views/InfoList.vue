<template>

<div class="info-list-view view">
    <VDrawerLayout v-bind:show.sync="showDrawlayout" :expandWidth="400" ref="drawlayout">
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
</div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StatusCode from "@/configs/status-code-config";
import { VNavBar, VList, VDrawerLayout, VTab, VDialog } from "../components";
import { SET_CURRENT_INFO } from "@/stores/modules/info";

export default {
    data: function() {
        var self = this;

        return {
            showDrawlayout: false,
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
                        self.backupInfo();
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
                        self.restoreInfo();
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
        VDialog
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

        goShowInfo() {
            this.$router.push({name: "InfoShow"});
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

        backupInfo: function() {
            
        },

        restoreInfo: function() {

        },

        ...mapActions("infoListView", ["loadLocalInfo", "resetLoadLocalStatus", "setActiveCategory"])
    },

    watch: {
        loadLocalInfoStatus: function(currentValue) {
            if (currentValue) {
                if (currentValue === StatusCode.LOAD_LOCAL_INFO_FAILED) {
                     this.$toasted.show(this.$t("notice.loadLocalInfoFailed"));
                } else {
                    this.$store.dispatch(SET_CURRENT_INFO, {infos: this.loadInfos});

                    if (this.allCategories.length > 0) {
                        this.setActiveCategory({activeCategory: this.allCategories[0]});
                    }
                }
                this.resetLoadLocalStatus();
            }
        },

        activeCategory: function() {
            this.infos = this.currentInfosGetter;
        },

        allInfos: function() {
            this.infos = this.currentInfosGetter;
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