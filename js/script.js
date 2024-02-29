const nameInput = document.querySelector("#name");

nameInput.focus();

//hide or show the "other job role" text input field according to what the user selects as job role
const displayTextField = () => {
  const otherJobInput = document.querySelector("#other-job-role");
  const jobRole = document.querySelector("#title");
  //hide the other job input field by default
  otherJobInput.setAttribute("hidden", "");

  jobRole.addEventListener("change", (event) => {
    const options = event.target.querySelectorAll("option");
    //check if the selected option is "other"
    //if yes show the text input
    options.forEach((option) => {
      if (option.selected == true && option.value.toLowerCase() == "other") {
        //display the text input
        otherJobInput.removeAttribute("hidden");
      } else {
        otherJobInput.setAttribute("hidden", "");
      }
    });
  });
};

displayTextField();

//disables the T-shirt color select by default.
//Then checks for the T-shirt style before presenting the T-shirt color options 
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
//shows or hides the t-shirts color according to which style the user chooses
    const displayColor = (event) => {
      const designOptions = designSelect.querySelectorAll("option");
      const colorOptions = colorSelect.querySelectorAll("option");
      //loop through design options
      designOptions.forEach((option) => {
        if (option.selected) {
          const selectedValue = option.value;
          //hide all options that have a data-attribute of heart-js
          colorOptions.forEach((color) => {
            if (color.dataset.theme !== selectedValue) {
              color.setAttribute("hidden", "");
            } else {
              color.removeAttribute("hidden");
            }
          });
        }
      });
    };
    displayColor();
  });
};

handleTshirt();

//Changes the total price in activities section according to which activities the user selects
  const activityFieldset = document.querySelector("#activities");
  const costElement = document.querySelector("#activities-cost");
  const activities = document.querySelectorAll('#activities-box input');

  let totalPrice = 0;
  
  activityFieldset.addEventListener("change", (event) => {
    const element = event.target;
    const elementPrice = Number(element.dataset.cost);
    const selectedActivityTime = event.target.dataset.dayAndTime;

    if (element.checked) {
      totalPrice += elementPrice;
      //update the DOM with the new price
      costElement.innerHTML = `Total: $${totalPrice}`;

      activities.forEach(activity => {
        //get the activity time 
        const activityTime = activity.dataset.dayAndTime;
   
      //check if activity time is same with selected activity
       if (activity.name !== element.name && activityTime == selectedActivityTime) {
         activity.setAttribute("disabled", "");
         activity.parentElement.classList.add("disabled");
       } 
     
      })
    } else {
      totalPrice -= elementPrice;
      //update the DOM with the new price
      costElement.innerHTML = `Total: $${totalPrice}`;
      activities.forEach(activity => {
        const activityTime = activity.dataset.dayAndTime;
          //check if activity time is same with selected activity
        if (activity.name !== element.name && activityTime == selectedActivityTime) {
          activity.removeAttribute("disabled");
          activity.parentElement.classList.remove("disabled");
        } 
      })
    }

  
  });

//Shows or hides the credit card / Paypal / Bitcoin sections when user selects a payment option
const handleCreditCard = () => {
  const paymentSelect = document.querySelector("#payment");
  const paymentOptions = paymentSelect.querySelectorAll("option");
  const payPalSection = document.querySelector("#paypal");
  const creditCardSection = document.querySelector("#credit-card");
  const bitCoinSection = document.querySelector("#bitcoin");

  //select the credit card option by default
  paymentOptions.forEach((option) => {
    if (option.value == "credit-card") {
      option.selected = true;
    }
  });
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
  });
};

handleCreditCard();

const form = document.querySelector("form");

