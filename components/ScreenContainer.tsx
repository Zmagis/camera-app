import React, { memo } from "react";
import styled from "styled-components/native";
import { ScrollView, ScrollViewProps } from "react-native";
import { SCREEN_PADDING } from "@/constants/ui";

type ScreenContainerProps = ScrollViewProps;

export const ScreenContainer = memo<ScreenContainerProps>(
  ({ scrollEnabled, children }) => (
    <ScrollView
      scrollEnabled={scrollEnabled}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container>{children}</Container>
    </ScrollView>
  )
);

const Container = styled.View`
  height: 100%;
  padding-horizontal: ${SCREEN_PADDING.horizontal}px;
  padding-vertical: ${SCREEN_PADDING.vertical}px;
`;
