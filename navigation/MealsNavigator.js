import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
      // navigationOptions: {
      //   headerStyle: {
      //     backgroundColor:
      //       Platform.OS === "android" ? Colors.primaryColor : "white",
      //   },
      //   headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
      // },
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const FavoritesStackNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultNavigationOptions,
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator, navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  },
}



const MealFabTabNavigator = Platform.OS === "android"
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: "white",
    shifting: true
  })
  : createBottomTabNavigator(tabScreenConfig
    , {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    });

export default createAppContainer(MealFabTabNavigator);
