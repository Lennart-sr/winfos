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
        <button @click="getUser()">Logar</button>
        <small>Cadastrar</small>
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
        <button @click="createUser()">Cadastrar</button>
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
import { mapState } from "vuex";
import Board from '../components/Board.vue';
import fetchUser from "@/mixins/fetchUser.js";

export default {
  components: { Board },
  name: "Dashboard",
  mixins: [fetchUser],
  computed: {
    ...mapState(['user'])
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