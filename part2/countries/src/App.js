import React, {useState} from "react";
import Axios from "axios";
import FindCountry from './components/FindCountry'
import Countries from "./components/Countries";

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [preview, setPreview] = useState(false)

    const apiKey = process.env.REACT_APP_API_KEY
    
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        event.target.value.length === 0 ? setPreview(false) : console.log('search length longer than 1')
        getData(event.target.value)
    }

    const getData = (name) => {
        Axios
            .get(`https://restcountries.eu/rest/v2/name/${name}`)
            .then((response) => {
                console.log('From App: ', response.data)
                setCountries(response.data)
            })
    }

    return (
        <div>
            <FindCountry value={search} onChange={handleSearchChange}/>
            <Countries countries={countries} preview={preview} setPreview={setPreview} />
        </div>
    )
}

export default App
