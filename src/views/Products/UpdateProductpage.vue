<template>
  <v-app>
    <navbar></navbar>

    <v-container>
      <br />
      <v-row align="center" class="justify-center">
        <v-col
          cols="8"
          sm="12"
          lg="8"
          class="justify-center align-center"
          align="center"
        >
          <v-card-title>Update New Product</v-card-title>
          <form ref="form" @submit="UpdateProduct">
            <div class="form-group ma-4">
              <input
                type="text"
                class="form-control"
                v-model="ProductName"
                required
                placeholder="Product Name"
              />
            </div>
            <div class="form-group ma-4">
              <input
                type="number"
                min="0"
                step="any"
                pattern="[1-9][0-9]{0,4}"
                class="form-control"
                v-model="UnitPrice"
                required
                placeholder="Unit Price"
              />
            </div>

            <div class="form-group">
              <label for="">Supplier select</label>
              <select class="form-control" id="" required v-model="SupplierId">
                <option
                  v-for="Supplier in Suppliers.data"
                  :key="Supplier.id"
                  :value="Supplier.id"
                >
                  {{ Supplier.CompanyName }}
                </option>
              </select>
            </div>

            <button type="submit" class="btn btn-success my_button ma-4">
              Update Product
            </button>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import "../../css/app.css";
import NavBar from "../../components/NavBar.vue";
import axios from "axios";

export default {
  name: "ListProducts",
  components: {
    navbar: NavBar,
  },
  data: () => ({
    rules: [(value) => !!value || "Required."],
    num_rule: [
      (value) => !!value || "Required.",
      (value) => !value || /^[0-9]/.test(value) || "Unit Price must be valid",
    ],
    select: "",
    ProductName: "",
    UnitPrice: "",
    SupplierId: "",
    Suppliers: "",
    Product: "",
  }),

  mounted() {
    this.getProductData();
  },

  async beforeCreate() {},

  methods: {
    async getProductData() {
      await axios
        .get(
          process.env.VUE_APP_ROOT_API+"Products/getProductById/" + this.$route.params.id
        )
        .then((response) => {
          {
            if (response.data.status == true) {
              this.Product = response.data;
              this.ProductName = this.Product.data.ProductName;
              this.SupplierId = this.Product.data.SupplierId;
              this.UnitPrice = this.Product.data.UnitPrice;
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
      await axios
        .get(process.env.VUE_APP_ROOT_API+"Products/getListSuppliers")
        .then((response) => {
          {
            this.Suppliers = response.data;
          }
          console.log(this.Suppliers);
        });
    },

    UpdateProduct(e) {
      e.preventDefault();

      axios
        .post(process.env.VUE_APP_ROOT_API+"Products/UpdateProduct/"+this.$route.params.id, {
          ProductName: this.ProductName,
          UnitPrice: this.UnitPrice,
          SupplierId: this.SupplierId,
        })
        .then((response) => {
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
        })
        .catch(() => {
          // not caught here (earlier)
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "something go wrong",
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
  },
};
</script>
