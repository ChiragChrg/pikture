// const API = `https://api.pexels.com/v1/`;
// const API_KEY = "563492ad6f91700001000001385fc59db30e45b694ad2653bde5bc81";
const API = `https://api.unsplash.com/search/`;
const API_KEY = "UwYbM2BpadCTxoWKpeFHl8iw87xl3RAhc8uP3PWdyu0";

const Photos = async (query, orderBy, orientation) => {
  var URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20`;
  //Filtering Search parameters
  if (orderBy && orientation) {
    URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20&order_by=${orderBy}&orientation=${orientation}`;
  } else if (orderBy && !orientation) {
    URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20&order_by=${orderBy}`;
  } else if (orientation && !orderBy) {
    URL = `${API}photos?client_id=${API_KEY}&query=${query}&page=1&per_page=20&orientation=${orientation}`;
  }

  const res = await fetch(URL);
  const data = await res.json();
  // console.log(data.results);
  return data.results;
};

export default Photos;
