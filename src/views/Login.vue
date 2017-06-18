<template>

<div class="login-view view">
    <VPanel :title="$t('login')">
        <VInput ref="passwordInput" inputType="password" :placeholder="$t('placeholder.pleaseInputPassword')" />
        <VButton :btnLabel="$t('login')" btnSize="large" @btnClick="handleClickLogin" />
    </VPanel>
</div>

</template>

<script>

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

            this.$router.push("InfoList");
        }
    }
}

</script>

<style lang="scss" scoped>

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