import $ from "cash-dom"

import { mouse, keyboard } from "l3p-frontend"

import * as propertiesView from "./propertiesView"

import appModel from "siaRoot/appModel"
import * as http from "siaRoot/http"
import * as modals from "siaRoot/modals"
import * as data from "siaRoot/http"

import imageInterface from "components/image/imageInterface"


appModel.event.creationEvent.on("change", isActive => isActive ? onCreationEventStart() : onCreationEventEnd())
appModel.event.changeEvent.on("change", isActive => isActive ? onChangeEventStart() : onChangeEventEnd())

// on init
appModel.config.on("update", config => {
    let labelingEnabled = undefined
    if(config.actions.labeling){
        if(!labelingEnabled){
            enableLabeling()
            labelingEnabled = true
        }
    } else {
        disableLabeling()
    }
})
// on new image
appModel.data.image.url.on("update", url => {
	http.requestImage(url).then(blob => {
		const objectURL = window.URL.createObjectURL(blob)
		propertiesView.image.src = objectURL
	})
	enableNavigationButtons()
})
// on drawable selection
appModel.state.selectedDrawable.on("before-update", detachDrawable)
appModel.state.selectedDrawable.on("update", attachDrawable)
appModel.state.selectedDrawable.on("reset", detachDrawable)
appModel.state.selectedLabel.on("update", label => {
	// todo: observable object on change.... to add redo undo for changing labels.
	propertiesView.setDescription(label.description)
	if(appModel.isADrawableSelected()){
		const drawable = appModel.getSelectedDrawable()
		// save state
		// state.add(new state.StateElement({
		// 	do: {
		// 		data: { drawable, label },
		// 		fn: (data) => {
		// 			const { drawable, label } = data
		// 			console.log("set label:", label)
		// 			if(drawable.parent){
		// 				drawable.parent.setLabel(label)
		// 			} else {
		// 				drawable.setLabel(label)
		// 			}
		// 		},
		// 	},
		// 	undo: {
		// 		data: { drawable, label: drawable.model.label },
		// 		fn: (data) => {
		// 			const { drawable, label } = data
		// 			console.log("set label:", label)
		// 			if(drawable.parent){
		// 				drawable.parent.setLabel(label)
		// 			} else {
		// 				drawable.setLabel(label)
		// 			}
		// 		},
		// 	},
		// }))
		// execute
		if(drawable.parent){
			drawable.parent.setLabel(label)
		} else {
			drawable.setLabel(label)
		}		
	}
})

// view bindings
$(propertiesView.html.refs["btn-prev"]).on("click", ($event) => {
    // return on right or middle mouse button, prevent context menu.
    if (!mouse.button.isLeft($event.button)) {
        $event.preventDefault()
        return
    }
    $event.preventDefault()
    propertiesView.disablePrevButton()
    if(appModel.data.image.isLast){
        propertiesView.disableNextButton()
    }
    updateData("previous")
})
$(propertiesView.html.refs["btn-next"]).on("click", ($event) => {
    // return on right or middle mouse button, prevent context menu.
    if (!mouse.button.isLeft($event.button)) {
        $event.preventDefault()
        return
    }
    $event.preventDefault()
    if(!appModel.data.image.isLast){
        updateData("next")
        propertiesView.disableNextButton()
    }
})
$(propertiesView.html.refs["btn-first"]).on("click", ($event) => {
    // return on right or middle mouse button, prevent context menu.
    if (!mouse.button.isLeft($event.button)) {
        $event.preventDefault()
        return
    }
    $event.preventDefault()
    propertiesView.disableFirstButton()
    if(appModel.data.image.isLast){
        propertiesView.disableNextButton()
    }
    updateData("first")
})
$(propertiesView.html.refs["btn-latest"]).on("click", ($event) => {
    // return on right or middle mouse button, prevent context menu.
    if (!mouse.button.isLeft($event.button)) {
        $event.preventDefault()
        return
    }
    $event.preventDefault()
    propertiesView.disableLastButton()
    updateData("last_edited")
})


function onCreationEventStart(){
    disableLabeling()
    disableNavigationButtons()
}
function onCreationEventEnd(){
    enableLabeling()
    enableNavigationButtons()
}
function onChangeEventStart(){
    disableNavigationButtons()
}
function onChangeEventEnd(){
    enableNavigationButtons()
}


