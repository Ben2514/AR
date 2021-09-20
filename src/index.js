function toggle(element) {
  let scene = document.querySelector("#scene");
  if (element.innerHTML === "題目") {
    element.innerHTML = "圖片";
    scene.object3D.visible = true;
  }
  else {
    element.innerHTML = "題目";
    scene.object3D.visible = false;
  }
}
