import random
import string

# Hàm tạo mật khẩu ngẫu nhiên
def generate_password(length=8):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))

# Tạo 100,000 mật khẩu và lưu vào file
with open("passwords.txt", "w") as file:
    for _ in range(100000):
        password = generate_password()
        file.write(password + "\n")

print("Đã tạo 100k mật khẩu và lưu vào passwords.txt")
