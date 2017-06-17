<template>
  <div class="form-group">
    <label>{{label}}</label>
    <VInput ref="input" :initValue="initValue" />
  </div>
</template>

<script>
import VInput from "./Input";

export default {
    name: "v-form-group",

    props: {
        label: {
            type: String,
            required: true
        },

        initValue: {
            type: String,
            default: ""
        }
    },

    components: {
        VInput
    },

    methods: {
        getValue: function() {
            return this.$refs.input.getValue();
        },

        clear: function() {
            this.$refs.input.clear();
        }
    }
}
</script>

<style lang="scss" scoped>

.form-group {
    margin-bottom: 1em;

    label {
        display: inline-block;
        width: 100%;
        margin-bottom: 0.75em;
        font-weight: 700;
        text-align: left;
    }
}
</style>