import styled from "styled-components/native";

type ImagePreviewProps = { label: string; value: string };

export const Item = ({ label, value }: ImagePreviewProps) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Container>
  );
};

const Container = styled.View``;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 10px;
`;

const Value = styled.Text`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 14px;
  font-weight: bold;
`;
