export default {
  // Data template for the restaurant roulette, will be used to create the restaurant roulette and act as the backbone for the Yelp API call
  items: [
    { id: 1, name: "Holycrab", htmlContent: "Holycrab", textColor: "black", background: "#9deb9e" },
    { id: 2, name: "Zhong Hua Steamboat", htmlContent: "Zhong Hua Steamboat", textColor: "black", background: "#acacac" },
    { id: 3, name: "Sungei Road Laksa", htmlContent: "Sungei Road Laksa", textColor: "black", background: "#9deb9e" },
    { id: 4, name: "Chin Chin Restaurant", htmlContent: "Chin Chin Restaurant", textColor: "black", background: "#acacac" },
    { id: 5, name: "Go2eat Bar & Grill", htmlContent: "Go2eat Bar & Grill", textColor: "black", background: "#9deb9e" },
    { id: 6, name: "Skai", htmlContent: "Skai", textColor: "black", background: "#acacac" },
    { id: 7, name: "Esora", htmlContent: "Esora", textColor: "black", background: "#9deb9e" },
    { id: 8, name: "Dolce Vita", htmlContent: "Dolce Vita", textColor: "black", background: "#acacac" },
    { id: 9, name: "Ginett Restaurant & Wine Bar", htmlContent: "Ginett Restaurant & Wine Bar", textColor: "black", background: "#9deb9e" },
    { id: 10, name: "Restaurant Labyrinth", htmlContent: "Restaurant Labyrinth", textColor: "black", background: "#acacac" }
  ],
  firstItemIndex: { value: 0 },
  wheelSettings: {
    centeredIndicator: true,
    indicatorPosition: "top",
    size: 600,
    displayShadow: true,
    duration: 5,
    resultVariation: 95,
    easing: "ease",
    counterClockwise: true,
    horizontalContent: false,
    displayBorder: true,
    displayIndicator: true,
    baseDisplay: true,
    baseSize: 180,
    baseDisplayShadow: true,
    baseDisplayIndicator: true,
    baseBackground: "rgb(255 69 69)",
    baseHtmlContent: "<strong class=\"text-white\">RESTAURANT<br>PICKER!</strong>",
  }
}