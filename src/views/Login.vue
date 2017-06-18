<template>

<div class="login-view view">
    <VPanel :title="$t('login')">
        <VInput ref="passwordInput" inputType="password" :placeholder="$t('placeholder.pleaseInputPassword')" />
        <VButton :btnLabel="$t('login')" btnSize="large" @btnClick="handleClickLogin" />
    </VPanel>
</div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import StatusCode from "@/configs/status-code-config";

import VPanel from "../components/Panel";
import VInput from "../components/Input";
import VButton from "../components/Button";
import { isEmpty } from "../tools";
import { SET_CURRENT_USER } from "@/stores/modules/user";

export default {
    components: {
        VPanel,
        VInput,
        VButton
    },

    methods: {
        handleClickLogin: function() {
            let inputValue = this.$refs.passwordInput.getValue();
            
            if (isEmpty(inputValue)) {
                this.$toasted.show(this.$t("notice.passwordCantBeEmpty"));
                return;
            }
            this.login({password: inputValue});
        },
        clearView: function() {
            this.$refs.passwordInput.clear();
            this.reset();
        },
        ...mapActions("loginView", ["login", "reset"])
    },

    computed: {
        ...mapState("loginView", ["loginStatus", "password"])
    },

    watch: {
        loginStatus: function(currentValue) {
            if (currentValue) {
                if (currentValue === StatusCode.LOGIN_FAILED) {
                    this.$toasted.show(this.$t("notice.loginFailed"));
                } else {
                    this.$toasted.show(this.$t("notice.loginSuccess"));
                    this.$store.dispatch(SET_CURRENT_USER, {password: this.password});
                    this.$router.push("InfoList");
                }
                this.clearView();
            }
        }
    }
}

</script>

<style lang="scss">

.login-view {
    padding: 8em 4em;

    .panel-body {
        text-align: center;
    }

    .input {
        margin-top: 1.5em;
    }

    .btn {
        margin-top: 2em;
        margin-bottom: 1.5em;
    }
}

</style>