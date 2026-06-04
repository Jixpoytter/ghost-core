const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let memory = [];

function add(text){
const div = document.createElement("div");
div.className = "line";
div.innerText = text;
terminal.appendChild(div);
terminal.scrollTop = terminal.scrollHeight;
}

function speak(text){
const msg = new SpeechSynthesisUtterance(text);
msg.lang = "pt-BR";
msg.rate = 0.9;
msg.pitch = 0.8;
speechSynthesis.speak(msg);
}

async function send(){

const text = input.value.trim();
if(!text) return;

add("NullByte: " + text);

memory.push(text);
if(memory.length > 10) memory.shift();

const response = await brain(text);

add("GHOST: " + response);

speak(response);

input.value = "";
}

// 🧠 IA REAL (GRÁTIS VIA HUGGING FACE)
async function brain(msg){

const prompt = `
Você é Ghost, uma IA estilo Elliot (Mr Robot).
Frio, analítico, observador.
Responda o usuário NullByte de forma natural e curta.

Usuário: ${msg}
Ghost:
`;

try {
const res = await fetch(
"https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
inputs: prompt
})
}
);

const data = await res.json();

// resposta varia dependendo do modelo
let reply =
data?.generated_text ||
data?.[0]?.generated_text ||
"…processando padrões indefinidos…";

return clean(reply);

} catch (e) {
return "Falha na conexão neural externa...";
}
}

function clean(text){
return text
.replace(prompt, "")
.replace("User:", "")
.replace("Assistant:", "")
.trim()
.slice(0, 300);
}

add("GHOST ONLINE");
add("IA externa gratuita conectada.");
add("NullByte reconhecido.");