import { Pressable, Text, TextInput, View } from "react-native";
import { Controller } from "react-hook-form";
import styles from "../../assets/styles/styles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { getHoursMinutes } from "@/helpers/formatDate";

export default function Input({
  name,
  label,
  control,
  rules,
  type = "",
  customClass,
  labelClass,
  clearable,
  maxLength,
  dateMode,
  ...rest
}) {
  // const labelBackgroundColor = useSharedValue('transparent');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onInputPress = () => {
    console.log("input press");
    if (type === "date") {
      setShow((v) => !v);
    }
  };

  return (
    <Controller
      render={({ field: { onChange, value }, fieldState }) => (
        <View style={{ width: "100%", marginVertical: 15 }}>
          <View style={[styles?.inputLabel, { alignSelf: "flex-start" }]}>
            <Text style={[{ color: "grey", fontSize: 22 }, labelClass]}>
              {label}
            </Text>
          </View>
          <View style={{ width: "100%", height: 54.5 }}>
            <TextInput
              style={[
                styles.input,
                customClass,
                clearable ? { paddingRight: 40 } : {},
              ]}
              error={fieldState?.error?.message}
              value={value || ""}
              label={label || ""}
              onPress={onInputPress}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={type === "password"}
              maxLength={maxLength || 255}
              {...{
                ...fieldState,
                ...rest,
              }}
            />
            {type === "date" && show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={dateMode}
                is24Hour={true}
                onChange={(e, value) => {
                  setDate(value);
                  setShow(false);
                  onChange(getHoursMinutes(value));
                }}
              />
            )}
            {clearable && (
              <Pressable
                onPress={() => {
                  onChange("");
                }}
                style={styles?.clearButton}
              >
                <Ionicons size={24} name={"close-circle"} />
              </Pressable>
            )}
          </View>

          <Text style={[{ fontSize: 15, color: "#fa2424" }]}>
            {fieldState?.error?.message}
          </Text>
        </View>
      )}
      rules={rules}
      control={control}
      name={name}
    />
  );
}
