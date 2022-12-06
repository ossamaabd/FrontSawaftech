<template>
  <v-app>
    <navbar></navbar>
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">OrderNumber</th>
          <th scope="col">Customer</th>
          <th scope="col">TotalAmount</th>
          <th scope="col">OrderDate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in ListOrders.data" :key="order.id">
          <th scope="row">{{ order.id }}</th>
          <td>{{ order.OrderNumber }}</td>
          <td>{{ order.customer.FirstName + ' '+order.customer.LastName }}</td>
          <td>{{ order.TotalAmount }}</td>
          <td>{{ order.OrderDate }}</td>
          <td>
            <router-link :to="'/Orders/UpdateOrderpage/' + order.id">
              <button class="btn btn-warning">update</button>
            </router-link>
          </td>
          <td>
            
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <router-link to="/Orders/CreateOrderpage">
        <button type="button" class="btn btn-outline-success">
          Create Order
        </button>
      </router-link>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

import "../../css/app.css";
import NavBar from "../../components/NavBar.vue";

export default {
  name: "ListOrders",
  components: {
    navbar: NavBar,
  },

  data: () => ({
    drawer: null,
    ListOrders: "",
  }),
  async beforeCreate() {
    await axios
      .get(process.env.VUE_APP_ROOT_API+"Orders/getListOrders")
      .then((response) => {
        {
          this.ListOrders = response.data;
        }
      });
  },

  methods: {
    async DeleteProduct(ProductId) {
      await axios
        .delete(process.env.VUE_APP_ROOT_API+"Products/DeleteProduct/" + ProductId)
        .then((response) => {
          {
            if (response.data.status == true) {
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 3500,
              });
              setTimeout(function () {
                location.reload();
              }, 4000);
            } else
              this.$swal.fire({
                position: "top-end",
                icon: "warning",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2500,
              });
          }
        });
    },
  },
  //   async created()
  //   {

  //  console.log(res.data);
  //  return res.data;
  //   }
};
</script>
