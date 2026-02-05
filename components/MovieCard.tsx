import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// interface Props {
//   id?: string;
//   poster_path?: string;
//   onPress?: () => void;
//   release_date?: string;
//   vote_average?: number;
//   title?: string;
// }

const MovieCard = ({
  id,
  poster_path,
  vote_average,
  release_date,
  title,
}: Movie) => {
  return (
    <Link
      asChild
      href={{ pathname: "/movie/[id]", params: { id } }}
      className="w-1/3  mb-2"
    >
      <TouchableOpacity className="w-[31%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placeholder.co/600*400/aaa/ffffff.png`,
          }}
          className="w-full h-44 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2 " numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center mt-1 justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-xs font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center mt-1 justify-between gap-x-1">
          <Text className="text-xs text-light-300 font-medium ">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
