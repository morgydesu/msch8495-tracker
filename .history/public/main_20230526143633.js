//searchbar function
function toggleSearchbar() {
  const searchbar = document.getElementById('searchbar');
  const searchbarToggle = document.getElementById('searchbar-toggle');
  const appContent = document.getElementById('app');

  if (searchbar.style.left === '-250px') {
    searchbar.style.left = '0';
    searchbarToggle.innerHTML = '&times; Close Sidebar';
    appContent.style.display = 'block'; // Show the content inside the sidebar
  } else {
    searchbar.style.left = '-250px';
    searchbarToggle.innerHTML = '&#9776; Open Sidebar';
    appContent.style.display = 'none'; // Hide the content inside the sidebar
  }
}

// Open the sidebar when the user clicks the sidebar button
const searchbarToggle = document.getElementById('searchbar-toggle');
searchToggle.addEventListener('click', toggleSearchbar);

// Hide the tab bar on initial launch
const appContent = document.getElementById('app');
appContent.style.display = 'none';


// // Sidebar function
// function toggleSidebar() {
//   const sidebar = document.getElementById('sidebar');
//   const sidebarToggle = document.getElementById('sidebar-toggle');
//   const appContent = document.getElementById('app');

//   if (sidebar.style.left === '-250px') {
//     sidebar.style.left = '0';
//     sidebarToggle.innerHTML = '&times; Close Sidebar';
//     appContent.style.display = 'block'; // Show the content inside the sidebar
//   } else {
//     sidebar.style.left = '-250px';
//     sidebarToggle.innerHTML = '&#9776; Open Sidebar';
//     appContent.style.display = 'none'; // Hide the content inside the sidebar
//   }
// }

// // Open the sidebar when the user clicks the sidebar button
// const sidebarToggle = document.getElementById('sidebar-toggle');
// sidebarToggle.addEventListener('click', toggleSidebar);

// // Hide the tab bar on initial launch
// const appContent = document.getElementById('app');
// appContent.style.display = 'none';

//source: https://codepen.io/dcode-software/pen/vYpJXmG 
//music tracker
class MusicTracker {
  static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";
  counter = 1;

  constructor(root) {
    this.root = root;
    this.root.insertAdjacentHTML("afterbegin", MusicTracker.html());
    this.entries = [];

    this.loadEntries();
    this.updateView();

    this.root.querySelector(".tracker__add").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const newEntry = {
        ID: this.getNextID(),
        song: "Type song",
        bpm: "Select speed",
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
    });

    this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
      if (event.target.classList.contains("tracker__song")) {
        event.target.value = "";
      }
    });
  }

  getNextID() {
    let maxID = 0;
    this.entries.forEach((entry) => {
      if (entry.ID > maxID) {
        maxID = entry.ID;
      }
    });
    return maxID + 1;
  }

  static html() {
    return `
      <table class="tracker">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Song</th>
                  <th>BPM</th>
                  <th>Date</th>
                  <th></th>
              </tr>
          </thead>
          <tbody class="tracker__entries"></tbody>
          <tbody>
              <tr class="tracker__row tracker__row--add">
                  <td colspan="4">
                      <span class="tracker__add">Add Entry &plus;</span>
                  </td>
              </tr>
          </tbody>
      </table>
  `;
  }

  static rowHtml() {
    return `
      <tr class="tracker__row">
          <td>
              <input type="number" class="tracker__ID">
              <span class="tracker__text">ID</span>
          </td>
          <td>
              <input type="text" class="tracker__song">
          </td>
          <td>
            <div class="tracker__bpm-container">
                <select class="tracker__BPM">
                    <option value="slow" data-image="path_to_slow_image.png">60~90 BPM</option>
                    <option value="medium" data-image="path_to_medium_image.png">100~150 BPM</option>
                    <option value="fast" data-image="path_to_fast_image.png">150~180+ BPM</option>
                </select>
                <img src="" alt="BPM Image" class="tracker__bpm-image">
            </div>
        </td>
          <td>
              <input type="date" class="tracker__date">
          </td>
          <td>
              <button type="button" class="tracker__button tracker__delete">&times;</button>
          </td>
      </tr>
  `;
  }

  loadEntries() {
    this.entries = JSON.parse(localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
  }

  saveEntries() {
    localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  updateView() {
    const tableBody = this
