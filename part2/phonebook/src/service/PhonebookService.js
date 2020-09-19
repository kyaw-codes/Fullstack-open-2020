import Axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const create = (data) => {
    return Axios.post(baseUrl, data).then(response => response.data)
}

const remove = (id) => {
    return Axios.delete(`${baseUrl}/${id}`)
}

const findPersonByName = (name) => {
    return Axios.get(baseUrl)
        .then(res => res.data)
        .then(persons => persons.find(p => p.name === name))
}

const update = (id, person) => {
    return Axios.patch(`${baseUrl}/${id}`, person)
}

export { create, remove, update, findPersonByName }