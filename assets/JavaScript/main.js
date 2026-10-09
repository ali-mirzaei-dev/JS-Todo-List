
const closeBtn = document.getElementById("closeBtn")
const nav = document.querySelector("nav")
const main = document.querySelector("main")
const leftBtn = document.getElementById("leftBtn")
const placeHolder = document.querySelector("body")
const themeToggle = document.getElementById("themeToggle");


// ------- THEME LOCAL STORAGE LOAD ------- //
let savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme')
}

// ------- THEME TOGGLE ------- //
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
});

// ------- CLOSE SIDEBAR ------- //
function closeSidebar() {
    nav.classList.add("md:w-0!", "md:p-0!");
    nav.classList.add("-translate-x-full");

    setTimeout(() => {
        leftBtn.classList.remove("md:hidden");
        leftBtn.parentElement.classList.remove("md:justify-end");
    }, 450);
}

closeBtn.addEventListener("click", closeSidebar);

leftBtn.addEventListener("click", () => {
    if (nav.classList.contains("-translate-x-full")) {

        // OPEN SIDEBAR
        nav.classList.remove("-translate-x-full");
        leftBtn.classList.add("md:hidden");
        leftBtn.parentElement.classList.add("md:justify-end");

        setTimeout(() => {
            nav.classList.remove("md:w-0!", "md:p-0!");
        }, 50);
    } else {

        // CLOSE SIDE BAR
        closeSidebar();
    }
})



let tasks = []
const emptyState = document.getElementById("emptyState")
const addTaskInEmpty = document.getElementById("addTaskInEmpty")
const newTasksPlace = document.getElementById("newTasksPlace")
const toolBar = document.getElementById("toolBar")
const totalTasksPlace = document.getElementById("totalCounter")
const completedTaskPlace = document.getElementById("completedCounter")

let newTaskInput
let addNewTask
let totalTaskCount = 0
let isEditing = false;

// ------- LOCAL STORAGE LOAD ------- //
let tempTasks = JSON.parse(localStorage.getItem('dataBase'))

if (tempTasks) {
    tasks = tempTasks
    renderTask()
    check()
    loader()
}

// ------- THIS GENERATES THE NEW TASK INPUT BOX ------- //
function addTask() {
    newTaskInput = document.createElement("li")
    newTaskInput.className = "mt-1 border w-full border-gray-300 rounded-xl py-4 px-3 flex flex-wrap gap-2 *:w-full"
    newTaskInput.innerHTML = `
        
            <textarea id="inputValue" placeholder="Please write your task here!" class="border text-primary border-none resize-none focus:outline-none"></textarea>
        
            <div class="flex justify-between">
                 <div class="flex gap-2 items-center">
                     <i class="icon text-secondary bg-hover hover:bg-gray-300">ﭐ</i>

                     <span class="flex items-center capitalize p-1 rounded-lg cursor-pointer hover:bg-hover text-primary">
                         <i class="icon no-hover text-secondary">ﰅ</i>
                         date
                     </span>
                 </div>
             
                 <div class="flex items-center gap-2">
                     <i onclick="deleteAddBox()" class="icon text-secondary text-lg"></i>
                     <i onclick="submitTask()" class="icon bg-accent hover:bg-red-700 text-white">מּ</i>
                 </div>
            </div>`

    newTasksPlace.appendChild(newTaskInput)
    setTimeout(() => {
        const textarea = document.getElementById("inputValue");
        if (textarea) textarea.focus();
    }, 0);
}

// ------- FIRST TASK ------- //
addTaskInEmpty.addEventListener("click", () => {
    emptyState.classList.add("hidden")
    toolBar.classList.remove("hidden")
    toolBar.classList.add("flex")
    addTask()
})

// ------- SUBMIT TASK AND CREATING THE ARRAY AND DATABASE------- //
function submitTask() {
    const inputValue = document.getElementById("inputValue")

    if (inputValue.value.trim() != '') {
        let tempAdd = {
            name: inputValue.value,
            id: Date.now(),
            status: "off"
        }
        tasks.push(tempAdd);

        renderTask()
        addTask()
        check()
    }
}

// ------- THIS SAVES TO LOCAL STORAGE ------- //
function saveTask() {
    localStorage.setItem('dataBase', JSON.stringify(tasks))
}

