import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, Button } from "react-native"

import axios from "axios"

import StateResults from "./StateResults.js"

export default function Results() {

    const [electionResultsYear, setElectionResultsYear] = useState([])

    //172.25.45.163
    function getElectionResultsByYear(electionYear) {
        axios.get(`http://172.25.45.163:9000/results/${electionYear}`)
            .then(response => {
                let results = response.data
                results.sort(function (a, b) {
                    return a.state.localeCompare(b.state)
                })
                setElectionResultsYear(results)
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

    let singleStateResults = electionResultsYear.map(each => <StateResults key={each._id} {...each} />)

    return (
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <Button
                    title="2020"
                    onPress={() => getElectionResultsByYear(2020)}
                />
                <Button
                    title="2016"
                    onPress={() => getElectionResultsByYear(2016)}
                />
                <Button
                    title="2012"
                    onPress={() => getElectionResultsByYear(2012)}
                />
                <Button
                    title="2008"
                    onPress={() => getElectionResultsByYear(2008)}
                />
            </View>
            <View style={styles.container}>
                {singleStateResults}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "azure",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    buttonContainer: {
        backgroundColor: "azure",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: 25,
        marginBottom: 25
    }
})