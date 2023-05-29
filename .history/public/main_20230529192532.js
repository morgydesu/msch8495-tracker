// // Music Tracker Function
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
        song: this.root.querySelector(".tracker__song").value,
        bpm: this.root.querySelector(".tracker__BPM").value,
        date: `${year}-${month}-${day}`,
      };

      this.addEntry(newEntry);
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
    <div class="header">
    <img src="trackerlogo.png" alt="Logo">
  </div>
      <div class="music-tracker">
        <div class="tracker__inputs">
          <input type="text" class="tracker__song" placeholder="Type song from discover">
          <select class="tracker__BPM" placeholder="Select speed">
            <option value="60~90 BPM" data-image="path_to_slow_image.png">60~90 BPM</option>
            <option value="100~150 BPM" data-image="path_to_medium_image.png">100~150 BPM</option>
            <option value="150~180+ BPM" data-image="path_to_fast_image.png">150~180+ BPM</option>
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
    this.updateView(); // Update the view after adding the new entry
  }

  deleteEntry(entryID) {
    const index = this.entries.findIndex((entry) => entry.ID === entryID);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateEntryIDs();
      this.saveEntries(); // Save entries to local storage
      this.updateView(); // Update the view after deleting an entry
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


//discover page 
this.root.querySelector(".discover__albums").addEventListener("click", (event) => {
  const target = event.target;

  // Check if the clicked element is an album image, album title, or album artist
  if (target.classList.contains("album__image") ||
      target.classList.contains("album__title") ||
      target.classList.contains("album__artist")) {
    // Get the album information
    const albumImage = target.parentElement.querySelector(".album__image").src;
    const albumTitle = target.parentElement.querySelector(".album__title").textContent;
    const albumArtist = target.parentElement.querySelector(".album__artist").textContent;

    // Call the popup function and pass the album information
    this.showPopup(albumImage, albumTitle, albumArtist);
  }
});

showPopup(albumImage, albumTitle, albumArtist) {
  // Create the popup container element
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  // Create the popup content
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  // Create the album image element
  const albumImageElement = document.createElement("img");
  albumImageElement.src = albumImage;
  albumImageElement.alt = "Album Image";
  albumImageElement.classList.add("popup-album-image");

  // Create the album title element
  const albumTitleElement = document.createElement("h3");
  albumTitleElement.textContent = albumTitle;
  albumTitleElement.classList.add("popup-album-title");

  // Create the album artist element
  const albumArtistElement = document.createElement("p");
  albumArtistElement.textContent = albumArtist;
  albumArtistElement.classList.add("popup-album-artist");

  // Append the elements to the popup content
  popupContent.appendChild(albumImageElement);
  popupContent.appendChild(albumTitleElement);
  popupContent.appendChild(albumArtistElement);

  // Append the popup content to the popup container
  popupContainer.appendChild(popupContent);

  // Append the popup container to the root element
  this.root.appendChild(popupContainer);

  // Add a click event listener to the popup container to close the popup
  popupContainer.addEventListener("click", () => {
    this.closePopup(popupContainer);
  });
}

closePopup(popupContainer) {
  // Remove the popup container from the root element
  this.root.removeChild(popupContainer);
}

//discover pop-up function
class DescriptionPopup {
  constructor(root) {
    this.root = root;
  }

  showPopup(description) {
    const popupContainer = document.createElement("album");
    popupContainer.classList.add("popup-container");

    const popupContent = document.createElement("album");
    popupContent.classList.add("popup-content");

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("popup-description");

    popupContent.appendChild(descriptionElement);
    popupContainer.appendChild(popupContent);
    this.root.appendChild(popupContainer);

    popupContainer.addEventListener("click", () => {
      this.closePopup(popupContainer);
    });
  }
}