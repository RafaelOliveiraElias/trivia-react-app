const getQuestion = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getQuestion;
