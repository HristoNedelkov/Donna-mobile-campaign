let contactLi = document.getElementById("contact-id");
let commentsDiv = document.getElementById("comments-section");
const paths = {
  home: document.getElementById("home-template"),
  catalog: document.getElementById("catalog-template"),
  contact: document.getElementById("contact-template"),
  // gallery: document.getElementById("gallery-template"),
  info: document.getElementById("info-template"),
  about: document.getElementById("about-us-page"),
};
const navigation = Array.from(
  document.getElementById("navigation-links").children
);

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
      show("home");
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
      if (commentsDiv.innerHTML.trim() !== "") {
        break;
      }
      commentServices
        .getAll()
        .then((res) => {
          if (Object.keys(res).length != 0) return res;
          else return {};
        })
        .then((data) => {
          for (const el of Object.entries(data)) {
            commentsDiv.innerHTML += divGenerate(el[1]);
          }
        });
      break;
    case "About us":
      el.classList.add("active");
      show("about");
      break;
    default:
      break;
  }
}
const divGenerate = (obj) => {
  return `
      <div class="field comment-card" >
      <label for="comment">| Автор: ${obj.name} |</label>
      <p>${obj.text}</p>
      </div>`;
};
function onPostComment() {
  const name = document.getElementById("comments-name");
  const text = document.getElementById("comments-text");
  if (name != "" && text != "") {
    commentServices.add({ name: name.value, text: text.value });
    alert("Успешно публикуван коментар!");
    name.value = "";
    text.value = "";
    commentsDiv.innerHTML = "";
    highlightLink(contactLi);
  } else alert("Попълнете всички полета!");
}

navigation.forEach((element) => {
  element.addEventListener("click", () => {
    highlightLink(element);
  });
});
