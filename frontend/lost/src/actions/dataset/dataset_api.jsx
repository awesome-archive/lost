import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { API_URL } from '../../lost_settings'

export const useDatasets = () => {
    return useQuery(
        ['datasets'],
        () => axios.get(`${API_URL}/datasets`).then((res) => res.data),
        {
            initialData: [],
        },
    )
}

export const useDatastoreKeys = () => {
    return useQuery(
        ['datastoresKey'],
        () => axios.get(`${API_URL}/data/datastoresKey`).then((res) => res.data),
        {
            initialData: [],
        },
    )
}

export const useCreateDataset = () => {
    return useMutation((data) =>
        axios.post(`${API_URL}/datasets`, data).then((res) => res.data),
    )
}

export const useUpdateDataset = () => {
    return useMutation((data) =>
        axios.patch(`${API_URL}/datasets`, data).then((res) => res.data),
    )
}

