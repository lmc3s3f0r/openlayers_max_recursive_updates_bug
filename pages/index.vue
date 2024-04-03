<template>
  <div class="flex flex-col size-full">
    <div class="flex size-full">
      <div class="relative size-full flex items-center justify-center">
        <MapWrapper
          :geometry="geometry"
          :map-center="[500877.96469982323, 4638197.026969753]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapWrapper from "~/components/MapWrapper.vue";

const geometry =
  "MULTIPOLYGON(((500538.9863512241 4638424.586848955,501016.7991949093 4638371.797327979,500871.9664065969 4638191.77152569,501221.1893914997 4638245.914624118,501207.65361689095 4637923.763188435,500422.57868959 4637971.138399563,500538.9863512241 4638424.586848955)))";
</script>

<style></style>
