import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { SafeAreaView, View, Text, StyleSheet } from "react-native"

import StateResults from "./StateResults.js"

import axios from "axios"

export default function Results() {

    const [electionResultsYear, setElectionResultsYear] = useState([])

    React.useEffect(() => {
        getElectionResultsByYear(2020)
        console.log("useEffect")
    }, [])
//172.25.45.163
    function getElectionResultsByYear(electionYear) {
        axios.get(`http://172.25.45.163:9000/results/${electionYear}`)
            .then(response => {
                setElectionResultsYear(response.data)
                console.log("Request Got")
            })
            .catch(error => console.log(error))
    }

    let allResults = [
        {
            _id: "60496fb1460e900753aa1b42",
            electionYear: 2020,
            state: "Alabama",
            demWon: false,
            gopWon: true,
            candidateDem: "Joe Biden",
            candidateGop: "Donald Trump",
            percentDemResult: 36.57,
            numberDemResult: 849624,
            percentGopResult: 62.03,
            numberGopResult: 1441170,
            marginOfVictory: 25.46,
            electoralVotes: 9,
        },
        {
            _id: "60496ff8460e900753aa1b43",
            electionYear: 2020,
            state: "Alaska",
            demWon: false,
            gopWon: true,
            candidateDem: "Joe Biden",
            candidateGop: "Donald Trump",
            percentDemResult: 42.77,
            numberDemResult: 153778,
            percentGopResult: 52.83,
            numberGopResult: 189951,
            marginOfVictory: 10.06,
            electoralVotes: 3,
        }
    ]

    let singleStateResults = electionResultsYear.map(each => <StateResults {...each} />)

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {singleStateResults}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "dodgerblue",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    }
})