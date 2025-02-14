import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../../../../actions'
import * as userApi from '../../../../../../actions/user/user_api'
import Datatable from '../../../../../../components/Datatable'
import IconButton from '../../../../../../components/IconButton'
import { alertSuccess } from '../../../../globalComponents/Sweetalert'

const TabUser = ({ annotaskId, annotaskUser, changeUser }) => {
    const { data: users } = userApi.useAnnotaskUser()
    // const users = useSelector((state) => state.user.users)
    const dispatch = useDispatch()
    const groups = useSelector((state) => state.group.groups)

    useEffect(() => {
        // dispatch(actions.getUsers())
        dispatch(actions.getGroups())
    }, [])

    function changeUserSuccessful() {
        alertSuccess('Change user successful')
    }

    function handleChangeUser(groupId) {
        changeUser(annotaskId, groupId, changeUserSuccessful)
    }
    const dataTableData = [
        ...users.map((user) => ({
            idx: user.default_group_id,
            rawName: user.user_name,
            name: `${user.user_name} (user)`,
        })),
        ...groups.map((group) => ({
            idx: group.idx,
            rawName: group.name,
            name: `${group.name} (group)`,
        })),
    ]

    return (
        <>
            {dataTableData.length > 0 ? (
                <Datatable
                    data={dataTableData}
                    columns={[
                        // {
                        //     Header: 'ID',
                        //     accessor: 'idx',
                        // },
                        {
                            Header: 'Name',
                            accessor: 'name',
                        },
                        {
                            Header: 'Change',
                            id: 'change',
                            accessor: (d) => {
                                if (d.rawName === annotaskUser) {
                                    return (
                                        <IconButton
                                            color="success"
                                            isOutline={false}
                                            text="Selected"
                                            disabled
                                        />
                                    )
                                }

                                return (
                                    <IconButton
                                        color="primary"
                                        text="Change"
                                        onClick={() => handleChangeUser(d.idx)}
                                    />
                                )
                            },
                        },
                    ]}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default TabUser
