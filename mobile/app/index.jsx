import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.heading1}>
        Welcome Home!{" "}
      </Text>
      <Link style={styles.link} href={"/about"}>About</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "black",
    width:100,
    textAlign:"center",
    marginTop:20,
    padding:10,
    borderWidth:1,
    borderColor:"black",
    backgroundColor:"white",
    borderRadius:5
  },
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"pink"
  },
  heading1:{
    fontSize:40,
    fontWeight:"bold"
  }
})