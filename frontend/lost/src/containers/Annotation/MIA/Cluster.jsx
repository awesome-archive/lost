import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MIAImage from './NewMIAImage'
import actions from '../../../actions'

import './Cluster.scss'
import { Alert, Button } from 'reactstrap'

const { getMiaAnnos, getWorkingOnAnnoTask, getMiaLabel, finishMia } = actions

// class Cluster extends Component {
const Cluster = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const images = useSelector((state) => state.mia.images)
    const maxAmount = useSelector((state) => state.mia.maxAmount)
    const zoom = useSelector((state) => state.mia.zoom)
    const workingOnAnnoTask = useSelector((state) => state.annoTask.workingOnAnnoTask)

    useEffect(() => {
        getMiaAnnos(maxAmount)
    }, [])

    // componentWillReceiveProps(props) {
    //     if (props.workingOnAnnoTask) {
    //         const { size, finished } = workingOnAnnoTask
    //         if (size - finished > 0) {
    //             if (props.images.length === 0) {
    //                 dispatch(getMiaAnnos(this.props.maxAmount))
    //                 dispatch(getMiaLabel())
    //             }
    //         }
    //     } else {
    //         dispatch(getWorkingOnAnnoTask())
    //     }
    // }

    useEffect(() => {
        if (workingOnAnnoTask) {
            const { size, finished } = workingOnAnnoTask
            if (size - finished > 0) {
                if (images.length === 0) {
                    dispatch(getMiaAnnos(maxAmount))
                    dispatch(getMiaLabel())
                }
            }
        } else {
            dispatch(getWorkingOnAnnoTask())
        }
    }, [workingOnAnnoTask])

    const dispatchWorkingAnnoTasks = () => {
        dispatch(getWorkingOnAnnoTask())
    }

    const renderFinishTask = () => {
        if (workingOnAnnoTask) {
            const { size, finished } = workingOnAnnoTask
            if (size - finished === 0) {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div>
                            <Alert color="success">
                                No more images available. Please press finish in order to
                                continue the pipeline.
                            </Alert>
                            <Button
                                color="primary"
                                size="lg"
                                onClick={() =>
                                    dispatch(
                                        finishMia(
                                            navigate('/dashboard'),
                                            dispatchWorkingAnnoTasks,
                                        )
                                    )
                                }
                            >
                                <i className="fa fa-check"></i> Finish Task
                            </Button>{' '}
                        </div>
                    </div>
                )
            }
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    {/* <Spinner color="primary" /> */}
                    <i className="fa fa-image fa-spin fa-4x"></i>
                </div>
            </div>
        )
    }

    if (images.length > 0) {
        return (
            <div className="mia-images">
                {images.map((image) => {
                    return (
                        <MIAImage
                            key={image.id}
                            image={image}
                            miaKey={image.id}
                            height={zoom}
                        ></MIAImage>
                    )
                })}
            </div>
        )
    } else {
        return <React.Fragment>{renderFinishTask()}</React.Fragment>
    }
}

export default Cluster
