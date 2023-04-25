export async function weatherFetch(city = "paris") {
  const data = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=5680d560d45e4714b7a141135232302&q=${city}`
  );
  console.log(data);
  return data.data.current;
}
