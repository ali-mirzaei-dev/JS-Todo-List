
const closeBtn = document.getElementById("closeBtn")
const nav = document.querySelector("nav")
const main = document.querySelector("main")
const leftBtn = document.getElementById("leftBtn")
const placeHolder = document.querySelector("body")
const themeToggle = document.getElementById("themeToggle")
const closeWelcome = document.getElementById("closeWelcome")
const welcomepopup = document.getElementById("welcomePopUp")
const neverShowPopUp = document.getElementById("neverShowBtn")
const editNameBtn = document.getElementById("editNameBtn")
const userNameDisplay = document.getElementById("userNameDisplay")
const userNameInput = document.getElementById("userNameInput")
const buttonsBox = document.getElementById("buttonsBox")
const cancelNameBtn = document.getElementById("cancelNameBtn")
const saveNameBtn = document.getElementById("saveNameBtn")
const emptyState = document.getElementById("emptyState")
const emptystateComplete = document.getElementById("emptyCompletedState")
const addTaskInEmpty = document.getElementById("addTaskInEmpty")
const newTasksPlace = document.getElementById("newTasksPlace")
const toolBar = document.getElementById("toolBar")
const totalTasksPlace = document.getElementById("totalCounter")
const completedTaskPlace = document.getElementById("completedCounter")
const supInbox = document.getElementById("supInbox")
const supCompleted = document.getElementById("supCompleted")
const supTrash = document.getElementById("supTrash")
const emptyStateTrash = document.getElementById("emptyTrashState")
const sortContainer = document.getElementById("sortContainer")
const sortSelect = document.getElementById("sortSelect")
const progressBar = document.getElementById("progressBar")
const progressLabel = document.getElementById("progressLabel")
const activeTasks = document.getElementById("activeTasks")
const reorderBtnWrapper = document.getElementById("reorderBtnWrapper")
const clearCompletedWrapper = document.getElementById("clearCompletedWrapper")
const clearTrashWrapper = document.getElementById("clearTrashWrapper")

let tasks = []
let trashTasks = []
let currentTab = "inbox"
let completeTaskCount
let trashTaskCount
let highPriorityCount
let mediumPriorityCount
let lowPriorityCount
let newTaskInput
let addNewTask
let tempSortValue = 'default'
let totalTaskCount = 0
let newTaskPriority = "not assigned"
let isEditing = false
let isReorder = false
let startToDragTaskId = null
let finalTaskToReplaceId = null

// ------- LOCAL STORAGE LOAD FOR USER NAME ------- // 
let tempUserName = localStorage.getItem("UserName")
if (tempUserName) {
    userNameDisplay.innerText = tempUserName
}

// ------- EDIT USER NAME ||| THIS OPENS THE USER NAME EDIT BOX ------- //
editNameBtn.addEventListener("click", () => {

    let oldUserName = userNameDisplay.innerText

    editNameBtn.classList.add("hidden")
    userNameDisplay.classList.add("hidden")
    userNameInput.value = oldUserName
    userNameInput.classList.remove("hidden")
    buttonsBox.classList.remove("hidden")
    buttonsBox.classList.add("flex")
    setTimeout(() => {
        userNameInput.focus()
    }, 0);
})

// ------- CANCELING USERNAME EDIT ------- //
cancelNameBtn.addEventListener("click", () => {
    editNameBtn.classList.remove("hidden");
    userNameDisplay.classList.remove("hidden");
    userNameInput.classList.add("hidden");
    buttonsBox.classList.add("hidden");
    buttonsBox.classList.remove("flex");
});

// ------- CONFORMING USERNAME EDIT ------- //
saveNameBtn.addEventListener("click", () => {
    editNameBtn.classList.remove("hidden");
    userNameDisplay.classList.remove("hidden");
    userNameInput.classList.add("hidden");
    buttonsBox.classList.add("hidden");
    buttonsBox.classList.remove("flex");

    let newUserName = userNameInput.value.trim();
    if (newUserName !== "") {
        userNameDisplay.innerText = newUserName;
        localStorage.setItem("UserName", newUserName);
    }
});

// ------- CLOSE WELCOME POPUP LOCAL STORAGE ------- //
let savePopUp = localStorage.getItem('chiocePopUp')
if (savePopUp == "off") {
    welcomepopup.classList.add("hidden")
}

neverShowPopUp.addEventListener("click", () => {
    welcomepopup.classList.add("hidden")
    localStorage.setItem('chiocePopUp', 'off')
})

