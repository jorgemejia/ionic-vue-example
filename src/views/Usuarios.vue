<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ folder }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-item>
        <ion-list>
          <ion-item v-for="item in users" @click="showUser(item)" v-bind:key="item.id">
            <ion-label >{{ item.name }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-item>

      <div id="container">
        <strong class="capitalize">Usuarios Page</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, toastController } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { ref, computed, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'Folder',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },

  setup() {
    const route = useRoute();
    const folder = ref(route.params.id || 'Inbox');
    const matchedFolder = computed(() => route.params.id);

    watch(matchedFolder, () => {
      folder.value = matchedFolder.value as string;
    })

    const users3 = [];

    return { folder, users3 }
  },

  data () {
    return {
      users: []
    }
  },

  async created(){
    await this.getUsers();
  },

  methods: {
    async getUsers() {
      const response = await axios.get('http://jsonplaceholder.typicode.com/users').catch(err => { return err; });
      this.users = response.data;
      console.log(response.data);
    },

    showUser(item: any) {
      console.log(item);
      this.openToast(item);
    },

    async openToast(item: any) {
      const toast = await toastController
          .create({
            message: item.name,
            position: 'middle',
            duration: 3000
          })
      return toast.present();
    },
  }
}
</script>

<style scoped>
ion-menu-button {
  color: var(--ion-color-primary);
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
