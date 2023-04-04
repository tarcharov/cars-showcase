import React, { FC } from "react";
import { CardType } from "./types";
import styled from "styled-components";

const Main = styled.div`
  display: inline-grid;
  background: aquamarine;
  border: 2px solid black;
  width: 100%;
  color: black;
  margin: 0;
`;
const CardField = styled.div`
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  margin-left: 4px;
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
  return (
    <Main>
      <CardField>
        Название:
        <div>
          <Paragraph contentEditable>{name}</Paragraph>
        </div>
      </CardField>
      <CardField>
        Модель:{" "}
        <div>
          <Paragraph
            contentEditable
            onBlur={(e) =>
              onChangeClick(id, e.currentTarget.textContent ?? "", "model")
            }
          >
            {model}
          </Paragraph>
        </div>
      </CardField>
      <CardField>
        Год:
        <div>
          <Paragraph>{year}</Paragraph>{" "}
        </div>
      </CardField>
      <CardField>
        Цена:
        <div>
          <Paragraph contentEditable>{price}</Paragraph>
        </div>
      </CardField>
      <CardField>
        Цвет:
        <div>
          <Paragraph>{color}</Paragraph>
        </div>{" "}
      </CardField>
      <button onClick={onDeleteClick}>Delete</button>
    </Main>
  );
};

export default Card;
