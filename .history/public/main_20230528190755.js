

// // Music Tracker Function
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
//         bpm: "slow",
//         date: `${year}-${month}-${day}`,
//       };

//       this.addEntry(newEntry);
//     });

//     this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
//       if (event.target.classList.contains("tracker__song")) {
//         event.target.value = "";
//       }
//     });

//     this.root.querySelector(".tracker__entries").addEventListener("change", (event) => {
//       if (event.target.classList.contains("tracker__BPM")) {
//         const selectedOption = event.target.options[event.target.selectedIndex];
//         const imagePath = selectedOption.getAttribute("data-image");
//         const imageElement = event.target.parentElement.querySelector(".tracker__bpm-image");
//         if (imagePath) {
//           imageElement.src = imagePath;
//           event.target.parentElement.classList.remove("empty");
//         } else {
//           imageElement.src = "";
//           event.target.parentElement.classList.add("empty");
//         }
//         this.saveEntries();
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
//       <table class="tracker">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Song</th>
//             <th>BPM</th>
//             <th>Date</th>
//             <th>
//               <button class="tracker__add">&plus;</button>
//             </th>
//           </tr>
//         </thead>
//         <tbody class="tracker__entries"></tbody>
//       </table>
//     `;
//   }


//   static rowHtml() {
//     return `
//       <tr class="tracker__row">
//           <td>
//               <input type="number" class="tracker__ID">
//               <span class="tracker__text"></span>
//           </td>
//           <td>
//               <input type="text" class="tracker__song">
//           </td>
//           <td>
//             <div class="tracker__bpm-container">
//                 <select class="tracker__BPM">
//                     <option value="slow" data-image="path_to_slow_image.png">60~90 BPM</option>
//                     <option value="medium" data-image="path_to_medium_image.png">100~150 BPM</option>
//                     <option value="fast" data-image="path_to_fast_image.png">150~180+ BPM</option>
//                 </select>
//                 <img src="" alt="BPM Image" class="tracker__bpm-image">
//             </div>
//         </td>
//           <td>
//               <input type="date" class="tracker__date">
//           </td>
//           <td>
//               <button class="tracker__button">X</button>
//           </td>
//       </tr>
//   `;
//   }

  
//   addEntry(entry) {
//     this.entries.push(entry);
//     this.updateEntryIDs();
//     this.saveEntries(); // Save entries to local storage
//     this.updateView();
//   }

//   deleteEntry(entryID) {
//     const index = this.entries.findIndex((entry) => entry.ID === entryID);
//     if (index !== -1) {
//       this.entries.splice(index, 1);
//       this.updateEntryIDs();
//       this.saveEntries(); // Save entries to local storage
//       this.updateView();
//       updateEntryList(this.entries); // Update the entry list
//     }
//   }

//   updateEntryIDs() {
//     this.entries.forEach((entry, index) => {
//       entry.ID = index + 1;
//     });
//   }

//   updateView() {
//     const entriesContainer = this.root.querySelector(".tracker__entries");
//     entriesContainer.innerHTML = "";

//     this.entries.forEach((entry) => {
//       const row = this.createEntryRow(entry);
//       entriesContainer.appendChild(row);
//     });
//   }

//   createEntryRow(entry) {
//     const row = document.createElement("tr");
//     row.classList.add("tracker__row");
//     row.innerHTML = MusicTracker.rowHtml();

//     const idInput = row.querySelector(".tracker__ID");
//     const songInput = row.querySelector(".tracker__song");
//     const bpmSelect = row.querySelector(".tracker__BPM");
//     const dateInput = row.querySelector(".tracker__date");
//     const deleteButton = row.querySelector(".tracker__button");

//     idInput.value = entry.ID;
//     songInput.value = entry.song;
//     bpmSelect.value = entry.bpm;
//     dateInput.value = entry.date;

//     deleteButton.addEventListener("click", () => {
//       this.deleteEntry(entry.ID);
//     });

//     return row;
//   }

//   saveEntries() {
//     localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
//   }

//   loadEntries() {
//     const entriesData = localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY);
//     if (entriesData) {
//       this.entries = JSON.parse(entriesData);
//     }
//   }
// }

// const app = document.getElementById("app");
// const wt = new MusicTracker(app);

// window.wt = wt;




//updated fourth version 
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
//         bpm: "slow",
//         date: `${year}-${month}-${day}`,
//       };

//       this.addEntry(newEntry);
//     });

//     this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
//       if (event.target.classList.contains("tracker__song")) {
//         event.target.value = "";
//       }
//     });

