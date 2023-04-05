import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { CardType } from "./components/types";
import { fetchData } from "./utils/fetchData";
import styled from "styled-components";

const Main = styled.div`
  width: 1280px;
  margin: 0 auto;
  font-family: "Plus Jakarta Sans";
`;

const ToolBar = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: 25px;
`;

const MainCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SortButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 120px;
  height: 40px;
  background: #3563e9;
  border-radius: 4px;
  margin-left: 10px;
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

  const onChangeClick = (id: number, text: string, field: keyof CardType) => {
    setData(
      data.map((item) => {
        if (item.id === id) return { ...item, [field]: text };
        return item;
      })
    );
  };

  return (
    <Main>
      <ToolBar>
        <div>
          <span>Card List</span>
        </div>
        <ButtonWrapper>
          <SortButton onClick={() => sortByAtr("year")}>
            Sort by year
          </SortButton>
          <SortButton onClick={() => sortByAtr("price")}>
            Sort by price
          </SortButton>
        </ButtonWrapper>
      </ToolBar>
      <MainCard>
        {data.length > 0
          ? data.map((item) => (
              <Card
                key={item.id}
                {...item}
                onDeleteClick={() => onClickDelete(item.id)}
                onChangeClick={onChangeClick}
              />
            ))
          : "Loading"}
      </MainCard>
      <Footer>{data.length} Cars</Footer>
    </Main>
  );
};

export default App;
