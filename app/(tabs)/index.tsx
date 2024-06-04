import { Dimensions, Pressable, Text, View } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/form/Input";
import { useForm } from "react-hook-form";
import styles from "@/assets/styles/styles";
import BaseButton from "@/components/form/BaseButton";
import {
  getFromStorage,
  getSensetiveData,
  removeFromStorage,
  removeSensetiveData,
  setInStorage,
  storeSensetiveData,
} from "@/helpers/storage";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { schedulePushNotification } from "@/tools/Notifications";
import { FlashList } from "@shopify/flash-list";
import { useIsFocused } from "@react-navigation/core";
import { Link, router } from "expo-router";
import * as Notifications from "expo-notifications";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      // email: "i@rdbx.ru",
      // password: "ea1c2o1m",
      goal: "",
      time: "",
    },
  });
  const currentColor = useThemeColor({}, "text");
  const [goals, setGoals] = useState([]);
  const isFocused = useIsFocused();
  const removeGoal = async (item) => {
    await Notifications.cancelScheduledNotificationAsync(item.notifId);
    const notifs = await Notifications.getAllScheduledNotificationsAsync();
    console.log(notifs, "Notifications");
    const filteredGoals = goals.filter((el) => el.id !== item.id);
    setGoals(filteredGoals);
    await setInStorage("goals", filteredGoals);
  };
  useEffect(() => {
    if (isFocused) {
      const getGoalsFromStorage = async () => {
        // await removeFromStorage("goals");
        const currentGoals = (await getFromStorage("goals")) || [];
        setGoals(currentGoals);
      };
      getGoalsFromStorage();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={[
        {
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
          paddingHorizontal: 10,
        },
      ]}
    >
      <FlashList
        data={goals}
        renderItem={({ item }) => {
          return (
            <ThemedView
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText style={{ fontSize: 18 }}>{item.goal}</ThemedText>
              </View>
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    size={28}
                    style={[{ marginRight: 5 }]}
                    name="stopwatch-outline"
                    color={currentColor}
                  />
                  <ThemedText>{item.time}</ThemedText>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <BaseButton
                    onPress={() => {
                      router.push({
                        pathname: "/goals",
                        params: item,
                      });
                    }}
                    extraStyle={{ width: 50, height: 40, borderRadius: 5 }}
                    icon={"pencil-outline"}
                    color={currentColor}
                  ></BaseButton>
                  <BaseButton
                    onPress={() => removeGoal(item)}
                    extraStyle={{
                      width: 50,
                      height: 40,
                      borderRadius: 5,
                      backgroundColor: "red",
                    }}
                    icon={"trash-outline"}
                    color={currentColor}
                  ></BaseButton>
                </View>
              </View>
            </ThemedView>
          );
        }}
        estimatedItemSize={16}
      />
    </SafeAreaView>
  );
}
