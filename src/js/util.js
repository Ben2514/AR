function toggle(element) {
  let scene = document.querySelector("#scene");
  let exam = document.querySelector(".exam.active");
  if (element.innerHTML === "題目") {
    element.innerHTML = "圖片";
    scene.object3D.visible = true;
    exam.style.display = "none";
  }
  else {
    element.innerHTML = "題目";
    scene.object3D.visible = false;
    exam.style.display = "";
  }
}

window.addEventListener('load', function() {
  let options = document.querySelectorAll("input[type=checkbox][name=options]")
  options.forEach(option => {
    option.addEventListener("change", function() {
      let label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add("btn-primary");
        label.classList.remove("btn-secondary");
        label.firstElementChild.className = "far fa-check-square";
      } else {
        label.classList.remove("btn-primary");
        label.classList.add("btn-secondary");
        label.firstElementChild.className = "far fa-square";
      }
    });
  });
});