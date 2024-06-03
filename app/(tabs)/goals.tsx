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
  removeSensetiveData,
  setInStorage,
  storeSensetiveData,
} from "@/helpers/storage";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { schedulePushNotification } from "@/tools/Notifications";
import { FlashList } from "@shopify/flash-list";
import { router, useLocalSearchParams } from "expo-router";

export default function Goals() {
  const params = useLocalSearchParams();
  const { id: editId, goal, time } = params;
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      // email: "i@rdbx.ru",
      // password: "ea1c2o1m",
      goal: goal || "",
      time: time || "",
    },
  });

  const onSubmit = async (data) => {
    let prevData = (await getFromStorage("goals")) || [];
    if (editId) {
      const goalIndex = prevData.findIndex((e) => e.id === editId);
      prevData[goalIndex] = {
        ...prevData[goalIndex],
        goal: data.goal,
        time: data.time,
      };
    } else {
      const [hour, minute] = data.time.split(":");
      const notifId = await schedulePushNotification({
        title: "Your daily goals!",
        body: data.goal,
        data: {},
        hour: +hour,
        minute: +minute,
      });
      prevData.push({
        goal: data.goal,
        time: data.time,
        id: prevData.length + 1,
        notifId,
      });
    }

    console.log(prevData, "prevData");

    await setInStorage("goals", prevData);

    router.navigate("");
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Input
        control={control}
        name="goal"
        clearable={true}
        rules={{
          required: {
            value: true,
            message: "Поле необходимо заполнить",
          },
        }}
        label={"Задача"}
      ></Input>
      <Input
        control={control}
        name="time"
        type="date"
        clearable={true}
        dateMode="time"
        rules={{
          required: {
            value: true,
            message: "Поле необходимо заполнить",
          },
        }}
        label={"Время"}
      ></Input>

      <BaseButton
        onPress={handleSubmit(onSubmit)}
        title={"Save"}
        testID="LoginButton"
      />
    </SafeAreaView>
  );
}
