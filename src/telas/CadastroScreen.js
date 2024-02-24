import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Only import createUserWithEmailAndPassword from "firebase/auth"
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config"; // Import only db from your firebase-config

const CadastroScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    // Verificar se as senhas coincidem
    if (password !== password2) {
      alert("As senhas não coincidem.");
      return;
    }

    // Se as senhas coincidirem, proceda com o cadastro
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("Cadastrado, email:", user.email);
      console.log("Cadastrado, user:", user);

      // Criar uma coleção específica para o usuário recém-cadastrado
      const userTasksCollectionRef = collection(db, `users/${user.uid}/tasks`);

      // Adicione uma tarefa de exemplo, se desejar
      await addDoc(userTasksCollectionRef, {
        titulo: "Exemplo de Tarefa",
        conteudo: "Esta é uma tarefa de exemplo.",
      });

      // Adicione feedback ao usuário ou navegue para a tela desejada
      // Exemplo: navigation.replace("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>

        <TextInput
          placeholder="Confirme a senha"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CadastroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonLogin: {
    marginTop: 60,
  },
});
