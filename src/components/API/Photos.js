// const API = `https://api.pexels.com/v1/`;
// const API_KEY = "563492ad6f91700001000001385fc59db30e45b694ad2653bde5bc81";
const API = `https://api.unsplash.com/`;
const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";

const Photos = async (query) => {
  const res = await fetch(
    `${API}/search/photos?client_id=${API_KEY}&query=${query}&orientation=landscape`
  );
  const data = await res.json();
  console.log(data.results);
  return data.results;
};

export default Photos;
