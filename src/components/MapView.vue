<template>
  <GMapMap
      :center="center"
      :zoom="17"
      map-type-id="terrain"
      style="width: 100vw; height: 100vh"
  >
    <GMapCluster>
      <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script>

export default {
  name: 'MapView',

  data() {
    return {
      center: {lat: 1.296568, lng: 103.852119},
      markers: [
        {
          position: {
            lat: 1.296568, lng: 103.852119
          },
        }
        , // Along list of clusters
      ]
    }
  },
  created() {
    navigator.geolocation.watchPosition(
      (pos) => {
        this.center = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      },
      (err) => {
        console.log(err);
      }
    )

    const lat = Number(this.$route.params.lat);
    const lng = Number(this.$route.params.lng);
    this.markers = [
      {
        position: {
          lat: lat, lng: lng
        },
      }
    ]
  },
}
</script>