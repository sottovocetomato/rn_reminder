import { Dimensions, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import BaseButton from "@/components/form/BaseButton";
import * as Notifications from "expo-notifications";
import { setInStorage } from "@/helpers/storage";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Constants from "expo-constants";

export default function ItemCard({ item, className, onDeleteAction }) {
  const currentColor = useThemeColor({}, "text");
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
    Dimensions.get("window");

  const MAX_TRANSLATE_X = -SCREEN_WIDTH / 2;
  const context = useSharedValue({ x: 0 });
  const gesture = Gesture.Pan()
    .minDistance(25)
    .onBegin(() => {
      // console.log(translateY.value, 'pan on start');
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateX.value = Math.max(translateX.value, MAX_TRANSLATE_X);
    })
    .onEnd(() => {
      // console.log(translateX.value, "translateX.value ");
      // console.log(SCREEN_WIDTH, "SCREEN_WIDTH");
      if (
        translateX.value > -SCREEN_WIDTH / 1.5 &&
        translateX.value < SCREEN_WIDTH / 1.5
      ) {
        translateX.value = withSpring(0, { damping: 50, stiffness: 100 });
      } else {
        runOnJS(onDeleteAction)(item);
      }
    });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          containerStyle,
          {
            marginTop: 20,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/goals",
              params: item,
            });
          }}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: item.backgroundColor,
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
              marginTop: 20,
            }}
          >
            <View
              style={{
                flex: 2.5,
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
            ></View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

export default ItemCard;
