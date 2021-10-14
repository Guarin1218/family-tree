<template>
  <v-form>
    <br />
    <h2>Agregar familiar</h2>

    <v-text-field v-model="name" label="Nombre"> </v-text-field>

    <div class="form-group">
      <label for="m">Madre</label>
      <select name="m" class="select" v-model="idM">
        <option value="0">No posee</option>
        <option
          v-for="option in options"
          :key="option.id"
          v-bind:value="option.id"
        >
          {{ option.id }} - {{ option.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="p">Padre</label>
      <select name="p" class="select" v-model="idP">
        <option value="0">No posee</option>

        <option
          v-for="option in options"
          :key="option.id"
          v-bind:value="option.id"
        >
          {{ option.id }} - {{ option.name }}
        </option>
      </select>
    </div>

    <v-btn @click="submit({ id, name, idM, idP })">{{
      id ? "Editar" : "Guardar"
    }}</v-btn>
    <v-btn
      v-if="id || name || idM || idP"
      @click="restForm({ id: 0, name: '', idM: 0, idP: 0 })"
      >Cancelar</v-btn
    >
  </v-form>
</template>

<script>
export default {
  computed: {
    id: {
      get() {
        return this.$store.state.user.id;
      },
      set(value) {
        this.$store.commit("user/storeId", value);
      },
    },
    name: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.$store.commit("user/storeName", value);
      },
    },
    idM: {
      get() {
        return this.$store.state.user.idM;
      },
      set(value) {
        this.$store.commit("user/storeIdM", value);
      },
    },
    idP: {
      get() {
        return this.$store.state.user.idP;
      },
      set(value) {
        this.$store.commit("user/storeIdP", value);
      },
    },
    options: {
      get() {
        return this.$store.state.users.data;
      },
    },
  },
  methods: {
    async submit(user) {
      if (!this.validateForm()) {
        return;
      }
      if (user.id) {
        await this.$axios.put("http://localhost:8080/users/" + user.id, user);
      } else {
        await this.$axios.post("http://localhost:8080/users/", user);
      }
      await this.restForm({ id: 0, name: "", idM: 0, idP: 0 });
      this.$store.commit(
        "users/storeData",
        (await this.$axios.get("http://localhost:8080/users/")).data
      );
    },
    restForm(user) {
      this.$store.commit("user/storeId", user.id);
      this.$store.commit("user/storeName", user.name);
      this.$store.commit("user/storeIdM", user.idM);
      this.$store.commit("user/storeIdP", user.idP);
    },
    validateForm() {
      if (!this.name) {
        alert("El nombre no puede estar vacío.");
        return false;
      }
      if (this.idM || this.idP) {
        if (this.idM == this.idP) {
          alert(
            "El padre y la madre no pueden ser los mismos. Seleccione otro"
          );
          return false;
        }
      }
      if (this.id == this.idM && this.id!=0 || this.id == this.idP && this.id!=0) {
        alert(
          "No puede poner la persona como madre o padre, porque no puede ser madre o padre de él mismo."
        );
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.select {
  width: 100%;
  height: 32px;
  border-bottom: 1px solid black;
  color: rgba(0, 0, 0, 0.87);
}
.form-group {
  padding-top: 5px;
  padding-bottom: 20px;
}
label {
  font-weight: bold;
}
</style>