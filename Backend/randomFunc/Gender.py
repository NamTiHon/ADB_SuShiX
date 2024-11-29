import random

def random_gender():
    return random.choice(["Nam", "Nữ"])

# Random 1000 giới tính
genders = [random_gender() for _ in range(100000)]

# Lưu vào file
with open("Backend/randomFunc/genders_100000.txt", "w", encoding="utf-8") as file:
    file.write("\n".join(genders))

print("Danh sách 1000 giới tính đã được lưu vào file genders_100000.txt")
