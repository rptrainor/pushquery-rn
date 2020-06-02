import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import TalkCover from "../components/organisms/TalkCover";
import { styles } from "../styles/styleSheets";
import Firebase from "../../config/firebase";

export default function Home({ navigation, route }) {
  const [talks, setTalks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("talks")
      .onSnapshot((querySnapshot) => {
        const talks = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            title: "",
            description: "",
            createdBy: "",
            createdOn: "",
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              email: firebaseData.user.email,
              displayName: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setTalks(talks);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View>
      <View style={styles.statusBarView} />
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList
          data={talks}
          keyExtractor={(talk) => talk._id}
          renderItem={({ item }) => (
            <TalkCover talk={item} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
}
