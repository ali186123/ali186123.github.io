import { StyleSheet } from "react-native";
import { colors } from "@styles";

export const initialScreenPageStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  loader: {
    marginTop: "50%",
  },
});
