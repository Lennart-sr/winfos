<template>
  <div class="viewInfos">
    <div class="content">
      <h1>INFORMAÇÕES GERAIS</h1>
    </div>
    <div class="content" v-for="(info, key) in user.infos" :key="key">
      <i :class="searchIcon(key)"></i>
      <div>
        <span>{{ info || 'Não informado.'}}</span>
        <small>{{ key }}</small>
      </div>
    </div>
    <div class="social" v-if="checkInfos('social')">
      <h2>Redes Sociais</h2>
      <a 
        v-for="(info, key) in user.social" 
        :key="key" :href="searchIcon(key)['link']+info"
        :style= "[searchIcon(key)['color'] ? {'background-color': searchIcon(key)['color'] } : {'background-color': 'black'}]"
      >
        <i :class="searchIcon(key)[key]"></i>
      </a>
    </div>
  </div>
</template>

<script>
const icons = [
  {
    Instagram: "fab fa-instagram",
    link: "https://instagram.com/",
    color: "#c72b99"
  },
  { 
    Twitter: "fab fa-twitter",
    link: "https://twitter.com/",
    color: "#4ba3f2"
  },
  { 
    Facebook: "fab fa-facebook",
    link: "https://facebook.com/",
    color: "#2929f8"
  },
  {
    Telefone: "fas fa-phone-alt"
  },
  {
    Email: "fas fa-envelope"
  }
]

export default {
  name: "Infos",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    searchIcon(q){
      return icons.filter(r => r[q])[0];
    },
    checkInfos(i){
      let has = false;
      for(const key in this.user[i]) {
        if(this.user[i][key])
          has = true
      }
      return has
    }
  },
  created(){
    for (const propName in this.user.social) { 
      if (!this.user.social[propName])
        delete this.user.social[propName];
    }
  }
};
</script>

<style scoped>
.viewInfos {
  padding: 75px;
  padding-top: 0;
  padding-bottom: 0;
}

.content {
  padding: 25px 0 25px 0;
  border-bottom: 1px solid #1d1d1d21;
	position: relative;
}

.content h1 {
  font-weight: normal;
  font-size: 14px;
}

.content span {
  margin-bottom: 2px;
  display: block;
  font-size: 15px;
}

.content small {
  font-size: 13px;
  color: #676767;
}

.content i {
	position: absolute;
	top: 30px;
	left: -40px;
	font-size: 20px;
}

.social {
  margin-top: 20px;
}

.social h2 {
  margin-bottom: 20px;
}

.social a {
	color: white;
	border-radius: 100%;
	display: inline-grid;
	width: 43px;
	height: 43px;
	justify-content: center;
	align-items: center;
  margin-right: 10px;
}

.social a:hover {
  scale: 1.1;
  transition: all .2s ease-in-out;
}
.social i {
  font-size: 20px;
}

@media (max-width: 724px) {

.viewInfos {
	padding: 20px;
}

}

</style>