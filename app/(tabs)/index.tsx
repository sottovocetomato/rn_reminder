import {
  Dimensions,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import ItemCard from "@/components/ItemCard";

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
        console.log(currentGoals, "     console.log(currentGoals);");
      };

      getGoalsFromStorage();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
          paddingHorizontal: 10,
        },
      ]}
    >
      {!goals.length && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>No goals yet...</ThemedText>
        </View>
      )}
      <FlashList
        data={goals}
        renderItem={({ item }) => {
          return <ItemCard item={item} onDeleteAction={removeGoal} />;
        }}
        estimatedItemSize={50}
      />
    </SafeAreaView>
  );
}
