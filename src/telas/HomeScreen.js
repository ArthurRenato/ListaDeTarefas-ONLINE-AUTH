import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import Formulario from "../components/Formulario";
import ListaTarefas from "../components/ListaTarefas";
import { auth, db } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const HomeScreen = () => {
  const [tarefas, setTarefas] = useState([]);
  const tarefasCollectionRef = collection(db, "tarefas");

  const criarTarefa = async (titulo, conteudo) => {
    const user = auth.currentUser; // Obtenha o usuário atualmente autenticado
    const tarefasCollectionRef = collection(db, `users/${user.uid}/tasks`);

    await addDoc(tarefasCollectionRef, { titulo: titulo, conteudo: conteudo });

    const data = await getDocs(tarefasCollectionRef);
    setTarefas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const apagarTarefa = async (id) => {
    const userDoc = doc(db, "tarefas", id);
    await deleteDoc(userDoc);

    // Fetch the updated list of tasks after deletion
    const data = await getDocs(tarefasCollectionRef);
    setTarefas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const getTarefas = async () => {
      const user = auth.currentUser;
      const tarefasCollectionRef = collection(db, `users/${user.uid}/tasks`);

      const data = await getDocs(tarefasCollectionRef);
      setTarefas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTarefas();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <Formulario tarefas={tarefas} criarTarefa={criarTarefa} />

      <ListaTarefas apagarTarefa={apagarTarefa} tarefas={tarefas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafaf9",
  },
});

export default HomeScreen;
