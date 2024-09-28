import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";
import logo from "../../images/logo.png";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const [placeholderText, setPlaceholderText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [fullText, setFullText] = useState('Search a Product...');
  const [charIndex, setCharIndex] = useState(0);

  const placeholderOptions = useMemo(() => [
    'Search a Product...',
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharIndex((prevCharIndex) => {
        const newCharIndex = (prevCharIndex + 1) % (fullText.length + 1);
        if (newCharIndex === 0) {
          setTextIndex((prevTextIndex) => (prevTextIndex + 1) % placeholderOptions.length);
          setFullText(placeholderOptions[(textIndex + 1) % placeholderOptions.length]);
        }
        return newCharIndex;
      });
    }, 100); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [charIndex, fullText, textIndex, placeholderOptions]);

  useEffect(() => {
    setPlaceholderText(fullText.substring(0, charIndex));
  }, [charIndex, fullText]);

  return (
    <>
      <MetaData title="Search Product --- FabSurat" />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
         {/* Add the logo that links to the home page */}
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="FabSurat Logo" className="search-logo" />
        </Link>
      </div>
        <input
          type="text"
          placeholder={placeholderText}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
