const todo = (state, action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				completed: false,
				id: action.id,
				text: action.text
			}
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return;
			}

			return Object.assign({}, state, {completed: !state.completed})

		default:
			return state;
	}
}

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map((t) => {
				todo(t, action);
			});
		default:
			return state;
	}
}

const visibilityFilter = (
	state = 'SHOW_ALL', // default arg; state is a string
	action
) => {
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
}

const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',,
		filter
	}
}

const FilterLink = ({
	filter,
	children
}) => {
	return (
		<a href="#"
			 onClick={(e) => {
			 	e.preventDefault();
			 	store.dispatch(setVisibilityFilter(filter));
			 }}>
		</a>
	)
}

