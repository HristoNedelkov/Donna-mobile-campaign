const paths = {
  home: document.getElementById("home-template"),
  catalog: document.getElementById("catalog-template"),
  contact: document.getElementById("contact-template"),
  // gallery: document.getElementById("gallery-template"),
  info: document.getElementById("info-template"),
};
const navigation = Array.from(
  document.getElementById("navigation-links").children
);
function domGet(name) {
  return document.getElementById(name);
}
function trimUrl(path) {
  window.history.replaceState({}, "", "/" + path);
  return;
}
function show(...componentsToBeShown) {
  for (const key in paths) {
    if (componentsToBeShown.includes(key)) {
      paths[key].style.display = "block";
    } else {
      paths[key].style.display = "none";
    }
  }
}
function highlightLink(el) {
  for (const link of navigation) {
    link.classList = "";
  }
  switch (el.textContent.trim()) {
    case "Home":
      el.classList.add("active");
      show("home", "about");
      break;
    case "Catalog":
      el.classList.add("active");
      show("catalog");
      break;
    case "Gallery":
      el.classList.add("active");
      //   show("gallery");

      break;
    case "Info":
      el.classList.add("active");
      show("info");
      break;
    case "Contact":
      el.classList.add("active");
      show("contact");
      const divGenerate = (obj) => {
        return `
        <div class="field comment-card" >
        <label for="comment">| Автор: ${obj.name} |</label>
        <p>${obj.text}</p>
        </div>`;
      };
      commentServices
        .getAll()
        .then((res) => {
          if (Object.keys(res).length != 0) return res;
          else return {};
        })
        .then((data) => {
          let commentsDiv = document.getElementById("comments-section");

          for (const el of Object.entries(data)) {
            console.log(divGenerate(el[1]));
            commentsDiv.innerHTML += divGenerate(el[1]);
          }
        });
      show("contact");
      break;
    case "About us":
      el.classList.add("active");

      break;
    default:
      break;
  }
}
function onPostComment() {
  const name = document.getElementById("comments-name").value;
  const text = document.getElementById("comments-text").value;
  if (name != "" && text != "") {
    commentServices.add({ name, text });
    alert("Успешно публикуван коментар!");
  } else alert("Попълнете всички полета!");
}

navigation.forEach((element) => {
  element.addEventListener("click", () => {
    highlightLink(element);
  });
});
