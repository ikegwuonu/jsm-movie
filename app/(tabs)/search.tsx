import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    reset,
    fetchData: refetch,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeoutid = setTimeout(() => {
      const func = async () => {
        if (searchQuery.trim()) {
          await refetch();
        } else {
          reset();
        }
      };
      func();
    }, 500);

    return () => clearTimeout(timeoutid);
  }, [searchQuery]);
  useEffect(() => {
    if (movies && movies.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary items-center justify-center relative ">
      <Image
        source={images.bg}
        className="absolute flex-1 w-full z-0 top-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5 w-full"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={() => (
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <Searchbar
                placeholder="Search movies"
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#fff"
                className="my-10 self-center"
              />
            )}
            {moviesError && (
              <Text className="text-white text-center mt-10 px-3">
                {typeof moviesError === "string"
                  ? moviesError
                  : moviesError?.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              movies &&
              movies.length > 0 &&
              searchQuery.trim() && (
                <Text className="text-xl text-white font-bold">
                  Search results for {""}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        )}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className="text-white text-center mt-10 px-3">
              {searchQuery.trim() ? "No movies found." : "Search for a movie"}
            </Text>
          ) : null
        }
      />
    </View>
  );
};

export default search;
