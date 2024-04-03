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
        :rotation="0"
        :zoom="15"
        projection="EPSG:25830"
      />

      <ol-tile-layer>
        <ol-source-xyz
          :url="`https://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}`"
        />
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

proj4.defs(
  "EPSG:25830",
  "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs +type=crs"
);
register(proj4);

const wktFormat = new WKT();

const geometryFeatures = ref<Feature[]>([]);

interface MapOLProps {
  center?: number[];
  geometry?: string;
}

enum PROJECTIONS {
  EPSG25830 = "EPSG:25830",
}

const props = withDefaults(defineProps<MapOLProps>(), {
  center: undefined,
  geometry: "",
});

const { center, geometry } = toRefs(props);

// -------------------------------------------------------
// onMounted
// -------------------------------------------------------
onMounted(() => {
  // If you comment this setTimeout and uncomment the below line "geometryFeatures.value = ...",
  // the "Maximum recursive updates exceeded" message doesn't appear
  setTimeout(() => {
    geometryFeatures.value = getFeatures(geometry.value);
  }, 100);

  // geometryFeatures.value = getFeatures(geometry.value);
});

// -------------------------------------------------------
// getFeatures
// -------------------------------------------------------
function getFeatures(_wkt: string): Feature[] {
  const _features = wktFormat.readFeatures(_wkt, {
    dataProjection: "EPSG:25830",
    featureProjection: "EPSG:25830",
  });
  return _features;
}
</script>
