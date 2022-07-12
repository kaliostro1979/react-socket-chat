export const testReducer = (state={}, action)=>{
    switch (action.type){
        case 'TEST/ACTION':
            return action.payload
        default:
            return state
    }
}
