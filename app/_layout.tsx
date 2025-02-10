import { Stack } from "expo-router";
import React, { useState } from "react";
import { UserDetail, UserDetailContext } from "../context/UserDetailContext/index";
import "./global.css";

export default function RootLayout() {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      </Stack>
    </UserDetailContext.Provider>
  );
}
