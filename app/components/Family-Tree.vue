<template>
  <v-form>
    <h1>Generar mi árbol familiar!</h1>

    <v-btn id="btn" @click="getFamilyTree()">Generar</v-btn>

    <div class="family-tree">
      <ul>
        <li>
          <a id="me">Yo</a>
          <ul id="family"></ul>
        </li>
      </ul>
    </div>
  </v-form>
</template>

<script>
export default {
  computed: {
    id: {
      get() {
        return this.$store.state.user.id;
      },
    },
    count: {
      get() {
        return (
          this.$store.state.count.count + this.$store.state.users.data.length
        );
      },
      set(value) {
        this.$store.commit("count/storeCount", value);
      },
    },
    options: {
      get() {
        return this.$store.state.users.data;
      },
    },
    name: {
      get() {
        return this.options[0].name;
      },
    },   
  },
  async fetch() {
    this.$store.commit(
      "users/storeData",
      (await this.$axios.get("http://localhost:8080/users/")).data
    );
  },

  methods: {
    getFamilyTree() {
      this.findId(this.options[0].id);    
      document.getElementById('btn').disabled=true; 
    },
    findId(id) {
      if (!id) {
        return;
      }
      let user = this.options.find((x) => x.id === id);
      let mom = this.options.find((x) => x.id === user?.idM);
      let dad = this.options.find((x) => x.id === user?.idP);

      if (this.count == 0) {
        document.getElementById("me").innerHTML += "<p>" + user?.name + "</p>";
      }

      this.generateTree(user, mom, dad);
      this.count++;

      return this.findId(user?.idM) || this.findId(user?.idP);
    },

    generateTree(user, mom, dad) {
      if (user?.idM == 0 && user?.idP == 0) {
        return;
      }
      let family = document.getElementById("family");

      var userIdM = user?.idM != 0 ? user?.id : this.count;
      var userIdP = user?.idP != 0 ? user?.id : this.count + 5;

      var innerM = document.getElementById(userIdM);
      var innerP = document.getElementById(userIdP);

      if (mom) {
        if (innerM) {
          innerM.innerHTML +=
            "<li><a>" + mom?.name + "</a><ul id='" + user?.idM + "'></ul></li>";
        } else {
          family.innerHTML +=
            "<li><a>" + mom?.name + "</a><ul id='" + user?.idM + "'></ul></li>";
        }
      }

      if (dad) {
        if (innerP) {
          innerP.innerHTML +=
            "<li><a>" + dad?.name + "</a><ul id='" + user?.idM + "'></ul></li>";
        } else {
          family.innerHTML +=
            "<li><a>" + dad?.name + "</a><ul id='" + user?.idP + "'></ul></li>";
        }
      }
    },
  },
};
</script>

<style>
.family-tree * {
  margin: 0px;
  padding: 0px;
}

.family-tree ul {
  padding-top: 20px;
  position: relative;
}

.family-tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  padding: 20px 5px 0px 5px;
  position: relative;
}

.family-tree li::before,
.family-tree li::after {
  content: "";
  position: absolute;
  top: 0px;
  right: 50%;
  border-top: 1px solid #f80;
  width: 50%;
  height: 20px;
}

.family-tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #f80;
}

.family-tree li:only-child::before,
.family-tree li:only-child::after {
  display: none;
}

.family-tree li:only-child {
  padding-top: 0;
}

.family-tree li:first-child::before,
.family-tree li:last-child::after {
  border: 0 none;
}

.family-tree li:last-child::before {
  border-right: 1px solid #f80;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
  border-radius: 0 5px 0 0;
}

.family-tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

.family-tree ul ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #f80;
  width: 0;
  height: 20px;
}

.family-tree li a {
  border: 1px solid #f80;
  padding: 1em 0.75em;
  text-decoration: none;
  color: #333;
  background-color: rgba(255, 255, 255, 0.5);
  font-family: arial, verdana, tahoma;
  font-size: 0.85em;
  display: inline-block;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-transition: all 500ms;
  -moz-transition: all 500ms;
  transition: all 500ms;
}

.family-tree li a:hover {
  border: 1px solid #fff;
  color: white;
  background-color: rgba(255, 128, 0, 0.7);
  display: inline-block;
}

.family-tree > ul > li > a {
  font-size: 1em;
  font-weight: bold;
}

.family-tree > ul > li > ul > li > a {
  width: 8em;
}
</style>