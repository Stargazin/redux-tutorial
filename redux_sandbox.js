/* Reducers + store */
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
				return state;
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

import { createStore, combineReducer } from Redux;

const TodoAppReducer = combineReducer({
	todos,
	visibilityFilter
})

const store = createStore(TodoAppReducer);


/* actionCreators.js */
export const addTodo = (text) => {
	return {
		type: 'ADD_TODO',
		id: todoIdCounter++,
		text,
	}
}

export const toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	}
}

export const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',,
		filter
	}
}


/* Components */
import React from 'react';

import store from 'store';
import * from 'actionCreators';

const FilterLink = ({
	filter,
	currentFilter,
	children
}) => {
	if (currentFilter === filter) {
		return <span>{children}</span>
	}

	return (
		<a href="#"
			 onClick={(e) => {
			 	e.preventDefault();
			 	store.dispatch(setVisibilityFilter(filter));
			 }}>
			{children}
		</a>
	)
}

const Todo = ({
	text,
	completed,
	onClick
}) => {
	return (
		<li onClick={onClick}
				style={{
					textDecoration:
						completed ?
							'line-through' :
							'none'
				}}>
			{text}
		</li>
	)
}

const TodoList = ({
	todos,
	onTodoClick
}) => {
	return (
		<ul>
			{todos.map((todo) => {
				<Todo key={todo.id}
							{...todo}
							// why is onTodoClick(id) passed in as a callback?
							onClick={() => onTodoClick(todo.id)}/>
			})}
		</ul>
	)
}

let todoIdCounter = 0;

const filterTodos = (
	todos,
	filter
	) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
	}
}

class TodoApp extends React.Component {
	buttonOnClick(e) {
		e.preventDefault();
		store.dispatch(addTodo(this.input.value));
		this.input.value = '';
	}

	handleTodoClick() {
		store.dispatch(toggleTodo(todo.id))
	}

	const onTodoClick = () => {
		handleTodoClick(...)
	}

	render() {
		const { todos, visibilityFilter } = this.props;
		const visibleTodos = filterTodos(todos, visibilityFilter);

		return (
			<div>
				<input ref={node => this.input = node}/>
				<button onClick={this.buttonOnClick.bind(this)}>Add</button>
				<TodoList todos={visibleTodos}
									onTodoClick={this.handleTodoClick.bind(this)}
									onTodoClick={/>
				<p>Filter:</p>
				<FilterLink filter="SHOW_ALL"
					currentFilter={visibilityFilter}>
					ALL
				</FilterLink>
				<FilterLink filter="SHOW_ACTIVE"
					currentFilter={visibilityFilter}>
					ACTIVE
				</FilterLink>
				<FilterLink filter="SHOW_COMPLETED"
					currentFilter={visibilityFilter}>
					COMPLETED
				</FilterLink>
			</div>
		)
	}
}

const render = () => {
	ReactDOM.render(
		<TodoApp {...store.getState()} />,
		document.getElementById('root')
	)
}

store.subscribe(render)
render();