//     this.root.querySelector(".tracker__entries").addEventListener("change", (event) => {
//       if (event.target.classList.contains("tracker__BPM")) {
//         const selectedOption = event.target.options[event.target.selectedIndex];
//         const imagePath = selectedOption.getAttribute("data-image");
//         const imageElement = event.target.parentElement.querySelector(".tracker__bpm-image");
//         if (imagePath) {
//           imageElement.src = imagePath;
//           event.target.parentElement.classList.remove("empty");
//         } else {
//           imageElement.src = "";
//           event.target.parentElement.classList.add("empty");
//         }
//         this.saveEntries();
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
//       <div class="music-tracker">
//         <div class="tracker__inputs">
//           <input type="text" class="tracker__song" placeholder="Type song">
//           <select class="tracker__BPM">
//             <option value="slow" data-image="path_to_slow_image.png">60~90 BPM</option>
//             <option value="medium" data-image="path_to_medium_image.png">100~150 BPM</option>
//             <option value="fast" data-image="path_to_fast_image.png">150~180+ BPM</option>
//           </select>
//           <button class="tracker__add">+</button>
//         </div>
//       </div>
//       <div class="entry-list"></div>
//     `;
//   }

//   addEntry(entry) {
//     this.entries.push(entry);
//     this.updateEntryIDs();
//     this.saveEntries(); // Save entries to local storage
//     this.updateView();
//   }

//   deleteEntry(entryID) {
//     const index = this.entries.findIndex((entry) => entry.ID === entryID);
//     if (index !== -1) {
//       this.entries.splice(index, 1);
//       this.updateEntryIDs();
//       this.saveEntries(); // Save entries to local storage
//       this.updateView();
//     }
//   }

//   updateEntryIDs() {
//     this.entries.forEach((entry, index) => {
//       entry.ID = index + 1;
//     });
//   }

//   updateView() {
//     const entryList = this.root.querySelector(".entry-list");
//     entryList.innerHTML = "";

//     this.entries.forEach((entry) => {
//       const listItem = document.createElement("div");
//       listItem.textContent = `ID: ${entry.ID}, Song: ${entry.song}, BPM: ${entry.bpm}, Date: ${entry.date}`;

//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "X";
//       deleteButton.addEventListener("click", () => {
//         this.deleteEntry(entry.ID);
//       });

//       listItem.appendChild(deleteButton);
//       entryList.appendChild(listItem);
//     });
//   }

//   saveEntries() {
//     localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
//   }

//   loadEntries() {
//     const entriesData = localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY);
//     if (entriesData) {
//       this.entries = JSON.parse(entriesData);
//     }
//   }
// }

// // Create the Music Tracker instance and attach it to the "music-tracker" div
// const musicTracker = document.getElementById("music-tracker");
// const wt = new MusicTracker(musicTracker);

// // Export the Music Tracker instance to the global scope for access in the console
// window.wt = wt;


//update
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
        bpm: "slow",
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
      this.updateView(); // Update the view after adding the new entry
    });

    this.root.querySelector(".tracker__entries").addEventListener("click", (event) => {
      if (event.target.classList.contains("tracker__song")) {
        event.target.value = "";
      }
    });

    this.root.querySelector(".tracker__entries").addEventListener("change", (event) => {
      if (event.target.classList.contains("tracker__BPM")) {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const imagePath = selectedOption.getAttribute("data-image");
        const imageElement = event.target.parentElement.querySelector(".tracker__bpm-image");
        if (imagePath) {
          imageElement.src = imagePath;
          event.target.parentElement.classList.remove("empty");
        } else {
          imageElement.src = "";
          event.target.parentElement.classList.add("empty");
        }
        this.saveEntries();
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
      <div class="music-tracker">
        <div class="tracker__inputs">
          <input type="text" class="tracker__song" placeholder="Type song">
          <select class="tracker__BPM">
            <option value="slow" data-image="path_to_slow_image.png">60~90 BPM</option>
            <option value="medium" data-image="path_to_medium_image.png">100~150 BPM</option>
            <option value="fast" data-image="path_to_fast_image.png">150~180+ BPM</option>
          </select>
          <button class="tracker__add">+</button>
        </div>
      </div>
      <div class="entry-list"></div>
    `;
  }

  addEntry(entry) {
    this.entries.push(entry);
    this.updateEntryIDs();
    this.saveEntries(); // Save entries to local storage
  }

  deleteEntry(entryID) {
    const index = this.entries.findIndex((entry) => entry.ID === entryID);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateEntryIDs();
      this.saveEntries(); // Save entries to local storage
    }
  }

  updateEntryIDs() {
    this.entries.forEach((entry, index) => {
      entry.ID = index + 1;
    });
  }

  updateView() {
    const entryList = this.root.querySelector(".entry-list");
    entryList.innerHTML = "";

    this.entries.forEach((entry) => {
      const listItem = document.createElement("div");
      listItem.textContent = `ID: ${entry.ID}, Song: ${entry.song}, BPM: ${entry.bpm}, Date: ${entry.date}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        this.deleteEntry(entry.ID);
        this.updateView(); // Update the view after deleting an entry
      });

      listItem.appendChild(deleteButton);
      entryList.appendChild(listItem);
    });
  }

  saveEntries() {
    localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  loadEntries() {
    const entriesData = localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY);
    if (entriesData) {
      this.entries = JSON.parse(entriesData);
    }
  }
}

// Create the Music Tracker instance and attach it to the "music-tracker" div
const musicTracker = document.getElementById("music-tracker");
const wt = new MusicTracker(musicTracker);

// Export the Music Tracker instance to the global scope for access in the console
window.wt = wt;
