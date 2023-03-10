const authErrorHandler = (errorCode) => {
  if (errorCode === "auth/invalid-email") {
    return "Неправильна електрона пошта";
  }
  if (errorCode === "auth/wrong-password") {
    return "Неправильно вказаний пароль";
  }
  if (errorCode === "auth/weak-password") {
    return "Пароль не менше 6-ти символів";
  }
  if (errorCode === "auth/email-already-in-use") {
    return "Ця пошта вже використовується";
  }
};

export default authErrorHandler;
