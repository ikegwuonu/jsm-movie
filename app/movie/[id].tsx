import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MovieInfoProps {
  label: string;
  value: string | number | null | undefined;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5 px-5">
    <Text className="text-white font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error,
  } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className="bg-blue-900 flex-1 items-center justify-center">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] "
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime} min</Text>
          </View>
          <View className="bg-dark-100 p-2 rounded-md gap-x-1 mt-2 flex-row items-center">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-xs font-bold ">
              {Math.round(movie?.vote_average || 0)}out of 10
            </Text>
            <Text className="text-light-200 text-xs font-bold ">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.join(", ") || "N/A"}
          />
          <MovieInfo label="Language" value={movie?.original_language} />
          <View className="flex flex-row justify-between w-1/2 ">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget || 1 / 1000000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${movie?.revenue || 1 / 1000000} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies.map((item) => item.name).join("-") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-10 left-0 right-0 bg-purple-500 rounded-lg px-4 py-3.5 flex justify-center z-50 flex-row items-center gap-x-2">
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={"#fff"}
        />
        <Text className="font-semibold text-white text-base">Go aback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
