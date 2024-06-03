import { Button } from "@/components/Button";
import { useCameraPermissions } from "expo-camera";
import Camera from "@/components/Home/Camera";
import styled from "styled-components/native";
import { ScreenContainer } from "@/components/ScreenContainer";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <Container>
        <Text>Ooops Something went wrong</Text>
      </Container>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenContainer>
        <Container>
          <Text>We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>Grant permission</Button>
        </Container>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Camera />
    </ScreenContainer>
  );
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 16px;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 20px;
`;
