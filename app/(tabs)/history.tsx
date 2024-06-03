import { Image as ImageComponent } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ScreenContainer } from "@/components/ScreenContainer";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKeys } from "@/constants/storageKeys";
import { useSegments } from "expo-router";
import { Loader } from "@/components/Loader";
import styled from "styled-components/native";
import { IMAGE_HEIGHT } from "@/constants/ui";

export default function TabTwoScreen() {
  const segments = useSegments();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);

      const value = await AsyncStorage.getItem(storageKeys.IMAGE_URI);

      setImages(value ? JSON.parse(value) : []);
      setLoading(false);
    } catch (error) {
      console.error("Error reading directory:", error);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [segments]);

  return (
    <ScreenContainer>
      {loading ? (
        <Loader />
      ) : (
        <FlashList
          data={images}
          renderItem={({ item }) => <Image src={item} />}
          estimatedItemSize={200}
        />
      )}
      {images.length === 0 && (
        <EmptyState>You don't have images yet</EmptyState>
      )}
    </ScreenContainer>
  );
}

const Image = styled(ImageComponent)`
  margin-bottom: 8px;
  height: ${IMAGE_HEIGHT}px;
  width: 100%;
`;

const EmptyState = styled.Text`
  text-align: center;
  height: 100%;
`;
