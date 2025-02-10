import React from "react";
import { Dimensions, Image, Platform, View } from "react-native";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

const ImagePreview = ({ image }: { image: string | null }) => {
  if (!image) return null;
  return (
    <View
      style={tw.style(
        "w-full items-center justify-center p-4 "
      )}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: width * 0.9,
          height: height * 0.4,
          borderRadius: 12,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: { elevation: 5 },
            web: { boxShadow: "0 2px 4px rgba(0,0,0,0.25)" },
          }),
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ImagePreview;
