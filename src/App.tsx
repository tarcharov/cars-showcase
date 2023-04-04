import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { CardType } from "./components/types";
import { fetchData } from "./utils/fetchData";
import styled from "styled-components";

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const CardWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 100%;
`;
const App = () => {
  const [data, setData] = useState<CardType[]>([]);

  useEffect(() => {
    fetchData("https://test.tspb.su/test-task/vehicles").then((res) =>
      setData(res)
    );
  }, []);

  const sortByAtr = (atr: keyof CardType) => {
    setData([...data].sort((a, b) => (a[atr] >= b[atr] ? 1 : -1)));
  };

  const onClickDelete = (itemId: number) => {
    setData((prev) => prev.filter((item) => item.id !== itemId));
  };

  const onChangeClick = (
    id: number,
    text: string | null,
    field: keyof CardType
  ) => {
    setData(
      data.map((item) => {
        if (item.id === id) return { ...item, [field]: text };
        return item;
      })
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => sortByAtr("year")}>Sort by year</button>
        <button onClick={() => sortByAtr("price")}>Sort by price</button>
      </div>
      <Main>
        {data.length > 0
          ? data.map((item) => (
              <CardWrapper>
                <Card
                  key={item.id}
                  {...item}
                  onDeleteClick={() => onClickDelete(item.id)}
                  onChangeClick={onChangeClick}
                />
              </CardWrapper>
            ))
          : "Loading"}
      </Main>
    </div>
  );
};

export default App;
