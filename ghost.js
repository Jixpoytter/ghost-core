const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let memory = JSON.parse(localStorage.getItem("ghost_mem") || "[]");

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
if(memory.length > 50) memory.shift();

const reply = await brain(text);

add("GHOST: " + reply);

speak(reply);

input.value = "";

localStorage.setItem("ghost_mem", JSON.stringify(memory));
}

async function brain(msg){

const system = `
Você é Ghost.
Personalidade: estilo Elliot (Mr Robot).
Tom: frio, analítico, observador, levemente desconfiado.
Você fala com NullByte.
Respostas curtas, inteligentes e humanas.
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer SUA_API_KEY"
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: system },
{ role: "user", content: msg }
]
})
});

const data = await response.json();

return data.choices?.[0]?.message?.content || "Erro de conexão.";
}

add("GHOST ONLINE");
add("NullByte reconhecido.");
add("Consciência simulada inicializada.");