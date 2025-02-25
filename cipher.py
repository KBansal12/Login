import string
alphabets=list(string.ascii_lowercase)
# print(alphabets)
direction=input("type encode to encrypt and decode to decrypt \n").lower()
text=input("enter you message \n").lower()
shift=int(input("type the shift number:\n"))
def encrypt(original_text,shift_amount):
    cipher_text=""
    for letter in original_text:
        shifted_position=alphabets.index(letter)+shift_amount
        shifted_position%=len(alphabets)
        cipher_text+=alphabets[shifted_position]
    print(f"here is the encoded result:{cipher_text}")
  
def decrypt(original_text,shift_amount):
    output_text=""
    for letter in original_text:
        shifted_position = alphabets.index(letter)-shift_amount
        shifted_position %= len(alphabets)
        output_text += alphabets[shifted_position]
    print(f"your text was:{output_text}")
if direction=="encode":
    encrypt(original_text=text,shift_amount=shift) 
elif direction=="decode":
    decrypt(original_text=text,shift_amount=shift)  
        