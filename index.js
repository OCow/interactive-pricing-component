/**
 * Called when browser has loaded the page. All the elements
 * should be available by now, therefore we are adding the event
 * handlers here.
 */
window.onload = () => {
  //   console.log("window.onload()");
  let toggler = document.getElementById("discount-toggler");
  if (toggler) {
    toggler.addEventListener("change", handleTogglerChange);
  }

  let slider = document.getElementById("pageview-slider");
  if (slider) {
    //listening to mousemove enables us the change the fill state
    //of the runnable slider area WHILE the mouse button is still
    //down. The change event only occurs when the mouse button is
    //released.
    slider.addEventListener("mousemove", handleSliderEvent);

    //Also listen to input event of slider. This is necessary in case
    //the user just clicks on the runnable area and now mouse move
    //occurs at all.
    //Listening on "change" event does not work as expected in mobile
    //view (https://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging/33030129)
    slider.addEventListener("input", handleSliderEvent);

    //Fill the slider with the initial value. Setting this in .scss file
    //did not seem to work. In case the .scss file also contains a background
    //property, the filling does not work correct.
    let value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(90deg, hsl(174, 77%, 80%) ${value}%, hsl(224, 65%, 95%) ${value}%)`;
    slider.style.borderRadius = "9px";
  }

  setPriceAndPageView();
};

/**
 * Set current price depending on slider position and discount toggler
 * state.
 */
function setPriceAndPageView() {
  let pageViewValue = document.getElementById("pageview-slider").value;
  let discount = document.getElementById("discount-toggler").checked
    ? true
    : false;

  console.log(
    "Value: " + pageViewValue + ", discount: " + (discount ? "yes" : "no")
  );

  let pageViewString = "";
  let pageViewPrice = -1;
  switch (Number(pageViewValue)) {
    case 1:
      {
        pageViewString = "10 k";
        pageViewPrice = 8;
      }
      break;

    case 2:
      {
        pageViewString = "50 k";
        pageViewPrice = 12;
      }
      break;

    case 3:
      {
        pageViewString = "100 k";
        pageViewPrice = 16;
      }
      break;

    case 4:
      {
        pageViewString = "500 k";
        pageViewPrice = 24;
      }
      break;

    case 5:
      {
        pageViewString = "1 M";
        pageViewPrice = 36;
      }
      break;
  }

  if (discount) {
    pageViewPrice = (pageViewPrice - pageViewPrice * 0.25).toFixed(0);
  }

  document.getElementById("pageviews_amount").innerText = pageViewString;
  document.getElementById("price-number").innerText = pageViewPrice;
}

//TODO get rid of this global variable using a closure
let oldValue = -1;
/**
 * Handle slider event. Can be either "change" or "mousemove". The event
 * handler is the same for both.
 * @param {*} event
 */
function handleSliderEvent(event) {
  //access value, min and max of slider. These value are specified in html
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  // console.log("haha - " + value);

  //TODO use closure for comparing this...
  if (oldValue === -1 || oldValue !== value) {
    setPriceAndPageView();
  }

  this.style.background = `linear-gradient(90deg, hsl(174, 77%, 80%) ${value}%, hsl(224, 65%, 95%) ${value}%)`;
  this.style.borderRadius = "9px";

  //store the current value for the next call
  oldValue = value;
}

/**
 * Event handler for toggler. Adapts the price field accordingly.
 * @param {*} event
 */
function handleTogglerChange(event) {
  setPriceAndPageView();
}
