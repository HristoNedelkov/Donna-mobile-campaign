const paths = {
  home: domGet("home-template"),
  catalog: domGet("catalog-template"),
  //   gallery: domGet("gallery-template"),
  info: domGet("info-template"),
  about: domGet("footer-template"),
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
      trimUrl("home");
      break;
    case "Catalog":
      el.classList.add("active");
      show("catalog");
      trimUrl("catalog");
      break;
    case "Gallery":
      el.classList.add("active");
      //   show("gallery");
      //   trimUrl("gallery");

      break;
    case "Info":
      el.classList.add("active");
      show("info");
      trimUrl("info");
      break;
    case "About us":
      el.classList.add("active");
      show("about");
      trimUrl("about-us");
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
