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
          <v-card-title>Update Order</v-card-title>
          <form ref="form" @submit="UpdateOrder">
            <div class="form-group">
              <label for="">Customer select</label>
              <select class="form-control" id="" required v-model="CustomerId">
                <option
                  v-for="Customer in Customers"
                  :key="Customer.id"
                  :value="Customer.id"
                >
                  {{ Customer.FirstName + " " + Customer.LastName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Product select</label>
              <select class="form-control" id=""  v-model="ProductId">
                <option
                  v-for="Product in Products"
                  :key="Product.id"
                  :value="Product.id"
                >
                  {{ Product.ProductName }}
                </option>
              </select>
            </div>
            <div class="form-group ma-4">
              <label for="">Unit Price</label>
              <input
                disabled
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
            <button type="submit" class="btn btn-success my_button ma-4">
              Create Order
            </button>
          </form>

          <table class="table table-striped mt-4">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Prdouct Name</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="order.ProductName+order.ProductId" v-for="order in ListProducts" :key="order.id">
                <th scope="row">{{ order.id }}</th>
                <td>{{ order.ProductName }}</td>
                <td>{{ order.UnitPrice }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    :value="order.Quantity"
                    :class="order.ProductName"
                    disabled
                    step="1"
                  />
                  <button
                    class="btn btn-success sm mx-2"
                    @click="Increase(order)"
                  >
                    +
                  </button>
                  <button
                    class="btn btn-success sm mx-2"
                    @click="Decrease(order)"
                  >
                    -
                  </button>
                </td>

                <td>
                  <button
                    class="btn btn-danger"
                    @click="DeleteProduct(order.ProductId)"
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          Total Amount:
          <div class="TotalAmount">{{ TotalAmount }}</div>
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
  name: "ListOrders",
  components: {
    navbar: NavBar,
  },
  data: () => ({
    select: "",
    ProductName: "",
    UnitPrice: "",
    Customers: "",
    Products: "",
    CustomerId: "",
    ProductId: "",
    ListProducts: [],
    TotalAmount: 0.0,
  }),

  async beforeCreate() {
    await axios
      .get(process.env.VUE_APP_ROOT_API + "Orders/getCustomersAndProducts")
      .then((response) => {
        {
          this.Customers = response.data.Customers;
          this.Products = response.data.products;
        }
      });

      await axios
      .get(process.env.VUE_APP_ROOT_API + "Orders/getOrderItems/"+this.$route.params.id)
      .then((response) => {
        {
          console.log(response.data)
          console.log("date"+response.data[0])
          console.log(response.data.data[0].CustomerId)
          this.CustomerId = response.data.data[0].CustomerId;
          this.TotalAmount = response.data.data[0].TotalAmount;
          // this.ListProducts = response.data.data[0].order_items;
          console.log(response.data.data[0].order_items)
          
                for(let i=0; i<response.data.data[0].order_items.length; i++)
      {
              for(let j=0; j<this.Products.length; j++)
      {
        if(response.data.data[0].order_items[i].ProductId == this.Products[j].id)
        {
          console.log("qua"+response.data.data[0].order_items[i].Quantity);
          this.ListProducts.push(this.Products[j]);
          this.ListProducts[i].Quantity = response.data.data[0].order_items[i].Quantity;

       console.log(this.Products[j]);
        }
      //  this.ListProducts[i].ProductName = this.Products[j].ProductName;
      //   this.ListProducts[i].id = this.Products[j].ProductName;
        
      }
      }
          
        }
      });
  },

  watch: {
    // Creating function
    // for input component
    ProductId: function () {
      this.Products.forEach((e) => {
        if (e.id == this.ProductId) {
          this.UnitPrice = e.UnitPrice;
          e.Quantity = 1;
          if (!this.ListProducts.includes(e)) {
            this.ListProducts.push(e);
            this.TotalAmount = parseFloat(this.TotalAmount) + parseFloat(e.UnitPrice);
          }
        }
      });
    },

    // ListProducts: function () {

    //   this.ListProducts.forEach((e) => {
    //     this.TotalAmount = this.TotalAmount + parseFloat(e.UnitPrice);
    //   });
    // },
    inc: function () {
      this.TotalAmount = 0;
      this.ListProducts.forEach((e) => {
        this.TotalAmount =
          (parseFloat(this.TotalAmount) + parseFloat(e.UnitPrice)) * e.Quantity;
      });
    },
  },

  methods: {
    Increase: function (e) {
      for (let i = 0; i < this.ListProducts.length; i++) {
        if (this.ListProducts[i].id == e.id) {
          document.getElementsByClassName(
            this.ListProducts[i].ProductName
          )[0].value = this.ListProducts[i].Quantity + 1;
          this.ListProducts[i].Quantity = this.ListProducts[i].Quantity + 1;

          this.TotalAmount =
            parseFloat(this.TotalAmount) + parseFloat(this.ListProducts[i].UnitPrice);

          document.getElementsByClassName("TotalAmount")[0].innerHTML =
            this.TotalAmount;
        }
      }
    },
    Decrease: function (e) {
      for (let i = 0; i < this.ListProducts.length; i++) {
        if (this.ListProducts[i].id == e.id) {
          document.getElementsByClassName(
            this.ListProducts[i].ProductName
          )[0].value = this.ListProducts[i].Quantity + 1;
          this.ListProducts[i].Quantity = this.ListProducts[i].Quantity - 1;
          this.TotalAmount =
            parseFloat(this.TotalAmount) - parseFloat(this.ListProducts[i].UnitPrice);

          // document.getElementsByClassName("TotalAmount")[0].innerHTML ='';
          document.getElementsByClassName("TotalAmount")[0].innerHTML =
            this.TotalAmount;
        }
      }
    },

DeleteProduct: function (e) {
      
      console.log("del"+e)
      for (let i = 0; i < this.ListProducts.length; i++) {
        
        if (this.ListProducts[i].ProductId == e) {
          
          this.TotalAmount = this.TotalAmount - parseFloat(this.ListProducts[i].UnitPrice);
          var tr = document.getElementsByClassName(this.ListProducts[i].ProductName+this.ListProducts[i].ProductId)[0];
          tr.parentNode.removeChild(tr);
          this.ListProducts.splice(i,1);
          
        }
      }
      console.log("hahah"+this.ListProducts)
    },

    UpdateOrder(e) {
      e.preventDefault();
      console.log(this.ListProducts)
      for(let i=0; i<this.ListProducts.length; i++)
      {
        delete this.ListProducts[i].ProductName;
        this.ListProducts[i].ProductId = this.ListProducts[i].id;
        delete this.ListProducts[i].id;
      }
      axios
        .post(process.env.VUE_APP_ROOT_API + "Orders/UpdateOrder", {
          OrderId: this.$route.params.id,
          TotalAmount: this.TotalAmount,
          CustomerId: this.CustomerId,
          Products: this.ListProducts,
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
            }, 40000);
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
