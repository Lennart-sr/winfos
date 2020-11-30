<template>
  <main>
    <div class="viewUser">
      <img :src="user.images.profile.link ? user.images.profile.link : 'https://i.imgur.com/ML0d8lb.png'" :alt="user.title" />
      <h1>{{ user.title }}</h1>
      <small>{{ user.subtitle }}</small>
      <Nav></Nav>
    </div>
    <div class="viewContent">
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </main>
</template>

<script>
import Nav from "@/components/Nav.vue";

function changeFavicon(src) {
  const link = document.createElement("link"),
        oldLink = document.getElementById("dynamic-favicon");
  link.id = "dynamic-favicon";
  link.rel = "shortcut icon";
  link.href = src;
  if (oldLink) document.head.removeChild(oldLink);

  document.head.appendChild(link);
}

export default {
  name: "User",
  components: {
    Nav,
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    checkRoute() {
      if (!this.user.link) {
        this.$store.commit('increment', this.users.filter(
          r => r.link === this.$route.params.user
        )[0]);

        if (!this.user) this.$router.push("/");

        if(this.user.images.favicon.link)
          changeFavicon(this.user.images.favicon.link);

        if(this.user.title)
          document.title = this.user.title;
      }
    },
  },
  created() {
    this.checkRoute();
  },
};
</script>

<style scoped>
main {
  display: grid;
  justify-content: center;
  text-align: center;
  padding: 15vw;
  padding-top: 5vw;
  padding-bottom: 5vw;
}

.viewContent,
.viewUser {
  width: 570px;
  box-shadow: var(--default-shadow);
  padding: 25px;
}

.viewContent {
  border-radius: 5px;
  text-align: left;
}

.viewUser {
  border-radius: 5px;
  padding: 45px 0 0 0 !important;
}

.viewUser img {
  width: 100px;
  margin-bottom: 10px;
}

.viewUser small {
  text-transform: uppercase;
  font-size: 10px;
}

.viewUser h1 {
  font-size: 20px;
}

@media (max-width: 724px) {
  main {
    padding: 0;
  }

  .viewUser {
    padding: 0;
    padding-top: 50px;
  }

  .viewContent,
  .viewUser {
    width: 100vw;
  }
}
</style>
