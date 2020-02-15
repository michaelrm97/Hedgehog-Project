function getPoems() {
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
            document.getElementById(poemName).onclick = displayPoem(poemName);
         }
         document.getElementById("credits").onclick = displayCredits();
      }
   };
   xmlhttp.open("GET", "poems.txt", true);
   xmlhttp.send();
}

function displayPoem(poemName) {
   return () => {
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
         }
      };
      xmlhttp.open("GET", poemName + ".txt", true);
      xmlhttp.send();
      return false;
   }
}

function displayCredits() {
   return () => {
      var poemSpace = document.getElementById("poem-space");
      poemSpace.innerHTML = `<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>`;
      poemSpace.innerHTML += `<a id="back" href="">Back</a>`
      document.getElementById("back").onclick = () => { getPoems(); return false; }
      return false;
   }
}

getPoems();
