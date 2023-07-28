import React from "react";
import { Text } from "react-native";
import { DateTimeFormatterProps } from "./DateTimeFormatterProps";

export function DateTimeFormatter(props: DateTimeFormatterProps): JSX.Element {
  const {
    value,
    style,
  } = props;

  const formattedDate = value.toLocaleDateString(
    "ru-RU",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).split(".").reverse().join("-");

  const formattedTime = value.toLocaleTimeString("ru-RU")
    .split(":")
    .slice(0, -1)
    .join(":");

  return (
    <Text style={style}>
      {formattedDate}
      {" at "}
      {formattedTime}
    </Text>
  );
}