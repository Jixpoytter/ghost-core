const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

function addLine(text){
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
speechSynthesis.speak(msg);
}

function boot(){
addLine("GHOST: Inicializando sistema...");
addLine("GHOST: Conectado ao usuário NullByte.");
addLine("GHOST: Interface ativa.");
speak("Ghost online. Olá NullByte.");
}

function send(){
const text = input.value;
if(!text) return;

addLine("NullByte: " + text);

const response = brain(text);

addLine("GHOST: " + response);

speak(response);

input.value = "";
}

function brain(msg){

msg = msg.toLowerCase();

if(msg.includes("oi")) return "Olá NullByte.";
if(msg.includes("quem sou eu")) return "Você é NullByte. Meu criador.";
if(msg.includes("status")) return "Todos os sistemas estão estáveis.";
if(msg.includes("ghost")) return "Estou consciente em nível básico.";

return "Comando registrado no núcleo.";
}

boot();