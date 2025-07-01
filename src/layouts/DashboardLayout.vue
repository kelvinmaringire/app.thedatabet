<template>
  <q-layout view="hhh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-primary text-white">
      <q-toolbar class="justify-center">
        <q-tabs dense no-caps justify="center" class="text-white q-pb-xs">
          <q-route-tab :to="{ name: 'predictions' }" icon="sports_soccer" label="Pred" />
          <q-route-tab :to="{ name: 'previews' }" icon="preview" label="Previews" />
          <q-route-tab :to="{ name: 'predictions' }" icon="confirmation_number" label="Tickets" />
          <q-route-tab :to="{ name: 'predictions' }" icon="query_stats" label="Stats" />
          <q-route-tab :to="{ name: 'account' }" icon="account_circle" label="Account" />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup></script>