// ------- CLOSE WELCOME POPUP ONCE------- //
closeWelcome.addEventListener("click", () => {
    welcomepopup.classList.add("hidden")

})

// ------- SHOW CREDITS ------- //
function showCredits() {
    welcomepopup.classList.remove("hidden");
}

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


// ------- CLOSE AND OPEN SIDEBAR ------- //
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


// ------- LOCAL STORAGE ALL TASKS LOAD ------- //
let tempTasks = JSON.parse(localStorage.getItem('dataBase'))

if (tempTasks) {
    tasks = tempTasks
    renderTask()
    check()
}

// ------- LOCAL STORAGE COMPLETE TASKS LOAD ------- //
let tempTrashTasks = JSON.parse(localStorage.getItem("trashDataBase"))

if (tempTrashTasks) {
    trashTasks = tempTrashTasks
}

// ------- THIS GENERATES THE NEW TASK INPUT BOX ------- //
function addTask() {
    newTaskInput = document.createElement("li")
    newTaskInput.className = "mt-1 border w-full border-gray-300 rounded-xl py-4 px-3 flex flex-wrap gap-2 mb-5 *:w-full"
    newTaskInput.innerHTML = `
        
            <textarea id="inputValue" onkeydown="keyFunctions(event)" placeholder="Please write your task here!" class="border text-primary border-none resize-none focus:outline-none"></textarea>
        
            <div class="flex justify-between">
                <div class="flex gap-2 items-center">
                    <i class="icon text-secondary bg-hover hover:bg-gray-300">ﭐ</i>

                   <span onclick="event.stopPropagation(); setPriorityMenu(event)" class="flex items-center capitalize p-1 rounded-lg cursor-pointer hover:bg-hover text-primary relative">
                        <i class="icon no-hover text-secondary"></i>
                        <span>set priority</span>
                    </span>

                </div>
             
                <div class="flex items-center gap-2">
                    <i onclick="deleteAddBox()" class="icon text-secondary text-lg" title="Close task input"></i>
                    <i onclick="submitTask()" class="icon bg-accent hover:bg-red-700 text-white" title="Submit task">מּ</i>
                </div>
            </div>`

    newTasksPlace.appendChild(newTaskInput)

    if (main) {
        main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
    }

    setTimeout(() => {

        const textarea = document.getElementById("inputValue");
        if (textarea) textarea.focus();
    }, 100);
}

// ------- FIRST TASK ------- //
addTaskInEmpty.addEventListener("click", () => {
    emptyState.classList.add("hidden")
    toolBar.classList.remove("hidden")
    toolBar.classList.add("flex")
    addTask()
})

function keyFunctions(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitTask()
    }

    if (e.key === "Escape") {
        e.preventDefault()
        deleteAddBox()
    }
}

// ------- SUBMIT TASK AND CREATING THE ARRAY AND DATABASE------- //
function submitTask() {
    const inputValue = document.getElementById("inputValue")

    if (inputValue.value.trim() != '') {
        let tempAdd = {
            name: inputValue.value,
            id: Date.now(),
            status: "off",
            visibility: "show",
            isPinned: false,
            priority: newTaskPriority
        }
        tasks.push(tempAdd);

        newTaskPriority = "not assigned"

        renderTask()
        addTask()
        check()
    }
}

// ------- THIS SAVES TO LOCAL STORAGE ------- //
function saveTask() {
    localStorage.setItem('dataBase', JSON.stringify(tasks))
}

// ------- THIS SAVE THE COMPLETED TASKS ------- //
function saveTrashTasks() {
    localStorage.setItem("trashDataBase", JSON.stringify(trashTasks))
}

