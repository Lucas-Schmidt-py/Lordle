x = input("Original List: ")
y = int(input("Anazhl: "))
x += ".txt"

datei = open(x,'r')
datei2 = open("Champs_"+str(y)+"_letters",'w')

with open(x,'r') as file:
    list = []
    for line in file:
        if y == len(line)-1:
            datei2.write(line)

