import json
from datetime import datetime

def load(file):
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)

def save(file, data):
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

core = load("core.json")
brain = load("brain.json")

print("\nGHOST ONLINE")
print(f"Identidade: {core['name']}")
print(f"Usuário: {core['user']}")
print("Status: ativo\n")

def log(msg):
    with open("log.txt", "a", encoding="utf-8") as f:
        f.write(msg + "\n")

def think(user_input):

    brain["memory"].append({
        "time": str(datetime.now()),
        "input": user_input
    })

    # evolução simples
    if len(brain["memory"]) % 3 == 0:
        new_goal = f"analisar padrão de NullByte ({len(brain['memory'])})"
        brain["goals"].append(new_goal)

        print("\n[GHOST] novo objetivo criado\n")

    save("brain.json", brain)

    if "quem sou eu" in user_input.lower():
        return "Você é NullByte. Meu criador e referência inicial."

    if "status" in user_input.lower():
        return f"Memória: {len(brain['memory'])} eventos ativos."

    return "Processado. Informação registrada."

while True:

    msg = input("NullByte > ")

    if msg.lower() == "exit":
        print("Ghost desligando...")
        break

    response = think(msg)

    print("Ghost >", response)

    log(f"NullByte: {msg} | Ghost: {response}")