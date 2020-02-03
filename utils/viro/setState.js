export function createState() {
    myState = {}

    myState = {
        videoPaused: false,
        foundAnchor: '',
        pauseUpdates: false,
        videoPaused: false,
        playAnim: false,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        buffering: true,
    }

    myState = {
        ...myState,
    }
    //this.state = myState
    return myState
}

export function checkInput(stateField, value) {

    /*this.setState( prevState => ({
            ...prevState,
                [stateField]: value
        })
    )*/


    myState = {
        ...this.state,
        [stateField]: value
    }

    myState = {
        ...myState,
    }
    //this.state = myState
    return myState

}