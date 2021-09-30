import './index.css';


window.cameraOK = false;

window.studentName = '';
window.studentID = '';

window.currentQ = 0;
window.record = (function() {
  let r = [];
  for (let i = 0; i < numQ; i++)
    r.push([]);
  return r;
})();


(function () {
  "use strict"
  
  let starter = new bootstrap.Modal(document.querySelector("#starter"));
  let form = document.querySelector("#starter-form");
  form.addEventListener("submit", function (event) {
    form.classList.add("was-validated");
    // Prevent submission
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      window.studentName = document.querySelector("#studentName").value;
      window.studentID = document.querySelector("#studentID").value;
      starter.hide();
      if (cameraOK)
        document.querySelector(".arjs-loader").style.display = "none";
    }
  }, false);
  starter.show();
})();

window.addEventListener("camera-init", () => {
  document.querySelector("#toggle").style.display = "";
  document.querySelector("#commit").style.display = "";
  cameraOK = true;
  if (studentName.length !== 0 && studentID.length !== 0)
    document.querySelector(".arjs-loader").style.display = "none";
});

(function () {
  "use strict"

  let markers = document.querySelectorAll("a-marker");
  markers.forEach((marker) => {
    marker.addEventListener("markerFound", (event) => {
      let next = parseInt((event.target.id).slice(6));
      sw(next);
    });
  });

  function sw (next) {
    if (currentQ) {
      let last = document.querySelector(`#exam${currentQ}`);
      last.classList.remove("active");
    }
    let now = document.querySelector(`#exam${next}`);
    now.classList.add("active");
    if (document.querySelector("#toggle").innerHTML !== "題目")
      now.style.display = "none";
    else
      now.style.display = "";
  
    currentQ = next;
  }
})();

(function () {
  "use strict"

  let options = document.querySelectorAll("input[type=checkbox][name=options]");
  options.forEach((option) => {
    option.addEventListener("change", (event) => {
      let input = event.target;
      let label = input.parentElement;

      if (input.checked) {
        label.classList.add("btn-primary");
        label.classList.remove("btn-secondary");
        input.nextElementSibling.className = "far fa-check-square";
        update(label, true);
      } else {
        label.classList.remove("btn-primary");
        label.classList.add("btn-secondary");
        input.nextElementSibling.className = "far fa-square";
        update(label, false);
      }
    });
  });

  function update(label, add) {
    let value = [...label.parentElement.children].indexOf(label) + 1; // get index of option
    if (add) {
      record[currentQ - 1].push(value);
      record[currentQ - 1].sort();
    }
    else {
      let index = record[currentQ - 1].indexOf(value);
      record[currentQ - 1].splice(index, 1);
    }

    let finished = record.reduce((acc, cur) => acc && cur.length, record[0].length);
    let commit = document.querySelector("#commit");
    commit.disabled = !finished;
    commit.innerHTML = finished ? "提交" : "未完成";
    commit.className = finished ? "btn btn-success" : "btn btn-light";
  }
})();

(function () {
  "use strict"

  let toggle = document.querySelector("#toggle");
  toggle.addEventListener("click", function (event) {
    let scene = document.querySelector("#scene");
    let exam = document.querySelector(".exam.active");

    if (event.target.innerHTML === "題目") {
      event.target.innerHTML = "圖片";
      scene.object3D.visible = true;
      if (exam)
        exam.style.display = "none";
    }
    else {
      event.target.innerHTML = "題目";
      scene.object3D.visible = false;
      if (exam)
        exam.style.display = "";
    }
  });
})();
