import anyzaka from './anyzaka';

export default async () => {
	let blogs = [];

	for (const entry of anyzaka.entries) {
		blogs.push(
			...(await entry.fetcher
				.fetch(entry)
				.then((a) => {
					entry.page += 1;

					return a;
				})
				.catch((err) => {
					console.error(`Failed to fetch (${entry.name})`, err);

					return [];
				}))
		);
	}

	return blogs;
};
