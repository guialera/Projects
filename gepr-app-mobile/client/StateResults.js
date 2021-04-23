import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { SafeAreaView, View, Text, StyleSheet } from "react-native"

export default function StateResults(props) {

    const [demNumber, setDemNumber] = useState()
    const [gopNumber, setGopNumber] = useState()

    React.useEffect(() => {
        addCommas()
    }, [])

    const {
        _id,
        electionYear,
        state,
        demWon,
        gopWon,
        candidateDem,
        candidateGop,
        numberDemResult,
        percentDemResult,
        numberGopResult,
        percentGopResult,
        marginOfVictory,
        electoralVotes,
        getId,
        getIdDelete
    } = props

    function addCommas() {
        let newNumberDemResult = Number(numberDemResult.$numberInt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let newNumberGopResult = Number(numberGopResult.$numberInt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setDemNumber(newNumberDemResult)
        setGopNumber(newNumberGopResult)
    }

    let demColor = demWon === true ? "#00bfff" : "peachpuff"
    let gopColor = gopWon === true ? "lightcoral" : "peachpuff"

    let demText = demWon === true ? "bold" : "none"
    let gopText = gopWon === true ? "bold" : "none"

    return (
        <SafeAreaView>
            <View style={styles.stateContainer}>
                <Text style={styles.stateHeader}>{state}</Text>
                <View style={{
                    backgroundColor: demColor,
                    width: "100%",
                    fontWeight: demText,
                    alignItems: "center"
                }}>
                    <Text>{candidateDem}</Text>
                    <Text>{demNumber}</Text>
                    <Text>{percentDemResult.$numberDouble}%</Text>
                </View>
                <View style={{
                    backgroundColor: gopColor,
                    width: "100%",
                    fontWeight: gopText,
                    alignItems: "center"
                }}>
                    <Text>{candidateGop}</Text>
                    <Text>{gopNumber}</Text>
                    <Text>{percentGopResult.$numberDouble}%</Text>
                </View>
                <Text>{electoralVotes.$numberInt} Electoral Votes</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    stateContainer: {
        borderStyle: "solid",
        borderColor: "black",
        alignItems: "center",
        borderWidth: 2,
        backgroundColor: "peachpuff",
        width: 150,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6,
        marginBottom: 6,
        paddingBottom: 10
    },
    stateHeader: {
        backgroundColor: "aqua",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        width: "100%",
        marginTop: 0,
        marginBottom: 0
    },
})