function updateTable(bounds: any){
    const drawable = appModel.state.selectedDrawable.value
    propertiesView.updateTable(drawable)
}
function updateCanvas(){
    const { imgW, imgH } = imageInterface.getDimensions()
    const drawable = appModel.state.selectedDrawable.value
    const bounds = drawable.getBounds()
    const pointPadding = 5
    if(drawable !== undefined && drawable.getClassName() === "PointPresenter"){
        bounds.w = pointPadding * 2
        bounds.h = pointPadding * 2
    }

    propertiesView.hideCanvasBorder()

    // values to calculate
    let sbx,sby,sbw,sbh,
    drawableRatio,canRatio,
    canvasZoomFactor,drawableZoomFactor,
    hScaled, hDiff, shDiff,
    wScaled, wDiff,swDiff,
    padding;

    // expand the selection that the drawable determines to the canvas dimensions
    // ------------------------------------------------------------------
    // instead of using the actual pixel values of the drawable
    // use its relative values and get the corresponding actual values
    // matching the drawable on the source image.
    // sb = source drawable
    const imgSourceH = propertiesView.image.height
    const imgSourceW = propertiesView.image.width
    if(drawable !== undefined && drawable.getClassName() === "PointPresenter"){
        sbx = (drawable.model.relBounds.x * imgSourceW) - (pointPadding / imgW * imgSourceW)
        sby = (drawable.model.relBounds.y * imgSourceH) - (pointPadding / imgH * imgSourceH)
        sbw = (bounds.w / imgW) * imgSourceW
        sbh = (bounds.h / imgH) * imgSourceH
    } else {
        sbx = drawable.model.relBounds.left * imgSourceW
        sby = drawable.model.relBounds.top * imgSourceH
        sbw = drawable.model.relBounds.w * imgSourceW
        sbh = drawable.model.relBounds.h * imgSourceH
    }

    // determine zoom factor
    // its calculation is depending on the ratios of the drawable and the canvas
    drawableRatio = bounds.w / bounds.h
    const canW = propertiesView.html.refs["canvas"].width
    const canH = propertiesView.html.refs["canvas"].height
    canRatio = canW / canH

    if (drawableRatio >= canRatio) {
        // when applying the zoom factor later the drawable preview width
        // will match the canvas width, but the drawable height wont fill
        // the canvas height
        // zoom factor depends on width
        canvasZoomFactor = canW / sbw

        // center clipping
        // -----------------------------------------------------------------
        // get resulting height difference when zooming
        hScaled = sbh * canvasZoomFactor
        hDiff = canH - hScaled
        // get the actual hight difference (scale height diff to img size)
        shDiff = hDiff / canvasZoomFactor
        // center the clipping by moving the startpoint up
        sby -= (shDiff / 2)

        // calculate padding
        // -----------------------------------------------------------------
        drawableZoomFactor = canW / bounds.w
        padding = (canH - (bounds.h * drawableZoomFactor)) / 2
    }
    else {
        // when applying the zoom factor later the drawable preview height
        // will match the canvas height, but the drawable width wound fill
        // the canvas width
        // zoom factor depends on height
        canvasZoomFactor = canH / sbh

        // center clipping
        // -----------------------------------------------------------------
        wScaled = sbw * canvasZoomFactor
        // get resulting height difference
        wDiff = canW - wScaled
        // get the actual width difference (scale width diff to img size)
        swDiff = wDiff / canvasZoomFactor
        // center the clipping by moving the startpoint left
        sbx -= (swDiff / 2)

        // calculate padding
        // -----------------------------------------------------------------
        drawableZoomFactor = canH / bounds.h
        padding = (canW - (bounds.w * drawableZoomFactor)) / 2
    }

    propertiesView.updateCanvas({
        drawable: {
            source: {
                x: sbx,
                y: sby,
            },
            zoomFactor: drawableZoomFactor,
            width: bounds.w,
            height: bounds.h,
            ratio: drawableRatio,
        },
        canvas: {
            zoomFactor: canvasZoomFactor,
            width: canW,
            height: canH,
            ratio: canRatio,
        },
        padding: padding,
    })
}
function updateData(action: String){
    // choose data request depending on the action string:
    let requestData = undefined
    switch(action){
        case "previous":
            requestData = data.requestPreviousData
            break
        case "next":
            requestData = data.requestNextData
            break
        case "first":
            requestData = data.requestFirstData
            break
        case "latest":
            requestData = data.requestLatestData
            break
        case "last_edited":
            requestData = data.requestLastEdited
            break
        default: 
            throw new Error(`The action string is invalid.`)
    }
    return data.sendData(appModel.getResponseData()).then(() => {
        Promise.all([
            data.requestLabels(),
            requestData(),
        ]).then((responses) => {
            let [labels, annotations] = responses
            console.log("%c update via request ", "background: #282828; color: #FE8019")
            console.log({labels})
            console.log({annotations})
            appModel.updateLabels(labels.labels)
            appModel.updateAnnotations(annotations)
			// update react annotation status bar.
			appModel.reactComponent.props.getWorkingOnAnnoTask()
        }).catch((reason) => {
            console.error(reason)
        })
    })
}

