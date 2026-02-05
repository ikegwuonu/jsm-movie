import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,

          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            </>
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            </>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            </>
          ),
        }}
      /> */}
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,

          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} icon={icons.save} title="Saved" />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
const TabIcon = ({ focused, icon, title }: any) =>
  focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-fit object-center  bg-center px-2 min-h-full h-full mt-4 items-center justify-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor={"#151312"} className="size-4" />
      <Text className="text-white text-sm font-semibold ">{title}</Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full h-full">
      <Image source={icon} tintColor={"#a8b5db"} className="size-5" />
      <Text className="text-white">{title}</Text>
    </View>
  );
