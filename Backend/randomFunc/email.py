import random
import string

# Define possible domains
domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com"]

# Function to generate a random email
def generate_random_email():
    username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))  # Username có 4 ký tự gồm số và chữ
    domain = random.choice(domains)
    return f"{username}@{domain}"

# Generate 1000 unique emails
emails = set()
while len(emails) < 100000:  # Đảm bảo danh sách không trùng lặp
    emails.add(generate_random_email())

# Save to a file
with open("Backend/randomFunc/random_emails_100000.txt", "w", encoding="utf-8") as file:
    file.write("\n".join(emails))

print("File random_emails_100000.txt đã được tạo!")
