import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";


function App() {
  const [obj, setObj] = useState([]);
  const [page, setpage] = useState(1);
  const [inputVal, setInputVal] = useState("");
  const [search, setSearch] = useState("");

  const handleScroll = (e) => {
    if (
      document.documentElement.scrollTop + window.innerHeight + 50 >=
      document.documentElement.offsetHeight
    ) {
      if (obj.length === page) setpage(page);
      else setpage((prev) => prev + 1);
    }
  };

  const filteredArray = obj?.filter((item) => {
    if (inputVal === "") return item;
    else if (item.Title.toLowerCase().includes(inputVal.toLowerCase()))
      return item;
  });
  async function getData() {
    if (inputVal === "") setSearch("");
   
    const res = await axios.get(
      `http://www.omdbapi.com/?apikey=538d003d&s=${
        search ? search : "Batman"
      }&page=${page}`
    );
    console.log(res.data);
    if (!search) setObj((prev) => [...prev, ...res.data.Search]);
    else setObj(res.data.Search);
  }

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, search, inputVal]);

  return (
    <div className="App">
      <div className="search">
      <input
        type="text"
        placeholder="search"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={() => setSearch(inputVal)}>search</button>
      </div>
      <div className="wrapper">
        

        {filteredArray?.map((elem) => (
          <div className="content">
            <div className="image">
              <img src={elem?.Poster} alt="" />
            </div>
            <div className="description">
              <h4>{elem?.Title}</h4>
              <h4>{elem?.Type}</h4>
              <h4>{elem?.Year}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;