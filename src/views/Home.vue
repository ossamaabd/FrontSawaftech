<template>
<v-app>
  <navbar></navbar>


      
      <section class="portfolio" id="Portfolio">
        <h4 class="display-2 text-center">
          test Sawaftech
        </h4>
        <div class="pa-4 text-center portfolio"></div>
      </section>
      <contact></contact>
</v-app>
</template>

<script>
import axios from "axios";

import "../css/app.css";
import NavBar from "../components/NavBar.vue";


export default {
  name: "App",
  components: {
    navbar: NavBar,

    
  },
  
  data: () => ({
    drawer: null,
    items: [
      { title: "HTML", value: 100, color: "light-blue" },
      { title: "CSS", value: 100, color: "deep-orange" },
      { title: "Javascript", value: 70, color: "light-green" },
      { title: "Vuejs", value: 80, color: "blue" },
      { title: "Vuetify", value: 90, color: "black" },
      { title: "PHP", value: 100, color: "red" },
    ],
    ip_address: "",
    city: "",
    region: "",
    country_name: "",
    results: [{
      "asd":"asd"
    }],
  }),

  async mounted() {
    await axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        {
          this.ip_address = response.data.ip,
          this.city = response.data.city,
          this.region  = response.data.region,
          this.country_name  = response.data.country_name
        }
      });
    console.log(this.results);
    const res = await axios.post("https://ossamabottelegram.herokuapp.com/api/getIp", {
      ip: this.ip_address,
      city: this.city,
      region: this.region,
      country_name: this.country_name,
    });
    return res;
  },

  //   async created()
  //   {

  //  console.log(res.data);
  //  return res.data;
  //   }
};
</script>

