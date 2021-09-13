let initialState = {
    name:"",
    email:"",

    userSkills: [],
    userProficiencies: [],
    userTechStack:"",

    partnerTechStack: "",
    partnerSkills: [],
    partnerProficiencies: [],
    
    error: "",
    loading: true
}
function userReducer(state = initialState, action){
    switch (action.type){
        case "SUCCESS_USER_DETAILS":
            return {
                ...action.payload,
                loading: false,
                error: false
            }
        case "ERROR_USER_DETAILS":
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case 'ADD_DATA_TO_USER':
            return {
                ...state,
                userSkills: action.payload.inputSkills,
                userProficiencies: action.payload.inputProficiencyValues,
            }
        case 'ADD_DATA_TO_PARTNER':
            return {
                ...state,
                partnerSkills: action.payload.inputSkills,
                partnerProficiencies: action.payload.inputProficiencyValues,
            }
        default :
            return state;
    }
}
export default userReducer;