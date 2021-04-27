import React, { useState } from "react"

import SingleResults from "./SingleResults.js"
import Nominated from "./Nominated.js"

import axios from "axios"

function Search() {
    let emptyForm = {
        searchInput: ""
    }

    const [input, setInput] = useState(emptyForm)
    const [initialResults, setInitialResults] = useState([])
    const [nominatedList, setNominatedList] = useState([])
    const [fullNomination, setFullNomination] = useState(false)

    function fillIn(event) {
        const { name, value } = event.target
        setInput(prevInput => ({ ...prevInput, [name]: value }))
        console.log(input)
    }

    function getSearchInput(event) {
        event.preventDefault()
        let searchString = input.searchInput.replace(/\s+/g, '-')
        axios.get(`http://www.omdbapi.com/?apikey=be90a238&s=${searchString}`)
            .then(response => setInitialResults(response.data.Search))
            .catch(error => console.log(error))
        setInput(emptyForm)
    }

    function addToNomList(title, year, imdbID) {
        let nominated = {
            title: title,
            year: year,
            imdbID: imdbID
        }
        nominatedList.length === 5 ? setFullNomination(true) : setNominatedList(prevNominatedList => [...prevNominatedList, nominated])
        nominatedList.length === 5 ? setInitialResults([]) : console.log()
    }

    function removeFromNomList(id) {
        setFullNomination(false)
        let newList = nominatedList.filter(each => each.imdbID !== id)
        setNominatedList(newList)
    }

    let list = initialResults.map(each => <SingleResults key={each.imdbID} nominatedList={nominatedList} addToNomList={addToNomList} removeFromNomList={removeFromNomList} {...each} />)

    let nominated = nominatedList.map(each => <Nominated key={each.imdbID} removeFromNomList={removeFromNomList} {...each} />)

    return (
        <div>
            <div>
                <form onSubmit={getSearchInput}>
                    <input
                        type="text"
                        name="searchInput"
                        value={input.searchInput}
                        onChange={fillIn}
                    />
                    <button>Search</button>
                </form>
            </div>
            <div style={{ display: fullNomination ? "block" : "none" }}>
                <h1>Nomination List Full!</h1>
            </div>
            <div style={{ display: fullNomination ? "none" : "block" }}>
                <h1>Search Results</h1>
                {list}
            </div>
            <div>
                <h1>Nominated Movies</h1>
                {nominated}
            </div>
        </div>
    )
}

export default Search