<template>
    <div class="info-detail-expand">
        <h6>{{detailItem.name}}</h6>
        <p>{{detailItem.content}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            detailItem: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style scoped lang="scss">
@import "../assets/css/variable.scss";

h6 {
    font-size: 1.4rem;
    margin: 0;
    padding: 0;
    color: map-get($color, secondary);
}

p {
    line-height: 1.5em;
    margin: 0;
}
</style>