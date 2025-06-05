export default () => ({
  expo: {
    name: "Tristar App",
    slug: "Tristar-App",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/tristar_logo.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/tristar_logo_3.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/tristar_logo_3.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.ojtProject"
    },
    web: {
      favicon: "./assets/images/tristar_logo.png"
    },
    owner: "rekojhandsome",
    extra: {
      eas: {
        projectId: "0c0b8d55-d855-43a2-8f08-c0a4ef42af2b"
      },
      MAIN_API_URL: process.env.EXPO_PUBLIC_MAIN_API_URL
    }
  }
});