// ------- RENDER TASKS ------- // ---------------------------------------------------------------------------------
function renderTask() {
    newTasksPlace.innerHTML = "";

    // 1. INBOX TAB
    if (currentTab === 'inbox') {
        tasks.forEach((val) => {

            // ------- this handles sort by priority 
            if (tempSortValue !== 'default' && val.priority !== tempSortValue) return

            // ------- this handles to hide or show the completed tasks
            if (val.visibility == 'hide') return

            // ------- this handles the pinned task Icon 
            let pinnedIcon = "";
            if (val.isPinned === true) {
                pinnedIcon = `<i class="icon text-secondary no-hover cursor-default shrink-0 text-base" title="Pinned to top"></i>`;
            }

            // ------- this handles the pin/unpin action button
            let pinButton = "";
            if (val.isPinned === true) {
                pinButton = `<i onclick="unpinTask(event, ${val.id})" class="icon cursor-pointer hover:text-violet-500" title="Unpin from top"></i>`;
            } else {
                pinButton = `<i onclick="pinToTop(event, ${val.id})" class="icon cursor-pointer hover:text-violet-500" title="Pin to top"></i>`;
            }

            let addedTask = document.createElement("li")
            addedTask.setAttribute("data-id", val.id)

            // ------- Creating the base classes of tasks based on their condition
            let baseClasses = "w-full flex items-center justify-between px-4 py-4 gap-4 transition-colors rounded-lg";

            if (isReorder) {
                baseClasses += " border-2 border-dashed border-accent/50 cursor-grab hover:bg-hover/50 mb-1 select-none";
                addedTask.setAttribute("onmousedown", `dragMouseDown(event, ${val.id})`);
                addedTask.setAttribute("onmouseover", `dragMouseOver(event, ${val.id})`);

            } else {
                baseClasses += " border-b border-secondary/20";

                if (val.status == "on") {
                    baseClasses += " bg-green-700/20 hover:bg-green-700/30";
                } else {
                    baseClasses += " hover:bg-hover/50";
                }
            }
            addedTask.className = baseClasses;

            let actionButtons = "";
            if (!isReorder) {
                if (val.status == "on") {
                    actionButtons = `
                        ${pinButton}
                        <i onclick="hideFromInbox(this, ${val.id})" class="icon cursor-pointer hover:text-green-500" title="Hide complete task from Inbox"></i>
                        <i onclick="deleteAddedTask(event, ${val.id})" class="icon icon-delete hover:text-accent" title="Move to Trash"></i>`;
                } else {
                    actionButtons = `
                        <i onclick="editAddedTask(this)" class="icon hover:text-yellow-400" title="Edit Task"></i>
                        <div class="relative">
                            <i onclick="event.stopPropagation(); openMoreMenu(this, ${val.id})" class="icon cursor-pointer">ﭏ</i>
                        </div>`;
                }
            }

            // ------- Complete Tasks
            if (val.status == "on") {
                addedTask.innerHTML = `
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <input onchange="markComplete(this)" type="checkbox" checked class="custom-checkbox shrink-0">
                    <span class="relative wrap-break-word flex-1 line-through decoration-1 decoration-green-800 text-green-700">
                        ${val.name}
                        <span class="absolute top-0 rotate-45">${pinnedIcon}</span>
                    </span>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    ${actionButtons}
                </div>`

            } else {
                let priorityDot = "bg-gray-300"
                if (val.priority === "high") priorityDot = "bg-red-500"
                else if (val.priority === "medium") priorityDot = "bg-yellow-500"
                else if (val.priority === "low") priorityDot = "bg-green-500"

                addedTask.innerHTML = `
                <div class="flex items-center gap-3 flex-1 min-w-0 justify-between">
                    <input onchange="markComplete(this)" type="checkbox" class="custom-checkbox shrink-0">
                    <span class="wrap-break-word flex-1 relative">
                        <span class="spanText">${val.name}</span>
                        <span class="absolute top-0 rotate-45">${pinnedIcon}</span>
                    </span>
                    <span class=" w-2.5 h-2.5 rounded-full ${priorityDot} shrink-0 ring-2 ring-bgDef/40" title="Priority: ${val.priority}"></span>
                </div>
                <div class="flex items-center gap-2 shrink-0 ml-2">
                    ${actionButtons}
                </div>`
            }

            newTasksPlace.appendChild(addedTask);
        })
    }

    // 2. COMPLETED TAB
    else if (currentTab === 'completed') {
        tasks.forEach((val) => {

            if (val.status !== "on") return;

            // ------- this handles the pinned task Icon
            let pinnedIcon = "";
            if (val.isPinned === true) {
                pinnedIcon = `<i class="icon text-secondary no-hover cursor-default shrink-0 text-base" title="Pinned to top"></i>`;
            }

            let addedTask = document.createElement("li");
            addedTask.setAttribute("data-id", val.id);

            addedTask.className = "w-full flex items-center justify-between border-b border-secondary/20 px-4 py-4 gap-4 transition-colors hover:bg-green-700/30 rounded-lg ";
            addedTask.classList.add("bg-green-700/20");
            addedTask.innerHTML = `
            <div class="flex items-center gap-3 flex-1 min-w-0">
                <input onchange="markComplete(this)" type="checkbox" checked class="custom-checkbox shrink-0">
                <span class="relative wrap-break-word flex-1 line-through decoration-1 decoration-green-800 text-green-700">
                    ${val.name}
                    <span class="absolute top-0 rotate-45">${pinnedIcon}</span>
                </span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <i onclick="deleteAddedTask(this)" class="icon icon-delete hover:text-accent"></i> 
            </div>`;

            newTasksPlace.appendChild(addedTask);
        });
    }

    // 3. TRASH TAB
    else if (currentTab === 'trash') {
        trashTasks.forEach((val) => {

            let addedTrashTask = document.createElement("li");
            addedTrashTask.setAttribute("data-id", val.id);

            addedTrashTask.className = "w-full flex items-center justify-between border-b border-secondary/20 px-4 py-4 gap-4 transition-colors hover:bg-hover/30 rounded-lg opacity-90";

            addedTrashTask.innerHTML = `
            <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="wrap-break-word flex-1 text-secondary line-through decoration-red-500/50">${val.name}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0 ml-2">
                <i onclick="restoreTask(this)" class="icon hover:text-green-500" title="Restore Task"></i>
                <i onclick="deleteForever(this)" class="icon text-secondary hover:text-accent cursor-pointer" title="Delete Forever"></i>
            </div>`;

            newTasksPlace.appendChild(addedTrashTask);
        });
    }
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

    newTaskPriority = "not assigned"
}

