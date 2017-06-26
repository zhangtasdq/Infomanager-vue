<template>
  <div class="form-group">
    <label>{{label}}</label>
    <VInput ref="input" :initValue="initValue" :placeholder="placeholder" />
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
        },

        placeholder: {
            type: String
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
    margin-bottom: 1rem;

    label {
        display: inline-block;
        width: 100%;
        margin-bottom: 0.75rem;
        font-weight: 500;
        text-align: left;
    }
}
</style>