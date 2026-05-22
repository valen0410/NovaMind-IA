async function sendMessage() {

  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  // Mostrar mensaje del usuario
  chatBox.innerHTML += `
    <div class="user-message">
      ${message}
    </div>
  `;

  input.value = "";

  // Indicador de carga
  chatBox.innerHTML += `
    <div class="bot-message loading">
      NovaMind AI está escribiendo...
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    document.querySelector(".loading")?.remove();

    chatBox.innerHTML += `
      <div class="bot-message">
        ${data.reply}
      </div>
    `;

  } catch (error) {

    console.error(error);

    document.querySelector(".loading")?.remove();

    chatBox.innerHTML += `
      <div class="bot-message">
        ⚠️ No se pudo conectar con el servidor.
      </div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


// Enviar con Enter
document.getElementById("user-input")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      sendMessage();
    }

  });


// Formulario de contacto
document.getElementById("contact-form")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    document.getElementById("response").innerHTML =
      "✅ Mensaje enviado correctamente.";

    this.reset();

  }); 