function keyRequestPreviousData($event){
    if(keyboard.isShortcutHit($event, {
        mod: ["Control", "Alt"],
        key: "ArrowLeft"
    })){
        $event.preventDefault()
        // $event.stopPropagation()
        propertiesView.disableNavigationButtons()
        updateData("previous")
    }
}
function keyRequestNextData($event){
    if(keyboard.isShortcutHit($event, {
        mod: ["Control", "Alt"],
        key: "ArrowRight"
    })){
        $event.preventDefault()
        $event.stopPropagation()
        propertiesView.disableNavigationButtons()
        updateData("next")
    }
}


function enableLabeling(){
    $(window).on("keydown.openLabelSelect", $event => {
        if(keyboard.isShortcutHit($event, { 
			mod: "Control",
			key: "L",
		})){
			// prevent default (focus browser adress line)
			$event.preventDefault()
            // hitting controll while having multipoint drawable selected will enter change mode.
            // did not find a good solution to fix it. just leaving change mode here...
            appModel.event.changeEvent.update(false)
			if(document.activeElement !== propertiesView.html.refs["label-select"].querySelector("input")){
				// open the dropdown
				propertiesView.html.refs["label-select"].querySelector("input").focus()
			}
        }
    })
}
function disableLabeling(){
    $(window).off("keydown.openLabelSelect")
}

function attachDrawable(drawable: DrawablePresenter){
    if(drawable !== undefined && Object.keys(drawable).length > 0){
        // initial update
        updateCanvas()
        updateTable()

        // continous update
        drawable.model.actBounds.on("update", updateCanvas)
        drawable.model.actBounds.on("update", updateTable)

        // enable label and description and set the boxes label by id + description
		appModel.state.selectedLabel.update(drawable.model.label)
    }
}
function detachDrawable(drawable: DrawablePresenter){
    if(drawable !== undefined && Object.keys(drawable).length > 0){
        drawable.model.actBounds.off("update", updateCanvas)
        drawable.model.actBounds.off("update", updateTable)
        propertiesView.resetDescription()
        propertiesView.resetCanvas()
        propertiesView.resetTable()
    }
}

// Can I move this to propertiesInterface?
function handleLastImage(){
    propertiesView.disableLastButton()
    propertiesView.setNextButtonState("finish")
    $(propertiesView.html.refs["btn-next"]).on("click", modals.show)
    $(window).off("keydown", keyRequestPreviousData).on("keydown", keyRequestPreviousData)
    $(window).off("keydown", keyRequestNextData)
}
function handleNotLastImage(){
    propertiesView.enableLastButton()
    propertiesView.setNextButtonState("default")
    $(propertiesView.html.refs["btn-next"]).off("click", modals.show)
    $(window).off("keydown", keyRequestPreviousData).on("keydown", keyRequestPreviousData)
    $(window).off("keydown", keyRequestNextData).on("keydown", keyRequestNextData)
}
function handleFirstImage(){
    propertiesView.disablePrevButton()
    propertiesView.disableFirstButton()
}
function handleNotFirstImage(){
    propertiesView.enablePrevButton()
    propertiesView.enableFirstButton()
}
// Can I move this to propertiesInterface?

// Can I move this to propertiesInterface?
export function enableNavigationButtons(){
	const { isFirst, isLast } = appModel.data.image
	if(isFirst){
		handleFirstImage()
	} else {
		handleNotFirstImage()
	}
	if(isLast){
		handleLastImage()
	} else {
		handleNotLastImage()
	}
}
export function disableNavigationButtons(){
	propertiesView.disableNavigationButtons()
}
// Can I move this to propertiesInterface?

export function resize(){
    propertiesView.resize()
    if(appModel.isADrawableSelected()){
        updateCanvas()
        propertiesView.hideCanvasBorder()
    }
}
export function show(){
    propertiesView.show()
}
export function hide(){
    propertiesView.hide()
}

export function getBounds(){
    return propertiesView.getBounds()
}
export function getWidth(){
    return propertiesView.getWidth()
}
export function getHeight(){
    return propertiesView.getHeight()
}

export function setLayout(layout: String){
    propertiesView.setLayout(layout)
}