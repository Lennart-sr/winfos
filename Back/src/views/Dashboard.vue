<template>
  <main>
    <div class="logUser" v-if="authenticated && !logged">
      <div>
        <input type="text" v-model="tempUser.user" placeholder="Usuário" />
        <input
          type="password"
          v-model="tempUser.password"
          placeholder="Senha"
        />
      </div>
      <div>
        <button @click="logSendUser()">Logar</button>
        <small @click="authenticated = false">Cadastrar</small>
      </div>
    </div>
    <div class="regUser" v-else-if="!authenticated && !logged">
      <div>
        <input type="text" v-model="tempUser.user" placeholder="Usuário" />
        <input
          type="password"
          v-model="tempUser.password"
          placeholder="Senha"
        />
      </div>
      <div>
        <button @click="regSendUser()">Cadastrar</button>
        <small @click="authenticated = true">Logar</small>
      </div>
    </div>
    <div class="getLink" v-if="logged && !hasLink">
      <div>
        <span>Seu link</span>
        <small>É assim que os usuários vão te encontrar, insira um nome abaixo.</small>
        <small class="link">{{url}}/{{tempUser.link}}</small>
        <input type="text" v-model="tempUser.link" placeholder="Link" />
      </div>
      <button @click="finish()">Finalizar</button>
    </div>
    <Board v-if="logged && hasLink"/>
  </main>
</template>

<script>
import axios from "axios";
import Board from '../components/Board.vue';

export default {
  components: { Board },
  name: "Dashboard",
  data() {
    return {
      tempUser: {
        "user": "",
        "password": "",
        "authorized": true,
        "title": "",
        "link": "",
        "subtitle": "",
        "color": "",
        "infos": {
          "Telefone": "",
          "Email": ""
        },
        "social": {
          "Instagram": "",
          "Twitter": "",
          "Facebook": ""
        },
        "images": {
            "profile": {
              "link": "",
              "delete": ""
            },
            "favicon": {
              "link": "",
              "delete": ""
            },
          "others": []
          }
      },
      authenticated: true,
      logged: false,
      hasLink: false,
      url: location.origin
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    users() {
      return this.$store.state.users;
    },
  },
  methods: {
    sendAlert(msg) {
      const alert = document.createElement('small'),
      inputs = document.querySelectorAll('input');
      alert.classList.add("alert");
      alert.innerText = msg;

      inputs[inputs.length-1].after(alert);
      setTimeout(() => alert.remove(), 10000);
    },
    regSendUser() {
      axios
        .post("/user/register", this.tempUser)
        .then(() => {
          this.authenticated = true;
        })
        .catch((error) => {
          this.sendAlert(error.response.data)
        });
    },
    logSendUser() {
      axios
        .post("/user/auth", this.tempUser)
        .then((res) => {
          this.$store.state.user = res.data;
          this.logged = true;

          if(this.user.link)
            this.hasLink = true;
        })
        .catch((error) => {
          this.sendAlert(error.response.data)
        });
    },
    finish(){
      if(!this.tempUser.link)
        return this.sendAlert("O campo não pode estar vazio.");

      axios
        .post("/actions/update", { link: this.tempUser.link, user: this.tempUser.user })
        .then(() => {
          this.$store.state.user.link = this.tempUser.link;
          this.hasLink = true;
        })
        .catch((error) => {
          this.sendAlert(error.response.data)
        });
    },
  },
  watch: {
    'tempUser.link': function() {
      this.tempUser.link = this.tempUser.link.replace(" ", "-")
    }
  }
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
	height: 100vh;
}

.logUser, .regUser, .getLink {
	width: 300px;
	box-shadow: var(--default-shadow);
	padding: 25px;
	height: 250px;
	justify-self: center;
	align-self: center;
	border-radius: 10px;
	background-color: var(--background-secundary);
	display: grid;
	align-content: center;
}

.logUser input, .regUser input, .getLink input {
	background-color: transparent;
	border: none;
	border-bottom: 1px solid #dbd6d6;
	border-radius: 5px;
	color: var(--background-primary);
	padding: 5px;
}

.logUser input:last-child, .regUser input:last-child {
	margin-bottom: 8px;
}
.logUser div:last-child, .regUser div:last-child {
	position: relative;
	bottom: -20px;
	display: grid;
	gap: 10px;
}

.logUser button, .regUser button, .getLink button{
	padding: 5px;
	border-radius: 0 5px;
	border: 0;
	color: white;
	background-color: var(--background-primary);
	width: 50%;
	justify-self: center;
}

.getLink > div {
	display: grid;
	gap: 10px;
	margin-bottom: 20px;
}

.getLink span {
	font-size: large;
	font-weight: bold;
}

.getLink small {
	font-size: small;
}

.link {
	border: 1px solid #cbcaca;
	border-radius: 14px;
	padding: 3px;
	margin: 10px;
	margin-bottom: 0;
}

@media (max-width: 724px) {
  main {
    padding: 0;
  }
}

</style>