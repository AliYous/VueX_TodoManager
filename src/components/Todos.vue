<template>
	<div>
		<h3> Todos </h3>
		<div class="legend">
			<span>Double click item to mark as complete</span>
			<span class="incomplete-box"></span> = incomplete
			<span class="complete-box"></span> = complete
		</div>
		<div class="todos">
			<div @dblclick="onDblClick(todo)" v-for="todo in allTodos" v-bind:key="todo.id" class="todo" v-bind:class="{'is-complete':todo.completed}"> <!-- It will add the is-complete class if todo.completed is true-->
					{{todo.title}}
					<i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
			</div>
		</div>
	</div>
</template>


<script>
import { mapGetters, mapActions} from 'vuex';

export default {
		name: "Todos",
		methods: {
			...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
			onDblClick(todo) {
				const updatedTodo = {
					id: todo.id,
					title: todo.title,
					completed: !todo.completed
				}
				this.updateTodo(updatedTodo);
			}
		},
    computed: mapGetters(['allTodos']), //Returns the todos from the state
		created() {
			this.fetchTodos() //Call the fetchTodos Action when the component loads
		}
}

</script>


<style scoped>
    .todos {
			display: grid;
			grid-template-columns: repeat(3,1fr);
			grid-gap: 1rem
		}

		.todo {
			border: 1px solid #ccc;
			background: #41b883;
			padding: 1rem;
			border-radius: 5px;
			text-align: center;
			position: relative;
			cursor: pointer;
		}

		i {
			position: absolute;
			bottom: 10px;
			right: 10px;
			color: #fff;
			cursor: pointer;
		}

	.legend {
			display: flex;
			justify-content: space-around;
			margin-bottom: 1rem;
		}

		.complete-box {
			display: inline-block;
			width: 10px;
			height: 10px;
			background: #35495e;
		}

		.incomplete-box {
			display: inline-block;
			width: 10px;
			height: 10px;
			background: #41b883;
		}

/* will be added to todo elements when double clicked (completed) */
		.is-complete {
			background: #35495e;
			color: #fff;
		}

/* Make the todos stack up when display is < 500px*/
		@media (max-width: 500px) {
			.todos {
				grid-template-columns: 1fr;
			}
		}
</style>