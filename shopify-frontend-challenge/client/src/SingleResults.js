import React, { useState } from "react"

function SingleResults(props) {

    const [alreadyNominated, setAlreadyNominated] = useState()

    const {
        Title,
        Year,
        imdbID,
        addToNomList,
        removeFromNomList,
        nominatedList
    } = props

    React.useEffect(() => {
        checkNomination()
    }, [])

    function sendDataAdd() {
        addToNomList(Title, Year, imdbID)
        setAlreadyNominated(true)
    }

    function sendDataRemove() {
        removeFromNomList(imdbID)
        setAlreadyNominated(false)
    }

    function checkNomination() {
        let found = nominatedList.filter(each => each.imdbID === imdbID)
        found.length === 0 ? setAlreadyNominated(false) : setAlreadyNominated(true)
    }

    return (
        <div>
            <h2>Title: {Title}</h2>
            <p><b>Year:</b> {Year}</p>
            <button
                value={imdbID}
                onClick={sendDataAdd}
                style={{ display: alreadyNominated ? "none" : "block", backgroundColor: "green", marginLeft: "auto", marginRight: "auto" }}
            >
                Nominate Film
            </button>
            <button
                value={imdbID}
                onClick={sendDataRemove}
                style={{ display: alreadyNominated ? "block" : "none", backgroundColor: "red", marginLeft: "auto", marginRight: "auto" }}
            >
                Remove Nomination
            </button>
        </div>
    )
}

export default SingleResults