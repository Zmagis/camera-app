import React, { memo } from "react";
import { GestureResponderEvent, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

type ButtonProps = TouchableOpacityProps & {
  variant?: ButtonVariant;
  onPress: (event: GestureResponderEvent) => void;
};

export const Button = memo<ButtonProps>(
  ({
    disabled,
    children,
    variant = ButtonVariant.Primary,
    onPress,
    ...rest
  }) => (
    <Container
      variant={variant}
      disabled={disabled}
      style={rest.style}
      onPress={onPress}
    >
      <Text>{children}</Text>
    </Container>
  )
);

const Container = styled.TouchableOpacity<{
  width?: number;
  disabled?: boolean;
  variant: ButtonVariant;
}>`
  padding: 12px 14px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled, theme, variant }) =>
    disabled
      ? theme.colors.disabled
      : variant === ButtonVariant.Primary
      ? theme.colors.primary
      : theme.colors.secondary};
  width: ${({ width }) => (width ? `${width}%` : "undefined")};
`;

const Text = styled.Text`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.lightText};
`;
