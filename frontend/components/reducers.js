import {createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';

const initialState = {    
    currentURL: "",
    referrers: [],
    referrals: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HYDRATE':
            return {...state, ...action.payload};
        case 'SET_SEARCH_URL':
            return {...state, currentURL: action.payload}
        case 'SET_REFERRALS':
            return {...state, referrers: action.payload}
        case 'ADD_REFERRALS':
            state.referrers.push(action.payload);
            return {...state, referrers: state.referrers}
        case 'TICK':
            return {...state, tick: action.payload};     
        case 'GET_WEBSITE':
            return {...state, website: action.payload};
        default:
            return state;
    }
};


const makeStore = context => createStore(reducer);

export const wrapper = createWrapper(makeStore, {debug: true});