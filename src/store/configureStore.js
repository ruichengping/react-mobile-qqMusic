import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    return store;
};