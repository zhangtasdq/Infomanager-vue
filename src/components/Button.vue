<template>
  <button class="btn" :class="btnSurface" @click="handeBtnClick" >{{btnLabel}}</button>
</template>

<script>
let btnColorMap = { primary: "btn-primary", danger: "btn-danger", success: "btn-success" },
    btnSizeMap = { normal: "", full: "btn-full" };

export default {
    name: "v-button",
    props: {
        btnLabel: {
            type: String,
            required: true
        },

        btnType: {
            type: String,
            default: "primary"
        },

        btnSize: {
            type: String,
            default: "normal"
        },

        btnIcon: {
            type: String
        }
    },

    computed: {
        btnSurface: function() {
            return [].concat(btnColorMap[this.btnType], btnSizeMap[this.btnSize]);
        }
    },

    methods: {
        handeBtnClick: function() {
            this.$emit("btnClick");
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable.scss";

@mixin btn-surface($normal, $active, $active_border) {
    color: #fff;
    background-color: $normal;
    border-color: $normal;

    &:active {
        background-color: $active;
        border-color: $active_border;
    }
}

.btn {
    outline: none;
    padding: 0.8rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;

    &.btn-primary {
        @include btn-surface($primary_btn_color, $primary_btn_active_color, $primary_btn_active_color);
    }

    &.btn-danger {
        @include btn-surface($danger_btn_color, $danger_btn_active_color, $danger_btn_active_color);
    }

    &.btn-success {
        @include btn-surface($success_btn_color, $success_btn_active_color, $success_btn_active_border_color);
    }

    &.btn-full {
        padding: 0.6rem 0;
        width: 100%;
        font-size: 1.2rem;
    }
}


</style>