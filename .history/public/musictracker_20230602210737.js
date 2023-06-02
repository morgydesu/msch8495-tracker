//import the bpm image 
import lowSpeedImage from './bpm_image/low-speed.png';
import mediumSpeedImage from './bpm_image/medium-speed.png';
import highSpeedImage from './bpm_image/high-speed.png';

//source: https://codepen.io/dcode-software/pen/vYpJXmG
// MusicTracker function 
//The MusicTracker class has a static property called LOCAL_STORAGE_DATA_KEY which stores a key used for storing and retrieving data from the browser's local storage.
class MusicTracker {
  static LOCAL_STORAGE_DATA_KEY = "music-tracker-entries";
  counter = 1;

//The constructor of the MusicTracker class takes a root element as an argument, which represents the container element for the music tracker.
  constructor(root) {
    this.root = root;
    this.root.innerHTML = MusicTracker.html();
    this.entries = [];

    this.loadEntries();
    this.updateView();

    this.root.querySelector(".tracker__add").addEventListener("click", () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const selectedOption = this.root.querySelector(".tracker__BPM").options[this.root.querySelector(".tracker__BPM").selectedIndex];
      const imagePath = selectedOption.getAttribute("data-img_src");

      const newEntry = {
        ID: this.getNextID(),
        song: this.root.querySelector(".tracker__song").value,
        bpm: selectedOption.text,
        image: imagePath,
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
    });

    //adding the imported image into imagePaths
    MusicTracker.imagePaths = {
      "60~90 BPM": lowSpeedImage,
      "100~150 BPM": mediumSpeedImage,
      "150~180+ BPM": highSpeedImage
    };

    this.root.querySelector(".tracker__BPM").addEventListener("change", (event) => {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const imagePaths = selectedOption.getAttribute("data-img_src");
      const imageElement = this.root.querySelector(".tracker__bpm-image img");
      if (imagePath) {
        imageElement.src = imagePath;
        imageElement.style.display = "block";
      } else {
        imageElement.src = "";
        imageElement.style.display = "none";
      }
    });
  }

  //The getNextID() method is responsible for generating the next available ID for a new music entry based on the existing entries.
  getNextID() {
    let maxID = 0;
    this.entries.forEach((entry) => {
      if (entry.ID > maxID) {
        maxID = entry.ID;
      }
    });
    return maxID + 1;
  }

  //this is a static html which contains the structure of the music tracker input structure.
  static html() {
    return `
      <div class="music-tracker">
        <div class="tracker__inputs">
          <input type="text" class="tracker__song" placeholder="Type song">
          <select class="tracker__BPM" placeholder="Select speed">
            <option value="0" selected disabled>Select option</option>                
            <option value="60~90 BPM" data-img_src="${lowSpeedImage}">60~90 BPM</option>
            <option value="100~150 BPM" data-img_src="${mediumSpeedImage}">100~150 BPM</option>
            <option value="150~180+ BPM" data-img_src="${highSpeedImage}">150~180+ BPM</option>
          </select>
          <button class="tracker__add"></button>
        </div>
      </div>
      <div class="entry-list"></div>
    `;
  }

  //The addEntry() method adds a new entry to the entries array, updates the entry IDs, saves the entries to the browser's local storage, and updates the view.
  addEntry(entry) {
    this.entries.push(entry);
    this.updateEntryIDs();
    this.saveEntries(); // Save entries to local storage
    this.updateView(); // Update the view after adding the new entry
  }

  //The deleteEntry() method removes an entry from the entries array based on its ID, updates the entry IDs, saves the entries to the local storage, and updates the view.
  deleteEntry(entryID) {
    const index = this.entries.findIndex((entry) => entry.ID === entryID);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateEntryIDs();
      this.saveEntries(); // Save entries to local storage
      this.updateView(); // Update the view after deleting an entry
    }
  }

  //The updateEntryIDs() method updates the IDs of the entries in the entries array based on their index.
  updateEntryIDs() {
    this.entries.forEach((entry, index) => {
      entry.ID = index + 1;
    });
  }

  //The updateView() method updates the HTML view of the music tracker by generating HTML elements for each entry in the entries array and appending them to the entry list.
  updateView() {
    const entryList = this.root.querySelector(".entry-list");
    entryList.innerHTML = "";

    this.entries.forEach((entry) => {
      const listItem = document.createElement("div");
      listItem.textContent = `ID: ${entry.ID}, Song: ${entry.song}, BPM: ${entry.bpm}, Date: ${entry.date}`;

      const imageElement = document.createElement("img");
      imageElement.src = entry.image;
      listItem.appendChild(imageElement);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        this.deleteEntry(entry.ID);
      });

      listItem.appendChild(deleteButton);
      entryList.appendChild(listItem);
    });
  }

  //The saveEntries() method saves the entries array to the browser's local storage as a JSON string.
  saveEntries() {
    localStorage.setItem(MusicTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
  }

  //The loadEntries() method retrieves the entries data from the local storage and parses it into the entries array.
  loadEntries() {
    const entriesData = localStorage.getItem(MusicTracker.LOCAL_STORAGE_DATA_KEY);
    if (entriesData) {
      this.entries = JSON.parse(entriesData);
    }
  }
}

const musicTracker = document.getElementById("music-tracker");
const mt = new MusicTracker(musicTracker);

window.mt = mt;

// Summary of the musicTracker.js
// This contains the functionality of the music tracker in the application. It uses the local storage to keep the record of the user input and has functionality for the user to delete the input from the storage and the actual entry list. 
