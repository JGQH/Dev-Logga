import { useReducer } from 'react';

/**
 * Use Async
 * @param {Function} func 
 * @returns {[any, string, Function]}
 */
export function useAsync(func) {
    const [ current, dispatch ] = useReducer((_, action) => {
        switch(action.state) {
            case 'LOADING':
            case 'ERROR':
            case 'FINISHED':
                return {state: action.state, value:action.value};
            default:
                throw new Error("INCORRECT STATE");
        }
    }, {state:'LOADING'})
    
    const doAsync = () => {
        dispatch({state:'LOADING'})
        func()
            .then(val => {
                dispatch({state:'FINISHED', value:val});
            })
            .catch(_ => {
                console.log(_);
                dispatch({state:'ERROR'});
            })
    }

    return [current.value, current.state, doAsync];
}