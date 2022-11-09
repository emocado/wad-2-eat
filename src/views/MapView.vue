<template>
  <div id="map" ref="map">
    <div v-if="!post" id="halfCircleSpinner">
      <HalfCircleSpinner />
    </div>
    <div v-else>
      <MapInfoWindow :lat="post?.coordinates?.latitude" :lng="post?.coordinates?.longitude">
        <MapInfoContent :post="post"/>
      </MapInfoWindow>
    </div>
  </div>
</template>

<script>
import MapInfoWindow from '../components/map/MapInfoWindow.vue';
import MapInfoContent from '../components/map/MapInfoContent.vue';
import HalfCircleSpinner from '../components/HalfCircleSpinner.vue';
import axios from 'axios';

export default {
  components: {
    MapInfoWindow,
    MapInfoContent,
    HalfCircleSpinner,
  },

  data() {
    return {
      center: null,
      map: null,
      markers: [
        {
          position: {
            lat: 1.296568,
            lng: 103.852119
          },
        }, // Along list of clusters
      ],
      post: null,
      watchId: null,
    };
  },

  watch: {
    center: function () {
      const newNewCenter = { lat: this.center.lat, lng: this.center.lng }
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      const destination = { lat: this.markers[0].position.lat, lng: this.markers[0].position.lng }
      // console.log('newnewcenter', newNewCenter);
      // console.log('destination', destination);
      directionsService.route({
        origin: newNewCenter,
        destination: destination,
        travelMode: window.google.maps.TravelMode["WALKING"],
      }).then((response) => {
        directionsRenderer.setDirections(response);
      }).catch((e) => console.log(e));
    }
  },

  methods: {
    getMap(callback) {
      let vm = this
      function checkForMap() {
        if (vm.map) callback(vm.map)
        else setTimeout(checkForMap, 200)
      }
      checkForMap()
    },
  },

  mounted() {
    this.watchId = navigator.geolocation.watchPosition((pos) => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    }, (err) => {
      console.log(err);
    });

    const url = `/v3/businesses/${this.$route.params.locationid}`
    // const proxy = "https://cors-anywhere.herokuapp.com/"

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
        },
      })
      .then((response) => {
        const data = response.data;
        this.post = data;

        const lat = Number(data.coordinates.latitude);
        const lng = Number(data.coordinates.longitude);
        this.markers = [{
          position: {
            lat: lat,
            lng: lng
          },
        }];

        this.map = new window.google.maps.Map(this.$refs["map"], {
          center: {lat: lat, lng: lng},
          zoom: 17,
        });

      })
      .catch((error) => {
        console.log(error);
      });
  },

  beforeUnmount() {
    this.map = null;
    navigator.geolocation.clearWatch(this.watchId);
  },
}
</script>

<style scoped>
#map {
  height: calc(100vh - 80px);
  width: 100vw;
}
#halfCircleSpinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
}
</style>