export async function weatherFetch(city = "paris") {
  const data = await axios.get(
    `http://api.weatherstack.com/current?access_key=c80527f27e8886c0d4ba0c7cbce9652a&query=${city}`
  );
  return data.data.current;
}
