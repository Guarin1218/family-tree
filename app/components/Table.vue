<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:[`item.edit`]="{ item }">
      <v-btn color="success" @click="editItem(item)">Editar</v-btn>
    </template>
    <template v-slot:[`item.delete`]="{ item }">
      <v-btn color="warning" @click="deleteItem(item.id)">Eliminar</v-btn>
    </template>
    <template v-slot:[`item.show`]="{ item }">
      <nuxt-link :to="{name:'tree',params:{id:item.id,name:item.name}}">Ver árbol</nuxt-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Nombre", value: "name" },
        { text: "Madre", value: "idM" },
        { text: "Padre", value: "idP" },
        { text: "Editar", value: "edit" },
        { text: "Eliminar", value: "delete" },
        { text: "Árbol Familiar", value: "show" },
      ],
    };
  },
  computed: {
    users() {
      return this.$store.state.users.data;
    },
  },
  async fetch() {
    this.$store.commit(
      "users/storeData",
      (await this.$axios.get("http://localhost:8080/users/")).data
    );
  },
  methods: {
    async deleteItem(id) {
      if (!this.showAlert()) {
        return;
      }
      await this.$axios.delete("http://localhost:8080/users/" + id);
      this.$store.commit(
        "users/storeData",
        (await this.$axios.get("http://localhost:8080/users/")).data
      );
    },
    async editItem(user) {
      this.$store.commit("user/storeId", user.id);
      this.$store.commit("user/storeName", user.name);
      this.$store.commit("user/storeIdM", user.idM);
      this.$store.commit("user/storeIdP", user.idP);
    },
    async showTree(user){
      console.log(user)
    },
    showAlert() {
      var option = confirm(
        "¿Está seguro que desea eliminar este familiar?. Podría dañar las conexiones si su familiar era madre o padre."
      );
      if (option) {
        return true;
      } else {
        return false;
      }
    },

  },
};
</script>

<style>
</style>