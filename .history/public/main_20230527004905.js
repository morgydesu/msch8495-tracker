//searchbar function

//sidebar function
// function toggleSidebar() {
//   const sidebar = document.getElementById('sidebar');
//   const sidebarToggle = document.getElementById('sidebar-toggle');
//   const appContent = document.getElementById('app');

//   if (sidebar.style.left === '-250px') {
//     sidebar.style.left = '0';
//     sidebarToggle.innerHTML = '&times;';//close
//     appContent.style.display = 'block'; // Show the content inside the sidebar
//   } else {
//     sidebar.style.left = '-250px';
//     sidebarToggle.innerHTML = '&#9776;';//open
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
// class MusicTracker {
//   static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";
//   counter = 1;

//   constructor(root) {
//     this.root = root;
//     this.root.insertAdjacentHTML("afterbegin", MusicTracker.html());
//     this.entries = [];

//     this.loadEntries();
//     this.updateView();

//     this.root.querySelector(".tracker__add").addEventListener("click", () => {
//       const date = new Date();
//       const year = date.getFullYear();
//       const month = (date.getMonth() + 1).toString().padStart(2, "0");
//       const day = date.getDate().toString().padStart(2, "0");

//       const newEntry = {
//         ID: this.getNextID(),
//         song: "Type song",
//         bpm: "Select speed",
//         date: `${year}-${month}-${day}`,
//       };

//       this.addEntry(newEntry);
//     });

//     this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
//       if (event.target.classList.contains("tracker__delete")) {
//         const row = event.target.closest(".tracker__row");
//         const id = parseInt(row.dataset.id, 10);
//         this.deleteEntry(id);
//       }
//     });
//   }

//   getNextID() {
//     let maxID = 0;
//     this.entries.forEach((entry) => {
//       if (entry.ID > maxID) {
//         maxID = entry.ID;
//       }
//     });
//     return maxID + 1;
//   }

//   static html() {
//     return `
//       <div class="musictracker__header">
//         <div class="tracker">
//           <div class="tracker__column">
//             <label class="tracker__label">ID</label>
//           </div>
//           <div class="tracker__column">
//             <label class="tracker__label">Song</label>
//           </div>
//           <div class="tracker__column">
//             <label class="tracker__label">BPM</label>
//           </div>
//           <div class="tracker__column">
//             <label class="tracker__label">Date</label>
//           </div>
//           <div class="tracker__column">
//             <label class="tracker__label">Action</label>
//           </div>
//         </div>
//       </div>
//       <div class="tracker__entries"></div>
//       <div class="tracker__row tracker__row--add">
//         <div class="musictracker__footer">
//           <span class="tracker__add">+</span>
//         </div>
//       </div>
//     `;
//   }
  
//   static rowHtml() {
//     return `
//       <div class="musictracker__header">
//         <tr class="tracker__row">
//           <td>
//             <div class="tracker__column">
//               <label class="tracker__label">ID</label>
//               <input type="number" class="tracker__ID">
//             </div>
//             <div class="tracker__column">
//               <label class="tracker__label">Song</label>
//               <input type="text" class="tracker__song">
//             </div>
//             <div class="tracker__column">
//               <label class="tracker__label">BPM</label>
//               <div class="tracker__bpm-container">
//                 <select class="tracker__BPM">
//                   <option value="slow" data-image="https://static.thenounproject.com/png/5541458-200.png">60~90 BPM</option>
//                   <option value="medium" data-image="path_to_medium_image.png">100~150 BPM</option>
//                   <option value="fast" data-image="path_to_fast_image.png">150~180+ BPM</option>
//                 </select>
//                 <img src="" alt="BPM Image" class="tracker__bpm-image">
//               </div>
//             </div>
//             <div class="tracker__column">
//               <label class="tracker__label">Date</label>
//               <input type="date" class="tracker__date">
//             </div>
//           </td>
//           <td>
//             <button type="button" class="tracker__button tracker__delete">&times;</button>
//           </td>
//         </tr>
//       </div>
//     `;
//   }

//   loadEntries() {
//     this.entries = JSON.parse(localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
//   }

//   saveEntries() {
//     localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
//   }

//   updateView() {
//     const tableBody = this.root.querySelector(".tracker__entries");
//     const addRow = (data) => {
//       const template = document.createElement("template");
//       let row = null;

//       template.innerHTML = MusicTracker.rowHtml().trim();
//       row = template.content.firstElementChild;
//       row.dataset.id = data.ID;

//       row.querySelector(".tracker__ID").value = data.ID;
//       row.querySelector(".tracker__song").value = data.song;
//       row.querySelector(".tracker__BPM").value = data.bpm;
//       row.querySelector(".tracker__date").value = data.date;

//       row.querySelector(".tracker__ID").addEventListener("change", ({ target }) => {
//         const id = parseInt(row.dataset.id, 10);
//         const entry = this.entries.find((e) => e.ID === id);
//         if (entry) {
//           entry.ID = target.value;
//           this.saveEntries();
//         }
//       });

//       row.querySelector(".tracker__song").addEventListener("change", ({ target }) => {
//         const id = parseInt(row.dataset.id, 10);
//         const entry = this.entries.find((e) => e.ID === id);
//         if (entry) {
//           entry.song = target.value;
//           this.saveEntries();
//         }
//       });

