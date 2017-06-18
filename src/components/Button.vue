<template>
  <button class="btn" :class="btnSurface" @click="handeBtnClick" >{{btnLabel}}</button>
</template>

<script>
let btnColorMap = { primary: "btn-primary", danger: "btn-danger" },
    btnSizeMap = { normal: "", large: "btn-large" };

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

@mixin btn-surface($normal, $active) {
    color: #fff;
    background-color: $normal;
    border-color: $normal;

    &:active {
        background-color: $active;
        border-color: $active;
    }
}

.btn {
    outline: none;
    padding: 0.8em 1.25em;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;

    &.btn-primary {
        @include btn-surface($primary_btn_color, $primary_btn_active_color);
    }

    &.btn-danger {
        @include btn-surface($danger_btn_color, $danger_btn_active_color);
    }

    &.btn-large {
        padding: 0.8em 4em;
        font-size: 1.2em;
    }
}


</style>