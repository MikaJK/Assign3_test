import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

async function getData(imageContainer, breedName) {
  const randomPicture = await fetch(
    "https://dog.ceo/api/breed/" + breedName + "/images/random"
  );
  var imageUrl = await randomPicture.json();
  const response = await fetch(imageUrl["message"]);
  const blob = await response.blob();
  //console.log(blob);
  const url = URL.createObjectURL(blob);
  const image = new Image();
  image.src = url;
  image.className = "wiki-img";
  imageContainer.append(image);
  return image;
}

function getTemplate() {
  var mainWiki = document.createElement("div");
  mainWiki.className = "wiki-item";
  var breedHeader = document.createElement("h1");
  breedHeader.className = "wiki-header";
  var breedName = "hound";
  breedHeader.innerHTML = breedName;
  mainWiki.append(breedHeader);
  var content = document.createElement("div");
  content.className = "wiki-content";
  var p = document.createElement("p");
  p.className = "wiki-text";
  content.append(p);

  p.innerHTML = "some text about this breed";
  var imageContainer = document.createElement("div");
  imageContainer.className = "img-container";
  getData(imageContainer, "hound");

  imageContainer.innerHTML = "";
  content.append(imageContainer);
  mainWiki.append(content);
  return mainWiki;
}

function initializeCode() {
  var cont = document.createElement("div");
  cont.className = "container";
  for (var i = 0; i < 2; i++) {
    cont.append(getTemplate());
  }

  document.getElementById("app").append(cont);
}
