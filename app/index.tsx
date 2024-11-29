import { useEffect, useState } from "react";
import { Text, View, FlatList, Image, ActivityIndicator } from "react-native";

export default function Index() {
	const [characters, setCharacters] = useState<GetAllCharactersResponse | null>(
		null
	);

	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character").then((res) => {
			setTimeout(() => {
				// Artificially delay API response to show the loading spinner.
				res.json().then((data) => setCharacters(data));
			}, 1000);
		});
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{characters?.results ? (
				<FlatList
					style={{ flex: 1, marginBlock: 20 }}
					data={characters.results}
					renderItem={(item) => (
						<>
							<Text
								style={{ textAlign: "center", marginBlock: 16, fontSize: 20 }}
							>
								{item.item.name}
							</Text>
							<Image
								style={{ flex: 1, marginBottom: 24 }}
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
