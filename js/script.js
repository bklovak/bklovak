let task = document.querySelector('.input__task'),
	addTaskBtn = document.querySelector('.addTask'),
	todo = document.querySelector('.todo');


let todoList = [];

if(localStorage.getItem('todo')){
	todoList = JSON.parse(localStorage.getItem('todo'));
	displayMessages();
}

addTaskBtn.addEventListener("click", function(){
	if(!task.value) return;
	let newToDo = {
		todo: task.value,
		checked: false
	};

	todoList.push(newToDo);
	displayMessages();
	localStorage.setItem('todo', JSON.stringify(todoList));
	task.value = '';
});

function displayMessages(){
	let displayMessage = '';
	if(todoList.length === 0){
		todo.innerHTML = '';
	}
	todoList.forEach(function(item, i){
		displayMessage += `
			<li>
				<input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
				<label for="item_${i}">${item.todo}</label>
			</li>
		`;
		
		todo.innerHTML = displayMessage;
	})
}


todo.addEventListener('change', function(event){
	let idInput = event.target.getAttribute('id');
	let forLable = todo.querySelector('[for='+ idInput + ']');
	let valueLable = forLable.innerHTML;

	todoList.forEach(function(item){
		if(item.todo === valueLable){
			item.checked = !item.checked;
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	})
})

todo.addEventListener('contextmenu', function(event){
	event.preventDefault();
	todoList.forEach(function(item, i){
		if(item.todo === event.target.innerHTML){
			todoList.splice(i, 1);
		}
		displayMessages();
		localStorage.setItem('todo', JSON.stringify(todoList));
	})
})