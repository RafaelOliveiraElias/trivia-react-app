const max = 5;
const getQuestion = async (token, amount = max, plus = '') => {
  const url = `https://opentdb.com/api.php?amount=${amount}&token=${token}${plus}`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getQuestion;
