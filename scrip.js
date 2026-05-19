function sendMessage(){

  const input =
    document.getElementById("user-input");

  const message =
    input.value;

  if(message === ""){
    return;
  }

  const chatBox =
    document.getElementById("chat-box");

  // mensaje usuario

  chatBox.innerHTML += `
    <div class="user-message">
      ${message}
    </div>
  `;

  // respuestas automáticas

  let response =
    "Gracias por tu consulta ✨";

  if(message.includes("hola")){
    response =
      "Hola ✨ ¿Cómo puedo ayudarte?";
  }

  if(message.includes("proyectos")){
    response =
      "Puedes ver proyectos web y desarrollos con IA.";
  }

  if(message.includes("contacto")){
    response =
      "Puedes completar el formulario de contacto.";
  }

  chatBox.innerHTML += `
    <div class="bot-message">
      ${response}
    </div>
  `;

  input.value = "";

  chatBox.scrollTop =
    chatBox.scrollHeight;
}

// formulario contacto

const form =
  document.getElementById("contact-form");

form.addEventListener("submit", function(event){

  event.preventDefault();

  const name =
    document.getElementById("name").value;

  document.getElementById("response").innerHTML =
    `Gracias ${name},
    tu mensaje fue enviado correctamente ✨`;

  form.reset();

});
