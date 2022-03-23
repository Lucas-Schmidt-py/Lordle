champ_list = []
i = 0

with open('srcs/champs/Champs_5_letters', 'r') as file:
    for line in file:
        champ = line.strip()
        champ_list.append("'" + champ  + "'") 


with open('srcs/champs/champset.txt', 'w') as file2:
    file2.write('new Set([')
    file2.write(','.join(champ_list))
    file2.write('])')