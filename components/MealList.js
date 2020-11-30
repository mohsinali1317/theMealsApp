import React from "react";
import {
  StyleSheet,
   View,
  FlatList
} from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {

  const renderMealItem = (itemData) => {
    const item = itemData.item;
    return (
      <MealItem
        title={item.title}
        duration={item.duration}
        complexity={item.complexity}
        affordability={item.affordability}
        image={item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { mealId: item.id },
          });
        }}
      />
    );
  };

    return (
      <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "95%" }}
      />
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    list: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  export default MealList;