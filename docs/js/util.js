function toggle(element) {
  let scene = document.querySelector("#scene");
  let exam = document.querySelector("#exam");
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