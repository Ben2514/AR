let currentQ = 0;
let record = (function() {
  let r = [];
  for (let i = 0; i < numQ; i++)
    r.push([]);
  return r;
})();

function toggle(element) {
  let scene = document.querySelector("#scene");
  let exam = document.querySelector(".exam.active");

  if (element.innerHTML === "題目") {
    element.innerHTML = "圖片";
    scene.object3D.visible = true;
    if (exam)
      exam.style.display = "none";
  }
  else {
    element.innerHTML = "題目";
    scene.object3D.visible = false;
    if (exam)
      exam.style.display = "";
  }
}

function sw(next) {
  if (currentQ) {
    let last = document.querySelector(`#exam${currentQ}`);
    last.classList.remove("active");
  }
  let now = document.querySelector(`#exam${next}`);
  now.classList.add("active");
  if (document.querySelector("#toggle").innerHTML !== "題目")
    now.style.display = "none";

  currentQ = next;
}


window.addEventListener("camera-init", () => {
  document.querySelector(".arjs-loader").style.display = "none";
  document.querySelector("#toggle").style.display = "";
  document.querySelector("#commit").style.display = "";
})

window.addEventListener("load", function() {
  let markers = document.querySelectorAll("a-marker");
  markers.forEach((marker) => {
    marker.addEventListener("markerFound", (event) => {
      let next = parseInt((event.target.id).slice(6));
      sw(next);
    });
  });

  let options = document.querySelectorAll("input[type=checkbox][name=options]");
  options.forEach((option) => {
    option.addEventListener("change", (event) => {
      let input = event.target;
      let label = input.parentElement;

      if (input.checked) {
        label.classList.add("btn-primary");
        label.classList.remove("btn-secondary");
        input.nextElementSibling.className = "far fa-check-square";
        update(true);
      } else {
        label.classList.remove("btn-primary");
        label.classList.add("btn-secondary");
        input.nextElementSibling.className = "far fa-square";
        update(false);
      }

      function update(add) {
        let value = [...label.parentElement.children].indexOf(label) + 1; // get index of option
        if (add) {
          record[currentQ - 1].push(value);
          record[currentQ - 1].sort();
        }
        else {
          let index = record[currentQ - 1].indexOf(value);
          record[currentQ - 1].splice(index, 1);
        }

        let finished = record.reduce((acc, cur) => acc && cur.length);
        let commit = document.querySelector("#commit");
        commit.disabled = !finished;
        commit.value = finished ? "提交" : "未完成";
        commit.className = finished ? "btn btn-success" : "btn btn-light";
      }

    });
  });
});