import React, { useEffect, useState } from "react";
const Characters = () => {
  const [chars, setChar] = useState(null);

  useEffect(() => {
    fetch("https://anapioficeandfire.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setChar(data);
      });
  }, []);

  return (
    <div className="characters">
      {chars &&
        chars.map((char, index) => (
          <div className="character" key={index}>
            <div className="details">
              <p>Character: {char.name + " , " + char.allias}</p>
              <p>Alive:</p>
              <p>🏘️: Book Country</p>
              <p>⏰: Release date</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Characters;
