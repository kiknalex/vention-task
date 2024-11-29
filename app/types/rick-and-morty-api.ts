type Origin = {
	name: string;
	url: string;
};

type CharacterLocation = {
	name: string;
	url: string;
};

type Character = {
	id: number;
	name: string;
	status: "Alive" | "Dead" | "Unknown";
	species: string;
	type: string;
	gender: "Female" | "Male" | "Genderless" | "Unknown";
	origin: Origin;
	location: CharacterLocation;
	image: string;
	episode: string[];
	url: string;
	created: string;
};

type PaginationInfo = {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
};

type GetAllCharactersResponse = {
	info: PaginationInfo;
	results: Array<Character>;
};
