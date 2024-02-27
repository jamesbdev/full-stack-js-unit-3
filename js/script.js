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

const handleCreditCard = () => {
  const paymentSelect = document.querySelector("#payment");
  const paymentOptions = paymentSelect.querySelectorAll("option");
  const payPalSection = document.querySelector("#paypal");
  const creditCardSection = document.querySelector("#credit-card");
  const bitCoinSection = document.querySelector("#bitcoin");

//select the credit card option by default
  paymentOptions.forEach(option => {
    if(option.value == "credit-card") {
        option.selected = true;
    }
  })
  //hide the paypal section
  payPalSection.style.display = "none";
  //hide the bitcoin section
  bitCoinSection.style.display = "none";

  //hide or show the correct section depending on user selected option
  paymentSelect.addEventListener("change", (event) => {
    const optionValue = event.target.value;
    if (optionValue == "credit-card") {
       //hide the paypal section
       payPalSection.style.display = "none";
       //hide the bitcoin section
       bitCoinSection.style.display = "none";
       //show credit card section
       creditCardSection.style.display = "block";
    } else if (optionValue == "paypal") {
        //hide credit card and bitcoin sections
        creditCardSection.style.display = "none";
        bitCoinSection.style.display = "none";
        //display paypal section
        payPalSection.style.display = "block";
    } else {
      //hide paypal and credit card section
      creditCardSection.style.display = "none";
      payPalSection.style.display = "none";
      //display bitcoin section
      bitCoinSection.style.display = "block";
    }
  })
}

handleCreditCard();

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    const validateName = () => {
        const nameHint = document.querySelector("#name-hint");
        //validate the name input 
        const nameValue = nameInput.value.trim();
        if(nameValue.length == 0) {
            //prevent the form from submiting
            event.preventDefault();
            //show error message 
            nameHint.style.display = "inline";
        } else {
            //hide the hint message
            nameHint.style.display = "none";
        }
    }

    validateName();

    const validateEmail = () => {
        const emailInputValue = document.querySelector("#email").value;
        const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const emailIsMatch = emailRegex.test(emailInputValue); 
        const emailHint = document.querySelector("#email-hint");
        if (emailIsMatch == false) {
            //stop the form from submitting
            event.preventDefault();
            //display the hint
            emailHint.style.display = "inline";
        } else {
           //hide the hint
           emailHint.style.display = "none";
        }
    }
    validateEmail();

   //show the error message if no activities are selected
    const validateActivity = (total) => {
       const activityHint = document.querySelector("#activities-hint");
       if(total == 0) {
          //stop form from submitting
          event.preventDefault();
          activityHint.style.display = "inline";
       } else {
          activityHint.style.display = "none";
       }
    }

    validateActivity(totalPrice);

})













