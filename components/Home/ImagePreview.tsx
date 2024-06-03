import * as FileSystem from "expo-file-system";
import { useCallback, useRef } from "react";
import { Text } from "react-native";
import { captureRef } from "react-native-view-shot";
import { Logo } from "../../assets/svg/Logo";
import { BlurView } from "expo-blur";
import { Button, ButtonVariant } from "@/components/Button";
import { EnergyValues } from "./EnergyValues";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKeys } from "@/constants/storageKeys";
import { IMAGE_HEIGHT } from "@/constants/ui";
import { filePaths } from "@/constants/filePaths";

const data = {
  title: "Omletas su Varške",
  energyValue: { calories: 100, protein: 10, fat: 10, carbs: 10 },
};

type ImagePreviewProps = { photo: string; removePhoto: () => void };

export const ImagePreview = ({ photo, removePhoto }: ImagePreviewProps) => {
  const viewRef = useRef(null);

  const captureAndSave = useCallback(async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });

      const dirPath = filePaths.mealImages;
      await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });

      const filePath = dirPath + `captured-image-${Math.random()}.png`;

      await FileSystem.writeAsStringAsync(filePath, uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const value = await AsyncStorage.getItem(storageKeys.IMAGE_URI);
      const updatedValue = value ? [...JSON.parse(value), uri] : [uri];
      await AsyncStorage.setItem(
        storageKeys.IMAGE_URI,
        JSON.stringify(updatedValue)
      );
    } catch (error) {
      console.error("Error capturing and saving image:", error);
    } finally {
      removePhoto();
    }
  }, [removePhoto, viewRef]);

  return (
    <Container>
      <Preview>
        <CaptureContainer collapsable={false} ref={viewRef}>
          <ImageBackground source={{ uri: photo }}>
            <LogoContainer>
              <Logo width={24} height={24} />
            </LogoContainer>
            <BlurViewContainer intensity={25}>
              <Title>{data.title}</Title>
              <EnergyValues />
            </BlurViewContainer>
          </ImageBackground>
        </CaptureContainer>
      </Preview>
      <Buttons>
        <Button variant={ButtonVariant.Secondary} onPress={removePhoto}>
          Redo Photo
        </Button>
        <Button onPress={captureAndSave}>Save</Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex: 1;
  gap: 16px;
`;

const Preview = styled.View`
  align-items: center;
  justify-content: center;
`;

const CaptureContainer = styled.View`
  height: ${IMAGE_HEIGHT}px;
  width: 100%;
  padding: 4px;
  border-radius: 2px;
  flex-direction: row;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LogoContainer = styled.View`
  width: 100%;
  align-items: flex-end;
  padding: 16px;
`;

const ImageBackground = styled.ImageBackground`
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;

const Buttons = styled.View`
  gap: 4px;
`;

const BlurViewContainer = styled(BlurView)`
  padding: 8px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;
