import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeSensetiveData = async (key, value) => {
  try {
    if (!value) return;
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    throw new Error(e);
  }
};

export const getSensetiveData = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value !== null || value !== "null") {
      return value;
    }
    return null;
  } catch (e) {
    console.error(e);
  }
};
export const removeSensetiveData = async (key) => {
  try {
    const value = await SecureStore.deleteItemAsync(key);
    if (value !== null || value !== "null") {
      return value;
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

export const setInStorage = async (key, value) => {
  try {
    if (value == null || value == undefined)
      throw new Error("setInStorage value is null or undefined");
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return "success";
  } catch (e) {
    throw new Error(e);
  }
};

export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null || value !== "null") {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    throw new Error(e);
  }
};

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e);
  }
};
