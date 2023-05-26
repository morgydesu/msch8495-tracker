
// //source: https://codepen.io/dcode-software/pen/vYpJXmG 

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
              <select class="tracker__BPM">
                  <option value="slow">Slow</option>
                  <option value="medium">Medium</option>
                  <option value="fast">Fast</option>
              </select>
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
    const tableBody = this.root.querySelector(".tracker__entries");
    const addRow = (data) => {
      const template = document.createElement("template");
      let row = null;

      template.innerHTML = MusicTracker.rowHtml().trim();
      row = template.content.firstElementChild;

      row.querySelector(".tracker__ID").value = data.ID;
      row.querySelector(".tracker__song").value = data.song;
      row.querySelector(".tracker__BPM").value = data.bpm;
      row.querySelector(".tracker__date").value = data.date;

      row.querySelector(".tracker__ID").addEventListener("change", ({ target }) => {
        data.ID = target.value;
        this.saveEntries();
      });

      row.querySelector(".tracker__song").addEventListener("change", ({ target }) => {
        data.song = target.value;
        this.saveEntries();
      });

      row.querySelector(".tracker__BPM").addEventListener("change", ({ target }) => {
        data.bpm = target.value;
        this.saveEntries();
      });

      row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
        data.date = target.value;
        this.saveEntries();
      });

      row.querySelector(".tracker__delete").addEventListener("click", () => {
        this.deleteEntry(data);
      });

      tableBody.appendChild(row);
    };

    tableBody.querySelectorAll(".tracker__row").forEach((row) => {
      row.remove();
    });

    this.entries.forEach((data) => addRow(data));
  }

  addEntry(data) {
    this.entries.push(data);
    this.saveEntries();
    this.updateView();
  }

  deleteEntry(dataToDelete) {
    this.entries = this.entries.filter((data) => data !== dataToDelete);
    this.saveEntries();
    this.updateView();
  }
}

const app = document.getElementById("app");

const wt = new MusicTracker(app);

window.wt = wt;


// Sidebar function
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const appContent = document.getElementById('app');

  if (sidebar.style.left === '-250px') {
    sidebar.style.left = '0';
    sidebarToggle.innerHTML = '&times; Close Sidebar';
    appContent.style.display = 'block'; // Show the content inside the sidebar
  } else {
    sidebar.style.left = '-250px';
    sidebarToggle.innerHTML = '&#9776; Open Sidebar';
    appContent.style.display = 'none'; // Hide the content inside the sidebar
  }
}

// Open the sidebar when the user clicks the sidebar button
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle.addEventListener('click', toggleSidebar);

// Hide the tab bar on initial launch
const appContent = document.getElementById('app');
appContent.style.display = 'none';
