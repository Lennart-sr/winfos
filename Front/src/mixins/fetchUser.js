import axios from "axios";
import { mapMutations, mapState } from "vuex";
import sendAlert from "./sendAlert";

export default {
  data() {
    return {
      tempUser: {
        "user": "",
        "password": "",
        "authorized": false,
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
      loaded: false,
      hasLink: false,
      url: location.origin
    }
  },
  mixins: [sendAlert],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    getUser(){
      axios.get("http://localhost:9000/actions/auth", {
        params: {
          user: this.tempUser.user,
          password: this.tempUser.password
        }
      })
      .then((res) => {
        this.UPDATE_USER(res.data);
        this.logged = true;

        if(this.user.link)
          this.hasLink = true;
      })
      .catch((error) => {
        this.sendAlert(error.response.data)
      });
    },
    updateUser() {
      axios
        .put("http://localhost:9000/user", this.user)
    },
    createUser(){
      axios.post('http://localhost:9000/user', this.tempUser)
      .then(() => {
        this.authenticated = true;
      })
      .catch((error) => {
        this.sendAlert(error.response.data)
      });
    },
    getUsers(){
      axios.get('http://localhost:9000/actions/users')
      .then(res => {
        this.UPDATE_USERS(res.data)
        this.loaded = true;
      })
    },
    finish(){
      if(!this.tempUser.link)
        return this.sendAlert("O campo não pode estar vazio.");

      axios
        .put("http://localhost:9000/user", { link: this.tempUser.link, user: this.tempUser.user })
        .then(() => {
          this.user.link = this.tempUser.link;
          this.hasLink = true;
        })
        .catch((error) => {
          this.sendAlert(error.response.data)
        });
    },
    ...mapMutations(['UPDATE_USER', 'UPDATE_USERS'])
  }
}