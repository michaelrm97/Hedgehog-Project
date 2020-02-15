// Display list of poems
function getPoems() {
   window.history.replaceState({}, document.title, "/");
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         var poems = xmlhttp.responseText.split("\n").filter((w) => w.length > 0);
         var poemSpace = document.getElementById("poem-space");
         poemSpace.innerHTML = "";
         for (var i in poems) {
            var poemName = poems[i].replace(" ", "_");
            poemSpace.innerHTML += `<a id="${poemName}" href="">${poems[i]}</a><br>`;
         }
         poemSpace.innerHTML += `<br><a id="credits" href="">Credits</a>`
         for (var i in poems) {
            var poemName = poems[i].replace(" ", "_");
            document.getElementById(poemName).onclick = () => { displayPoem(poemName); return false; }
         }
         document.getElementById("credits").onclick = () => { displayCredits(); return false; }
      }
   };
   xmlhttp.open("GET", "poems.txt", true);
   xmlhttp.send();
}

// Display single poem
function displayPoem(poemName) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
         var poemContent = xmlhttp.responseText.split("\n");
         var poemSpace = document.getElementById("poem-space");
         poemSpace.innerHTML = `<h2>${poemName.replace("_", " ")}</h2>`;
         for (var i in poemContent) {
            poemSpace.innerHTML += poemContent[i] + "<br>";
         }
         poemSpace.innerHTML += `<a id="back" href="">Back</a>`
         document.getElementById("back").onclick = () => { getPoems(); return false; }
      } else if (xmlhttp.status == 404) { // If cannot find poem then display list of poems
         getPoems();
      }
   };
   xmlhttp.open("GET", poemName + ".txt", true);
   xmlhttp.send();
}

// Display credits
function displayCredits() {
   var poemSpace = document.getElementById("poem-space");
   poemSpace.innerHTML = `<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`;
   poemSpace.innerHTML += `<a id="back" href="">Back</a>`
   document.getElementById("back").onclick = () => { getPoems(); return false; }
}

// Get paramaters from url
function getUrlVars() {
   var vars = {};
   window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(_,key,value) {
       vars[key] = value;
   });
   return vars;
}

var poem = getUrlVars()["poem"];

if (poem != undefined) {
   displayPoem(poem);
} else {
   getPoems();
}