// ------- RENDER TASKS ------- // 
function renderTask() {
    newTasksPlace.innerHTML = "";

    tasks.forEach((val) => {
        let addedTask = document.createElement("li");

        addedTask.className = "w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-secondary/20 rounded-md px-3 py-4 gap-2 *:flex *:gap-2";
        addedTask.setAttribute("data-id", val.id);

        if (val.status == "on") {
            addedTask.classList.add("bg-[#f0fdf4]");
            addedTask.innerHTML = `
                    <div class="items-center">
                        <input onchange="markComplete(this)" type="checkbox" checked class="custom-checkbox mt-0.5">
                        <span class="line-through decoration-1 decoration-green-800 text-green-700 break-words">${val.name}</span>
                    </div>
                    <div class=" shrink-0">
                        <i onclick="deleteAddedTask(this)" class="icon icon-delete"></i>
                    </div>`;
        } else {
            addedTask.innerHTML = `
                    <div class="items-center">
                        <input onchange="markComplete(this)" type="checkbox" class="custom-checkbox mt-0.5">
                        <span class="break-words">${val.name}</span>
                    </div>
                    <div class="shrink-0">
                        <i onclick="editAddedTask(this)" class="icon hover:text-yellow-400"></i>
                        <i onclick="deleteAddedTask(this)" class="icon icon-delete hover:text-accent"></i>
                        <i class="icon">ﭏ</i>
                    </div>`;
        }

        newTasksPlace.appendChild(addedTask);
    });

    addNewTask = document.createElement("div");
    addNewTask.className = "w-full flex justify-center py-4";
    addNewTask.innerHTML = `
            <button onclick="addNewTaskFunc()" class="capitalize hover:bg-hover cursor-pointer py-1 pr-2 rounded-lg">
                <i class="icon no-hover">ﭐ</i>
                add task
            </button>`;
}

// ------- THIS SHOWS THE ADD BTN UNDER THE TASKS ------- //
function showAddBtn() {
    if (addNewTask && document.body.contains(addNewTask)) return;

    addNewTask = document.createElement("div");
    addNewTask.className = "w-full flex justify-center py-4";
    addNewTask.innerHTML = `
                <button onclick="addNewTaskFunc()" class="capitalize hover:bg-hover cursor-pointer py-1 pr-2 rounded-lg">
                    <i class="icon no-hover">ﭐ</i>
                    add task
                </button>`;
    newTasksPlace.appendChild(addNewTask);
}

// ------- FOR ADDING NEW TASKS WITH THE ADD BUTTON ------- //
function addNewTaskFunc() {
    if (isEditing) { return };
    addNewTask.remove()
    addTask()
}

// ------- FOR REMOVING THE NEW TASK INPUT ------- //
function deleteAddBox() {
    if (newTaskInput) newTaskInput.remove();

    if (newTasksPlace.querySelectorAll("li").length == 0) {
        emptyState.classList.remove("hidden")
        toolBar.classList.remove("flex")
        toolBar.classList.add("hidden")
    } else {
        showAddBtn();
    }
}

