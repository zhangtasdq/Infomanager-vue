<script>

import VListItem from "./ListItem";

export default {
    name: "v-list",
    props: {
        labelProperty: {
            type: String
        },

        idProperty: {
            type: String
        },

        datas: {
            type: Array,
            required: true
        },
        renderItem: {
            type: Function
        },        
        activeItem: null,
    },

    components: {
        VListItem
    },

    methods: {
        handleClickItem: function(id) {
            this.$emit("onClickItem", id);
        },

        renderDefaultItem: function(createElement) {
            return this.datas.map((item, index) => {
                return createElement(VListItem, {
                    key: this.idProperty ? item[this.idProperty] : index,
                    props: {
                        label: this.labelProperty ? item[this.labelProperty] : item,
                        id: this.idProperty ? item[this.idProperty] : index,
                        isActive: this.activeItem === item
                    },
                    on: {
                        onClickItem: this.handleClickItem
                    }
                });
            })
        },

        getRenderContent: function(createElement) {
            if (this.renderItem) {
                return this.datas.map((item, index) => {
                    return this.renderItem(item, index, createElement, this);
                });
            } else {
                return this.renderDefaultItem(createElement);
            }
        }
    },

    render: function(createElement) {
        let item = createElement("ul", {
            attrs: {
                "class": "list"
            }
        }, this.getRenderContent(createElement));
        return item;
    }
};

</script>

<style lang="scss" scoped>

.list {
    padding: 0;
    margin: 0;
}

</style>