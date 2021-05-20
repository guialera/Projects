import { StatusBar } from "expo-status-bar"
import React, { useState } from "react"
import { SafeAreaView, View, Text, StyleSheet, Button, ScrollView, Alert } from "react-native"

import axios from "axios"

import StateResults from "./StateResults.js"
import StateButton from "./StateButton.js"

export default function Results() {

    const [allStates, setAllStates] = useState([])
    const [singleState, setSingleState] = useState([])
    const [showSingleState, setShowSingleState] = useState(false)
    const [showAllStates, setShowAllStates] = useState(true)
    const [showFoundState, setShowFoundState] = useState(false)
    const [electionYear, setElectionYear] = useState()

    //172.25.45.163
    //http://172.25.45.163:9000/results/${electionYear}
    function getElectionResultsByYear(electionYear) {
        axios.get(`https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/gepr-app-mobile-fzadj/service/gepr-api/incoming_webhook/gepr-api-${electionYear}`)
            .then(response => {
                let results = response.data
                results.sort(function (a, b) {
                    return a.state.localeCompare(b.state)
                })
                setAllStates(results)
                setShowAllStates(true)
                setShowSingleState(false)
                setShowFoundState(false)
                setElectionYear(electionYear)
            })
            .catch(error => console.log(error))
    }

    function displayStates() {
        setShowAllStates(true)
        setShowSingleState(false)
        setShowFoundState(false)
    }

    function displaySingleState() {
        setShowAllStates(false)
        setShowSingleState(true)
        setShowFoundState(false)
    }

    function showState(id) {
        let displayState = allStates.find(each => each._id.$oid === id)
        setSingleState([displayState])
        setShowSingleState(false)
        setShowAllStates(false)
        setShowFoundState(true)
    }

    let singleStateResults = singleState.map(each => <StateResults key={each._id.$oid} {...each} />)

    let allStateResults = allStates.map(each => <StateResults key={each._id.$oid} {...each} />)

    let stateButton = allStates.map(each => <StateButton key={each._id.$oid} id={each._id.$oid} state={each.state} demWon={each.demWon} showState={showState} />)

    return (
        <SafeAreaView>
            <View style={styles.buttonContainer}>
                <Button
                    title="2020"
                    onPress={() => getElectionResultsByYear(2020)}
                    color="white"
                />
                <Button
                    title="2016"
                    onPress={() => getElectionResultsByYear(2016)}
                    color="white"
                />
                <Button
                    title="2012"
                    onPress={() => getElectionResultsByYear(2012)}
                    color="white"
                />
                <Button
                    title="2008"
                    onPress={() => getElectionResultsByYear(2008)}
                    color="white"
                />
            </View>
            <View>
                <Button
                    title="View Single State"
                    onPress={displaySingleState}
                />
            </View>
            <View>
                <Button
                    title="View All States"
                    onPress={displayStates}
                    color="lightcoral"
                />
            </View>
            <View style={styles.electionYearContainer}>
                <Text style={styles.electionYearText}>{electionYear} General Election</Text>
            </View>
            <ScrollView>
                <View style={styles.stateButtonsContainer, {
                    display: showSingleState ? "block" : "none",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    height: 750
                }}>
                    {stateButton}
                </View>
            </ScrollView>
            <ScrollView>
                <View style={styles.statesContainer, {
                    display: showAllStates ? "block" : "none",
                    backgroundColor: "azure",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    paddingBottom: 250
                }}>
                    {allStateResults}
                </View>
                <View style={styles.statesContainer, {
                    display: showFoundState ? "block" : "none",
                    backgroundColor: "azure",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                }}>
                    {singleStateResults}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "lightcoral",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: 25,
        marginBottom: 25
    },
    /*stateButtonsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },*/
    electionYearContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    electionYearText: {
        fontWeight: "500",
        fontSize: 20,
        textAlign: "center"
    }
    /*
    statesContainer: {
        backgroundColor: "azure",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        height: 4250
    },*/
})