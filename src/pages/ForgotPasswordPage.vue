<template>
  <q-page>

   <img src="~assets/auth/wave.png" class="wave" alt="login-wave">
 <div class="row" style="height: 90vh">
   <div class="col-0 col-md-6 flex justify-center content-center">
     <img src="~assets/auth/login.svg" class="responsive" alt="login-image">
   </div>
   <div v-bind:class="{'justify-center': $q.screen.md || $q.screen.sm ||$q.screen.xs}"
        class="col-12 col-md-6 flex content-center">
     <q-card v-bind:style="$q.screen.lt.sm ? {'width': '80%'} : {'width': '50%'}">
       <q-card-section>
        <router-link to="/">
         <q-avatar size="103px" class="absolute-center shadow-10">
           <img src="~assets/auth/avatar.svg" alt="avatar">
         </q-avatar>
        </router-link>
       </q-card-section>
       <q-card-section>
         <div class="q-pt-lg">
           <div class="col text-h6 ellipsis flex justify-center">
             <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">Register</h2>
           </div>
         </div>
       </q-card-section>
       <q-card-section>
         <q-form class="q-gutter-md">
           <q-input label="Email">
           </q-input>
           <div>
             <q-btn class="full-width" color="primary" label="register" type="submit" rounded>
             </q-btn>
             <div class="text-center q-mt-sm q-gutter-lg">
               <router-link class="text-white"
               :to="{ name: 'login'}">Login</router-link>
               <router-link class="text-white"
               :to="{ name: 'register'}">Create account</router-link>
             </div>
           </div>
         </q-form>
       </q-card-section>
     </q-card>
   </div>
 </div>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
};
</script>

<style scoped>
.wave {
 position: fixed;
 height: 100%;
 left: 0;
 bottom: 0;
 z-index: -1;
}
</style>
