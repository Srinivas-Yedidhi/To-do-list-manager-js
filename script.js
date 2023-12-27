const addForm = document.querySelector(".add");
const task = document.querySelector(".task");
const clearAll = document.querySelector(".clear")
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

//creating a function to update the message.
function updateMessage(){
    const tasklength = task.children.length;
    messageSpan.textContent = `You have ${tasklength} pending tasks`
}
updateMessage();

addForm.addEventListener("submit", event => {
    event.preventDefault();

    //checking for user input whether it is empty or not
    //trim will remove all extra white spaces in the input
    const value = addForm.task.value.trim();

    if(value.length){
        console.log(value);

        //using innerHTML we are adding an "li" element in the HTML script dynamically when we clicked on add button.

        task.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`
        addForm.reset();
        updateMessage();
    }
});

//deleting tasks which are added.
task.addEventListener("click",(event) =>{

    // checking for the delete class
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
});

// when clicked on clear All it will delete all "li" (task) items.
clearAll.addEventListener("click",(event) => {
    const taskItems = task.querySelectorAll("li");
    taskItems.forEach(item =>{
        item.remove();
        updateMessage();
    }) 
});

function filterTask(term){
    Array.from(task.children).filter((task)=>{
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task =>{
        task.classList.add("hide");
    });
    Array.from(task.children).filter((task)=>{
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task =>{
        task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup",(event)=>{
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term);
})

searchForm.addEventListener("click", event =>{
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.toLowerCase().value.trim();
        filterTask(term);
    }
})