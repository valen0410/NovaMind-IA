async function sendMessage(){

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

  input.value = "";

  try{

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {

        method: "POST",

        headers: {

          "Authorization":
            "Bearer TU_TOKEN",

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          model:
            "microsoft/Phi-3-mini-4k-instruct:featherless-ai",

          messages: [
            {
              role: "user",
              content: message
            }
          ]

        })

      }
    );

    const data =
      await response.json();

    const botReply =
      data.choices[0].message.content;

    // respuesta IA

    chatBox.innerHTML += `
      <div class="bot-message">
        ${botReply}
      </div>
    `;

  }

  catch(error){

    chatBox.innerHTML += `
      <div class="bot-message">
        Error conectando con la IA 😭
      </div>
    `;

  }

  chatBox.scrollTop =
    chatBox.scrollHeight;
}
