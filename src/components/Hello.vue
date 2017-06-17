<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <VButton btnLabel="hello world" btnSize="large" @btnClick="handleBtnClick" />
    <VInput ref="input" initValue="zhang" />  
    <VFormGroup ref="formgroup" initValue="zhang" label="world" />
    <VDrawerLayout v-bind:show.sync="showDrawlayout" :expandWidth="400" ref="drawlayout">
        <h1>好好学习，天天向上</h1>
    </VDrawerLayout>
    <VList labelProperty="name" idProperty="id" :datas="datas" @onClickItem="handleClickItem" />
    <VTab :tabs="tabs" :scale="2.5" @onClickItem="handleClickTab" />
    <VNavBar title="hello">
         <VButton btnLabel="hello" btnSize="large" @btnClick="handleBtnClick" slot="left" />
         <VButton btnLabel="world" btnSize="large" @btnClick="handleBtnClick" slot="right" />
    </VNavBar>
    <!--
    <VLoading :isShow="isShowLoading" :scale="4" />
    -->
    <VDialog :isShow="isShowDialog">
        <h1>hello world</h1>
    </VDialog>

    <VPanel title="hello" style="margin-top: 1em;">
      <h2>好好学习，天天向上</h2>
    </VPanel> 
  </div>
</template>

<script>
import VButton from "./Button";
import VInput from "./Input";
import VFormGroup from "./FormGroup";
import VDrawerLayout from "./DrawerLayout";
import VList from "./List";
import VTab from "./Tab";
import VNavBar from "./NavBar";
import VLoading from "./Loading";
import VDialog from "./Dialog";
import VPanel from "./Panel"

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showDrawlayout: false,
      isShowLoading: true,
      isShowDialog: false,
      datas: [
        {
          id: "1",
          name: "z"
        },
        {
          id: "2",
          name: "t"
        }
      ],

      tabs: [
        {
          id: 1,
          icon: "cloud-upload"
        },
        {
          id: 2,
          icon: "cloud-download"
        },
        {
          id: 3,
          icon: "plus"
        }
      ]
    }
  },
  components: {
    VButton,
    VInput,
    VFormGroup,
    VDrawerLayout,
    VList,
    VTab,
    VNavBar,
    VLoading,
    VDialog,
    VPanel
  },

  methods: {
    handleBtnClick: function() {
    },

    handleClickItem: function(data) {
    },

    handleClickTab: function(id) {
      console.log(id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
