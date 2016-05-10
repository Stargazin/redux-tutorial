/* *Need better understanding of* 

*/

const reducer1 = (state = {}, action) => {
	switch (action.type) {
		case 'ACTION_11':
			state = Object.assign({}, action)
		case 'ACTION_12':
			// modify state prop matching action.text
		default: // covers action.type = undefined or unknown type
			return state;
	}
}

const reducer2 = (state = [], action) => {
	switch (action.type) {
		case 'ACTION_21':
			// modify state prop matching action.id
		case 'ACTION_22':
			// modify state prop matching action.text
		default: // covers action.type = undefined or unknown type
			return state;
	}
}

const reducer3 = (state = '', action) => {
	switch (action.type) {
		case 'ACTION_31':
			// modify state prop matching action.id
		case 'ACTION_32':
			// modify state prop matching action.text
		default: // covers action.type = undefined or unknown type
			return state;
	}
}

import { combineReducers, createStore } = Redux

// returns top-level reducer function(state = {}, action)
const rootReducer = combineReducers({
	reducer1,
	reducer2,
	reducer3
});

const store = createStore(rootReducer);

/* *createStore(reducer) implementation*
const createStore = (reducer) => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) => { // action is an obj
		// reducer is rootReducer; has default state = {}
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	}

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => { // unsubscribe ()
			listeners = listeners.filter(l => l !== listener)
		}
	}

	// dispatch({}); // initialize with an empty object

	return { getState, dispatch, subscribe };
}
*/

/* *store.state abstraction*
state = {
	reducer1__state__: {...},
	reducer2__state__: [...],
	reducer3__state__: '...'
}
*/

/* *What is an action*
// compare store.dispatch(action) to Component.setState({}):
// both pass an object literal as an argument specifying a state.prop to update
// store.dispatch(action) modifies the global state
// Component.setState({}); modifies the local (Component's) state
*/

/* actionTypes.js */
/* actionCreators.js */

const action1 = () => {
	// setup action
	return {
		type: 'ACTION_11',
		id: 'newID'
	}
}


/* Subscription to store implementation 1 */

const render = () => { // abstract root element render for store.subscribe()
	ReactDOM.render(
		<App
			// everything in store.state object is accessible inside app
			// can be passed freely to child components
			{...store.getState()} // store.getState() returns root state obj
		/>,
		document.getElementById('root');
	);
}

store.subscribe(render) // update store.state in app when action is dispatched

/* Subscription to store implementation 2 */

import { store }

ReactDOM.render(
	<Provider store={store}>
		<Router history={...}>
			<Route></Route>
			<Route></Route>
			<Route></Route>
		</Router>
	</Provider>
)

	/* In child Component */
	// doesn't modify existing component; returns a new one based on old one
	// mapStateToProps and mapDispatchToProps inject
	// store.state.prop(s) and action creators to Component
	// if mapDispatchToProps functions are wrapped in dispatch(actionCreator),
	// they can be called directly: this.props.dispatchAction();
	// otherwise, probably something like:
	// dispatcher(this.props.actionCreator());
export default connect(mapStateToProps, mapDispatchToProps)(Component);


// implementation 2 seems better because you can specifiy which
// store.state props you want a component to "subscribe" to
// implementation 1 seems like you need to pass specific props
// through all components until it gets to where it needs to be
// or use contextTypes

render(); // initial render