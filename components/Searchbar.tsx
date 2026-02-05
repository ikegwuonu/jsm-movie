import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onPress?: () => void;
}
const Searchbar = ({ placeholder, onChangeText, value, onPress }: Props) => {
  return (
    <View className=" flex-row items-center bg-dark-200 rounded-full px-4 py-2">
      <Image
        source={icons.search}
        className="size-5 "
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onChangeText={onChangeText}
        value={value}
        className="flex-1 ml-2 text-white"
        placeholder={placeholder}
        placeholderTextColor={"#a8b5db"}
        onPress={onPress}
      />
    </View>
  );
};

export default Searchbar;