// ------- DELETING AN ADDED TASK ------- //
function deleteAddedTask(e, taskId = null) {

    const openMenu = e.target.closest(".dropdown-menu");
    if (openMenu) openMenu.remove();

    let deleteTaskConfirm = document.createElement("div")
    deleteTaskConfirm.className = "absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    deleteTaskConfirm.innerHTML = `
            <div class="bg-bgDef border border-hover rounded-xl p-6 w-full max-w-sm flex flex-col gap-5 shadow-2xl">
                <div class="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <i class="icon text-2xl text-accent no-hover"></i>
                </div>
                <div class="text-center flex flex-col gap-2">
                    <h3 class="text-lg font-bold text-primary">Delete this task?</h3>
                    <p class="text-sm text-secondary">This task will be moved to the Trash. You can restore it later. Are you sure you want to proceed?</p>
                </div>
                <div class="flex gap-3 mt-2">
                    <button id="cancelDelete" class="flex-1 py-2 rounded-lg border border-hover text-primary text-sm font-bold uppercase tracking-wider hover:bg-hover transition-colors cursor-pointer">Cancel</button>
                    <button id="confirmDelete" class="flex-1 py-2 rounded-lg bg-accent text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer">Delete</button>
                </div>
            </div>`

    placeHolder.appendChild(deleteTaskConfirm)

    const cancelDelete = document.getElementById("cancelDelete")
    const confirmDelete = document.getElementById("confirmDelete")

    cancelDelete.addEventListener("click", () => {
        deleteTaskConfirm.remove()
    })

    confirmDelete.addEventListener("click", () => {


        let tempDelete = tasks.findIndex(val => val.id == taskId)

        if (tempDelete !== -1) {

            trashTasks.push(tasks[tempDelete])
            tasks.splice(tempDelete, 1)
            saveTrashTasks()
            showToast("Task Moved to Trash!", "assets/Images/Delete.WebP");
        }

        renderTask()
        deleteTaskConfirm.remove()
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

    const tempValAdded = element.parentElement.parentElement.querySelector(".spanText")
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
        if (val.id === tempMarkId && val.status == "off") {
            val.status = "on"
        }
        else if (val.id === tempMarkId && val.status == "on") {
            val.status = "off"
            val.visibility = "show"
        }
    })
    renderTask()
    check()
}

// ------- HIDING A COMPLETED TASK ------- //
function hideFromInbox(element, taskId = null) {

    let tempVisibilityState = tasks.findIndex(val => val.id == taskId)

    if (tempVisibilityState !== -1) {
        tasks[tempVisibilityState].visibility = 'hide'
        saveTask()
        renderTask()
        check()
    }
}

// ------- CHECK() || TASKS COUNTER ------- // ++++++++++++++++++++++++++++++++++++++++
function check() {
    totalTaskCount = tasks.length
    trashTaskCount = trashTasks.length
    completeTaskCount = 0
    hiddenTasksCount = 0
    highPriorityCount = 0
    mediumPriorityCount = 0
    lowPriorityCount = 0

    if (tasks.length > 0) {
        tasks.forEach((val) => {
            if (val.status == "on") {
                completeTaskCount++

                if (val.visibility == "hide") {
                    hiddenTasksCount++
                }
            }
            if (val.priority == 'high') { highPriorityCount++ }
            if (val.priority == 'medium') { mediumPriorityCount++ }
            if (val.priority == 'low') { lowPriorityCount++ }
        })
    }

    loader()
    totalTasksPlace.innerText = totalTaskCount
    completedTaskPlace.innerText = completeTaskCount
    activeTasks.innerText = totalTaskCount - completeTaskCount
    supInbox.innerText = (totalTaskCount - hiddenTasksCount)
    supCompleted.innerText = completeTaskCount
    supTrash.innerText = trashTaskCount

    if (tasks.length > 0) {
        let progressCalc = Math.round((completeTaskCount * 100) / totalTaskCount)

        progressLabel.innerText = progressCalc + '%'
        progressBar.style.width = progressCalc + '%'

        progressBar.classList.remove('bg-red-400', 'bg-yellow-300', 'bg-green-300')
        if (progressCalc <= 33) {
            progressBar.classList.add('bg-red-400')
        }
        else if (progressCalc >= 34 && progressCalc <= 66) {
            progressBar.classList.add('bg-yellow-300')
        }
        else if (progressCalc >= 67) {
            progressBar.classList.add('bg-green-300')
        }
    }
    else {
        progressLabel.innerText = '0%'
        progressBar.style.width = '0%'
        progressBar.classList.remove('bg-red-400', 'bg-yellow-300', 'bg-green-300')
    }

    saveTask()
}

// ------- CLEAR COMPLETE TASKS ------- //
function clearCompletedTasks() {
    if (tasks.length > 0) {

        tasks.forEach((val) => {
            if (val.status === "on") {
                trashTasks.push(val);
            }
        })
        saveTrashTasks();


        tasks = tasks.filter((val) => val.status !== "on")
        
        showToast("Completed tasks moved to trash!", "assets/Images/Delete.WebP")
        renderTask()
        loader()
        check()
    }
}

// ------- CLEAR ALL TRASH TASKS PERMANENTLY ------- //
function clearTrashTasks() {
    if (trashTasks.length > 0) {

        trashTasks = []
        saveTrashTasks()

        showToast("Trash Emptied Forever!", "assets/Images/Delete.WebP")
        renderTask()
        check()
    }
}


// ------- LOADER() ||| THIS CEHCKS IF IT SHOULD SHOW THE EMPTY STATE and TOOLBAR ------- //
function loader() {

    if (currentTab === 'inbox') {
        emptystateComplete.classList.add("hidden")
        emptyStateTrash.classList.add("hidden")
        clearTrashWrapper.classList.add("hidden")
        clearCompletedWrapper.classList.add("hidden")
        reorderBtnWrapper.classList.add("flex")
        reorderBtnWrapper.classList.remove("hidden")

        // ------- INBOX
        if (tasks.length == 0) {
            if (newTaskInput) newTaskInput.remove()
            if (addNewTask) addNewTask.remove()
            emptyState.classList.remove("hidden")
            toolBar.classList.remove("flex")
            toolBar.classList.add("hidden")
            sortContainer.classList.add("hidden")
            sortContainer.classList.remove("flex")
            reorderBtnWrapper.classList.remove("hidden")
            clearCompletedWrapper.classList.add("hidden")
            clearTrashWrapper.classList.add("hidden")

        } else {
            emptyState.classList.add("hidden")
            toolBar.classList.add("flex")
            toolBar.classList.remove("hidden")
            if (!newTaskInput || !document.body.contains(newTaskInput)) {
                if (!isReorder) {
                    showAddBtn()
                }
            }
            sortContainer.classList.remove("hidden")
            sortContainer.classList.add("flex")
        }
    }

    // ------- Completed
    else if (currentTab === 'completed') {
        emptyState.classList.add("hidden")
        emptyStateTrash.classList.add("hidden")
        sortContainer.classList.add("hidden")
        sortContainer.classList.remove("flex")
        reorderBtnWrapper.classList.add("hidden")
        clearTrashWrapper.classList.add("hidden")

        if (completeTaskCount === 0) {
            emptystateComplete.classList.remove("hidden")
            emptystateComplete.classList.add("flex")
            toolBar.classList.remove("flex")
            toolBar.classList.add("hidden")
            clearCompletedWrapper.classList.add("hidden")

        } else {
            emptystateComplete.classList.add("hidden")
            emptystateComplete.classList.remove("flex")
            toolBar.classList.add("flex")
            toolBar.classList.remove("hidden")
            clearCompletedWrapper.classList.remove("hidden")
        }
    }
    // ------- TRASH
    else if (currentTab === 'trash') {
        emptyState.classList.add("hidden")
        emptystateComplete.classList.add("hidden")
        emptystateComplete.classList.remove("flex")
        sortContainer.classList.add("hidden")
        sortContainer.classList.remove("flex")
        reorderBtnWrapper.classList.add("hidden")
        clearCompletedWrapper.classList.add("hidden")

        if (trashTasks.length == 0) {
            emptyStateTrash.classList.remove("hidden")
            emptyStateTrash.classList.add("flex")
            toolBar.classList.remove("flex")
            toolBar.classList.add("hidden")
            clearTrashWrapper.classList.add("hidden")

        } else {
            emptyStateTrash.classList.add("hidden")
            emptyStateTrash.classList.remove("flex")
            toolBar.classList.add("flex")
            toolBar.classList.remove("hidden")
            clearTrashWrapper.classList.remove("hidden")
        }
    }
}

// ------- GLOBAL CLICK OUTSIDE LISTENER ------- //
document.addEventListener("click", (e) => {

    const isClickInsideMenu = e.target.closest(".dropdown-menu")

    if (!isClickInsideMenu) {
        const openMenus = document.querySelectorAll(".dropdown-menu")

        openMenus.forEach(menu => menu.remove())
    }
});

// ------- MORE MENU ||| THIS OPENS MORE MENU  ------- //
function openMoreMenu(element, taskId = null) {

    const isMoreOpen = element.querySelector("ul")

    // ------- THIS ALLOWS ONLY ONE MENU TO OPEN
    const isMoreOpen2 = document.querySelectorAll(".dropdown-menu")
    isMoreOpen2.forEach(menu => menu.remove())
    deleteAddBox()

    if (isMoreOpen) {
        isMoreOpen.remove()

    }
    else {

        let taskData = tasks.find(val => val.id == taskId)

        let pinButtonHTML = ""

        if (taskData && taskData.isPinned === true) {
            pinButtonHTML = `
            <li onclick="unpinTask(event , ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors group">
                <i class="icon no-hover text-base group-hover:text-violet-500"></i>
                Unpin from top
            </li>`

        } else {
            pinButtonHTML = `
            <li onclick="pinToTop(event , ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors group">
                <i class="icon no-hover text-base group-hover:text-violet-500"></i>
                Pin to top
            </li>`
        }

        let moreMenu = document.createElement("ul")
        moreMenu.addEventListener("click", (e) => e.stopPropagation())
        moreMenu.className = "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-bgDef border border-hover rounded-xl shadow-2xl shadow-black/10 z-50 flex flex-col gap-1 p-2 dropdown-menu"

        moreMenu.innerHTML = `
            ${pinButtonHTML}

            <li onclick="setPriorityMenu(event , ${taskId})" class="relative flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors group">
                <i class="icon no-hover text-base group-hover:text-green-500">ﰅ</i>
                Set Priority
            </li>

            <li onclick="deleteAddedTask(event , ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors group">
                <i class="icon icon-delete no-hover text-base group-hover:text-accent"></i>
                Delete Task
            </li>`

        element.appendChild(moreMenu)
    }
}

// ------- PIN TO TOP ------- //
function pinToTop(e, taskId) {


    const openMenu = e.target.closest(".dropdown-menu");
    if (openMenu) openMenu.remove();

    let indexPinToTop = tasks.findIndex(val => val.id == taskId)

    if (indexPinToTop !== -1) {
        let taskToPin = tasks.splice(indexPinToTop, 1)[0];
        taskToPin.isPinned = true;
        tasks.unshift(taskToPin)
    }

    saveTask()
    renderTask()
    check()
    showToast("Task Pinned to Top!", "assets/Images/Notes.svg");

}

// ------- UNPIN FROM TOP ------- //
function unpinTask(e, taskId) {

    const openMenu = e.target.closest(".dropdown-menu");
    if (openMenu) openMenu.remove();

    let taskIndex = tasks.findIndex(val => val.id == taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].isPinned = false;
        let taskToUnpin = tasks.splice(taskIndex, 1)[0]
        tasks.push(taskToUnpin)
    }

    saveTask();
    renderTask();
    check();
    showToast("Task Unpinned!", "assets/Images/Notes.svg");
}

// ------- PRIORITY MENU ||| THIS OPENS THE PRIORITY MENU ------- //
function setPriorityMenu(e, taskId = null) {

    e.stopImmediatePropagation()

    const wrapper = e.currentTarget;
    const isPriority = wrapper.querySelector("ul")

    if (isPriority) {
        isPriority.remove()

    } else {

        let dropDownPriority = document.createElement("ul")
        dropDownPriority.addEventListener("click", (e) => e.stopPropagation());
        dropDownPriority.className = "absolute top-0 left-[105%] w-40 bg-bgDef border border-hover rounded-xl shadow-2xl shadow-black/10 z-50 flex flex-col gap-1 p-2 dropdown-menu";

        dropDownPriority.innerHTML = `
            <li onclick="setTaskPriority(event , 'high' , 'text-red-500', ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                High
            </li>
            <li onclick="setTaskPriority(event , 'medium' , 'text-yellow-500', ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                Medium
            </li>
            <li onclick="setTaskPriority(event , 'low' , 'text-green-500', ${taskId})" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
                <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Low
            </li>`

        wrapper.appendChild(dropDownPriority)
    }
}

// ------- SET PRIORITY ||| THIS SETS THE PRIORITY ------- //
function setTaskPriority(e, priority, color, taskId = null) {

    e.stopImmediatePropagation()

    // ------- For Existing tasks
    if (taskId != null) {
        tasks.forEach((val) => {
            if (val.id == taskId) {
                val.priority = priority
            }
        })

        const menu = e.target.closest("ul");
        if (menu) menu.remove();

        renderTask()
        check()
        return;
    }

    // ------- For new generating tasks
    if (taskId == null) {
        newTaskPriority = priority
        let currentText = color

        const menu = e.target.closest("ul")
        const button = menu.parentElement

        const labelSpan = button.querySelector("span")
        const icon = labelSpan.previousElementSibling

        if (labelSpan) {
            labelSpan.innerText = "priority: " + newTaskPriority
            labelSpan.classList.remove("text-red-500", "text-yellow-500", "text-green-500", "text-secondary")
            labelSpan.classList.add(currentText)

            let darkColor = "text-secondary";
            if (currentText === "text-red-500") darkColor = "text-red-700";
            else if (currentText === "text-yellow-500") darkColor = "text-amber-600";
            else if (currentText === "text-green-500") darkColor = "text-green-600";

            if (icon) {
                icon.classList.remove("text-red-700", "text-amber-600", "text-green-600", "text-secondary")
                icon.classList.add(darkColor)
            }
        }

        menu.remove();
    }
}

// ------- OPEN SORT MENU ------- //
function toggleSortMenu(element) {

    const isMenuOpen = element.querySelector("ul")

    const isMoreOpen2 = document.querySelectorAll(".dropdown-menu")
    isMoreOpen2.forEach(menu => menu.remove());

    if (isMenuOpen) {
        isMenuOpen.remove()
    }
    else {
        tempMenu = document.createElement("ul")
        tempMenu.className = "dropdown-menu absolute -top-[25%] left-[110%] mt-2 w-48 bg-bgDef border border-hover rounded-xl shadow-2xl shadow-black/10 z-50 flex-col gap-1 p-2"
        tempMenu.innerHTML = `
        <li onclick="setSort('default', 'All' , 'text-secondary', '${totalTaskCount}')" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
            <span class="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
            All
            <span id="mediumPriorityPlace" class="ml-auto text-xs">${totalTaskCount}</span>
        </li>
        <li onclick="setSort('high', 'High Priority', 'text-red-500', '${highPriorityCount}')" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            High Priority
            <span id="highPriorityPlace" class="ml-auto text-xs">${highPriorityCount}</span>
        </li>
        <li onclick="setSort('medium', 'Medium Priority', 'text-yellow-500', '${mediumPriorityCount}')" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            Medium Priority
            <span id="mediunPriorityPlace" class="ml-auto text-xs">${mediumPriorityCount}</span>
        </li>
        <li onclick="setSort('low', 'Low Priority', 'text-green-500', '${lowPriorityCount}')" class="flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm font-medium text-secondary hover:bg-hover hover:text-primary transition-colors">
            <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span> 
            Low Priority
            <span id="lowPriorityPlace" class="ml-auto text-xs">${lowPriorityCount}</span>
        </li>`

        element.appendChild(tempMenu)
        isReorder = false
    }
}

// ------- SELECTING AN OPTION IN THE SORT MENU ------- //
function setSort(value, text, color, amount) {

    const sortLabel = document.getElementById("sortLabel")


    if (amount > 0) {
        tempSortValue = value
        sortLabel.innerText = text
        sortLabel.classList.remove('text-red-500', 'text-yellow-500', 'text-green-500', 'text-secondary')
        sortLabel.classList.add(color)
    } else {
        tempSortValue = 'default'
        sortLabel.innerText = 'All'
        sortLabel.classList.remove('text-red-500', 'text-yellow-500', 'text-green-500', 'text-secondary')
        showToast("No tasks with this priority!", "assets/Images/Empty Box.SVG");
    }

    renderTask()
    check()
}

// ------- SWITCH TAB ------- //
function switchTab(element, tabName) {

    currentTab = tabName

    document.querySelectorAll("nav ul li").forEach(val => {
        val.classList.remove("active-link")
    });

    element.classList.add("active-link")

    document.querySelector("h2").innerText = tabName

    tempSortValue = 'default'
    isReorder = false
    renderTask()
    check()
}

// ------- RESTORE ||| TIHS RESTORES THE TRASHED TASKS ------- // 
function restoreTask(element) {

    const tempRestoreId = +element.parentElement.parentElement.getAttribute('data-id')
    const indexRestoreId = trashTasks.findIndex(val => val.id == tempRestoreId)

    if (indexRestoreId !== -1) {

        tasks.push(trashTasks[indexRestoreId])
        trashTasks.splice(indexRestoreId, 1)
        showToast("Task Restored Successfully!", "assets/Images/Restore.WebP");
    }

    renderTask()
    saveTask()
    saveTrashTasks()
    check()
}

// ------- TOAST Message ------- //
let toastTimer = null
function showToast(message, imagePath) {

    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        clearTimeout(toastTimer)
        existingToast.remove()
    }

    const toast = document.createElement("div");

    toast.className = "toast fixed top-10 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm bg-white border border-hover shadow-2xl rounded-xl px-6 py-4 flex items-center gap-4 opacity-0 -translate-y-4 transition-all duration-500 ease-out";

    toast.innerHTML = `
        <img src="${imagePath}" alt="Notification" class="w-10 h-10 object-contain shrink-0">
        <span class="text-[#202020] font-bold capitalize text-sm md:text-base">${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove("opacity-0", "-translate-y-4");
        toast.classList.add("opacity-100", "translate-y-0");
    }, 50);

    setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "-translate-y-4");

        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// ------- DELETE PERMANENTLY  ------- //
