const max = 5;

const getQuestion = async (token, amount = max, plus = '') => {
  const url = `https://opentdb.com/api.php?amount=${amount}&token=${token}${plus}`;
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

const fetchAllQuestions = async (matrix = [{
  amount: 5,
  link: '',
}], token) => {
  const allLinks = matrix.reduce((acc, { type, difficulty, category, amount }) => {
    const matriz = [{ type }, { difficulty }, { category }];
    const linkGen = matriz.reduce((latest, each) => {
      if (Object.values(each)[0]) {
        let result = latest;
        result += `&${Object.keys(each)[0]}=${Object.values(each)[0]}`;
        return result;
      }
      return latest;
    }, '');
    const result = {
      amount, token, link: linkGen,
    };
    return [...acc, result];
  }, []);
  const promises = await Promise.all(
    allLinks.map((each) => getQuestion(each.token, each.amount, each.link)),
  );

  return promises;
};

export default fetchAllQuestions;
