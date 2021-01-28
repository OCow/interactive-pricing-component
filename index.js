// alert("Haha");

window.onload = () => {
  //   console.log("window.onload()");
  let toggler = document.getElementById("discount-toggler");

  if (toggler) {
    toggler.addEventListener("change", handleTogglerChange);
    //  console.log("Event listener added for toggler");
  }

  //set base price for initial loading of site
  document.getElementById("price-number").innerText = 16;
};

/**
 * TODO implement...
 * Depending on slider position, the base price differs.
 * - 10K pageviews / $8 per month
 * - 50K pageviews / $12 per month
 * - 100K pageviews / $16 per month
 * - 500k pageviews / $24 per month
 * - 1M pageviews / $36 per month
 */
function getBasePriceDependingOnPageView() {
  return 16;
}

function handleTogglerChange(event) {
  let basePrice = getBasePriceDependingOnPageView();

  if (event.target.checked) {
    //basePrice = basePrice - basePrice * 0.25;
    basePrice = (basePrice - basePrice * 0.33).toFixed(2);
    //console.log(`Yearly billing - ${basePrice} $`);
  } else {
    //console.log(`Montly billing - ${basePrice} $`);
  }

  document.getElementById("price-number").innerText = basePrice;
}
