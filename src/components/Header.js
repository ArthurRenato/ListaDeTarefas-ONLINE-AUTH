import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleSingOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSingOut}>
        <Text>Sing out</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>Lista de Tarefas</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "#0c0a09",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Header;
