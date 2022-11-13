// import VueWindowSize from 'vue-window-size';
export default {
  // Data template for the restaurant roulette, will be used to create the restaurant roulette and act as the backbone for the Yelp API call
  items: [
    { id: 1, name: "", htmlContent: "", textColor: "black", background: "#9deb9e" },
    { id: 2, name: "", htmlContent: "", textColor: "black", background: "#acacac" },
    { id: 3, name: "", htmlContent: "", textColor: "black", background: "#9deb9e" },
    { id: 4, name: "", htmlContent: "", textColor: "black", background: "#acacac" },
    { id: 5, name: "", htmlContent: "", textColor: "black", background: "#9deb9e" },
    { id: 6, name: "", htmlContent: "", textColor: "black", background: "#acacac" },
    { id: 7, name: "", htmlContent: "", textColor: "black", background: "#9deb9e" },
    { id: 8, name: "", htmlContent: "", textColor: "black", background: "#acacac" },
    { id: 9, name: "", htmlContent: "", textColor: "black", background: "#9deb9e" },
    { id: 10, name: "", htmlContent: "", textColor: "black", background: "#acacac" }
  ],
  firstItemIndex: { value: 0 },
  wheelSettings: {
    centeredIndicator: true,
    indicatorPosition: "top",
    size: window.innerWidth * 0.66,
    displayShadow: true,
    duration: 5,
    resultVariation: 95,
    easing: "ease",
    counterClockwise: false,
    horizontalContent: false,
    displayBorder: true,
    displayIndicator: true,
    baseDisplay: true,
    baseSize: (window.innerWidth * 0.66)/3,
    baseDisplayShadow: true,
    baseDisplayIndicator: true,
    baseBackground: "rgb(255 69 69)",
    baseHtmlContent: "<span class=\"text-white\">RESTAURANT<br>PICKER!</span>",
  }
  
}