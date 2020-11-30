<template>
  <router-view v-if="loaded"/>
  <div v-else>
    <ul class="loading">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data(){
    return {
      loaded: false
    }
  },
  methods: {
    getUsers() {
      axios
        .post("/users", { key: "A RANDOM SECRET KEY" })
        .then((res) => {
          this.$store.state.users = res.data;
          this.loaded = true;
        })
    },
  },
  created() {
    this.getUsers()
  },
};
</script>
<style>
:root {
  --text-normal: #dcddde;
  --text-default: hsla(0, 0%, 100%, 0.8);
  --boxshadow-primary: 5px 5px 40px rgba(54, 57, 63, 0.5);
  --default-shadow: 0 10px 30px #e4e4e4e3;
  --text-link: #00b0f4;
  --button-fill: #7289da;
  --background-primary: rgb(21, 22, 23);
  --background-secondary: #fff;
}

* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style-type: none;
  font-family: Comfortaa;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #e3e3e3 #fff0;
}

body {
  height: 100vh;
  background-color: var(--background-tertiary);
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1.3;
  margin-bottom: 5px;
  color: #323032;
  font-weight: 400;
}
h1,
h2,
h3,
span {
  font-size: medium;
}

small,
p {
  color: var(--interactive-normal);
}

i.fas {
  color: var(--text-link);
}

label,
button {
  cursor: pointer;
}

.alert {
	display: block;
	color: red;
	font-size: 13px;
}

.loading {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  margin: 0;
  padding: 0;
}
.loading li {
  list-style: none;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  animation: ani 1.6s ease-in-out infinite;
}

.loading li {
  background: #2b2b2b;
}

.loading li:nth-child(1){
  animation-delay: -1.4s;
}

.loading li:nth-child(2){
  animation-delay: -1.2s;
}

.loading li:nth-child(3){
  animation-delay: -1s;
}

.loading li:nth-child(4){
  animation-delay: -0.8s;
}

@keyframes ani {
  0%, 40%, 100% {
    transform: scale(0.2);
  }
  20% {
    transform: scale(0.6);
  }
}

.v-enter,
.v-leave-to {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
