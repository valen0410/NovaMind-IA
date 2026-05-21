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
      "https://platform.openai.com/home",
      {

        method: "POST",

        headers: {

          "Authorization":
            "Bearer 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",

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
