<template>
  <div class="groupSelect">
    <v-item-group>
      <v-container>
        <v-row>
          <v-col>
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="60"
                @click="toggle"
              >
                <div class="flex-grow-1 text-center">
                  <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <div color="primary" dark v-bind="attrs" v-on="on">Open Room</div>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Add A Chat Room</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field v-model="roomName" label="Room Name" required></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="addRoom()">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="btn in allRooms" :key="btn.id" cols="12" md="4">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                v-on:click="roomNameClick(btn.id)"
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="60"
                @click="toggle"
              >
                <div class="flex-grow-1 text-center">{{btn.name}}</div>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const axios = require("axios");
import store from "../store";
import polling from "../mixin/polling"

export default {
  name: "GroupSelect",
  mixins: [polling],
  data() {
    return {
      dialog: false,
      roomName: "",
    };
  },
  beforeDestroy() {
    polling.killTimeouts() 
  },
  mounted() {
    
    polling.killTimeouts() 
    polling.poll(this.fetchGroupList);
  },
  methods: {

    fetchGroupList: function () {
      return axios
        .get("/rooms")
        .then(function (response) {
          store.dispatch("rooms/setRooms", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    roomNameClick(RoomId) {
      axios
        .post(`/rooms/${RoomId}/users`, { userId: this.loggedinUser.id })
        .then(() => {
          this.killTimeouts();
          this.$router.push({ path: `chat/${RoomId}` });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    addRoom: function () {
      axios
        .post("/rooms", { name: this.roomName })
        .then(() => {
          this.fetchGroupList();
          this.dialog = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      allRooms: "rooms/roomList",
      loggedinUser: "rooms/loggedinUser",
    }),
  },
};
</script>

<style scoped>
</style>
