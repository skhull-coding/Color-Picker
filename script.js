let colorPicker = document.getElementById("color-picker");
let colorsList = document.getElementById("colors");
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
let colorContainer = document.getElementById("color-container");
let clearColorBtn = document.getElementById("clear-all-colors");
let pickerContainer = document.getElementById("color-picker-container");
let color_name;

const pickColor = async () => {
  try {
    const eyeDrop = new EyeDropper();
    pickerContainer.style.display = "none";
    let { sRGBHex } = await eyeDrop.open();

    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    }
  } catch (error) {
    console.log("Failed to Add Color");
  } finally {
    loadColors();
    pickerContainer.style.display = "block";
  }
};

const copyToClipBoard = (e) => {
  navigator.clipboard.writeText(e.target.dataset.color);
  e.target.textContent = "Copied.";
  setTimeout(() => {
    e.target.textContent = e.target.dataset.color;
  }, 1000);
};

const updateCopyFunction = () => {
  color_name = document.querySelectorAll(".color-name");
  color_name.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      copyToClipBoard(e);
    });
  });
};

const loadColors = () => {
  if (localStorage.getItem("picked-colors")) {
    colorContainer.classList.remove("hidden");
  } else {
    colorContainer.classList.add("hidden");
  }
  let colorsToAdd = pickedColors
    .map(
      (color) => `<li class="flex gap-2 items-center">
  <div class="color-box w-5 h-5 rounded-sm" style="background: ${color}; border: 1px solid #000"></div>

  <span class="color-name font-medium tracking-wide cursor-pointer"  data-color='${color}'>${color}</span>
</li>`
    )
    .join("");
  colorsList.innerHTML = colorsToAdd;
  updateCopyFunction();
};

const clearColors = () => {
  localStorage.removeItem("picked-colors");
  pickedColors = [];
  loadColors();
};

colorPicker.addEventListener("click", () => {
  pickColor();
});

clearColorBtn.addEventListener("click", () => {
  clearColors();
});

loadColors();
