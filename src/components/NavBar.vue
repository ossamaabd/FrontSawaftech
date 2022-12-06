<template>
        <v-app-bar class="grey lighten-2 my_nav" app elevation="0">
            <v-subheader class="" ><h1 color="#01ff56"> sawaftech</h1></v-subheader>
            
            <v-tabs center-active right background-color="transparent" active-class="active-tab black--text">
                <v-tab class="" to="/Products/ListProducts">List Products</v-tab>
                <v-tab lass="tab" to="/Products/CreateProductpage">Create Product page</v-tab>
                
                
                <v-tab class="tab" to="/Orders/ListOrders">List Orders</v-tab>
            </v-tabs>
            <v-btn @click="switchToDarkMode"  fab small><v-icon size="25">{{darkMode}}</v-icon></v-btn>
        </v-app-bar>
</template>

<script>
  export default {
    name: 'NavBar',

    data: () => ({

      darkMode:"mdi-white-balance-sunny",
    }),

  methods:{
    switchToDarkMode()
    {
      if(this.darkMode == "mdi-moon-waning-crescent")
      this.darkMode = "mdi-white-balance-sunny";
      else
      this.darkMode = "mdi-moon-waning-crescent";
      this.$vuetify.theme.dark =! this.$vuetify.theme.dark;
    }
  },
  }
</script>

<style>
.tab:hover{
  color: rgb(70, 167, 206);
  border-radius: 30%;
}

.my_nav{
  animation: mynav 3s ease-in-out;
}

@keyframes mynav {
  0%{
    transform: translateY(-100%);
  }
  100%{
    transform: translateY(0);
  }
}
</style>
