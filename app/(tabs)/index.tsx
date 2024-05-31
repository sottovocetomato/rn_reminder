import { Pressable, Text, View } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import Input from "@/components/form/Input";
import { useForm } from "react-hook-form";
import styles from "@/assets/styles/styles";
import BaseButton from "@/components/form/BaseButton";
import {
  getSensetiveData,
  removeSensetiveData,
  storeSensetiveData,
} from "@/helpers/storage";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const [goals, setGoals] = useState();
  useEffect(() => {
    const get = async () => {
      // await removeSensetiveData("tasks");
      const currentTasks = await getSensetiveData("goals");
      // console.log(currentTasks, "currentTasks");
      // console.log(tasks, "tasks");

      setGoals(JSON.parse(currentTasks || "[]"));
    };
    get();
  }, []);

  const onSubmit = async (data) => {
    const getData = await getSensetiveData("goals");
    let prevData = JSON.parse(getData || "[]");
    prevData.push({ goal: data.goal, time: data.time });
    console.log(prevData, "prevData");
    setGoals(prevData);
    console.log(goals, "goals");
    console.log(JSON.stringify(goals), "JSON.stringify(goals)");
    await storeSensetiveData("tasks", JSON.stringify(goals));
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
      <ThemedText>Hello!</ThemedText>
      <ThemedText>{goals}</ThemedText>
      <Input
        control={control}
        name="todo"
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
