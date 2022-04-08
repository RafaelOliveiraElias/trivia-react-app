const getCategories = async () => {
  const url = 'https://opentdb.com/api_category.php';
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCategories;
