<template>

<div class="info-list-view view">
    <VDrawerLayout v-bind:show.sync="showDrawlayout" :expandWidth="400" ref="drawlayout">
        <VNavBar :title="$t('category')" />
    </VDrawerLayout>
    <VNavBar :title="$t('infoList')">
        <span class="nav-icon" @click="handleClickBars" slot="left">
            <icon name="bars" :scale="2" />        
        </span>
    </VNavBar>
    <div class="content">
    </div>
    <VTab :tabs="tabs" :scale="2.5" @onClickItem="handleClickTab" />
</div>

</template>

<script>

import { VNavBar, VList, VDrawerLayout, VTab } from "../components";

export default {
    data: function() {
        return {
            showDrawlayout: false,
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