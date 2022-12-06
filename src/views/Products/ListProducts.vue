<template>
  <v-app>
    <navbar></navbar>
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">ProductName</th>
          <th scope="col">CompanyName</th>
          <th scope="col">UnitPrice</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in ListProducts.data" :key="product.id">
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.ProductName }}</td>
          <td>{{ product.supplier.CompanyName }}</td>
          <td>{{ product.UnitPrice }}</td>
          <td>
            <router-link :to="'/Products/UpdateProductpage/' + product.id">
              <button class="btn btn-warning">update</button>
            </router-link>
          </td>
          <td>
            <button class="btn btn-danger" @click="DeleteProduct(product.id)">
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center">
      <router-link to="/Products/CreateProductpage">
        <button type="button" class="btn btn-outline-success">
          Create Product
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
  name: "ListProducts",
  components: {
    navbar: NavBar,
  },

  data: () => ({
    drawer: null,
    ListProducts: "",
  }),
  async beforeCreate() {
    await axios
      .get(process.env.VUE_APP_ROOT_API+"Products/getListProducts")
      .then((response) => {
        {
          this.ListProducts = response.data;
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
