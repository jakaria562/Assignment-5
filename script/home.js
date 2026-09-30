const issuesContainer = document.getElementById("issues-container");

const loadIssues = async () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  const res = await fetch(url);
  const data = await res.json();

  displayIssues(data.data);
};


const displayIssues = (issues) => {

  issuesContainer.innerHTML = "";

  issues.forEach((issue) => {

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="bg-white rounded-md shadow border-t-4 ${
        issue.status === "open"
          ? "border-green-500"
          : "border-purple-500"
      }">

        <div class="flex justify-between p-4">

          <img
            class="w-6"
            src="assets/${issue.status}-Status.png"
          >

          <span class="px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs">
            ${issue.priority.toUpperCase()}
          </span>

        </div>

        <div class="px-4 pb-4">

          <h3 class="text-sm font-semibold">
            ${issue.title}
          </h3>

          <p class="text-xs text-gray-500 mt-2">
            ${issue.description}
          </p>

          <div class="flex gap-2 mt-3">
            ${issue.labels.map((label) => `
              <span class="px-2 py-1 rounded-full bg-gray-100 text-xs">
                ${label.toUpperCase()}
              </span>
            `).join("")}
          </div>

        </div>

        <div class="border-t px-4 py-3">

          <p class="text-xs text-gray-500">
            Author: ${issue.author}
          </p>

          <p class="text-xs text-gray-400 mt-1">
            ${issue.createdAt}
          </p>

        </div>

      </div>
    `;

    issuesContainer.append(div);

  });
};


loadIssues();