<template>
  <div class="chatRoom">
    <v-navigation-drawer :permanent="true" absolute dark fixed :width="150">
      <v-list dense nav>
        <v-list-item two-line>
          
          <v-list-item-content >
            
            <v-list-item-title class="d-flex justify-center titleText" ><h1>{{roomList[roomNum].name}}</h1></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        
        <v-list-item v-for="item in usersInRoom" :key="item.id" link>
          <v-list-item-content v-if="allUsersList[item]">
            <v-list-item-title class="d-flex justify-center">{{ allUsersList[item].name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-list>
      <v-list-item-group>
        <v-list id="listOfText" class="overflow-y-auto" style="max-height: 85vh;" two-line>
          <template v-for="(item, index) in chatData[this.$router.currentRoute.params.roomId]">
            <v-list-item :key="index">
              <v-list-item-avatar>
                <img src="@/assets/puppy.jpg" />
              </v-list-item-avatar>
              <v-list-item-content v-if="allUsersList[item.userId]">
                <v-list-item-title v-html="allUsersList[item.userId].name"></v-list-item-title>
                <v-list-item-subtitle v-html="item.text"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-list-item-group>
    </v-list>

    <v-footer style="height: 10vh;" dark fixed>
      <v-row justify="center" no-gutters>
        <form @submit.prevent="onSubmit">
          <v-text-field
            v-model="message"
            style=" display: inline-block;"
            label="Message"
            on:submit.prevent="onSubmit"
          ></v-text-field>
          <v-btn
            type="submit"
            class="ma-2"
            style=" display: inline-block;"
            outlined
            color="white"
          >Send</v-btn>
        </form>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const axios = require("axios");
import store from "../store";
import polling from "../mixin/polling"

export default {
  name: "ChatRoom",
  mixins: [polling],
  data() {
    return {
      message: "",
      roomNum: this.$router.currentRoute.params.roomId,
      usersInRoom: [],
    };
  },
  beforeDestroy() {
    this.killTimeouts();
  },
  mounted() {
    this.killTimeouts();
    this.poll(this.getChatText);
    this.poll(this.getUserList);
    this.poll(this.getAllUsers);
  },
  methods: {

    scrollToEnd: function () {
      var container = this.$el.querySelector("#listOfText");
      container.scrollTop = container.scrollHeight;
    },
    onSubmit() {
      if (this.message !== "") {
        return axios
          .post(`/rooms/${this.roomNum}/text`, {
            text: this.message,
            userId: this.loggedinUser.id,
          })
          .then(() => {
            this.getChatText();
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    getChatText() {
      return axios
        .get(`/rooms/${this.roomNum}/text`)
        .then((response) => {
          let rId = this.$router.currentRoute.params.roomId;
          let chatData = [];
          chatData[rId] = response.data.text;
          store.dispatch("rooms/setChatData", chatData);
          this.$nextTick(function () {
            this.scrollToEnd();
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getUserList() {
      return axios
        .get(`/rooms/${this.roomNum}/users`)
        .then((response) => {
          this.usersInRoom = new Set(response.data.users);
          store.dispatch("rooms/setUsers", response.data.users);
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    getAllUsers() {
      return axios
        .get(`/users`)
        .then((response) => {
          store.dispatch("rooms/setAllUsers", response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters({
      chatData: "rooms/chatData",
      usersList: "rooms/usersList",
      roomList: "rooms/roomList",
      allUsersList: "rooms/allUsersList",
      loggedinUser: "rooms/loggedinUser",
    }),
  },
};
</script>

<style scoped>
.chatRoom {
  margin-left: 150px;
  height: 90vh;
}
.titleText{
   font-family: "Times New Roman", Times, serif;
   font-weight: bold;
}



</style>
