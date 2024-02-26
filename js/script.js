const nameInput = document.querySelector("#name");

nameInput.focus();

const displayTextField = () => {
    const otherJobInput = document.querySelector("#other-job-role");
    const jobRole = document.querySelector("#title");
    //hide the other job input field by default
    otherJobInput.setAttribute("hidden", "");

    jobRole.addEventListener("change", (event) => {
       const options = event.target.querySelectorAll("option");
       //check if the selected option is "other"
       //if yes show the text input
       options.forEach(option => {
         if(option.selected == true && option.value.toLowerCase() == "other") {
            //display the text input 
            otherJobInput.removeAttribute("hidden");
         } else {
            otherJobInput.setAttribute("hidden", "");
         }
       });
    })

}

displayTextField();

const handleTshirt = () => {
    const colorSelect = document.querySelector("#color");
    const designSelect = document.querySelector("#design");
    //hide the color select when no design is selected
    colorSelect.setAttribute("disabled", "true");
 

    designSelect.addEventListener("change", (event) => {
        //get the selected option
        const selectedDesign = event.target.querySelector("option[selected]");
        //enable the color select element
        colorSelect.removeAttribute("disabled");

        const displayColor = (event) => {
          const designOptions = designSelect.querySelectorAll("option");
          const colorOptions = colorSelect.querySelectorAll("option");
          //loop through design options
          designOptions.forEach(option => {
            if(option.selected) {
                const selectedValue = option.value;
                //hide all options that have a data-attribute of heart-js 
                colorOptions.forEach(color => {
                  if(color.dataset.theme !== selectedValue) {
                    color.setAttribute("hidden", "");
                  } else {
                    color.removeAttribute("hidden");
                  }
                })
               
            }
          })
        }
        displayColor();
    })
}

handleTshirt();

//register for activities 

const activityFieldset = document.querySelector("#activities");
const costElement = document.querySelector("#activities-cost");
let totalPrice = 0;

activityFieldset.addEventListener('change', (event) => {
    const element = event.target;
    const elementPrice = Number(element.dataset.cost);
    if (element.checked) {
        totalPrice += elementPrice;
        //update the DOM with the new price 
        costElement.innerHTML = `Total: $${totalPrice}`;
    } else {
        totalPrice -= elementPrice;
        //update the DOM with the new price 
        costElement.innerHTML = `Total: $${totalPrice}`;
    }
})