// ------- DELETING AN ADDED TASK ------- //
function deleteAddedTask(element) {
    let deleteTaskConfirm = document.createElement("div")
    deleteTaskConfirm.className = "absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    deleteTaskConfirm.innerHTML = `
            <div class="bg-bgDef border border-hover rounded-xl p-6 w-full max-w-sm flex flex-col gap-5 shadow-2xl">
                <div class="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <i class="icon text-2xl text-accent no-hover"></i>
                </div>
                <div class="text-center flex flex-col gap-2">
                    <h3 class="text-lg font-bold text-primary">Delete this task?</h3>
                    <p class="text-sm text-secondary">This action cannot be undone. Are you sure you want to proceed?</p>
                </div>
                <div class="flex gap-3 mt-2">
                    <button id="cancelDelete" class="flex-1 py-2 rounded-lg border border-hover text-primary text-sm font-bold uppercase tracking-wider hover:bg-hover transition-colors cursor-pointer">Cancel</button>
                    <button id="confirmDelete" class="flex-1 py-2 rounded-lg bg-accent text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer">Delete</button>
                </div>
            </div>`

    placeHolder.appendChild(deleteTaskConfirm)

    const cancelDelete = document.getElementById("cancelDelete")
    const confirmDelete = document.getElementById("confirmDelete")

    cancelDelete.addEventListener("click", () => deleteTaskConfirm.remove())

    confirmDelete.addEventListener("click", () => {
        element.parentElement.parentElement.remove()
        deleteTaskConfirm.remove()
        const taskToDelete = +element.parentElement.parentElement.getAttribute("data-id")
        tasks.forEach((val, i) => {
            if (val.id === taskToDelete) tasks.splice(i, 1)
        })
        check()
    })

    deleteTaskConfirm.addEventListener("click", (e) => {
        if (e.target === deleteTaskConfirm) deleteTaskConfirm.remove();
    });
}

// ------- EDITING AN ADDED TASK ------- //
function editAddedTask(element) {
    if (isEditing) { return };
    isEditing = true;

    const tempValAdded = element.parentElement.parentElement.querySelector("span")
    const tempValEditId = element.parentElement.parentElement.getAttribute("data-id")

    let editAddedTaskInput = document.createElement("li")
    editAddedTaskInput.className = "mt-1 border w-full border-gray-300 rounded-xl py-4 px-3 flex flex-wrap gap-2 *:w-full"
    editAddedTaskInput.innerHTML = `

                <textarea placeholder="Please write your task here!" class="border text-primary border-none resize-none focus:outline-none">${tempValAdded.innerText}</textarea>

                <div class="flex justify-end gap-2">
                    <i id="editCancel" class="icon text-secondary text-lg"></i>
                    <i id="editOkay" class="icon bg-accent hover:bg-red-700 text-white">מּ</i>
                </div>`

    deleteAddBox()
    element.parentElement.parentElement.before(editAddedTaskInput)
    setTimeout(() => editAddedTaskInput.querySelector("textarea").focus(), 0);
    element.parentElement.parentElement.classList.add("hidden")

    document.getElementById("editOkay").addEventListener("click", () => {
        let newText = editAddedTaskInput.querySelector("textarea").value;
        if (newText.trim() != "") {
            tempValAdded.innerText = newText;
            tasks.forEach((val, i) => {
                if (val.id == tempValEditId) val.name = newText
            })
            element.parentElement.parentElement.classList.remove("hidden");
            editAddedTaskInput.remove();
            isEditing = false;
            check()
        } else {
            element.parentElement.parentElement.classList.remove("hidden");
            editAddedTaskInput.remove();
            isEditing = false;
        }
    })

    document.getElementById("editCancel").addEventListener("click", () => {
        element.parentElement.parentElement.classList.remove("hidden")
        editAddedTaskInput.remove();
        isEditing = false;
    })
}

// ------- MARKING TASKS AS COMPLETED ------- //
function markComplete(element) {
    let tempMarkId = +element.parentElement.parentElement.getAttribute("data-id")

    tasks.forEach((val, i) => {
        if (val.id === tempMarkId && val.status == "off") val.status = "on"
        else if (val.id === tempMarkId && val.status == "on") val.status = "off"
    })

    renderTask()
    check()
}

// ------- TASKS COUNTER || CHECK() ------- //
function check() {
    totalTaskCount = tasks.length
    let completeTaskCount = 0
    if (tasks.length > 0) {
        tasks.forEach((val) => {
            if (val.status == "on") completeTaskCount++
        })
    }
    loader()
    totalTasksPlace.innerText = totalTaskCount
    completedTaskPlace.innerText = completeTaskCount
    saveTask()
}

// ------- CLEAR COMPLETE TASKS ------- //
function clearCompletedTasks() {
    if (tasks.length > 0) {
        tasks = tasks.filter((task) => task.status !== "on");
        renderTask()
        loader()
        check()
    }
}

function loader() {
    if (tasks.length == 0) {
        if (newTaskInput) newTaskInput.remove();
        if (addNewTask) addNewTask.remove();
        emptyState.classList.remove("hidden")
        toolBar.classList.remove("flex")
        toolBar.classList.add("hidden")
    } else {
        emptyState.classList.add("hidden")
        toolBar.classList.add("flex")
        toolBar.classList.remove("hidden")
        if (!newTaskInput || !document.body.contains(newTaskInput)) showAddBtn()
    }
}