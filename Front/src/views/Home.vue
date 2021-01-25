<template>
  <main>
    <router-link to="/dashboard">
      Dashboard
    </router-link>
    <ul>
      <li v-for="user in users" :key="user.link" :data-link="user.link" @click="viewUser">
        <div>
          <span>{{user.title || '???'}}</span>
          <small>{{user.subtitle || '??'}}</small>
        </div>
        <img
          :src="
            user.images.profile.link
              ? user.images.profile.link
              : 'https://i.imgur.com/ML0d8lb.png'
          "
        />
      </li>
    </ul>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['users', 'user'])
  },
  methods: {
    viewUser({ target: { dataset: { link } } }){
      this.UPDATE_USER(this.users.filter(r => r.link === link)[0]);
      
      if(this.user.link)
        this.$router.push(`/${link}`);
    },
    ...mapMutations(['UPDATE_USER'])
  }
}
</script>
<style scoped>

a {
	padding: 5px;
	border-radius: 0 5px;
	border: 0;
	color: white;
	background-color: var(--background-primary);
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: smaller;
}

main {
	display: grid;
	justify-content: center;
	padding-top: 50px;
}

ul {
	display: grid;
	grid-template-columns: repeat(3, auto);
	gap: 20px;
}

li {
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 10px #cccacae3;
	border-radius: 20px;
	overflow: hidden;
	cursor: pointer;
	margin-bottom: 20px;
	min-width: 150px;
	max-height: 200px;
	min-height: 150px;
	height: min-content;
}

li:hover {
  scale: 1.03;
  transition: all .2s ease-in-out;
}

div, span, img, small {
  pointer-events: none;
}

li > div {
	position: absolute;
	display: grid;
	z-index: 3;
	text-align: center;
}

li span {
	font-size: 1rem;
	font-weight: bold;
}

li small {
	font-size: smaller;
}

li img {
	filter: blur(5px);
	width: 15vw;
}

@media (max-width: 724px){
  ul {
    grid-template-columns: repeat(2, auto);
  }
}
</style>