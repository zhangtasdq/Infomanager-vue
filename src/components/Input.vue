<template>
  <input class="input" ref="input" :placeholder="placeholder" :type="inputType" :value="initValue"/>
</template>

<script>

export default {
    name: "v-input",

    props: {
        initValue: {
            type: String,
            default: ""
        },

        inputType: {
            type: String,
            default: "text"
        },

        placeholder: {
            type: String,
            default: ""
        }
    },

    methods: {
        getValue: function() {
            return this.$refs.input.value;
        },

        clear: function() {
            this.$refs.input.value = "";
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable.scss";

.input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 50px;
    padding: 6px 12px;
    outline: none;
    color: $font-color;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;

    &:focus {
        border-color: $input-focus-border-color;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
    }
}

</style>