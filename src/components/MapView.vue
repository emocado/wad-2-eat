<template>
  <div id="map" ref="map" style="position: unset;height: 100vh; width:100vw">
    <MapInfoWindow :lat="Number(post.latitude)" :lng="Number(post.longitude)">
      <MapInfoContent :post="post" />
    </MapInfoWindow>
  </div>
</template>

<script>
import MapInfoWindow from './MapInfoWindow.vue';
import MapInfoContent from './MapInfoContent.vue';
import data from './data.js'

export default {
  components: {
    MapInfoWindow,
    MapInfoContent,
  },

  data() {
    return {
      center: { lat: 1.3099, lng: 103.8765 },
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
    };
  },
  mounted() {
    navigator.geolocation.watchPosition((pos) => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    }, (err) => {
      console.log(err);
    });

    const lat = Number(this.post.latitude)
    const lng = Number(this.post.longitude)
    console.log(lat, lng);
    
    this.markers = [
      {
        position: {
          lat: lat,
          lng: lng
        },
      }
    ];
    this.map = new window.google.maps.Map(this.$refs["map"], {
      center: this.center,
      zoom: 17,
    });
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);
    directionsService
      .route({
        origin: this.center,
        destination: { lat: lat, lng: lng },
        travelMode: window.google.maps.TravelMode["DRIVING"],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => console.log(e));
  },
  watch: {
    center: function (newVal, oldVal) {
      // round newVal to 4 dp
      newVal = {
        lat: Math.round(newVal.lat * 10000) / 10000,
        lng: Math.round(newVal.lng * 10000) / 10000
      };
      // round oldVal to 4 dp
      oldVal = {
        lat: Math.round(oldVal.lat * 10000) / 10000,
        lng: Math.round(oldVal.lng * 10000) / 10000
      };
      if (newVal.lat !== oldVal.lat && newVal.lng !== oldVal.lng) {
        const lat = Number(this.post.latitude);
        const lng = Number(this.post.longitude);
        this.markers = [
          {
            position: {
              lat: lat,
              lng: lng
            },
          }
        ];
        this.map = new window.google.maps.Map(this.$refs["map"], {
          center: this.center,
          zoom: 17,
        });
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(this.map);
        directionsService
          .route({
            origin: this.center,
            destination: { lat: lat, lng: lng },
            travelMode: window.google.maps.TravelMode["DRIVING"],
          })
          .then((response) => {
            directionsRenderer.setDirections(response);
          })
          .catch((e) => console.log(e));
      }
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
    }
  },

  created() {
    // fetch api with location id
    this.post = data.find((post) => post.location_id === this.$route.params.locationid);
    console.log(this.post);

    // const api_key = "AIzaSyDJx4A_FqpmuCF40Tm-gs4F0Z3we45UH6c"
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=Aljunied+Cres&destination=Singapore+Management+University&key=${api_key}`
    // fetch(proxyurl + url)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     const stepsArr = data.routes[0].legs[0].steps
    //     console.log(stepsArr);
    //     this.path = stepsArr.map(step => {
    //       return {
    //         lat: step.start_location.lat,
    //         lng: step.start_location.lng,
    //       }
    //     })
    //     this.path.push({
    //       lat: stepsArr[stepsArr.length - 1].end_location.lat,
    //       lng: stepsArr[stepsArr.length - 1].end_location.lng,
    //     })
    //     // this.path = data.routes[0].overview_polyline.points
    //   })
  },
}
</script>