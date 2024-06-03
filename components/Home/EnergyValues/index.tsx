import styled from "styled-components/native";
import { Item } from "./Item";

const data = {
  title: "Omletas su Varške",
  energyValue: { calories: 100, protein: 10, fat: 10, carbs: 10 },
};

export const EnergyValues = () => {
  return (
    <Container>
      <Item label="Kalorijos" value={`${data.energyValue.calories} kcal`} />
      <Item label="Baltymai" value={`${data.energyValue.protein}g`} />
      <Item label="Riebalai" value={`${data.energyValue.fat}g`} />
      <Item label="Angliavandeniai" value={`${data.energyValue.carbs}g`} />
    </Container>
  );
};

const Container = styled.View`
  padding: 4px;
  flex-direction: row;
  gap: 10px;
`;
