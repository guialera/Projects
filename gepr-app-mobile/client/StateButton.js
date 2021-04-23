import React from "react"
import { SafeAreaView, View, Text, Button } from "react-native"

export default function StateButton(props) {

    const {
        id,
        state,
        showState,
        demWon
    } = props

    let textColor = demWon === true ? "#00bfff" : "lightcoral"

    return (
        <SafeAreaView>
            <View>
                <Button
                    title={state}
                    onPress={() => showState(id)}
                    color={textColor}
                ></Button>
            </View>
        </SafeAreaView>
    )
}