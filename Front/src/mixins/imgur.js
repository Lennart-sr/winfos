import axios from "axios";

console.log(process.env.VUE_APP_IMGUR_KEY);

export default {
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage, e.target.id);
    },
    createBase64Image(fileObject, id) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
        this.uploadImage(id);
      };
      reader.readAsDataURL(fileObject);
    },
    uploadImage(id) {
      const { image } = this;
      let config = {
        method: "post",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: process.env.VUE_APP_IMGUR_KEY,
        },
        data: {
          image: image.replace(/.*,/, ""),
        },
      };

      axios(config)
        .then((res) => {
          const { deletehash, link } = res.data.data;

          if(id == "others"){
            this.user.images.others.push({
              link,
              delete: deletehash,
            });
          }else{
            const { hash } = document.querySelector(`#h-${id}`).dataset;
            if (hash) this.deleteImage(hash);

            this.user.images[id] = {
              link,
              delete: deletehash,
            };
          }

          this.updateUser();
        })
    },
    deleteImage(hash) {
      let config = {
        method: "delete",
        url: `https://api.imgur.com/3/image/${hash}`,
        headers: {
          Authorization: process.env.VUE_APP_IMGUR_KEY,
        },
      };
      axios(config)
      .then(() => {
        const index = this.user.images.others.findIndex(r => r.delete == hash);
        if(index >= 0){
          this.user.images.others.splice(index, 1)
          this.updateUser()
        }
      })
    }
  }
}