import { Pressable, Text } from "react-native";
import styles from "@/assets/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function BaseButton({
  title,
  icon,
  color,
  customBtnStyle,
  extraStyle,
  customTextStyle,
  customIconStyle,
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
      {icon && (
        <Ionicons
          style={customIconStyle}
          name={icon}
          size={28}
          color={color}
        ></Ionicons>
      )}
      {children}
    </Pressable>
  );
}
