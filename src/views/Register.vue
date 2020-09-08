<template>
  <v-card class="mx-auto" max-width="500" style="margin-top: 50px">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
      <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Name"
              placeholder="chat name"
            ></v-text-field>
            <span
              class="caption grey--text text--darken-1"
            >This is the Name you will use to login to your chat</span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <div class="pa-4 text-center">
            <v-img class="mb-4" contain height="128" src="@/assets/puppy.jpg"></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to the Chat Board</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" depressed @click="nextStepLogic">Next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const axios = require("axios");
import store from "../store";

export default {
  name: "Register",
  data: () => ({
    step: 1,
    username: "",
    usernameRules: [(v) => !!v || "Name is required"],
    valid: true,
  }),
  methods: {
    nextStepLogic() {
      this.step++;
      if (this.step === 3) {
        axios
          .post("/users", { name: this.username })
          .then((response) => {
            let username = JSON.parse(response.config.data);
            store.dispatch("rooms/setRegisteredUser", {
              name: username.name,
              id: response.data.userId,
            }).then(() => {
                this.$router.push({ name: "GroupSelect" });
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        default:
          return "Account created";
      }
    },
  },
};
</script>