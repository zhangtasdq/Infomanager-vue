<template>

<div class="login-view view">
    <VPanel :title="$t('login')">
        <VInput ref="passwordInput" inputType="password" :placeholder="$t('placeholder.pleaseInputPassword')" />
        <VButton :btnLabel="$t('login')" btnSize="full" @btnClick="handleClickLogin" />
    </VPanel>
</div>

</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import StatusCode from "@/configs/status-code-config";

import VPanel from "../components/Panel";
import VInput from "../components/Input";
import VButton from "../components/Button";
import { isEmpty } from "../tools";

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
            this.userLogin({password: inputValue});
        },
        clearView: function() {
            this.$refs.passwordInput.clear();
            this.resetUserLoginStatus();
        },

        ...mapActions("loginView", ["userLogin", "resetUserLoginStatus"]),
        ...mapActions(["setCurrentUser"])
    },

    computed: {
        ...mapState("loginView", ["loginStatus"]),
        ...mapGetters("loginView", ["currentPasswordGetter"])
    },

    watch: {
        loginStatus: function(currentValue) {
            if (currentValue) {
                if (currentValue === StatusCode.LOGIN_FAILED) {
                    this.$toasted.show(this.$t("notice.loginFailed"));
                    this.clearView();                                    
                } else if (currentValue === StatusCode.LOGIN_SUCCESS) {
                    this.$toasted.show(this.$t("notice.loginSuccess"));
                    this.setCurrentUser({password: this.currentPasswordGetter});
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