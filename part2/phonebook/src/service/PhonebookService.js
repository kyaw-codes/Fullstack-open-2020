import Axios from 'axios'

const baseUrl = "/api/persons";

const getAll = () => Axios.get(baseUrl).then(response => response.data)

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

const update = (person) => {
    return Axios.put(`${baseUrl}/`, person).then(res => res.data)
}

export { getAll, create, remove, update, findPersonByName }