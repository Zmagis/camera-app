import React from "react";
import styled from "styled-components/native";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

export const Loader = () => <Text>Loading...</Text>;

const Text = styled.Text`
  color: ${({ theme }) => theme.textLight};
  font-weight: 700;
`;
