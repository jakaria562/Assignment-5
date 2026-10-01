let allIssues = [];

const issuesContainer = document.getElementById("issues-container");



const loadIssues = async () => {

    const url =
        "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    const res = await fetch(url);

    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
};



const displayIssues = (issues) => {

    issuesContainer.innerHTML = "";


    issues.forEach((issue) => {

        const div = document.createElement("div");


        div.innerHTML = `

            <div class="border border-gray-200 border-t-2 ${
                issue.status === "open"
                    ? "border-t-green-500"
                    : "border-t-purple-500"
            } rounded-sm bg-white shadow-sm">

                <div class="flex justify-between items-center px-3 pt-3">

                    <img
                        class="w-5"
                        src="assets/${issue.status}-Status.png"
                        alt="${issue.status}"
                    >

                    <span class="px-3 py-1 rounded-full bg-red-50 text-red-400 text-[9px]">
                        ${issue.priority.toUpperCase()}
                    </span>

                </div>


                <div class="px-3 py-2">

                    <h3 class="text-[10px] font-semibold text-gray-800">
                        ${issue.title}
                    </h3>


                    <p class="text-[8px] text-gray-500 mt-3 leading-3">
                        ${issue.description}
                    </p>


                    <div class="flex flex-wrap gap-1 mt-2">

                        ${issue.labels.map((label) => `

                            <span class="px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-[7px]">
                                ${label.toUpperCase()}
                            </span>

                        `).join("")}

                    </div>


                    <div class="border-t border-gray-200 mt-2 px-3 py-2">

                        <p class="text-[8px] text-gray-500">
                            #${issue.id} by
                            <span class="text-gray-700">
                                ${issue.author}
                            </span>
                        </p>

                        <p class="text-[8px] text-gray-400 mt-1">
                            ${issue.createdAt}
                        </p>

                    </div>

                </div>

            </div>

        `;


        issuesContainer.appendChild(div);

    });

};



const filterIssues = (status) => {

    if (status === "all") {

        displayIssues(allIssues);

    } else {

        const filteredIssues = allIssues.filter(
            (issue) => issue.status === status
        );

        displayIssues(filteredIssues);

    }

};



const statusTabs = document.querySelectorAll(".status-btn");


statusTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        statusTabs.forEach((item) => {
            item.classList.remove("btn-primary");
            item.classList.add("btn-soft");
        });

        tab.classList.remove("btn-soft");
        tab.classList.add("btn-primary");

        filterIssues(tab.value);

    });

});

loadIssues();

// search issue
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {

    const searchInput = document.getElementById("search-input");

    const searchValue = searchInput.value.trim();

    if (searchValue === "") {
        alert("Please enter something");
        return;
    }

    const url =
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;

    const res = await fetch(url);

    const data = await res.json();

    displayIssues(data.data);
});