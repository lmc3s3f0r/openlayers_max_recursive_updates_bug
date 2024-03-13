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
import Feature, { type FeatureLike } from "ol/Feature";
import proj4 from "proj4";
import type { Map, View } from "ol";

const mapRef = ref<{ map: Map }>();
const viewRef = ref<{ view: View }>();
const center = ref([424088.8758358713, 4638749.000496441]);
const zoom = ref(8);
const rotation = ref(0);

proj4.defs(
  "EPSG:25830",
  "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs +type=crs"
);
register(proj4);

const wktFormat = new WKT();

const geometry =
  "MULTIPOLYGON(((500538.9863512241 4638424.586848955,501016.7991949093 4638371.797327979,500871.9664065969 4638191.77152569,501221.1893914997 4638245.914624118,501207.65361689095 4637923.763188435,500422.57868959 4637971.138399563,500538.9863512241 4638424.586848955)))";

const geometryFeatures = ref<Feature[]>([]);

// -------------------------------------------------------
// onMounted
// -------------------------------------------------------
onMounted(() => {
  setTimeout(() => {
    onLoadMap();
  }, 1000);
});

// -------------------------------------------------------
// onLoadMap
// -------------------------------------------------------
function onLoadMap() {
  // Single geometry load
  if (geometry) {
    const f = getFeatures(geometry);
    console.log("BEFORE MAXIMUM RECURSIVE UPDATES EXCEEDED");
    geometryFeatures.value = f;
    if (f.length) {
      centerGeometry(f[0]);
    }
  }
}

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

// -------------------------------------------------------
// centerGeometry
// -------------------------------------------------------
function centerGeometry(feature: Feature | FeatureLike) {
  const extent = feature.getGeometry()?.getExtent();
  const view = viewRef.value?.view;
  if (extent) {
    view?.fit(extent, {
      padding: [170, 50, 30, 150],
      minResolution: 5,
    });
  }
}
</script>
