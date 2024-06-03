import { CameraView } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import styled from "styled-components/native";
import { ImagePreview } from "./ImagePreview";
import { Button } from "@/components/Button";
import { Loader } from "../Loader";

export default function Camera() {
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const takePicture = useCallback(() => {
    setLoading(true);
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync({
        onPictureSaved: (photo) => {
          setPhoto(photo.uri);
          setLoading(false);
        },
      });
    }
  }, [cameraRef]);

  const removePhoto = useCallback(() => setPhoto(null), []);

  return (
    <Container>
      {loading && <Loader />}
      {!photo ? (
        <CameraContainer loading={loading}>
          <CameraInner ref={cameraRef} />
          <Button onPress={takePicture}>Take a Picture of your food</Button>
        </CameraContainer>
      ) : (
        <ImagePreview photo={photo} removePhoto={removePhoto} />
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const CameraContainer = styled.View<{ loading: boolean }>`
  flex: 1;
  gap: 8px;
  opacity: ${({ loading }) => (loading ? 0 : 1)};
`;

const CameraInner = styled(CameraView)`
  flex: 1;
`;
