import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function Index() {
	const [characters, setCharacters] = useState<Array<Character> | null>(null);
	const [nextCharactersUrl, setNextCharactersUrl] = useState<string | null>(
		null
	);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then((res) => {
				setTimeout(() => {
					// Artificially delay API response to show the loading spinner.
					res.json().then((data: GetCharactersResponse) => {
						setCharacters(data.results);
						setNextCharactersUrl(data.info.next);
					});
				}, 1000);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const fetchNextCharacters = () => {
		if (!nextCharactersUrl) {
			throw new Error("Something went wrong");
		}
		fetch(nextCharactersUrl)
			.then((res) => res.json())
			.then((data: GetCharactersResponse) => {
				setCharacters((prevCharacters) => [
					...prevCharacters!,
					...data.results,
				]);
				setNextCharactersUrl(data.info.next);
			})
			.catch((error) => console.error(error));
	};

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			// Artificially delay API response to show the refresh loading spinner.
			fetch("https://rickandmortyapi.com/api/character")
				.then((res) => {
					res.json().then((data: GetCharactersResponse) => {
						setCharacters(data.results);
						setNextCharactersUrl(data.info.next);
					});
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setRefreshing(false);
				});
		}, 1000);
	};
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{characters ? (
				<FlatList
					style={{ flex: 1, marginBlock: 20 }}
					data={characters}
					onEndReached={fetchNextCharacters}
					refreshing={refreshing}
					onRefresh={onRefresh}
					keyExtractor={(item) => String(item.id)}
					renderItem={(item) => (
						<>
							<Text
								style={{ textAlign: "center", marginBlock: 16, fontSize: 20 }}
							>
								{item.item.name}
							</Text>
							<Image
								style={{ marginBottom: 24 }}
								source={{ uri: item.item.image }}
								width={300}
								height={300}
							/>
						</>
					)}
				/>
			) : (
				<ActivityIndicator size="large" color="#000000" />
			)}
		</View>
	);
}
