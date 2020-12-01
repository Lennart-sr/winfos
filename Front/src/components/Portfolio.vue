<template>
  <div class="viewPortf">
    <h1>PORTFOLIO</h1>
    <div class="content" v-if="user.images.others[0]">
      <div v-for="(image, key) in user.images.others" :key="key">
        <img :src="image.link" @click="showImage">
      </div>
    </div>
    <div class="noContent" v-else>
      <span>Opss.. parece que não tem nada para ver aqui.</span>
    </div>
    <div
      class="imagesView"
      v-show="imageView"
      @click="hideImage"
    >
      <img src="" id="imageView" />
      <ul>
        <li v-for="(image, key) in user.images.others" :key="key">
          <img :src="image.link" @click="showImage" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "Portfolio",
  data() {
    return {
      imageView: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
  showImage({ target }) {
      const view = document.querySelector("#imageView");
      view.src = target.src;
      this.imageView = true;
      document.querySelectorAll("img").forEach(el => {
        if(el.src === target.src && el !== view){
          el.style.border = "2px solid #2d72f7";
        }else{
          el.style.border = "";
        }
      })
    },
    hideImage({ target, currentTarget }) {
      if (target === currentTarget) {
        this.imageView = false;
        document.querySelectorAll("img").forEach(el => el.style.border = "")
      }
    }
  },
  created(){
    this.user.images.others.reverse()
  }
};
</script>

<style scoped>

.noContent {
  padding: 10px;
}

.noContent span {
  font-size: 13px;
}

.viewPortf h1 {
  font-weight: normal;
  font-size: 14px;
  padding-top: 0;
  padding-bottom: 0;
}

.content {
  column-count: 2;
  column-gap: 10px;
}

.content div {
  padding: 4px 0 4px 0;
  cursor: pointer;
}

.content img {
	width: -moz-available;
	border-radius: 2px;
	max-width: 100%;
}

.content div:hover {
  scale: 1.03;
  transition: all .2s ease-in-out;
}

.imagesView{
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	display: grid;
	align-content: center;
	justify-content: center;
	background-color: #2b2b2b9e;
	overflow: hidden;
}

#imageView {
	width: 100%;
	border-radius: 5px;
	max-width: calc(100vw - 50px);
	max-height: 75vh;
	justify-self: center;
}

.imagesView ul {
	padding: 10px;
	padding-top: 25px;
	display: flex;
	gap: 10px;
	overflow-x: auto;
	overflow-y: hidden;
	justify-content: center;
	position: relative;
	z-index: 0;
	align-items: center;
}

.imagesView ul img {
	width: 100px;
	border-radius: 5px;
}


@media (max-width: 724px) {

  .imagesView ul {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: space-between;
    scrollbar-width: none;
  }

  #imageView {
    max-width: calc(100vw - 30px);
    max-height: 42vh;
    justify-self: center;
  }

}

</style>