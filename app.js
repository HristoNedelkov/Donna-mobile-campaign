const paths = {
  home: document.getElementById("home-template"),
  catalog: document.getElementById("catalog-template"),
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
      console.log(paths[key]);
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
      break;
    case "About us":
      el.classList.add("active");

      break;
    default:
      break;
  }
}

navigation.forEach((element) => {
  element.addEventListener("click", () => {
    highlightLink(element);
  });
});
