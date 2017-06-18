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
        <VList :datas="infos" idProperty="id" labelProperty="title">
        </VList>
    </div>
    <VTab :tabs="tabs" :scale="2.5" @onClickItem="handleClickTab" />
</div>

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StatusCode from "@/configs/status-code-config";
import { VNavBar, VList, VDrawerLayout, VTab } from "../components";
import { SET_CURRENT_INFO } from "@/stores/modules/info";

export default {
    data: function() {
        return {
            showDrawlayout: false,
            infos: [],
            tabs: [
                {
                    id: 1,
                    icon: "cloud-upload"
                },
                {
                    id: 2,
                    icon: "cloud-download"
                },
                {
                    id: 3,
                    icon: "plus"
                }
            ]
        };
    },

    components: {
        VNavBar,
        VList,
        VDrawerLayout,
        VTab
    },

    computed: {
        ...mapState("infoListView", ["activeCategory", "loadLocalInfoStatus", "backupInfoStatus", "restoreInfoStatus", "loadInfos"]),
        ...mapGetters("infoListView", ["currentInfosGetter"]),
        ...mapGetters(["allCategories"]),   
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
                this.goShowInfo();
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

        activeCategory: function(currentValue) {
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