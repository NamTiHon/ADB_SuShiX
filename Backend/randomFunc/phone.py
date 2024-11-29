import random

def generate_phone_number():
    second_digit = random.choice("123456789")  
    third_digit = random.choice("123456789") 
    remaining_digits = ''.join(random.choices("0123456789", k=7)) 
    return f"0{second_digit}{third_digit}{remaining_digits}"

phone_numbers = set()
while len(phone_numbers) < 100000:
    phone_numbers.add(generate_phone_number())

output_file = "Backend/randomFunc/random_phone_numbers_100k.txt"
with open(output_file, "w", encoding="utf-8") as file:
    file.write("\n".join(phone_numbers))

print(f"File {output_file} đã được tạo!")
