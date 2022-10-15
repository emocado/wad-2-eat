<template>
  <!-- todo add loading spinner if loading is true -->
  <div class="container">
    <GameCardsStack v-if="!loading" :cards="post" :trigger="trigger" @cardAccepted="handleCardAccepted"
      @cardRejected="handleCardRejected" @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
    <div v-else-if="loading">
      <HalfCircleSpinner />
    </div>
    <!-- <div>
      <HalfCircleSpinner/>
    </div> -->
  </div>
  <div class="d-flex justify-content-around">
    <button class="btn text-danger" @click="handleTriggerRemove">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-x-circle-fill"
        viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
      </svg>
    </button>
    <button class="btn btn-outline-danger rounded-circle heart" @click="handleTriggerAdd">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-heart-fill"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
    </button>
  </div>
</template>
  
<script>
import GameCardsStack from "./GameCardsStack.vue";
import HalfCircleSpinner from "./HalfCircleSpinner.vue";
import axios from "axios";

export default {
  components: {
    GameCardsStack,
    HalfCircleSpinner,
  },

  data() {
    return {
      // visibleCards: ["bricklane", "macdonald", "subway", "wolfrik"],
      visibleCards: [{ name: "bricklane", location_id: "1" }, { name: "macdonald", location_id: "2" }, { name: "subway", location_id: "3" }, { name: "wolfrik", location_id: "4" }],
      // visibleCards: [],
      trigger: 0,
      loading: false,
      post: null,
      error: null,
    };
  },

  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },

  methods: {
    fetchData() {
      console.log(import.meta.env.VITE_TRAVEL_ADVISOR_API_KEY);
      let self = this
      self.error = self.post = null
      self.loading = true

      const options = {
        method: "GET",
        url: "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng",
        params: {
          latitude: "1.296568",
          longitude: "103.852119",
          limit: "10",
          currency: "SGD",
          distance: "1",
          open_now: "false",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            import.meta.env.VITE_TRAVEL_ADVISOR_API_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };

      // comment out axios as the limit for api is only 500 per month

      // axios
      //   .request(options)
      //   .then(function (response) {
      //     console.log(response.data.data);
      //     self.loading = false;
      //     self.post = response.data.data;
      //   })
      //   .catch(function (error) {
      //     // self.error = "Something went wrong " + error.toString();
      //     console.log(error);
      //   });

      self.loading = false;
      self.post = [
        {
          "location_id": "13113873",
          "name": "Harry's",
          "latitude": "1.2964",
          "longitude": "103.85192",
          "num_reviews": "0",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "distance": "0.02893261041149651",
          "distance_string": "28 m",
          "bearing": "southwest",
          "is_closed": false,
          "is_long_closed": false,
          "price_level": "",
          "neighborhood_info": [
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622372",
              "name": "Museum"
            },
            {
              "location_id": "15622424",
              "name": "Bras Basah"
            }
          ],
          "description": "",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d13113873-Reviews-Harry_s-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d13113873-Harry_s-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            null
          ],
          "phone": "+65 6337 0618",
          "website": "http://harrys.com.sg/find-us/chijmes",
          "address_obj": {
            "street1": "60 Victoria Street",
            "street2": null,
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "187996"
          },
          "address": "60 Victoria Street, Singapore 187996 Singapore",
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "9908",
              "name": "American"
            },
            {
              "key": "10640",
              "name": "Bar"
            },
            {
              "key": "10646",
              "name": "Fast Food"
            },
            {
              "key": "10659",
              "name": "Asian"
            },
            {
              "key": "10669",
              "name": "Contemporary"
            },
            {
              "key": "10670",
              "name": "Pub"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "3911298",
          "name": "Take Me Away Cafe",
          "latitude": "1.29692",
          "longitude": "103.85225",
          "num_reviews": "1",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.009873390197754",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "9318",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#8,357 of 12,651 Restaurants in Singapore",
          "distance": "0.04173951696316242",
          "distance_string": "41 m",
          "bearing": "north",
          "rating": "4.0",
          "is_closed": false,
          "open_now_text": "Open Now",
          "is_long_closed": false,
          "price_level": "",
          "neighborhood_info": [
            {
              "location_id": "15622370",
              "name": "Rochor"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622525",
              "name": "Victoria"
            }
          ],
          "description": "",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d3911298-Reviews-Take_Me_Away_Cafe-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d3911298-Take_Me_Away_Cafe-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "319573201",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "4",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=319573201#review319573201",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "AWESOME !!!",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "address_obj": {
            "street1": "81 Victoria Street, #03-02",
            "street2": "SMU Administration building",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": null
          },
          "address": "81 Victoria Street, #03-02 SMU Administration building, Singapore Singapore",
          "hours": {
            "week_ranges": [
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10679",
              "name": "Healthy"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "7103891",
          "name": "Chicken Up Little Pte Ltd",
          "latitude": "1.297",
          "longitude": "103.85177",
          "num_reviews": "10",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/06/9e/a0/ff/getlstd-property-photo.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/06/9e/a0/ff/getlstd-property-photo.jpg",
                "height": "50"
              },
              "original": {
                "width": "1772",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/06/9e/a0/ff/getlstd-property-photo.jpg",
                "height": "1181"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/06/9e/a0/ff/getlstd-property-photo.jpg",
                "height": "682"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/06/9e/a0/ff/getlstd-property-photo.jpg",
                "height": "367"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2014-09-24T05:05:21-0400",
            "caption": "getlstd_property_photo",
            "id": "111059199",
            "helpful_votes": "0",
            "published_date": "2014-09-24T05:05:21-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.0723533630371094",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "5183",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#4,523 of 12,651 Restaurants in Singapore",
          "distance": "0.06194055147491433",
          "distance_string": "61 m",
          "bearing": "northwest",
          "rating": "4.0",
          "is_closed": false,
          "is_long_closed": false,
          "price_level": "",
          "neighborhood_info": [
            {
              "location_id": "15622370",
              "name": "Rochor"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622525",
              "name": "Victoria"
            }
          ],
          "description": "",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d7103891-Reviews-Chicken_Up_Little_Pte_Ltd-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d7103891-Chicken_Up_Little_Pte_Ltd-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "305278466",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "4",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=305278466#review305278466",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Not bad, but portion too big",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 9834 6540",
          "email": "vincent@redzgroup.com",
          "address_obj": {
            "street1": "52 Queen Street 01-05",
            "street2": null,
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "188539"
          },
          "address": "52 Queen Street 01-05, Singapore 188539 Singapore",
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10659",
              "name": "Asian"
            },
            {
              "key": "10661",
              "name": "Korean"
            },
            {
              "key": "10671",
              "name": "Fusion"
            },
            {
              "key": "10714",
              "name": "Singaporean"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "795586",
          "name": "Wah Lok",
          "latitude": "1.295996",
          "longitude": "103.85212",
          "num_reviews": "438",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/03/51/4c/ae/wah-lok-restaurant-carlton.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/03/51/4c/ae/wah-lok-restaurant-carlton.jpg",
                "height": "50"
              },
              "original": {
                "width": "2000",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/03/51/4c/ae/wah-lok-restaurant-carlton.jpg",
                "height": "1333"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/03/51/4c/ae/wah-lok-restaurant-carlton.jpg",
                "height": "682"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/03/51/4c/ae/wah-lok-restaurant-carlton.jpg",
                "height": "366"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2013-01-11T01:27:28-0500",
            "caption": "Wah Lok Cantonese Restaurant - Rotunda Area",
            "id": "55659694",
            "helpful_votes": "2",
            "published_date": "2013-01-11T01:27:28-0500",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "4.225232124328613",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "214",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#207 of 12,651 Restaurants in Singapore",
          "distance": "0.06367026997663072",
          "distance_string": "63 m",
          "bearing": "south",
          "rating": "4.0",
          "is_closed": false,
          "open_now_text": "Closed Now",
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "price": "SGD 72 - SGD 115",
          "neighborhood_info": [
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622412",
              "name": "City Hall"
            },
            {
              "location_id": "15622369",
              "name": "Downtown Core/Downtown Singapore"
            }
          ],
          "description": "Since its opening in 1988, Wah Lok Cantonese Restaurant has continually been applauded as one of Singapore’s finest Cantonese restaurants, winning Singapore Tatler Magazine's “Singapore’s Best Restaurants” since 1991 and “Singapore’s Top Restaurants” by Wine & Dine years since 1997.Gourmands can expect mouth watering dishes such as Shark's Fin with Crabmeat wrapped in Egg White, Pan-fried Japanese Scallop with Asparagus as well as Baked Cod with Chef's Sauce in Banana Leaf to name a few. So don’t hesitate to reserve your table for a chance to savour Wah Lok’s culinary delights.Mondays to SaturdaysLunch served from 11.30am to 2.30pmDinner served from 6.30pm to 10.30pmSundays and Public HolidaysLunch served from 11am to 2.30pmDinner served from 6.30pm to 10.30pm",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d795586-Reviews-Wah_Lok-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d795586-Wah_Lok-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "667978679",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "5",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=667978679#review667978679",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Fantastic dim sum experience",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 6311 8188",
          "website": "http://carltonhotel.sg/wahlok.html",
          "email": "wah.lok@carltonhotel.sg",
          "address_obj": {
            "street1": "76 Bras Basah Road Carlton Hotel",
            "street2": "",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "189558"
          },
          "address": "76 Bras Basah Road Carlton Hotel, Singapore 189558 Singapore",
          "hours": {
            "week_ranges": [
              [
                {
                  "open_time": 660,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 870
                },
                {
                  "open_time": 1110,
                  "close_time": 1320
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10665",
              "name": "Vegetarian Friendly"
            },
            {
              "key": "10992",
              "name": "Gluten Free Options"
            }
          ],
          "dietary_restrictions": [
            {
              "key": "10665",
              "name": "Vegetarian Friendly"
            },
            {
              "key": "10992",
              "name": "Gluten Free Options"
            }
          ],
          "booking": {
            "provider": "Chope.co",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=126861341&geo=795586&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=8Ka8DiYLNstkbFEun993gLz870QiOj2U2_6CAcKrOWsnGwuOc679w8x0FeDTMtKwNGi9I6nuBPmXmunT2F7Y2Ti1WNACCOFdy1bUPP38exA&cs=1e330dfe9491e7352490390d3f8eccd29"
          },
          "reserve_info": {
            "id": "795586",
            "provider": "Chope.co",
            "provider_img": "https://static.tacdn.com/img2/eateries/Chope_3.25.2019.png",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=126861341&geo=795586&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=8Ka8DiYLNstkbFEun993gLz870QiOj2U2_6CAcKrOWsnGwuOc679w8x0FeDTMtKwNGi9I6nuBPmXmunT2F7Y2Ti1WNACCOFdy1bUPP38exA&cs=1e330dfe9491e7352490390d3f8eccd29",
            "booking_partner_id": null,
            "racable": false,
            "api_bookable": false,
            "timeslots": null,
            "bestoffer": null,
            "timeslot_offers": null,
            "button_text": "Reserve",
            "disclaimer_text": null,
            "banner_text": null
          },
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "294265",
          "ad_position": "inline1",
          "ad_size": "8X8",
          "doubleclick_zone": "as.singapore.singapore_city",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "detail": "0",
          "page_type": "restaurants",
          "mob_ptype": "app_restaurants"
        },
        {
          "location_id": "14391458",
          "name": "Lowe'f Artisanal Sandwiches",
          "latitude": "1.297101",
          "longitude": "103.85154",
          "num_reviews": "22",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/13/86/ba/ce/big-breakfast.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/13/86/ba/ce/big-breakfast.jpg",
                "height": "50"
              },
              "original": {
                "width": "1280",
                "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/86/ba/ce/big-breakfast.jpg",
                "height": "1280"
              },
              "large": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-p/13/86/ba/ce/big-breakfast.jpg",
                "height": "550"
              },
              "medium": {
                "width": "450",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/13/86/ba/ce/big-breakfast.jpg",
                "height": "450"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2018-06-30T12:26:26-0400",
            "caption": "Big Breakfast",
            "id": "327596750",
            "helpful_votes": "0",
            "published_date": "2018-06-30T12:26:26-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.4136722087860107",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "1236",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#1,105 of 12,651 Restaurants in Singapore",
          "distance": "0.08764143845181877",
          "distance_string": "87 m",
          "bearing": "northwest",
          "rating": "5.0",
          "is_closed": false,
          "open_now_text": "Open Now",
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "price": "SGD 7 - SGD 23",
          "neighborhood_info": [
            {
              "location_id": "15622370",
              "name": "Rochor"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622525",
              "name": "Victoria"
            }
          ],
          "description": "",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d14391458-Reviews-Lowe_f_Artisanal_Sandwiches-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d14391458-Lowe_f_Artisanal_Sandwiches-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "784347218",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "5",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=784347218#review784347218",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Not once but twice ",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 8767 4859",
          "website": "http://www.facebook.com/L%C3%B6wef-Artisanal-Sandwiches-Pastries-Coffee-336061983588830/",
          "address_obj": {
            "street1": "1 Queen Street Cantonese Methodist Kum Yan Church",
            "street2": "Kum Yan Methodist Church",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "188534"
          },
          "address": "1 Queen Street Cantonese Methodist Kum Yan Church Kum Yan Methodist Church, Singapore 188534 Singapore",
          "hours": {
            "week_ranges": [
              [],
              [],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 480,
                  "close_time": 1080
                }
              ],
              [
                {
                  "open_time": 540,
                  "close_time": 1080
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10642",
              "name": "Cafe"
            },
            {
              "key": "10665",
              "name": "Vegetarian Friendly"
            },
            {
              "key": "10697",
              "name": "Vegan Options"
            }
          ],
          "dietary_restrictions": [
            {
              "key": "10665",
              "name": "Vegetarian Friendly"
            },
            {
              "key": "10697",
              "name": "Vegan Options"
            }
          ],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "2020064",
          "name": "Cafe Mosaic",
          "latitude": "1.295789",
          "longitude": "103.85232",
          "num_reviews": "296",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/18/7d/f3/66/restaurant-interiors.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/18/7d/f3/66/restaurant-interiors.jpg",
                "height": "50"
              },
              "original": {
                "width": "1280",
                "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/18/7d/f3/66/restaurant-interiors.jpg",
                "height": "853"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/18/7d/f3/66/restaurant-interiors.jpg",
                "height": "683"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/18/7d/f3/66/restaurant-interiors.jpg",
                "height": "367"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2019-07-24T23:04:50-0400",
            "caption": "Restaurant Interiors",
            "id": "410907494",
            "helpful_votes": "0",
            "published_date": "2019-07-24T23:04:50-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.6482160091400146",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "693",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#632 of 12,651 Restaurants in Singapore",
          "distance": "0.08946766594972752",
          "distance_string": "89 m",
          "bearing": "south",
          "rating": "4.0",
          "is_closed": false,
          "open_now_text": "Open Now",
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "neighborhood_info": [
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622412",
              "name": "City Hall"
            },
            {
              "location_id": "15622369",
              "name": "Downtown Core/Downtown Singapore"
            }
          ],
          "description": "Celebrate a kaleidoscope of flavours at Café Mosaic. Our contemporary café in Singapore features a mouth-watering buffet spread and delightful à la carte offerings that will take you on a colourful discovery of the East and West. Weekend lunch buffets also come with an extra serving of fun-filled activities catered especially for families with young ones. Sample the ocean’s freshest catch with Oysters, Tiger Prawns and Salmon Sashimi. Local delights perfumed with tropical spices and piquant sauces such as Rojak and Laksa remain all-time favourites. Let our Chefs impress you at our live cooking station or indulge in delightful sweet treats designed by our skillful Pastry Team, including stunning 3D cakes you can order in advance for birthdays and other special occasions.",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d2020064-Reviews-Cafe_Mosaic-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d2020064-Cafe_Mosaic-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "691011179",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "5",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=691011179#review691011179",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Fresh seafood n Yummy BBQ",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 6311 8195",
          "website": "http://www.carltonhotel.sg/dining/cafe-mosaic-singapore",
          "email": "cafe.mosaic@carltonhotel.sg",
          "address_obj": {
            "street1": "76 Bras Basah Road Carlton Hotel",
            "street2": "",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "189558"
          },
          "address": "76 Bras Basah Road Carlton Hotel, Singapore 189558 Singapore",
          "hours": {
            "week_ranges": [
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 360,
                  "close_time": 1380
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10714",
              "name": "Singaporean"
            },
            {
              "key": "10648",
              "name": "International"
            }
          ],
          "dietary_restrictions": [],
          "booking": {
            "provider": "Chope.co",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=120094710&geo=2020064&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=8Ka8DiYLNstkbFEun993gLz870QiOj2U2_6CAcKrOWsnGwuOc679w8x0FeDTMtKwNGi9I6nuBPmXmunT2F7Y2WWkvI2y6kPVettlwW7lcZE&cs=1031439a91ade6e8f62b291d5f8b90212"
          },
          "reserve_info": {
            "id": "2020064",
            "provider": "Chope.co",
            "provider_img": "https://static.tacdn.com/img2/eateries/Chope_3.25.2019.png",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Chope&src=120094710&geo=2020064&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=13539&bucket=485139&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=8Ka8DiYLNstkbFEun993gLz870QiOj2U2_6CAcKrOWsnGwuOc679w8x0FeDTMtKwNGi9I6nuBPmXmunT2F7Y2WWkvI2y6kPVettlwW7lcZE&cs=1031439a91ade6e8f62b291d5f8b90212",
            "booking_partner_id": null,
            "racable": false,
            "api_bookable": false,
            "timeslots": null,
            "bestoffer": null,
            "timeslot_offers": null,
            "button_text": "Reserve",
            "disclaimer_text": null,
            "banner_text": null
          },
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "7231571",
          "name": "Switch by Timbre X",
          "latitude": "1.296524",
          "longitude": "103.851295",
          "num_reviews": "72",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/07/d1/b5/ed/switch-by-timbre.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/07/d1/b5/ed/switch-by-timbre.jpg",
                "height": "50"
              },
              "original": {
                "width": "1800",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/07/d1/b5/ed/switch-by-timbre.jpg",
                "height": "1200"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/07/d1/b5/ed/switch-by-timbre.jpg",
                "height": "682"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/07/d1/b5/ed/switch-by-timbre.jpg",
                "height": "367"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2015-05-03T22:54:19-0400",
            "caption": "Switch Entrance",
            "id": "131184109",
            "helpful_votes": "0",
            "published_date": "2015-05-03T22:54:19-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.3210389614105225",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "1629",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#1,449 of 12,651 Restaurants in Singapore",
          "distance": "0.09181143441407819",
          "distance_string": "91 m",
          "bearing": "west",
          "rating": "4.0",
          "is_closed": false,
          "open_now_text": "Open Now",
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "neighborhood_info": [
            {
              "location_id": "15622372",
              "name": "Museum"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622675",
              "name": "Colonial District/Civic District"
            },
            {
              "location_id": "15622424",
              "name": "Bras Basah"
            }
          ],
          "description": "Located in the arts and heritage district of Bras Basah, Switch by Timbre X is a bilingual Mandarin and English live music venue and restro-bar by Timbre Group. This indoor venue recently underwent a refresh and has became a colourful and interactive space for customers!",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d7231571-Reviews-Switch_by_Timbre_X-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d7231571-Switch_by_Timbre_X-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "658605077",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "5",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=658605077#review658605077",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Prompt service, great music",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 6336 7739",
          "website": "http://switchmusic.sg/",
          "email": "switch@timbregroup.asia",
          "address_obj": {
            "street1": "73 Bras Basah Road Ntuc Trade Union House",
            "street2": "#01-01/02",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "189556"
          },
          "address": "73 Bras Basah Road Ntuc Trade Union House #01-01/02, Singapore 189556 Singapore",
          "hours": {
            "week_ranges": [
              [],
              [
                {
                  "open_time": 1020,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 1020,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 900,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 900,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 900,
                  "close_time": 1380
                }
              ],
              [
                {
                  "open_time": 900,
                  "close_time": 1380
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "10640",
              "name": "Bar"
            },
            {
              "key": "10670",
              "name": "Pub"
            },
            {
              "key": "10671",
              "name": "Fusion"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "12969029",
          "name": "Love Pal Cafe",
          "latitude": "1.297493",
          "longitude": "103.85193",
          "num_reviews": "2",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/12/90/20/e3/photo0jpg.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/12/90/20/e3/photo0jpg.jpg",
                "height": "50"
              },
              "original": {
                "width": "2048",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/12/90/20/e3/photo0jpg.jpg",
                "height": "2048"
              },
              "large": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-p/12/90/20/e3/photo0jpg.jpg",
                "height": "550"
              },
              "medium": {
                "width": "450",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/12/90/20/e3/photo0jpg.jpg",
                "height": "450"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2018-04-06T23:21:40-0400",
            "caption": "",
            "id": "311435491",
            "helpful_votes": "0",
            "published_date": "2018-04-06T23:21:40-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.0381062030792236",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "6878",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#6,076 of 12,651 Restaurants in Singapore",
          "distance": "0.10510662010402456",
          "distance_string": "0.1 km",
          "bearing": "north",
          "rating": "4.5",
          "is_closed": false,
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "price": "SGD 3 - SGD 43",
          "neighborhood_info": [
            {
              "location_id": "15622370",
              "name": "Rochor"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622525",
              "name": "Victoria"
            }
          ],
          "description": "Love Pal Club is formed by a group of like-minded individuals who strive to encourage and promote volunteerism among people for the causes they care about. A group of us wanted to continue this work and to reach out to more people. We find much joy and fulfilment in doing this so a small group of us decided to start a cafe in the hope of it becoming a museum to showcase the work we have done.",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d12969029-Reviews-Love_Pal_Cafe-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d12969029-Love_Pal_Cafe-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "cafe",
              "name": "Café"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            null
          ],
          "phone": "+65 6338 1884",
          "website": "https://www.facebook.com/lovepal.cafe/",
          "address_obj": {
            "street1": "8 Queen Street 8q",
            "street2": null,
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "188535"
          },
          "address": "8 Queen Street 8q, Singapore 188535 Singapore",
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "5379",
              "name": "Chinese"
            },
            {
              "key": "10654",
              "name": "European"
            },
            {
              "key": "10659",
              "name": "Asian"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "12350907",
          "name": "Supreme Vege",
          "latitude": "1.29756",
          "longitude": "103.85225",
          "num_reviews": "5",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "150",
                "url": "https://media-cdn.tripadvisor.com/media/photo-l/0f/49/69/65/supreme-vege.jpg",
                "height": "150"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/0f/49/69/65/supreme-vege.jpg",
                "height": "50"
              },
              "original": {
                "width": "2048",
                "url": "https://media-cdn.tripadvisor.com/media/photo-o/0f/49/69/65/supreme-vege.jpg",
                "height": "1365"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/0f/49/69/65/supreme-vege.jpg",
                "height": "682"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/0f/49/69/65/supreme-vege.jpg",
                "height": "367"
              }
            },
            "is_blessed": true,
            "uploaded_date": "2017-05-16T12:13:05-0400",
            "caption": "Supreme Vege",
            "id": "256469349",
            "helpful_votes": "1",
            "published_date": "2017-05-19T12:32:34-0400",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.0899033546447754",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "4578",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#3,981 of 12,651 Restaurants in Singapore",
          "distance": "0.11133729590343402",
          "distance_string": "0.1 km",
          "bearing": "north",
          "rating": "4.5",
          "is_closed": false,
          "open_now_text": "Closed Now",
          "is_long_closed": false,
          "price_level": "$$ - $$$",
          "price": "SGD 14 - SGD 65",
          "neighborhood_info": [
            {
              "location_id": "15622370",
              "name": "Rochor"
            },
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622525",
              "name": "Victoria"
            }
          ],
          "description": "Our business philosophies are to provide healthy and delicious vegetarian food for the diners, to listen carefully to the feedback from customers, from improving food and service quality, and to create a new vegetarian enjoyment.",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d12350907-Reviews-Supreme_Vege-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d12350907-Supreme_Vege-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [
            {
              "key": "sit_down",
              "name": "Sit down"
            }
          ],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            {
              "id": "661359431",
              "lang": null,
              "location_id": "0",
              "published_date": "2022-10-12T04:37:42-04:00",
              "published_platform": "Desktop",
              "rating": "5",
              "type": "review",
              "helpful_votes": "0",
              "url": "https://www.tripadvisor.com/ShowUserReviews?src=661359431#review661359431",
              "travel_date": null,
              "text": null,
              "user": null,
              "title": "Birthday Dinner",
              "owner_response": null,
              "subratings": [],
              "machine_translated": false,
              "machine_translatable": false
            }
          ],
          "phone": "+65 6238 5085",
          "website": "http://supremevege.sg",
          "email": "enquirysupremevege@gmail.com",
          "address_obj": {
            "street1": "12 Queen Street #02-03 Hotel Royal @ Queens",
            "street2": "Hotel Royal @ Queens",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "188553"
          },
          "address": "12 Queen Street #02-03 Hotel Royal @ Queens Hotel Royal @ Queens, Singapore 188553 Singapore",
          "hours": {
            "week_ranges": [
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ],
              [
                {
                  "open_time": 690,
                  "close_time": 900
                },
                {
                  "open_time": 1050,
                  "close_time": 1290
                }
              ]
            ],
            "timezone": "Asia/Singapore"
          },
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "5379",
              "name": "Chinese"
            },
            {
              "key": "10659",
              "name": "Asian"
            },
            {
              "key": "10679",
              "name": "Healthy"
            },
            {
              "key": "10714",
              "name": "Singaporean"
            }
          ],
          "dietary_restrictions": [],
          "booking": {
            "provider": "Deliveroo",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Deliveroo&src=150844523&geo=12350907&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=28960&bucket=870004&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=PjyGMHpmmLHdUUGK0tDcItA3MDK5QbcculF3Js_LKovScVhnC0yV22k_tHi06YFqNGi9I6nuBPmXmunT2F7Y2dn27YaMrnd7nbVO3e_2Lwk&cs=177bc5029f3ae0b048f1e40e4a934249c"
          },
          "reserve_info": {
            "id": "12350907",
            "provider": "Deliveroo",
            "provider_img": "https://static.tacdn.com/img2/eateries/deliveroo_05.06.2019.png",
            "url": "https://www.tripadvisor.com/Commerce?p=Restaurants_Deliveroo&src=150844523&geo=12350907&from=api&area=reservation_button&slot=1&matchID=1&oos=0&cnt=1&silo=28960&bucket=870004&nrank=1&crank=1&clt=R&ttype=Restaurant&tm=245475462&managed=false&capped=false&gosox=PjyGMHpmmLHdUUGK0tDcItA3MDK5QbcculF3Js_LKovScVhnC0yV22k_tHi06YFqNGi9I6nuBPmXmunT2F7Y2dn27YaMrnd7nbVO3e_2Lwk&cs=177bc5029f3ae0b048f1e40e4a934249c",
            "booking_partner_id": null,
            "racable": false,
            "api_bookable": false,
            "timeslots": null,
            "bestoffer": null,
            "timeslot_offers": null,
            "button_text": "Order Online",
            "disclaimer_text": null,
            "banner_text": null
          },
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "23387288",
          "name": "Shinsora",
          "latitude": "1.296244",
          "longitude": "103.85307",
          "num_reviews": "2",
          "timezone": "Asia/Singapore",
          "location_string": "Singapore",
          "photo": {
            "images": {
              "small": {
                "width": "250",
                "url": "https://media-cdn.tripadvisor.com/media/photo-f/21/fb/bf/82/caption.jpg",
                "height": "141"
              },
              "thumbnail": {
                "width": "50",
                "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/fb/bf/82/caption.jpg",
                "height": "50"
              },
              "original": {
                "width": "1280",
                "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/fb/bf/82/caption.jpg",
                "height": "720"
              },
              "large": {
                "width": "1024",
                "url": "https://media-cdn.tripadvisor.com/media/photo-w/21/fb/bf/82/caption.jpg",
                "height": "576"
              },
              "medium": {
                "width": "550",
                "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/fb/bf/82/caption.jpg",
                "height": "309"
              }
            },
            "is_blessed": false,
            "uploaded_date": "2022-01-30T07:34:22-0500",
            "caption": "",
            "id": "570146690",
            "helpful_votes": "0",
            "published_date": "2022-01-30T07:34:22-0500",
            "user": {
              "user_id": null,
              "member_id": "0",
              "type": "user"
            }
          },
          "awards": [],
          "doubleclick_zone": "as.singapore.singapore_city",
          "preferred_map_engine": "default",
          "raw_ranking": "3.074826240539551",
          "ranking_geo": "Singapore",
          "ranking_geo_id": "294265",
          "ranking_position": "5073",
          "ranking_denominator": "11075",
          "ranking_category": "restaurant",
          "ranking": "#4,425 of 12,651 Restaurants in Singapore",
          "distance": "0.11207207909040476",
          "distance_string": "0.1 km",
          "bearing": "east",
          "rating": "5.0",
          "is_closed": false,
          "is_long_closed": false,
          "price_level": "",
          "neighborhood_info": [
            {
              "location_id": "15622378",
              "name": "Central Area/City Area"
            },
            {
              "location_id": "15622412",
              "name": "City Hall"
            },
            {
              "location_id": "15622369",
              "name": "Downtown Core/Downtown Singapore"
            }
          ],
          "description": "",
          "web_url": "https://www.tripadvisor.com/Restaurant_Review-g294265-d23387288-Reviews-Shinsora-Singapore.html",
          "write_review": "https://www.tripadvisor.com/UserReview-g294265-d23387288-Shinsora-Singapore.html",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "city",
                  "name": "City"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294265"
            },
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "category": {
            "key": "restaurant",
            "name": "Restaurant"
          },
          "subcategory": [],
          "parent_display_name": "Singapore",
          "is_jfy_enabled": false,
          "nearest_metro_station": [],
          "reviews": [
            null
          ],
          "phone": "+65 8737 4366",
          "website": "http://shinsora.sg",
          "address_obj": {
            "street1": "331 North Bridge Road Odeon Towers",
            "street2": "01-04 Odeon Towers",
            "city": "Singapore",
            "state": null,
            "country": "Singapore",
            "postalcode": "188720"
          },
          "address": "331 North Bridge Road Odeon Towers 01-04 Odeon Towers, Singapore 188720 Singapore",
          "is_candidate_for_contact_info_suppression": false,
          "cuisine": [
            {
              "key": "5473",
              "name": "Japanese"
            },
            {
              "key": "10643",
              "name": "Seafood"
            },
            {
              "key": "10653",
              "name": "Sushi"
            }
          ],
          "dietary_restrictions": [],
          "establishment_types": [
            {
              "key": "10591",
              "name": "Restaurants"
            }
          ]
        },
        {
          "location_id": "294265",
          "ad_position": "inline2",
          "ad_size": "8X8",
          "doubleclick_zone": "as.singapore.singapore_city",
          "ancestors": [
            {
              "subcategory": [
                {
                  "key": "country",
                  "name": "Country"
                }
              ],
              "name": "Singapore",
              "abbrv": null,
              "location_id": "294262"
            }
          ],
          "detail": "0",
          "page_type": "restaurants",
          "mob_ptype": "app_restaurants"
        }
      ];
    },

    handleTriggerAdd() {
      this.trigger += 1
    },
    handleTriggerRemove() {
      this.trigger -= 1
    },
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      console.log("removeCardFromDeck");
      this.visibleCards.shift();
      this.post.shift();
    },
  }
};
</script>
  
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  width: calc(100vw - 16px);
  height: 500px;
  align-items: center;
}

.heart {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  