const fetchData = (inputFilter, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${inputFilter}&page=${page}&key=28372607-30c2f074d06c20b95d41a8fad&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
  });
};
export default fetchData;
