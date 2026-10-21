

import random

numero_secreto = random.randint(1, 100)
tentativas = 0
acertou = False

print("===== ADIVINHE O NÚMERO =====")
print("Pensei em um número de 1 a 100. Tente adivinhar!")

while acertou == False:
    chute = input("\nSeu chute: ")

 
    if not chute.isdigit():
        print("Digite apenas números!")
        continue

    chute = int(chute)
    tentativas = tentativas + 1

    if chute == numero_secreto:
        acertou = True
    elif chute < numero_secreto:
        print("O número secreto é MAIOR.")
    else:
        print("O número secreto é MENOR.")

print("\nParabéns, você acertou! O número era", numero_secreto)
print("Você precisou de", tentativas, "tentativas.")

if tentativas <= 5:
    print("Muito bom!")
elif tentativas <= 10:
    print("Mandou bem!")
else:
    print("Na próxima você consegue em menos tentativas!")
