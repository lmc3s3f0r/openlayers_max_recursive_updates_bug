<template>
  <ClientOnly>
    <ol-map
      ref="mapRef"
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      class="size-full relative"
    >
      <ol-view
        ref="viewRef"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        projection="EPSG:25830"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-vector-layer>
        <ol-source-vector
          :features="geometryFeatures"
          :format="wktFormat"
          projection="EPSG:25830"
        >
          <ol-style>
            <ol-style-stroke color="#6464ff" width="2" />
            <ol-style-fill color="rgba(200, 200, 255, 0.6)" />
          </ol-style>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { register } from "ol/proj/proj4";
import { WKT } from "ol/format";
import Feature from "ol/Feature";
import proj4 from "proj4";
import type { Map, View } from "ol";

const mapRef = ref<{ map: Map }>();
const viewRef = ref<{ view: View }>();
const center = ref([500785.9863512241, 4638154.586848955]);
const zoom = ref(17);
const rotation = ref(0);

proj4.defs(
  "EPSG:25830",
  "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs +type=crs"
);
register(proj4);

const wktFormat = new WKT();

const geometryFeatures = ref<Feature[]>([]);

// -------------------------------------------------------
// onMounted
// -------------------------------------------------------
onMounted(() => {
  const geometry =
    "MULTIPOLYGON(((500538.9863512241 4638424.586848955,501016.7991949093 4638371.797327979,500871.9664065969 4638191.77152569,501221.1893914997 4638245.914624118,501207.65361689095 4637923.763188435,500422.57868959 4637971.138399563,500538.9863512241 4638424.586848955)))";

  geometryFeatures.value = wktFormat.readFeatures(geometry, {
    dataProjection: "EPSG:25830",
    featureProjection: "EPSG:25830",
  });
});
</script>
