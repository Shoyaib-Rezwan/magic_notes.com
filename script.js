// console.log("Hello");

/*displaying previous Notes*/
let display = document.querySelector(`.display`);
let i = 1;
let key;
let notenum = 0;
while (true) {
  key = `note${i}`;
  if (localStorage.getItem(key) == null) break;
  else {
    let showNote = document.createElement(`div`);
    showNote.className = `showNote`;
    showNote.innerHTML = `<h2 class="heading" id="heading${i}" >Note${i}</h2>
  <div class="text">${localStorage.getItem(key)}</div>
  <button class="delete" id="btn${i}">Delete Note</button>
</div>`;
    display.appendChild(showNote);
  }
  i++;
  notenum++;
}
// let display = document.querySelector(`.display`);
if (notenum == 0) {
  display.innerHTML = "No notes to display";
}

/*adding Notes*/
let addNote = document.querySelector(`.addNote`);
addNote.addEventListener(`click`, func1);
function func1() {
  let showNote = document.createElement(`div`);
  showNote.className = `showNote`;
  showNote.innerHTML = `<h2 class="heading"id="heading${notenum + 1}">Note${
    notenum + 1
  }</h2>
  <div class="text">${document.getElementById(`notes`).value}</div>
  <button class="delete" id="btn${notenum + 1}">Delete Note</button>
</div>`;

  if (notenum == 0) {
    display.innerHTML = "";
    display.appendChild(showNote);
    notenum++;
  } else {
    display.appendChild(showNote);
    notenum++;
  }

  /*Storing the notes into the local storage*/
  key = `note${notenum}`;
  localStorage.setItem(key, document.getElementById(`notes`).value);

  /*clearing the text area*/
  document.getElementById(`notes`).value = ``;
  location.reload();
}

/*Deleting Notes*/

for (i = 1; i <= notenum; i++) {
  let deletebtn = [];
  deletebtn[i] = document.getElementById(`btn${i}`);
  deletebtn[i].addEventListener(`click`, func3);
  function func3(e) {
    let btnNo = e.target.id[3];
    localStorage.removeItem(`note${btnNo}`);
    location.reload();
    btnNo = parseInt(btnNo);
    func4(btnNo);
  }

  /*rearranging the keys*/
  function func4(btnNo) {
    for (i = btnNo + 1; i <= notenum; i++) {
      key = `note${i - 1}`;
      localStorage.setItem(key, localStorage.getItem(`note${i}`));
    }
    localStorage.removeItem(`note${i - 1}`);
    location.reload();
  }
}
/*viewing the whole note*/
for (i = 1; i <= notenum; i++) {
  let heading = [];
  heading[i] = document.getElementById(`heading${i}`);
  heading[i].addEventListener(`click`, func5);
  function func5(e) {
    let num = parseInt(e.target.id[7]);
    let title = document.querySelector(`title`);
    title.innerText = `Note${num}`;
    let main = document.querySelector(`main`);
    main.style = `margin: 8px; font-size: 30px`;
    main.innerHTML = localStorage.getItem(`note${num}`);
    let button = document.createElement(`a`);
    button.setAttribute(`href`, `index.html`);
    button.innerHTML = `<button style="margin: 10px 45%; font-size: 25px">BACK</button></a>`;
    document.querySelector(`body`).appendChild(button);
  }
}

/*Searching Notes*/
document.querySelector(`.searchBtn`).addEventListener(`click`, func6);
function func6() {
  let match = document.querySelector(`.searchBox`).value;
  display.innerHTML = "";
  for (i = 1; i <= notenum; i++) {
    let value = localStorage.getItem(`note${i}`);
    if (value.toLowerCase().includes(match.toLowerCase())) {
      let showNote = document.createElement(`div`);
      showNote.className = `showNote`;
      showNote.innerHTML = `<h2 class="heading" id="heading${i}" >Note${i}</h2>
  <div class="text">${value}</div>
  <button class="delete" id="btn${i}">Delete Note</button>
</div>`;
      display.appendChild(showNote);
    }
  }
  if (display.innerHTML == "") {
    display.innerHTML = "No matches found";
  }
}
