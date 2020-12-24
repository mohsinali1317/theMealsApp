import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
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

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
    },
  },
};

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: "Filters!!",
    // },
    defaultNavigationOptions: defaultNavigationOptions,
  }
);

const MealFabTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.accentColor,
        },
      });

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealFabTabNavigator,
      navigationOptions: { drawerLabel: "Meals" },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans",
      },
    },
  }
);

export default createAppContainer(MainNavigator);
