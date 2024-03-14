import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react";
import NavTop from "../../components/NavTop"
import Gap from "../../components/Gap";
import { SelectList } from "react-native-dropdown-select-list";
import ICAUDIO from "../../assets/IC-Audio.png"
import ICUPIMG from "../../assets/IC-UPLOADIMG.png"
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";

export default function UnggahGambar({ navigation }) {
    const dataGambar = new FormData()
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const data = [
        { key: '1', value: 'Indonesia' },
        { key: '2', value: 'Aceh' },
        { key: '3', value: 'Inggris', disabled: true },
    ]

    const handleUpload = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://192.168.137.1:5001/blog", dataGambar,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            } );
            if (res.status === 201) {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Berhasil Tersimpan!',
                    textBody: "Berhasil Tersimpan!",
                    button: 'close',
                })
            }
        } catch (error) {
            setLoading(false);
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Gagal Tersimpan!',
                textBody: "Gagal Tersimpan!",
                button: 'close',
            })
        }
    }

    dataGambar.append("id","")
    dataGambar.append("title","test titleeeee")
    dataGambar.append("body",selected?.toString())

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [6, 12],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            // console.log("YOOO::",result.assets[0])
            dataGambar.append("image", result.assets[0]);
        }
    };

    console.log("DATA::",dataGambar?._parts)

    return (
        <AlertNotificationRoot>
            <NavTop label={"Unggah Gambar"} onPress={() => {
                navigation.navigate("MainDashboard");
            }} />
            <View style={Styles.main__wrapper}>
                {image && <Image source={{ uri: image }} style={Styles.imageStyle} />}
                <TouchableOpacity onPress={pickImage} style={Styles.btn_upload}>
                    <Image source={ICUPIMG} style={Styles.uploadIcon} />
                    <Gap width={10} />
                    <Text>Upload</Text>
                </TouchableOpacity>
                <Gap height={20} />
                <View style={Styles.inner__wrapper}>
                    <SelectList
                        boxStyles={{ width: 225 }}
                        style={Styles.select}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                    <TouchableOpacity style={Styles.btn_sound}>
                        <Image source={ICAUDIO} style={Styles.audioIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleUpload} style={Styles.wrapper__btn__logout}>
                    <Text style={Styles.text}>{loading ? "Saving..." : "Save"}</Text>
                </TouchableOpacity>
            </View>
        </AlertNotificationRoot>
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
    btn_upload: {
        width: 100,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#f2f3f5",
        flexDirection: "row",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    uploadIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    audioIcon: {
        width: 20,
        height: 20,
    },
    select: {
        width: 200
    },
    imageStyle: {
        width: "100%",
        height: 220,
        borderRadius: 10,
        marginBottom: 40,
    }
})
