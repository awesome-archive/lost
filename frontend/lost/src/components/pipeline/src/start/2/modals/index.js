import React, { Component } from 'react'
import DatasourceModal from './types/DatasourceModal'
import ScriptModal from './types/ScriptModal'
import AnnoTaskModal from './types/annoTaskModal/AnnoTaskModal'
import LoopModal from './types/LoopModal'
import actions from 'actions/pipeline/pipelineStart'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
const { toggleModal, verifyNode, verifyTab } = actions


class BaseModal extends Component {
    constructor() {
        super()
        this.verifyNode = this.verifyNode.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }

    selectModal() {
        switch (this.modalData.type) {
            case 'datasource': return (
                <DatasourceModal
                    {...this.modalData} />
            )
            case 'script': return (
                <ScriptModal
                    {...this.modalData} />
            )
            case 'annoTask': return (
                <AnnoTaskModal
                    {...this.modalData}
                    availableLabelTrees={this.props.data.availableLabelTrees}
                    availableGroups={this.props.data.availableGroups}
                />
            )
            case 'loop': return (
                <LoopModal
                    {...this.modalData}
                />
            )

        }
    }



    verifyNode() {
        let verified = false
        switch (this.modalData.type) {
            case 'datasource':
                const { datasource } = this.modalData.exportData
                if (datasource.rawFilePath) {
                    verified = true
                } else {
                    verified = false
                }
                break
            case 'script':
                const { script } = this.modalData.exportData
                verified = script.arguments ? Object.keys(script.arguments).filter(el => !script.arguments[el].value).length === 0 : true
                break
            case 'annoTask':
                const { annoTask } = this.modalData.exportData
                if (annoTask.name &&
                    annoTask.instructions &&
                    annoTask.assignee &&
                    (annoTask.labelLeaves.length > 0) &&
                    annoTask.workerId &&
                    annoTask.selectedLabelTree
                ) {
                    verified = true
                } else {
                    verified = false
                }
                break
            case 'loop':
                verified = true
        }

        this.props.verifyNode(this.modalData.peN, verified)

        const allNodesVerified = this.props.data.elements.filter((el) => {
            // because store is not yet updated check current Node validation
            if (el.peN === this.modalData.peN) {
                return !verified
            }
            return !el.verified
        }
        ).length === 0

        this.props.verifyTab(1, allNodesVerified)


    }



    toggleModal() {
        this.props.toggleModal(this.props.step.modalClickedId)

    }
    render() {
        if(this.props.data && this.props.step.modalOpened){
            this.modalData = this.props.data.elements.filter(el => el.peN === this.props.step.modalClickedId)[0]
        }
        return (
            <Modal onClosed={this.verifyNode} size='lg' isOpen={this.props.step.modalOpened} toggle={this.toggleModal}>
                {(this.props.data && this.props.step.modalOpened) &&
                    <>
                        <ModalHeader >
                            {this.modalData.title}
                        </ModalHeader>
                        <ModalBody>
                            {this.selectModal()}
                        </ModalBody>
                    </>

                }

                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleModal}>Okay</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        step: state.pipelineStart.stepper.steps[1],
        data: state.pipelineStart.step1Data
    }
}

export default connect(
    mapStateToProps,
    { toggleModal, verifyNode, verifyTab }
)(BaseModal)