import axios from 'axios'
import { API_URL } from '../../lost_settings'
import { useMutation, useQuery } from 'react-query'

export const useUpdateConfig = () => {
    return useMutation((data) =>
        axios
            .put(`${API_URL}/annotask/${data.annotaskId}/config`, {
                configuration: data.configuration,
            })
            .then((res) => res.data),
    )
}

export const useGetStorageSettings = (annoTaskId) => {
    return useQuery(['annoDataStorageSettings'], () =>
        axios
            .get(`${API_URL}/annotask/${annoTaskId}/storage_settings`)
            .then((res) => res.data),
    )
}

export const useUpdateStorageSettings = () => {
    return useMutation((data) =>
        axios
            .patch(`${API_URL}/annotask/${data.annoTaskId}/storage_settings`, data)
            .then((res) => res),
    )
}

export const useGenerateExport = () => {
    return useMutation((data) =>
        axios
            .post(`${API_URL}/annotask/${data.annotaskId}/export`, data.exportConfig)
            .then((res) => res.data),
    )
}

export const useGetDataexports = (annoTaskId) => {
    return useQuery(
        ['annoDataExports'],
        () =>
            axios
                .get(`${API_URL}/annotask/anno_task_exports/${annoTaskId}`)
                .then((res) => res.data),
        {
            initialData: null,
        },
    )
}

export const useDeleteExport = () => {
    return useMutation((annoTaskExportId) =>
        axios
            .post(`${API_URL}/annotask/delete_export/${annoTaskExportId}`, {})
            .then((res) => res.data),
    )
}

export const useAnnotask = () => {
    return useMutation((annoTaskId) =>
        axios
            .get(`${API_URL}/annotask/${annoTaskId}?config=true`)
            .then((res) => res.data),
    )
}

export const useChooseAnnotask = () => {
    return useMutation((annoTaskId) =>
        axios.post(`${API_URL}/annotask?id=${annoTaskId}`).then((res) => res.data),
    )
}

export const useAnnotaskListFiltered = () => {
    return useMutation((datatableInfo) =>
        axios
            .post(`${API_URL}/annotask/annotask_list_filter`, datatableInfo)
            .then((res) => res.data),
    )
}

export const useFilterLabels = () => {
    return useQuery(
        ['useFilterLabels'],
        () => axios.get(`${API_URL}/annotask/getFilterLabels`).then((res) => res.data),
        {
            refetchOnWindowFocus: false,
            enabled: false,
        },
    )
}
