import { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, Input, TextBtn, SubmitBtn } from "../../components";
import PlusIcon from "../../assets/icons/add-plus.svg";

const halfWindowsWidth = Dimensions.get("window").width / 2;

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsShownKeyboard(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShownKeyboard(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };

  const handleKeyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bcgImage}
          source={require("../../assets/images/PhotoBG.png")}
        />
        <View
          style={{
            ...styles.form,
            ...Platform.select({
              android: {
                height: isShownKeyboard ? 390 : 550,
              },
              ios: {
                height: isShownKeyboard ? 620 : 550,
              },
            }),
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.avatar}>
              <PlusIcon style={styles.avatarIcon} width={25} height={25} />
            </View>
            <Title
              addStyles={{
                marginTop: 95,
                marginBottom: 33,
                fontSize: 30,
                lineHeight: 35,
              }}
            >
              Реєстрація
            </Title>
            <Input
              isSecure={false}
              placeholder={"Логін"}
              value={state.login}
              onChange={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              position={{ marginBottom: 15 }}
            />
            <Input
              isSecure={false}
              placeholder={"Адреса електронної пошти"}
              position={{ marginBottom: 15 }}
              value={state.email}
              onChange={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
            <View style={{ position: "relative", marginBottom: 45 }}>
              <Input
                isSecure={isHiddenPassword}
                placeholder={"Пароль"}
                value={state.password}
                onChange={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TextBtn
                handlePress={setIsHiddenPassword}
                text={isHiddenPassword ? "Показати" : "Скрити"}
                isHiddenPassword={isHiddenPassword}
                position={{ position: "absolute", top: 15, right: 15 }}
              />
            </View>
            {!isShownKeyboard && (
              <SubmitBtn
                text={"Зареєструватися"}
                onSubmit={handleSubmit}
                position={{
                  marginBottom: 15,
                }}
              />
            )}
            {!isShownKeyboard && (
              <TextBtn
                handlePress={() => navigation.navigate("Login")}
                text={"Вже є аккаунт? Увійти"}
                position={{
                  alignItems: "center",
                  marginBottom: 45,
                }}
              />
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
    justifyContent: "flex-end",
  },
  bcgImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  form: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    height: 120,
    width: 120,
    position: "absolute",
    top: -60,
    left: halfWindowsWidth - 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    bottom: 15,
    right: -12,
  },
});