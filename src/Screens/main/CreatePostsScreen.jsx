import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { Header, Container, Title, SubmitBtn } from "../../components";
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import CameraIcon from "../../../assets/icons/camera.svg";
import MapIcon from "../../../assets/icons/map-pin.svg";

const initialState = {
  avatar: "avatar",
  name: "",
  location: "",
};

export const CreatePostScreen = () => {
  const [state, setState] = useState(initialState);
  const [isDisable, setIsDisable] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!Object.values(state).includes("")) {
      setIsDisable(false);
    }
  }, [state]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    const shot = await camera.takePictureAsync();
    console.log(shot);
    setPhoto(shot.uri);
  };

  console.log(photo);

  const handleSubmit = () => {
    if (isDisable) {
      return;
    }
    console.log(state);
    setState(initialState);
    setIsDisable(true);
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  // if (hasPermission === null) {
  //   return <View />;
  // }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Go back")}
        >
          <GoBackIcon height={24} width={24} />
        </TouchableOpacity>
        <Title
          addStyles={{
            fontSize: 17,
            lineHeight: 22,
          }}
        >
          Cтворити публікацію
        </Title>
      </Header>
      <Container>
        <TouchableWithoutFeedback onPress={handleKeyboardHide}>
          <View style={styles.container}>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={{ marginBottom: 32 }}>
                  {photo ? (
                    <Image source={{ uri: photo }} style={{ height: 240 }} />
                  ) : (
                    <Camera
                      style={styles.camera}
                      ref={(ref) => {
                        setCamera(ref);
                      }}
                    >
                      <TouchableOpacity
                        style={styles.cameraBtn}
                        onPress={takePhoto}
                      >
                        <CameraIcon width={24} height={24} />
                      </TouchableOpacity>
                    </Camera>
                  )}
                  <Text style={styles.text}>Завантажте фото</Text>
                </View>
                <TextInput
                  placeholder={"Назва..."}
                  placeholderTextColor="#BDBDBD"
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                  style={{ ...styles.input, marginBottom: 16 }}
                />
                <View style={{ position: "relative" }}>
                  <MapIcon width={24} height={24} style={styles.inputIcon} />
                  <TextInput
                    placeholder={"Місцевість..."}
                    placeholderTextColor="#BDBDBD"
                    value={state.location}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        location: value,
                      }))
                    }
                    style={{
                      ...styles.input,
                      paddingLeft: 30,
                      marginBottom: 32,
                    }}
                  />
                </View>
                <SubmitBtn
                  text={"Опублікувати"}
                  onSubmit={handleSubmit}
                  disabled={isDisable}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  camera: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "E8E8E8",
    borderRadius: 8,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    alignItems: "center",
    height: 50,
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
  },
  inputIcon: {
    position: "absolute",
    top: 13,
  },
});