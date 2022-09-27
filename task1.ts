(async () => {
  interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  }

  interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    origin: { name: string; url: string };
    location: { name: string; url: string };
    episode: string[];
    url: string;
    created: string;
  }

  interface INormalizedEpisode extends Omit<IEpisode, 'characters'> {
    characters: ICharacter[];
  }

  interface IResponseData {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: IEpisode[];
  }

  const replaceCharacters = (characters: string[]): Promise<ICharacter[]> =>
    Promise.all(
      characters.map(async (url: string) => {
        const res = await fetch(url);
        const character = await res.json();
        return character;
      })
    );

  const normalizeEpisodes = (episodes: IEpisode[]): Promise<INormalizedEpisode[]> =>
    Promise.all(
      episodes.map(async (episode) => {
        const characters = await replaceCharacters(episode.characters);
        return { ...episode, characters };
      })
    );

  const getEpisodes = async () => {
    let episodes: INormalizedEpisode[] = [];

    const helper = async (address: string) => {
      const response = await fetch(address);
      const data: IResponseData = await response.json();

      const newEpisodes = await normalizeEpisodes(data.results);
      episodes = episodes.concat(newEpisodes);
      if (data.info.next) {
        await helper(data.info.next);
      }
    };

    await helper('https://rickandmortyapi.com/api/episode');
    return episodes;
  };

  const episodes = await getEpisodes();

  console.log(episodes);
})();
