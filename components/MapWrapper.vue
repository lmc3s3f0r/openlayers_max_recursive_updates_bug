<template>
  <div class="w-full h-full">
    <ClientOnly>
      <MapOL :center="mapCenter" :geometry="geometry" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import MapOL from "~/components/MapOL.client.vue";

export interface MapWrapperProps {
  mapCenter?: number[];
  zoom?: number;
  geometry?: string;
}

const props = withDefaults(defineProps<MapWrapperProps>(), {
  mapCenter: () => [0, 0],
  zoom: 12,
  geometry: "",
});

const { geometry, mapCenter } = toRefs(props);
</script>

<style></style>
