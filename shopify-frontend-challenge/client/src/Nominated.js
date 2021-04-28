import React from "react"

function Nominated(props) {

    const {
        title,
        year,
        imdbID,
        removeFromNomList
    } = props

    function sendData() {
        removeFromNomList(imdbID)
    }

    return (
        <div>
            <h2>Title: {title}</h2>
            <p><b>Year:</b> {year}</p>
            <button style={{ backgroundColor: "red" }} onClick={sendData}>Remove Nomination</button>
        </div>
    )
}

export default Nominated