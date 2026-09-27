/* =========================
   NAVIGATION
========================= */

function scrollToDemo() {
    document.getElementById("demo").scrollIntoView({
        behavior: "smooth"
    });
}


function scrollToFeatures() {
    document.getElementById("features").scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================
   AI PROJECT PLANNER
========================= */

function generatePlan() {
    const input = document.getElementById("goalInput");
    const result = document.getElementById("result");
    const goal = input.value.trim();

    if (goal === "") {
        result.innerHTML = `
            <p>Please enter your project idea first.</p>
        `;
        return;
    }

    let tasks = [
        { name: "Define the main objective", priority: "HIGH", time: "30 min" },
        { name: "Break the project into smaller tasks", priority: "HIGH", time: "45 min" },
        { name: "Set priorities for each task", priority: "MEDIUM", time: "20 min" },
        { name: "Create a realistic timeline", priority: "MEDIUM", time: "30 min" },
        { name: "Start with the highest-priority task", priority: "HIGH", time: "1 hour" }
    ];

    const text = goal.toLowerCase();

    if (text.includes("website") || text.includes("web")) {
        tasks = [
            { name: "Define website goals and target audience", priority: "HIGH", time: "30 min" },
            { name: "Plan pages and website structure", priority: "HIGH", time: "45 min" },
            { name: "Design the user interface", priority: "HIGH", time: "2 hours" },
            { name: "Build the frontend", priority: "HIGH", time: "4 hours" },
            { name: "Test on different devices", priority: "MEDIUM", time: "1 hour" },
            { name: "Deploy the website", priority: "MEDIUM", time: "30 min" }
        ];
    }

    else if (
        text.includes("store") ||
        text.includes("shop") ||
        text.includes("clothing")
    ) {
        tasks = [
            { name: "Define products and target customers", priority: "HIGH", time: "1 hour" },
            { name: "Choose store name and branding", priority: "HIGH", time: "1 hour" },
            { name: "Create product categories and listings", priority: "HIGH", time: "2 hours" },
            { name: "Design the online store", priority: "HIGH", time: "4 hours" },
            { name: "Set up payments and delivery", priority: "HIGH", time: "2 hours" },
            { name: "Test the shopping experience", priority: "MEDIUM", time: "1 hour" },
            { name: "Launch the store", priority: "HIGH", time: "30 min" }
        ];
    }

    else if (
        text.includes("app") ||
        text.includes("application")
    ) {
        tasks = [
            { name: "Define the app idea and target users", priority: "HIGH", time: "30 min" },
            { name: "List the core features", priority: "HIGH", time: "1 hour" },
            { name: "Create the app structure and user flow", priority: "HIGH", time: "1 hour" },
            { name: "Design the interface", priority: "MEDIUM", time: "2 hours" },
            { name: "Build the main features", priority: "HIGH", time: "6 hours" },
            { name: "Test and fix issues", priority: "MEDIUM", time: "2 hours" },
            { name: "Prepare the app for launch", priority: "HIGH", time: "1 hour" }
        ];
    }

    else if (
        text.includes("study") ||
        text.includes("exam") ||
        text.includes("learn")
    ) {
        tasks = [
            { name: "Define subjects and topics", priority: "HIGH", time: "30 min" },
            { name: "Set clear learning goals", priority: "HIGH", time: "20 min" },
            { name: "Divide the syllabus into sections", priority: "HIGH", time: "45 min" },
            { name: "Create a study schedule", priority: "HIGH", time: "30 min" },
            { name: "Practice questions and exercises", priority: "MEDIUM", time: "2 hours" },
            { name: "Review weak areas", priority: "HIGH", time: "1 hour" },
            { name: "Track your progress", priority: "LOW", time: "15 min" }
        ];
    }

    result.innerHTML = `
        <div class="ai-result-header">
            <div>
                <h3>Your AI Project Plan</h3>
                <p><strong>Goal:</strong> ${goal}</p>
            </div>
            <span class="ai-result-count">${tasks.length} tasks</span>
        </div>

        <div class="ai-task-list">
            ${tasks.map((task, index) => `
                <div class="ai-task">
                    <div class="ai-task-number">${index + 1}</div>

                    <div class="ai-task-info">
                        <strong>${task.name}</strong>
                        <span>Estimated time: ${task.time}</span>
                    </div>

                    <span class="ai-priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>
                </div>
            `).join("")}
        </div>

        <button class="primary-btn add-plan-btn" onclick="addPlanToDashboard()">
            + Add Plan to Dashboard
        </button>
    `;
}
/* =========================
   PROJECT PROGRESS
========================= */

function updateProgress() {

    const allTasks =
        document.querySelectorAll(".task");

    const completedTasks =
        document.querySelectorAll(".task.completed");

    const total =
        allTasks.length;

    const completed =
        completedTasks.length;

    const pending =
        total - completed;

    const percentage =
        total === 0
        ? 0
        : Math.round((completed / total) * 100);


    const progressFill =
        document.querySelector(".progress-fill");

    const progressNumber =
        document.querySelector(".progress-info strong");


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";
    }


    if (progressNumber) {

        progressNumber.textContent =
            percentage + "%";
    }


    const totalElement =
        document.getElementById("totalTasks");

    const completedElement =
        document.getElementById("completedTasks");

    const pendingElement =
        document.getElementById("pendingTasks");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }
}


