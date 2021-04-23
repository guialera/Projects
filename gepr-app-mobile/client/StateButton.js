import React from "react"
import { SafeAreaView, View, Text, Button } from "react-native"

export default function StateButton(props) {

    const {
        id,
        state,
        showState
    } = props

    return (
        <SafeAreaView>
            <View>
                <Button
                    title={state}
                    onPress={() => showState(id)}
                ></Button>
            </View>
        </SafeAreaView>
    )
}