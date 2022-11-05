<template lang="">
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
  },

  data: () => ({
    infoW: null,
  }),

  mounted() {
    this.$parent.getMap(map => {
      this.infoW = new window.google.maps.InfoWindow({
        content: this.$el,
        position: {
          lat: this.lat,
          lng: this.lng,
        },
        disableAutoPan: true,
      })
      this.infoW.open(map)
    })
  },

  beforeUnmount() {
    this.infoW.close()
  },

}
</script>
<style lang="">
    
</style>