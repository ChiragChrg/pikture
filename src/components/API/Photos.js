const Photos = async (query, orderBy, orientation) => {
  const API = `https://api.unsplash.com/search/`;
  const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";

  var URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20&order_by=${orderBy}&orientation=${orientation}`;

  const res = await fetch(URL);
  const data = await res.json();
  console.log(data.results);
  return data.results;
};

export default Photos;
