import * as SecureStore from "expo-secure-store";
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
