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
          paddingHorizontal: 20,
        },
      ]}
    >
      <FlashList
        data={goals}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText>{item.id}</ThemedText>
              <ThemedText>{item.goal}</ThemedText>
              <ThemedText>{item.time}</ThemedText>
              <ThemedText
                onPress={() => {
                  router.push({
                    pathname: "/goals",
                    params: item,
                  });
                }}
              >
                Edit
              </ThemedText>
              <ThemedText onPress={() => removeGoal(item)}>Delete</ThemedText>
            </View>
          );
        }}
        estimatedItemSize={16}
      />
    </SafeAreaView>
  );
}
