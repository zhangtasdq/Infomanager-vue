<template>

<div class="panel">
    <div class="panel-header">
        <h2>{{title}}</h2>           
    </div>

    <div class="panel-body">
        <slot></slot>
    </div>
</div>

</template>

<script>

export default {
    name: "v-panel",

    props: {
        title: {
            type: String,
            required: true
        }
    }

}
</script>

<style lang="scss">
@import "../assets/css/variable.scss";

.panel {
    border: 1px solid map-get($color, primary);
    border-radius: 4px;

    .panel-header {
        padding: 0.5rem 0 0.5rem 1rem;
        text-align: left;
        border-bottom: 1px solid map-get($color, primary);
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        color: #fff;
        background-color: map-get($color, primary);

        h2 {
            margin: 0;
            font-size: $title-size;
        }
    }

    .panel-body {
        padding: 1rem;
    }
}

</style>