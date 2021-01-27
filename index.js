// alert("Haha");

window.onload = () => {
  //   console.log("window.onload()");
  let toggler = document.getElementById("discount-toggler");

  if (toggler) {
    toggler.addEventListener("change", handleTogglerChange);
    //  console.log("Event listener added for toggler");
  }
};

function handleTogglerChange(event) {
  if (event.target.checked) {
    console.log("toggle on...");
  } else {
    console.log("toggle off...");
  }
}
