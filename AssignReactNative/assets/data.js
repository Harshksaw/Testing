import imageOne from "./images/one.jpeg";
import imageTwo from "./images/two.jpeg";
import imageThree from "./images/three.jpeg";
import imageFour from "./images/four.jpg";
import imageFive from "./images/five.jpeg";
import imageSix from "./images/six.jpeg";
import imageSeven from "./images/seven.jpeg";
import imageEight from "./images/eight.jpeg";
export const data = [
    {
      "Dish": "Paneer Tikka",
      "RestaurantName": "Spice Garden",
      "ImageUrl": imageOne,
      "Type": {
        "nonveg": false,
        "veg": true,
        "Indian": true,
        "italian": false,
        "category": "restaurant" // New category property
      }
    },
    {
      "Dish": "Margherita Pizza",
      "RestaurantName": "Pizza Hut",
      "ImageUrl": imageTwo,
      "Type": {
        "nonveg": false,
        "veg": true,
        "Indian": false,
        "italian": true,
        "category": "cooking" // New category property
      }
    },
    {
      "Dish": "Butter Chicken",
      "RestaurantName": "Punjabi Tadka",
      "ImageUrl": imageThree,
      "Type": {
        "nonveg": true,
        "veg": false,
        "Indian": true,
        "italian": false,
        "category": "restaurant" // New category property
      }
    },
    {
      "Dish": "Pasta Alfredo",
      "RestaurantName": "Café Milano",
      "ImageUrl": imageFour,
      "Type": {
        "nonveg": false,
        "veg": true,
        "Indian": false,
        "italian": true,
        "category": "cooking" // New category property
      }
    },
    {
      "Dish": "Chicken Biryani",
      "RestaurantName": "Paradise Biryani",
      "ImageUrl": imageFive,
      "Type": {
        "nonveg": true,
        "veg": false,
        "Indian": true,
        "italian": false,
        "category": "restaurant" // New category property
      }
    },
    {
      "Dish": "Caprese Salad",
      "RestaurantName": "Green Leaf",
      "ImageUrl": imageSix,
      "Type": {
        "nonveg": false,
        "veg": true,
        "Indian": false,
        "italian": true,
        "category":  "cooking"// New category property
      }
    },
    {
      "Dish": "Fish Curry",
      "RestaurantName": "Coastal Delight",
      "ImageUrl": imageSeven,
      "Type": {
        "nonveg": true,
        "veg": false,
        "Indian": true,
        "italian": false,
        "category": "restaurant" // New category property
      }
    },
    {
      "Dish": "Mushroom Risotto",
      "RestaurantName": "Trattoria Bella",
      "ImageUrl": imageEight,
      "Type": {
        "veg": true,
        "nonveg": false,
        "Indian": false,
        "italian": true,
        "category":  "cooking" // New category property
      }
    }
  ];
  