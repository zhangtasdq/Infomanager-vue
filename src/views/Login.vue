<template>

<div class="login-view view">
    <VPanel :title="$t('login')">
        <VInput ref="passwordInput" inputType="password" :placeholder="$t('placeholder.pleaseInputPassword')" />
        <VButton :btnLabel="$t('login')" btnSize="full" @btnClick="handleClickLogin" />
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
            if (currentValue && currentValue !== StatusCode.LOGIN_BEGIN) {
                if (currentValue === StatusCode.LOGIN_FAILED) {
                    this.$toasted.show(this.$t("notice.loginFailed"));
                    this.clearView();                                    
                } else if (currentValue === StatusCode.LOGIN_SUCCESS) {
                    this.$toasted.show(this.$t("notice.loginSuccess"));
                    this.$store.dispatch(SET_CURRENT_USER, {password: this.password});
                    this.clearView();                                    
                    this.$router.push("InfoList");
                }
            }
        }
    }
}

</script>

<style lang="scss">

.login-view {
    display: flex;
    align-items: center;
    justify-content: center;

    .panel {
        width: 85%;

        h2 {
            font-size: 1.2rem;
        }

        .panel-body {
            text-align: center;
        }
    }

    .input {
        margin-top: 1.5rem;
    }

    .btn {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
}

</style>