import * as actionTypes from './actions';

const initialState = {
    myWatchlist: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_MOVIE:
            
            return {
                ...state,
                myWatchlist: state.myWatchlist.concat( action.movieId )
            }
        case actionTypes.REMOVE_MOVIE:
            return {
                ...state,
                myWatchlist: state.myWatchlist.filter(movie => movie!== action.movieId)
            }
        default:
            return state;
        }
};

export default reducer;