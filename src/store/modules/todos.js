//This is our todos module and this is where we put our states, getters, actions, mutations ...

import axios from 'axios'

//This where the data sits
const state = {
	todos: []
}

//Allows to access state information
const getters = {
	allTodos: (state) => state.todos
}

//The action will call the API, get a response and trigger a mutation that will change the state
//We use the action to get the data and then we change the state using the mutation (commit)
const actions = {
	async fetchTodos({ commit }) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
		commit("setTodos" , response.data) //We use commit to call the setTodo mutation
		//What we do with commit is basically call setTodos(state, response.data)
	},

	async addTodo({ commit }, title) {
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false});
		commit('newTodo', response.data)
	},

	async deleteTodo({ commit }, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
		commit ('removeTodo', id)
	}
}

const mutations = {

	setTodos: (state, todos) => (state.todos = todos),//We set the state of 
	//the todos param here is response.data from the action

	newTodo: (state, todo) => state.todos.unshift(todo),

	removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
} 

export default {
    state,
    getters,
    actions,
    mutations
}