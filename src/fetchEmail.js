const getEmail = async (value) => {
  const url = `https://www.gravatar.com/avatar/${value}`;
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getEmail;
