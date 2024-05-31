import { Pressable, Text } from "react-native";
import styles from "@/assets/styles/styles";
export default function BaseButton({
  title,
  customBtnStyle,
  extraStyle,
  customTextStyle,
  onPress,
  children,
  testID = "",
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[customBtnStyle ? customBtnStyle : styles.baseButton, extraStyle]}
      testID={testID}
    >
      {title && (
        <Text style={customTextStyle ? customTextStyle : styles.baseButtonText}>
          {title}
        </Text>
      )}
      {children}
    </Pressable>
  );
}
