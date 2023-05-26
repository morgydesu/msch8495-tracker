export default class MusicTracker {
    constructor(root){
        this.root = root;
        this.root.insertAdjacentHTML ("afterbegin", MusicTracker.html());
   
   this.loadEntries();
   this.updatedView ();
    }

    static html () {
        return`
            <table class ="tracker">
            <thead>
                <tr>
                <th>Date</th>
                <th>BPM</th>
                <th>Name</th>
                <th></th>
                </tr>
            </thead>
            <tbody class = "tracker__entries"></tbody>
            <tbody>
                <tr class = "tracker__row tracker__row--add">
    <td colspan = "4">
    <span class = "tracker__add">Add Entry &plus;</span>
    </td>
                </tr>
            </tbody>
            </table>
        `;
    }

    loadEntries () {
        this.entries = JSON.parse(localStorage.getItem("music-tracker-entries") || "[]");
    }

    saveEntries () {
        localStorage.setItem("music-tracker-entries", JSON.stringify(this.entries));
    }
}