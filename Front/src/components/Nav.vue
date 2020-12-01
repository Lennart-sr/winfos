<template>
  <nav>
    <router-link :to="{ path: `/${user.link}`}">
      <i class="fas fa-house-user"></i>
      <small>Inicio</small>
    </router-link>
    <router-link :to="{ path: `/${user.link}/portfolio`}" v-if="user.images.others[0]">
      <i class="fas fa-archive"></i>
      <small>Portfolio</small>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  computed: {
    user(){
      return this.$store.state.user
    },
  }
}
</script>

<style scoped>

nav a:hover {
	background-color: #eee;
}

.active i, .active small {
  color: var(--text-link)
}

nav small, nav i {
  color: var(--background-primary);
  text-decoration: none;
}

nav {
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-around;
	align-items: center;
  margin-top: 25px;
}

nav a {
	width: -moz-available;
	height: inherit;
	padding: 10px;
	display: grid;
}

nav i {
	font-size: 18px;
	margin-bottom: 5px;
}

nav small {
  text-transform: uppercase;
  font-size: 9px;
}

</style>