import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HouseName from "./HouseName";

const HouseDetail = () => {
  const { id } = useParams();
  const [house, setHouse] = useState({});

  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = async (id) => {
    await fetch("https://anapioficeandfire.com/api/houses/" + id)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data);
      });
  };

  useEffect(() => {
    console.log(house);
  });

  const showData = (accessor) => {
    const value = house[accessor];
    if (value && value.length > 0) return value;
    else return "-";
  };

  return (
    <Container>
      <Row>
        <h2>House Details</h2>
      </Row>
      <Col className="info-area">
        <Row>
          <Col>
            <h3>Name of the House</h3>
          </Col>
          <Col>
            <p>{house.name}</p>
          </Col>
          <Col>
            <h3>Region</h3>
          </Col>
          <Col>{house.region}</Col>
        </Row>
        <Row>
          <Col>
            <h3>Coat of Arms</h3>
          </Col>
          <Col>{house.coatOfArms}</Col>
          <Col>
            <h3>Words</h3>
          </Col>
          <Col>{house.words}</Col>
        </Row>
        <Row>
          <Col lg="3">
            <h3>Titles</h3>
          </Col>
          <Col>{house.titles && house.titles.map((item, index) => (<span className="mr-2">{index+1 + "-" + item}</span>))}</Col>
        </Row>
        <Row>
          <Col lg="3">
            <h3>Seats</h3>
          </Col>
          <Col>{house.seats}</Col>
        </Row>
        <Row>
          <Col>
            <h3>Has died out</h3>
          </Col>
          <Col>{showData("diedOut")}</Col>
          <Col>
            <h3>Has overlord</h3>
          </Col>
          <Col><HouseName url={showData("overlord")}/></Col>
        </Row>
        <Row className="border-0">
          <Col lg="3">
            <h3>Number of Cadet Branches</h3>
          </Col>
          <Col>{house.cadetBranches && house.cadetBranches.map((item) =>(<HouseName url={item}/>))}</Col>
        </Row>
      </Col>
    </Container>
  );
};

export default HouseDetail;
