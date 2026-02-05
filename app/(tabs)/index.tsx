import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/Searchbar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    error: trendingError,
    loading: trendingLoading,
  } = useFetch(() => getTrendingMovies());
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute min-w-full z-0 " />
      <ScrollView
        className="flex-1 px-5 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", marginBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>
            {typeof moviesError === "string"
              ? moviesError
              : moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              value=""
              onPress={() => router.push("/search")}
              placeholder="Search for movie"
            />
            {trendingMovies && trendingMovies?.length > 0 && (
              <View className="mt-5 mb-3">
                <Text className="text-lg font-bold text-white">
                  Trending movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"></View>}
                  className="my-4"
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, i) =>
                    item.movie_id.toString() + i.toString()
                  }
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 10,
                  marginBottom: 10,
                }}
                className="mt-2 mb-32"
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <MovieCard {...item} />}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
