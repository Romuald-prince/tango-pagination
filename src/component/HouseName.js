import React,{useState,useEffect} from "react";

const HouseName = (props) => {
  const [house, setHouse] = useState({});

  useEffect(() => {
    fetchData(props.url);
    
  }, []);

  const fetchData = async (url) => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data);
      });
  };

  return <p>{house.name}</p>;
};
export default HouseName;
