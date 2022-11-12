export default {
  items: [
    { id: 1, name: "Burger", htmlContent: "Burger", textColor: "black", background: "#f2831b" },
    { id: 2, name: "Veggie", htmlContent: "Veggie", textColor: "black", background: "#37e307" },
    { id: 3, name: "Pizza", htmlContent: "Pizza", textColor: "black", background: "#3ab3f0" },
    { id: 4, name: "Pokebowl", htmlContent: "Pokebowl", textColor: "black", background: "#f0403a" },
    { id: 5, name: "Kebab", htmlContent: "Kebab", textColor: "black", background: "#f2831b" },
    { id: 6, name: "Salads", htmlContent: "Salads", textColor: "black", background: "#37e307" },
    { id: 7, name: "Japanese", htmlContent: "Japanese", textColor: "black", background: "#3ab3f0" },
    { id: 8, name: "Laksa", htmlContent: "Laksa", textColor: "black", background: "#f0403a" },
    { id: 9, name: "Thai", htmlContent: "Thai", textColor: "black", background: "#f2831b" },
    { id: 10, name: "Sandwich", htmlContent: "Sandwich", textColor: "black", background: "#37e307" }
  ],
  firstItemIndex: { value: 0 },
  wheelSettings: {
    centeredIndicator: false,
    indicatorPosition: "right",
    size: 600,
    displayShadow: true,
    duration: 4,
    resultVariation: 70,
    easing: "bounce",
    counterClockwise: false,
    horizontalContent: false,
    displayBorder: true,
    displayIndicator: true,
    baseDisplay: true,
    baseSize: 100,
    baseDisplayShadow: true,
    baseDisplayIndicator: true,
    baseBackground: "#444",
    baseHtmlContent: "<strong class=\"text-white\">MEAL<br>PICKER!</strong>",
  }
}