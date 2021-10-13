<template>
  <div>
    <v-app>
      <v-main>
        <v-app-bar>
          <v-toolbar-title
            ><NuxtLink class="nuxt-link" to="/">Inicio</NuxtLink>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <NuxtLink class="nuxt-link" to="/tree"
            >Ver mi árbol familiar</NuxtLink
          >
        </v-app-bar>
        <v-container justify="center" align="center">
          <client-only>
            <Nuxt />
          </client-only>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nuxt-link {
  text-decoration: none;
}
</style>