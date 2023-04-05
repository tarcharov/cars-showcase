import React, { FC, useState } from "react";
import { CardType } from "./types";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #f6f7f9;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 25px;
  color: black;
`;
const CardField = styled.div`
  display: flex;
`;

const ColorBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ColorBlock = styled.div`
  width: 140px;
  height: 125px;
  margin: 33px 0;
  background: ${(props) => props.color};
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const PriceButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const ButtonDelete = styled.button`
  color: white;
  width: 120px;
  height: 50px;
  font-family: "Plus Jakarta Sans";
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.3px;
  border-width: 0;
  background: #e5714c;
  border-radius: 4px;
  cursor: pointer;
`;
const Error = styled.div`
  color: red;
  margin-top: 5px;
  font-weight: 500;
  font-size: 12px;
`;

const Field = styled.input<{ fontWeight: number; fontSize: string }>`
  font-family: "Plus Jakarta Sans";
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "black"};
  width: 100px;
  border: 1px solid transparent;
  border-radius: 8px;
  outline: none;
  transition: border-color 200ms ease-in-out;
  &:focus {
    border: 1px solid grey;
  }
`;
const Card: FC<CardType> = ({
  id,
  name,
  model,
  year,
  price,
  color,
  onDeleteClick,
  onChangeClick,
}) => {
  const [inputValueName, setInputValueName] = useState(name);
  const [inputValueModel, setInputValueModel] = useState(model);
  const [inputValuePrice, setInputValuePrice] = useState(`${price}`);
  const [priceError, setPriceError] = useState("");

  const onChangeHandler = (id: number, text: string, field: keyof CardType) => {
    if (Number(text)) {
      setPriceError("");
      setInputValuePrice(`${text}`);
      onChangeClick(id, text, field);
    } else if (text === "") {
      setPriceError("Поле не должно быть пустым");
    } else setPriceError("Поле должно содержать только цифры");
  };

  return (
    <Main>
      <CardField>
        <div>
          <Field
            fontWeight={500}
            fontSize={"20px"}
            value={inputValueName}
            onChange={(e) => setInputValueName(e.target.value)}
            onBlur={(e) => onChangeClick(id, e.target.value ?? "", "name")}
          />
          <p>
            <Field
              color={"#90A3BF"}
              fontWeight={500}
              fontSize={"14px"}
              value={inputValueModel}
              onChange={(e) => setInputValueModel(e.target.value)}
              onBlur={(e) => onChangeClick(id, e.target.value ?? "", "model")}
            />
          </p>
        </div>
      </CardField>
      <ColorBlockWrapper>
        <ColorBlock color={color}></ColorBlock>
      </ColorBlockWrapper>
      <CardField>
        <p style={{ color: "#90A3BF", fontWeight: "500", fontSize: "14px" }}>
          Y{year}
        </p>
      </CardField>
      <PriceButtonWrapper>
        <CardField>
          $
          <Field
            fontWeight={700}
            fontSize={"20px"}
            value={inputValuePrice}
            onChange={(e) => onChangeHandler(id, e.target.value ?? "", "price")}
          />
        </CardField>

        <ButtonDelete onClick={onDeleteClick}>Delete</ButtonDelete>
      </PriceButtonWrapper>
      {priceError !== "" && <Error>{priceError}</Error>}
    </Main>
  );
};

export default Card;
