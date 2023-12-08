function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.getElementById("modal-close-btn").focus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

document
  .getElementById("modal-send-formData")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;

    // Validation du prénom
    const firstName = document.getElementById("firstName");
    const errorMessageFirstName = document.getElementById(
      "error-message-firstName"
    );
    if (!/^[a-zA-Z-]{2,}$/.test(firstName.value)) {
      firstName.classList.add("invalid");
      firstName.classList.remove("valid");
      errorMessageFirstName.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
      isValid = false;
    } else {
      firstName.classList.add("valid");
      firstName.classList.remove("invalid");
      errorMessageFirstName.textContent = "";
    }

    // Validation du nom
    const lastName = document.getElementById("lastName");
    const errorMessagelastName = document.getElementById(
      "error-message-lastName"
    );
    if (!/^[a-zA-Z-]{2,}$/.test(lastName.value)) {
      lastName.classList.add("invalid");
      lastName.classList.remove("valid");
      errorMessagelastName.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      isValid = false;
    } else {
      lastName.classList.add("valid");
      lastName.classList.remove("invalid");
      errorMessagelastName.textContent = "";
        }

    // Validation de l'email
    const email = document.getElementById("email");
    const errorMessageEmail = document.getElementById("error-message-email");
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add("invalid");
      email.classList.remove("valid");
      errorMessageEmail.textContent = "Veuillez entrer une adresse mail valide.";
      isValid = false;
    } else {
      email.classList.add("valid");
      email.classList.remove("invalid");
      errorMessageEmail.textContent = "";
    }

    if (!isValid) {
      const firstInvalidElement = document.querySelector(".invalid");
      firstInvalidElement.focus();
    } else {
      alert("Formulaire envoyé avec succès!");
      closeModal();
    }
  });

function closeModal() {
  document.getElementById("contact_modal").style.display = "none";
}