//       row.querySelector(".tracker__BPM").addEventListener("change", ({ target }) => {
//         const id = parseInt(row.dataset.id, 10);
//         const entry = this.entries.find((e) => e.ID === id);
//         if (entry) {
//           entry.bpm = target.value;
//           this.saveEntries();
//         }
//       });

//       row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
//         const id = parseInt(row.dataset.id, 10);
//         const entry = this.entries.find((e) => e.ID === id);
//         if (entry) {
//           entry.date = target.value;
//           this.saveEntries();
//         }
//       });

//       tableBody.appendChild(row);
//     };

//     tableBody.querySelectorAll(".tracker__row").forEach((row) => {
//       row.remove();
//     });

//     this.entries.forEach((data) => addRow(data));
//   }

//   addEntry(data) {
//     this.entries.push(data);
//     this.saveEntries();
//     this.updateView();
//   }

//   deleteEntry(idToDelete) {
//     this.entries = this.entries.filter((data) => data.ID !== idToDelete);
//     this.saveEntries();
//     this.updateView();
//     const row = this.root.querySelector(`.tracker__row[data-id="${idToDelete}"]`);
//     if (row) {
//       row.remove();
//     }
//   }
// }

// const app = document.getElementById("app");
// const wt = new MusicTracker(app);
// window.wt = wt;


class MusicTracker {
  static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";

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
        song: "Type song",
        artist: "Type artist",
        bpm: "Select speed",
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
    });

    this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
      if (event.target.classList.contains("tracker__delete")) {
        const row = event.target.closest(".tracker__row");
        const id = parseInt(row.dataset.id, 10);
        this.deleteEntry(id);
      }
    });

    this.root.querySelector(".search__input").addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim().toLowerCase();
      this.filterEntries(searchTerm);
    });
  }

  getNextID() {
    return this.entries.length + 1;
  }

  static html() {
    return `
      <div class="musictracker__header">
        <div class="search">
          <input type="text" class="search__input" placeholder="Search...">
        </div>
        <div class="tracker">
          <div class="tracker__column tracker__column--id">
            <div class="tracker__label">ID</div>
          </div>
          <div class="tracker__column tracker__column--song">
            <div class="tracker__label">Song</div>
          </div>
          <div class="tracker__column tracker__column--artist">
            <div class="tracker__label">Artist</div>
          </div>
          <div class="tracker__column tracker__column--bpm">
            <div class="tracker__label">BPM</div>
          </div>
          <div class="tracker__column tracker__column--date">
            <div class="tracker__label">Date</div>
          </div>
          <div class="tracker__column tracker__column--action">
            <div class="tracker__label">Action</div>
          </div>
        </div>
      </div>
      <div class="tracker__entries"></div>
      <div class="tracker__row tracker__row--add">
        <div class="musictracker__footer">
          <span class="tracker__add">+</span>
        </div>
      </div>
    `;
  }

  static rowHtml(entry) {
    return `
      <div class="tracker__row">
        <div class="tracker__column tracker__column--id">
          <div class="tracker__value">${entry.ID}</div>
        </div>
        <div class="tracker__column tracker__column--song">
          <div class="tracker__value">${entry.song}</div>
        </div>
        <div class="tracker__column tracker__column--artist">
          <div class="tracker__value">${entry.artist}</div>
        </div>
        <div class="tracker__column tracker__column--bpm">
          <div class="tracker__value">${entry.bpm}</div>
        </div>
        <div class="tracker__column tracker__column--date">
          <div class="tracker__value">${entry.date}</div>
        </div>
        <div class="tracker__column tracker__column--action">
          <button type="button" class="tracker__button tracker__delete">&times;</button>
        </div>
      </div>
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

    tableBody.querySelectorAll(".tracker__row").forEach((row) => {
      row.remove();
    });

    this.entries.forEach((entry) => {
      const template = document.createElement("template");
      template.innerHTML = MusicTracker.rowHtml(entry).trim();
      const newRow = template.content.firstElementChild;
      newRow.dataset.id = entry.ID;
      tableBody.appendChild(newRow);
    });
  }

  addEntry(data) {
    const newEntry = {
      ID: this.getNextID(),
      ...data,
    };

    this.entries.push(newEntry);
    this.saveEntries();
    this.updateView();
  }

  deleteEntry(idToDelete) {
    this.entries = this.entries.filter((entry) => entry.ID !== idToDelete);
    this.saveEntries();
    this.updateView();
  }

  filterEntries(searchTerm) {
    const filteredEntries = this.entries.filter((entry) =>
      entry.song.toLowerCase().includes(searchTerm) ||
      entry.artist.toLowerCase().includes(searchTerm) ||
      entry.bpm.toLowerCase().includes(searchTerm) ||
      entry.date.toLowerCase().includes(searchTerm)
    );

    const tableBody = this.root.querySelector(".tracker__entries");

    tableBody.querySelectorAll(".tracker__row").forEach((row) => {
      row.remove();
    });

    filteredEntries.forEach((entry) => {
      const template = document.createElement("template");
      template.innerHTML = MusicTracker.rowHtml(entry).trim();
      const newRow = template.content.firstElementChild;
      newRow.dataset.id = entry.ID;
      tableBody.appendChild(newRow);
    });
  }
}

const app = document.getElementById("app");
const wt = new MusicTracker(app);
window.wt = wt;