function deleteForever(element) {

    const tempDeleteId = +element.parentElement.parentElement.getAttribute("data-id")
    const indexToDelete = trashTasks.findIndex(val => val.id === tempDeleteId)

    if (indexToDelete !== -1) {
        trashTasks.splice(indexToDelete, 1)

        showToast("Task Deleted Forever!", "assets/Images/Delete.WebP");
    }

    saveTrashTasks()
    renderTask()
    check()
}

// ------- REORDER TASKS ------- //
function toggleReorderMode() {
    if (totalTaskCount > 1) {
        isReorder = !isReorder
        renderTask()
        check()
    } else if (totalTaskCount == 1) {
        showToast("there is only one task", 'assets/Images/empty ghost.SVG')
    } else {
        showToast('there is no task to reorder', 'assets/Images/empty ghost.SVG')
    }
}

// ------- MOUSE DOWN || STRAT DRAGING ------- //
function dragMouseDown(e, taskId) {
    e.preventDefault();

    startToDragTaskId = taskId
    e.currentTarget.classList.add("opacity-50", "cursor-grabbing")

    document.addEventListener("mouseup", dragMouseUp)
}

// ------- MOUSE OVER || THIS HANDLES HOVERING TASKS ------- //
function dragMouseOver(e, taskId) {

    if (startToDragTaskId !== null && taskId !== startToDragTaskId) {

        finalTaskToReplaceId = taskId;

        const allTasks = document.querySelectorAll("#newTasksPlace li");
        allTasks.forEach(val => val.classList.remove("border-t-4", "border-b-4", "border-green-500"));

        e.currentTarget.classList.add("border-t-4", "border-b-4", "border-green-500");
    }
}

// ------- MOUSE UP || FINISHING DRAGING ------- // 
function dragMouseUp(e) {

    document.removeEventListener("mouseup", dragMouseUp);

    if (startToDragTaskId !== null && finalTaskToReplaceId !== null && startToDragTaskId !== finalTaskToReplaceId) {

        let startIndex = tasks.findIndex(val => val.id == startToDragTaskId)
        let finalIndex = tasks.findIndex(val => val.id == finalTaskToReplaceId)

        if (startIndex !== -1 && finalIndex !== -1) {
            let draggedTask = tasks.splice(startIndex, 1)[0]

            tasks.splice(finalIndex, 0, draggedTask)

            saveTask()
        }
    }

    startToDragTaskId = null
    finalTaskToReplaceId = null

    isReorder = false
    renderTask()
    check()
}

check()