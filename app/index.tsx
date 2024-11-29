import { useEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";

export default function Index() {
	const [characters, setCharacters] = useState<any>(null);

	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then((res) => res.json())
			.then((data) => setCharacters(data));
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "flex-start",
				alignItems: "center",
			}}
		>
			{characters?.results && (
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
			)}
		</View>
	);
}
