<template>
    <transition name="drawlayout">
        <div v-show="show" class="drawlayout">
          <div class="shade" @click.stop="hideDrawerLayout"></div>
          <div class="content-section" :style="contentStyle">
            <div class="content" :style="contentStyle">
                <slot></slot>
            </div>
          </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "v-drawer-layout",
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        expandWidth: {
            type: Number,
            default: 200
        }
    },

    data: function() {
        return {contentStyle: {width: this.expandWidth + "px"}};
    },

    methods: {
        hideDrawerLayout: function() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style lang="scss" scoped>

.drawlayout {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all 0.8s ease;
}

.drawlayout .shade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(20, 20, 20, 0.5);
}

.drawlayout .content-section {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    background-color: #fff;
}

.drawlayout.drawlayout-enter .shade,
.drawlayout.drawlayout-leave-to .shade {
    opacity: 0;
}

.drawlayout.drawlayout-enter-active .shade,
.drawlayout.drawlayout-leave-active .shade {
    transition: opacity 0.8s;
}

.drawlayout.drawlayout-enter .content-section,
.drawlayout.drawlayout-leave-to .content-section {
    width: 0 !important;
}

.drawlayout.drawlayout-enter-active .content-section,
.drawlayout.drawlayout-leave-active .content-section {
    transition: width 0.8s;
}

</style>