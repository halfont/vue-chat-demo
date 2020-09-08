<template>
  <v-app>
    <v-main>
      <v-card class="overflow-hidden">
        <v-app-bar  absolute color="white" elevate-on-scroll scroll-target="#scrolling">
          <v-spacer></v-spacer>
          <v-btn icon :to="{ name: 'Register'}">
            <v-icon>mdi-account-voice</v-icon>         
          </v-btn>
          <v-btn icon :to="{ path: '/'}">
            <v-icon>mdi-google-classroom</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-sheet id="scrolling" class="overflow-y-auto" >
          <v-container class="container" fluid>
            <router-view></router-view>
          </v-container>
        </v-sheet>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
.container {
  margin-top:5vh;
  height: 95vh;
}
</style>