/* =========================
   COMPLETE / UNCOMPLETE TASK
========================= */

function toggleTask(task) {

    task.classList.toggle("completed");

    const icon =
        task.querySelector(".task-icon");


    if (icon) {

        if (task.classList.contains("completed")) {
            icon.textContent = "✓";
        } else {
            icon.textContent = "○";
        }
    }


    updateProgress();

    filterTasks();
}


/* =========================
   EXISTING TASKS
========================= */

function setupExistingTasks() {

    const tasks =
        document.querySelectorAll(".task");


    tasks.forEach(function(task) {

        task.addEventListener("click", function(event) {

            if (
                event.target.closest(".edit-btn") ||
                event.target.closest(".delete-btn")
            ) {
                return;
            }

            toggleTask(task);
        });

    });
}


/* =========================
   ADD NEW TASK
========================= */

function addTask() {

    const input =
        document.getElementById("newTaskInput");

    const priorityInput =
        document.getElementById("priorityInput");


    const taskName =
        input.value.trim();

    const priority =
        priorityInput.value;


    if (taskName === "") {

        alert("Please enter a task.");

        return;
    }


    const tasksContainer =
        document.querySelector(".tasks");


    const newTask =
        document.createElement("div");


    newTask.className = "task";


    newTask.innerHTML = `
        <span class="task-icon">○</span>

        <span class="task-name">
            ${taskName}
        </span>

        <small class="priority ${priority}">
            ${priority.toUpperCase()}
        </small>

        <button
            class="edit-btn"
            onclick="editTask(this)">
            ✎
        </button>

        <button
            class="delete-btn"
            onclick="deleteTask(this)">
            🗑
        </button>
    `;


    tasksContainer.appendChild(newTask);


    /* Make new task clickable */

    newTask.addEventListener("click", function(event) {

        if (
            event.target.closest(".edit-btn") ||
            event.target.closest(".delete-btn")
        ) {
            return;
        }

        toggleTask(newTask);
    });


    input.value = "";


    updateProgress();

    filterTasks();
}


/* =========================
   EDIT TASK
========================= */

function editTask(button) {

    const task =
        button.parentElement;


    const taskName =
        task.querySelector(".task-name");


    const newName =
        prompt(
            "Edit task:",
            taskName.textContent.trim()
        );


    if (
        newName === null ||
        newName.trim() === ""
    ) {
        return;
    }


    taskName.textContent =
        newName.trim();


    filterTasks();
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(button) {

    const task =
        button.parentElement;


    const confirmDelete =
        confirm("Delete this task?");


    if (confirmDelete) {

        task.remove();

        updateProgress();

        filterTasks();
    }
}


/* =========================
   FILTER TASKS
========================= */

function filterTasks() {

    const searchInput =
        document.getElementById("taskSearch");

    const priorityInput =
        document.getElementById("taskFilter");

    const statusInput =
        document.getElementById("statusFilter");


    const search =
        searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const priorityFilter =
        priorityInput
        ? priorityInput.value
        : "all";


    const statusFilter =
        statusInput
        ? statusInput.value
        : "all";


    const tasks =
        document.querySelectorAll(".task");


    tasks.forEach(function(task) {

        const nameElement =
            task.querySelector(".task-name");


        const priorityElement =
            task.querySelector(".priority");


        const name =
            nameElement
            ? nameElement.textContent.toLowerCase()
            : "";


        const taskPriority =
            priorityElement
            ? priorityElement.classList[1]
            : "";


        const isCompleted =
            task.classList.contains("completed");


        const matchesSearch =
            name.includes(search);


        const matchesPriority =
            priorityFilter === "all" ||
            taskPriority === priorityFilter;


        const matchesStatus =
            statusFilter === "all" ||

            (
                statusFilter === "completed" &&
                isCompleted
            ) ||

            (
                statusFilter === "pending" &&
                !isCompleted
            );


        if (
            matchesSearch &&
            matchesPriority &&
            matchesStatus
        ) {

            task.style.display = "flex";

        } else {

            task.style.display = "none";
        }

    });
}


/* =========================
   INITIALIZE APP
========================= */

document.addEventListener("DOMContentLoaded", function() {

    setupExistingTasks();

    updateProgress();

    filterTasks();

});
function addPlanToDashboard() {
    const result = document.getElementById("result");

    result.insertAdjacentHTML(
        "beforeend",
        `
        <p class="plan-added">
            ✓ Plan added to your dashboard.
        </p>
        `
    );
}