//Form validation 
form.addEventListener("submit", (event) => {
  //handle validation for the name input field
  const validateName = () => {
    const nameHint = document.querySelector("#name-hint");
    //validate the name input
    const nameValue = nameInput.value.trim();
    if (nameValue.length == 0) {
      //prevent the form from submiting
      event.preventDefault();
      //show error message
      nameHint.style.display = "inline";
      //display extra validation notice
      nameHint.parentElement.classList.add('not-valid');
      nameHint.parentElement.classList.remove('valid');
    } else {
      //hide the hint message
      nameHint.style.display = "none";
      //hide extra validation notice
      nameHint.parentElement.classList.remove('not-valid');
      nameHint.parentElement.classList.add('valid');
    }
  };

  validateName();
  //handles the validation for the email input field
  const validateEmail = () => {
    const emailInputValue = document.querySelector("#email").value;
    const emailInput = document.querySelector("#email");
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const emailIsMatch = emailRegex.test(emailInputValue);
    const emailHint = document.querySelector("#email-hint");

 if (emailIsMatch == false) {
      //stop the form from submitting
      event.preventDefault();
      //display the hint
      emailHint.style.display = "inline";
      emailInput.parentElement.classList.add("not-valid");
      emailInput.parentElement.classList.remove("valid");
    } else {
      //hide the blank input error message
      errorMsg.style.display = "none";
      //hide the hint
      emailHint.style.display = "none";
      emailInput.parentElement.classList.remove("not-valid");
      emailInput.parentElement.classList.add("valid");
    }
  };
  validateEmail();

  //show the error message if no activities are selected
  const validateActivity = (total) => {
    const activityHint = document.querySelector("#activities-hint");
    const activityFieldset = document.querySelector("#activities");
    if (total == 0) {
      //stop form from submitting
      event.preventDefault();
      activityHint.style.display = "inline";
      activityFieldset.classList.add("not-valid");
      activityFieldset.classList.remove("valid");

    } else {
      activityHint.style.display = "none";
      activityFieldset.classList.remove("not-valid");
      activityFieldset.classList.add("valid");
    }
  };

  validateActivity(totalPrice);

  //contains logic to validate the card number, zip code and CVV
  const validateCard = () => {
    const paymentSelect = document.querySelector("#payment");
    const paymentOptions = paymentSelect.querySelectorAll("option");
    const cardNum = document.querySelector("#cc-num").value;
    const cardInput = document.querySelector("#cc-num");
    const cardNumHint = document.querySelector("#cc-hint");
    const zipValue = document.querySelector("#zip").value;
    const zipInput = document.querySelector("#zip");
    const zipHint = document.querySelector("#zip-hint");
    const verificationValue = document.querySelector("#cvv").value;
    const cvvInput = document.querySelector("#cvv");
    const cvvHint = document.querySelector("#cvv-hint");

    //check if credit card has selected attribute
    paymentOptions.forEach((option) => {
      //check if credit card payment is selected
      if (option.value == "credit-card" && option.selected == true) {
        const creditCardPattern = /^(\d{13}|\d{14}|\d{15}|\d{16})$/;
        const zipPattern = /^\d{5}$/;
        const cvvPattern = /^\d{3}$/;
        const firstHint = document.createElement("span");

        //validate card number input field;
        const checkCardNum = () => {
          //first validation
          if (cardNum.trim() == "") {
            //create error message
            firstHint.classList.add("hint");
            firstHint.innerText = "Please add a credit card number";
            firstHint.style.display = "inline";
            firstHint.setAttribute("id", "first-hint-card");
            cardInput.insertAdjacentElement("afterend", firstHint);
            //remove card pattern validation message
            cardNumHint.style.display = "none";
            //show visual validation
            cardInput.parentElement.classList.add("not-valid");
            cardInput.parentElement.classList.remove("valid");
            //append error message
          } else if (creditCardPattern.test(cardNum) == false) {
            const cardFirstHint = document.querySelector("#first-hint-card");
            cardFirstHint.remove();
            //stop form from submitting
            event.preventDefault();
            //display error message
            cardNumHint.style.display = "inline";
            cardInput.parentElement.classList.add("not-valid");
            cardInput.parentElement.classList.remove("valid");
          } else {
            //hide error message
            cardNumHint.style.display = "none";
            cardInput.parentElement.classList.remove("not-valid");
            cardInput.parentElement.classList.add("valid");

            //hide first hint message
            const cardFirstHint = document.querySelector("#first-hint-card");
            cardFirstHint.remove(); 
          }
        }
        checkCardNum();

        //validate Zip input field 
        const checkZip = () => {
          const zipIsMatch = zipPattern.test(zipValue) 
          if (zipIsMatch == false ) {
            //prevent form from submitting
            //show the error message
            event.preventDefault();
            zipHint.style.display = "inline";
            zipInput.parentElement.classList.add("not-valid");
            zipHint.parentElement.classList.remove("valid");

          } else {
            //hide error message
            zipHint.style.display = "none";
            zipInput.parentElement.classList.remove("not-valid");
            zipInput.parentElement.classList.add("valid");
          }
        }
        checkZip();
        
        //Validate CVV input field
        const checkCVV = () => {
          const cvvIsMatch = cvvPattern.test(verificationValue);
          if (cvvIsMatch == false ) {
            event.preventDefault();
            cvvHint.style.display = "inline";
            cvvInput.parentElement.classList.add("not-valid");
            cvvInput.parentElement.classList.remove("valid");
          } else {
            cvvHint.style.display = "none";
            cvvInput.parentElement.classList.remove("not-valid");
            cvvInput.parentElement.classList.add("valid");
          }
        }
        checkCVV();
      }
    });
  };

  validateCard();
//add extra visual validation 

});//end submit event handler

//adds focus state when checkbox inputs are in focus using tab
const addFocusState = () => {
    const activities = document.querySelectorAll('#activities-box input[type="checkbox"]');
    activities.forEach(input => {
      //add a focus class when element is focused
      input.addEventListener('focus', (event) => {
        //add a focus class to the parent label element
        input.closest("label").classList.add('focus');
      });
      //remove focus class when element is blurred
      input.addEventListener("blur", (event) => {
        input.closest("label").classList.remove('focus');
      });
    });
}

addFocusState();

//add email validation on key up
//add event listener to email input field 
//call validation function to validate in real time

const emailInput = document.querySelector("#email");

emailInput.addEventListener('keyup', (event) => {
  const emailValue = event.target.value;
  //validate email input value 
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const emailIsMatch = emailRegex.test(emailValue);
    const emailHint = document.querySelector("#email-hint");
    const errorMsg = document.createElement("span");  
    errorMsg.setAttribute("id", "first-hint");
    errorMsg.classList.add("hint");
    errorMsg.classList.add("email-hint");
    errorMsg.innerHTML = "Please enter an email address";
    const firstHint = document.querySelector("#first-hint");
    //check if the input value is empty and asks to enter an email
    if (emailValue.trim() == "" && firstHint == null) {
      //show first validation message
      emailInput.insertAdjacentElement("afterend", errorMsg);
      errorMsg.style.display = "inline";
    } else if (emailIsMatch == false) {
      //remove the empty field error message
      if (firstHint !== null || firstHint !== undefined) {
        firstHint.style.display = "none";
      }
      //stop the form from submitting
      event.preventDefault();
      //display the hint
      emailHint.style.display = "inline";
      emailInput.parentElement.classList.add("not-valid");
      emailInput.parentElement.classList.remove("valid");
    } else {
      //remove the empty field error message
      errorMsg.style.display = "none";
      //hide the hint
      emailHint.style.display = "none";
      emailInput.parentElement.classList.remove("not-valid");
      emailInput.parentElement.classList.add("valid");
    }
})
