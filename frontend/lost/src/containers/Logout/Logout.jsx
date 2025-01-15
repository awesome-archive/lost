import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, CardGroup, Container, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import actions from '../../actions'
import lostLogoColor from '../../assets/img/brand/lost_logo.png'
import backgroundImage from '/assets/background.svg'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isTimeout = window.location.hash.replace('#', '') === 'timeout'

    useEffect(() => {
        dispatch(actions.logout())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`
    })
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row
                    style={{ margin: '10% 0% 5% 0%' }}
                    className="justify-content-center"
                >
                    <img src={lostLogoColor} alt="" style={{ width: '500px' }} />
                </Row>
                <Row className="justify-content-center">
                    <CardGroup>
                        <Card className="p-4">
                            <CardBody>
                                <div>
                                    {isTimeout
                                        ? 'Your session has expired due to inactivity'
                                        : 'You have been successfully logged out.'}
                                    &nbsp;
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        style={{ marginTop: '5%' }}
                                        color="primary"
                                        onClick={() => navigate('/login')}
                                    >
                                        Back to login page!
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Row>
            </Container>
        </div>
    )
}

export default Logout
