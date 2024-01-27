import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react";
import NavTop from "../../components/NavTop"
import CardProfileDetail from "../../components/CardProfileDetail";
import Gap from "../../components/Gap";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import TextInputCompt from "../../components/TextInputCompt";
import { SelectList } from "react-native-dropdown-select-list";
import ICAUDIO from "../../assets/IC-Audio.png"


export default InputText = ({ navigation }) => {
    const [textInput, setTextInput] = useState("")
    const [selected, setSelected] = React.useState("");

    const data = [
        { key: '1', value: 'Indonesia' },
        { key: '2', value: 'Aceh' },
        { key: '3', value: 'Inggris', disabled: true },
    ]

    return (
        <>
            <NavTop label={"InputText"} onPress={() => {
                navigation.navigate("MainDashboard");
            }} />
            <View style={Styles.main__wrapper}>
                <TextInputCompt placeholder={"Masukkan Text"} height={300} multiline={true} textAlignVertical={"top"} secureTextEntry={false} onChangeText={text => setTextInput(text)} />
                <Gap height={20} />

                <Gap height={10} />
                <View style={Styles.inner__wrapper}>
                    <SelectList
                        boxStyles={{width:225}}
                        style={Styles.select}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                    <TouchableOpacity onPress={() => {
                        // navigation.navigate("Login")
                    }} style={Styles.btn_sound}>
                        {/* <Icon name={"file-sound-o"} background="none" size={20} /> */}
                        <Image source={ICAUDIO} width={10} height={10} style={Styles.img__btn__sound} />

                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                }} style={Styles.wrapper__btn__logout}>
                    <Text style={Styles.text}>Save</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}


const Styles = StyleSheet.create({
    main__wrapper: {
        backgroundColor: "white",
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    wrapper__btn__logout: {
        marginTop: 80,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "blue",
        borderRadius: 30,
        color: "white",
        width: 100,
        padding: 12,
    },
    inner__wrapper: {
        borderRadius: 20,
        borderWidth: 1,
        width: "100%",
        paddingVertical: 30,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "500"
    },
    btn_sound: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "white",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    img__btn__sound: {
        width: 20,
        height: 20
    },
    select:{
        width:200
    }
})
