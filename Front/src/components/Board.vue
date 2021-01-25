<template>
  <div class="dashboard">
    <a class="link" :href="url+'/'+user.link" target="_blank">{{url}}/{{user.link}}</a>
    <div class="images">
      <div>
        <div>
          <span>Logotipo</span>
        </div>
        <label for="profile">
          <i class="fas fa-upload"></i>
        </label>
        <img
          :src="
            user.images.profile.link
              ? user.images.profile.link
              : 'https://i.imgur.com/ML0d8lb.png'
          "
          :data-hash="user.images.profile.delete ? user.images.profile.delete : ''"
          id="h-profile"
        />
        <input
          type="file"
          @change="handleImage"
          accept="image/*"
          id="profile"
        />
      </div>
      <div>
        <div>
          <span>Icone</span>
        </div>
        <label for="favicon">
          <i class="fas fa-upload"></i>
        </label>
        <img
          :src="
            user.images.favicon.link
              ? user.images.favicon.link
              : 'https://i.imgur.com/ML0d8lb.png'
          "
          :data-hash="user.images.favicon.delete ? user.images.favicon.delete : ''"
          id="h-favicon"
        />
        <input
          type="file"
          @change="handleImage"
          accept="image/*"
          id="favicon"
        />
      </div>
    </div>
    <span class="title">Suas informações</span>
    <div class="infosContent">
      <div class="infos">
        <div>
          <label for="title">Titulo</label>
          <input type="text" placeholder="Ex.: Leonel Cardoso" id="title" v-model.lazy="tempUser.title">
        </div>
        <div>
          <label for="subtitle">Profissão</label>
          <input type="text" placeholder="Ex.: Programador" id="subtitle" v-model.lazy="tempUser.subtitle">
        </div>
        <div>
          <label for="infos-Telefone">Telefone</label>
          <input type="text" placeholder="Ex.: +55 11 90000-0000" id="infos-Telefone" v-model.lazy="tempUser.infos.Telefone">
        </div>
        <div>
          <label for="infos-Email">Email</label>
          <input type="text" placeholder="Ex.: Leonel@gmail.com" id="infos-Email" v-model.lazy="tempUser.infos.Email">
        </div>
      </div>
      <div class="social">
        <div>
          <label for="social-Instagram">Instagram</label>
          <input type="text" id="social-Instagram" placeholder="@" v-model.lazy="tempUser.social.Instagram">
        </div>
        <div>
          <label for="social-Facebook">Facebook</label>
          <input type="text" id="social-Facebook" v-model.lazy="tempUser.social.Facebook">
        </div>
        <div>
          <label for="social-Twitter">Twitter</label>
          <input type="text" id="social-Twitter" placeholder="@" v-model.lazy="tempUser.social.Twitter">
        </div>
      </div>
    </div>
    <span class="title">Portfolio</span>
    <div class="portfContent">
    <div class="portfList">
      <label for="others">
        <div>
          <i class="fas fa-upload"></i>
          <small>Nova postagem</small>
        </div>
      </label>
      <input
        type="file"
        @change="handleImage"
        accept="image/*"
        id="others"
      />
      <div v-for="(image, key) in user.images.others" :key="key">
        <i class="fas fa-trash" @click="deleteImage(image.delete)"></i>
        <img :src="image.link">
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import fetchUser from "@/mixins/fetchUser.js";
import imgur from "@/mixins/imgur.js";

export default {
  name: "Board",
  mixins: [fetchUser, imgur],
  computed: {
    ...mapState(["user"])
  },
  methods: {
    concat(obj1, obj2) {
    for(const key in obj2) {
        if(!obj2[key] && typeof obj2[key] !== "number") continue
        if(Array.isArray(obj1[key]))
          obj1[key] = obj1[key].concat(obj2[key])

        else if(typeof obj1[key] === "object")
          obj1[key] = this.concat(obj1[key], obj2[key])
        else
          obj1[key] = obj2[key]
      }
    return obj1
    }
  },
  watch: {
    tempUser: {
      handler(){
        this.concat(this.user, this.tempUser);
        const { Instagram, Facebook, Twitter } = this.tempUser.social;
        this.user.social = { Instagram, Facebook, Twitter };
        this.updateUser()
     },
     deep: true
    },
    'tempUser.social.Instagram': function() {
      this.tempUser.social.Instagram = this.tempUser.social.Instagram.replace("@", "")
    },
    'tempUser.social.Twitter': function() {
      this.tempUser.social.Twitter = this.tempUser.social.Twitter.replace("@", "")
    }
  },
  created(){
    this.concat(this.tempUser, this.user)
    if(this.tempUser.images.others)
      this.tempUser.images.others = []
  }
};
</script>

<style scoped>
.dashboard {
	width: 530px;
	box-shadow: var(--default-shadow);
	padding: 25px;
	justify-self: center;
	align-self: center;
	border-radius: 10px;
	background-color: var(--background-secundary);
	display: grid;
	align-content: center;
	justify-content: center;
}

.images {
  display: flex;
  gap: 50px;
}

.images label {
  position: absolute;
  box-shadow: 0 0 15px #7289da9c;
  width: 30px;
  height: 30px;
  padding: 6px;
  margin: 5px;
  border-radius: 5px;
  background-color: var(--button-fill);
}

.images label i {
  font-size: 15px;
  color: white;
}

.images input, #others {
  display: none;
}

.images img {
  width: 200px;
  border-radius: 10px;
}

.images > div > div {
  padding: 15px;
  text-align: left;
}

#h-favicon {
  width: 80px;
}

.infosContent {
	text-align: left;
	display: flex;
	gap: 20px;
	align-items: center;
}
.title {
	margin-top: 20px;
}

.infosContent label {
	font-size: small;
}

.infosContent input {
	display: block;
	padding: 5px;
	border: 0;
	border-radius: 2px;
	border-bottom: 1px solid #e8e8e8;
	margin-top: 5px;
	background-color: #f4f3f39e;
  font-size: small;
}

.infos > div, .social > div {
	margin-top: 12px;
}

.portfList {
	column-count: 2;
	column-gap: 10px;
  padding-top: 20px;
}

.portfList div {
	padding: 4px 0 4px 0;
}

.portfList img {
  width: -moz-available;
  border-radius: 2px;
  max-width: 100%;
}

.fa-trash {
	cursor: pointer;
	position: absolute;
	box-shadow: 0 0 15px #f52d2d8f;
	width: 30px;
	height: 30px;
	padding: 6px;
	margin: 5px;
	border-radius: 5px;
	background-color: #f52d2d;
	color: #f5f2f2;
}

.portfList label {
	background-color: var(--background-primary);
	height: 120px;
	margin-bottom: 8px;
	border-radius: 5px;
	display: grid;
	align-items: center;
	text-align: center;
	box-shadow: 0 0 10px #bebbbb96;
	color: white;
}

.portfList label > div i {
	font-size: 30px;
	margin-bottom: 10px;
  color: white;
}

.portfList label > div small {
  display: block;
}

.link {
	border: 1px solid #cbcaca;
	border-radius: 14px;
	padding: 3px 10px 3px 10px;
	font-size: small;
	width: max-content;
	justify-self: center;
	margin-top: -5px;
	margin-bottom: 20px;
	color: black;
}

@media (max-width: 724px) {
  main {
    padding: 0;
  }

  .dashboard {
    padding: 0;
    padding-top: 50px;
    width: 100vw;
  }

  .infosContent {
    display: grid;
    justify-items: center;
  }

  .portfList {
    padding: 10px;
  }

}

</style>