import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  Titulo: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "montserrat",
    textAlign: "center",
    marginBottom: height * 0.01,
    color: "#023e8a",
  },
  InputContainer: {
    width: width * 0.85,
    height: 55,
    borderRadius: 10,
    marginVertical: width * 0.02, // Evita desajustes
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center", // Asegura alineación vertical en iOS
  },
  Logo: {
    width: 140,
    height: 130,
    alignSelf: "center",
    marginTop: width * 0.02,
    marginBottom: width * 0.04,
  },
  Boton: {
    backgroundColor: "#023e8a",
    width: width * 0.85,
    height: 55,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: height * 0.01,
    alignSelf: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
  },
  CrearCuentaFont: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    fontFamily: "montserrat",
    textAlign: "center",
    padding: 10,
  },
  TextOnInput: {
    flex: 1,
    fontSize: 16,
    color: "gray",
    fontWeight: "600",
    fontFamily: "montserrat",
    textAlign: "left",
    paddingLeft: 8,
  },
  ErrorText: {
    color: "red",
    fontSize: 11,
    textAlign: "left",
    paddingLeft: 15,
    fontFamily: "montserrat",
  },
  GContainer: {
    width: width * 0.85,
    height: 55,
    borderRadius: 10,
    marginVertical: width * 0.02,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 15,
    alignItems: "center", // Centra elementos en iOS
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 5,
  },
  GButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  GLogo: {
    width: 23,
    height: 23,
    marginRight: 10,
  },
  Gtext: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    fontFamily: "montserrat",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center", // Centra el contenido en iOS
    alignItems: "center",
    paddingVertical: height * 0.05,
  },
  PasswordRequirements: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "montserrat",
    alignSelf: "center",
  },
  iconos: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  ShowNClose: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
  ToS: {
    flexDirection: "row",
    marginTop: height * 0.01,
    alignSelf: "center",
  },
  ToSText: {
    color: "black",
    fontSize: 12,
    fontFamily: "montserrat",
    paddingTop: 9,
  },
  ToSLink: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "montserrat",
    paddingTop: 9,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    width: width * 0.37,
    height: 1,
    backgroundColor: "black",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: "#666",
  },
  linkText: {
    color: "#023e8a",
    fontSize: 17,
    
  },
  linkTextBold: {
    color: "#023e8a",
    fontWeight: "bold",
    fontSize: 17,
    
  },
  forgotPass: {
    color: "#023e8a",
    fontSize: 12,
    paddingTop: 9,
    font: "montserrat",
  },
});

export default styles;
