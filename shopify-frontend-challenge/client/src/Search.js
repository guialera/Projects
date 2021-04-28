import React, { useState } from "react"

import SingleResults from "./SingleResults.js"
import Nominated from "./Nominated.js"

import axios from "axios"

function Search() {
    let emptyForm = {
        searchInput: ""
    }

    const [input, setInput] = useState(emptyForm)
    const [searchValue, setSearchValue] = useState("")
    const [initialResults, setInitialResults] = useState([])
    const [nominatedList, setNominatedList] = useState([])
    const [fullNomination, setFullNomination] = useState(false)
    const [showResetButton, setShowResetButton] = useState()

    React.useEffect(() => {
        setNominatedList(JSON.parse(localStorage.getItem("nominatedList")) || [])
        let initialList = JSON.parse(localStorage.getItem("nominatedList")) || []
        initialList.length !== 0 ? setShowResetButton(true) : setShowResetButton(false)
    }, [])

    function fillIn(event) {
        const { name, value } = event.target
        setInput(prevInput => ({ ...prevInput, [name]: value }))
        console.log(input)
    }

    function getSearchInput(event) {
        event.preventDefault()
        let searchMovie = input.searchInput
        let searchString = input.searchInput.replace(/\s+/g, '-')
        setSearchValue(searchMovie)
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
        let storedList = [...nominatedList, nominated]
        storedList.length === 6 ? setFullNomination(true) : setNominatedList(prevNominatedList => [...prevNominatedList, nominated])
        storedList.length === 6 ? setInitialResults([]) : console.log()
        storedList.length === 6 ? setSearchValue("") : localStorage.setItem("nominatedList", JSON.stringify(storedList))
        setShowResetButton(true)
    }

    function removeFromNomList(id) {
        setFullNomination(false)
        let newList = nominatedList.filter(each => each.imdbID !== id)
        localStorage.removeItem("nominatedList")
        localStorage.setItem("nominatedList", JSON.stringify(newList))
        setNominatedList(newList)
        newList.length !== 0 ? setShowResetButton(true) : setShowResetButton(false)
    }

    function resetList() {
        setNominatedList([])
        localStorage.removeItem("nominatedList")
        setShowResetButton(false)
        setFullNomination(false)
    }

    let list = initialResults.map(each => <SingleResults key={each.imdbID} nominatedList={nominatedList} addToNomList={addToNomList} removeFromNomList={removeFromNomList} {...each} />)

    let nominated = nominatedList.map(each => <Nominated key={each.imdbID} removeFromNomList={removeFromNomList} {...each} />)

    return (
        <div>
            <div className="searchContainer">
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
            <div className="resultsNomContainer">
                <div className="resultsList">
                    <div style={{ display: fullNomination ? "block" : "none" }}>
                        <h1 className="header">Nomination List Full!</h1>
                    </div>
                    <div style={{ display: fullNomination ? "none" : "block" }}>
                        <h1 className="header">{`Search Results For "${searchValue}"`}</h1>
                        {list}
                    </div>
                </div>
                <div className="nomList">
                    <h1 className="header">Nominated Movies</h1>
                    {nominated}
                    <button style={{
                        display: showResetButton ? "block" : "none",
                        backgroundColor: "red",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "20px"
                    }} onClick={resetList}
                    > Reset Nomination List
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search