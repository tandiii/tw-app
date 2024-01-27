import { StyleSheet, TextInput } from "react-native";

const TextInputCompt = ({placeholder,secureTextEntry,onChangeText,height,textAlignVertical,multiline}) =>{
    return (
        <TextInput
        style={styles.input(height,textAlignVertical)}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        multiline={multiline}
        onChangeText={onChangeText}
        // value={text}
      />
    )
}

export default TextInputCompt;


const styles =  StyleSheet.create({
    input:(height,textAlignVertical) =>({
    borderRadius:20,
      backgroundColor: '#fff',
      minWidth:"100%",
      borderColor:"blue",
      height:height,
      borderWidth:1,
      alignItems: 'center',
      paddingHorizontal:12,
      paddingVertical:6,
      textAlignVertical: textAlignVertical,
      justifyContent: 'center',
    }),
   
  });
  

