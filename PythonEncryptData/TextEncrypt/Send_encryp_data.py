from pymongo import MongoClient
import binascii
import hashlib, secrets, binascii
from aes_ecc import encrypt_ECC, curve,decrypt_ECC

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.TextData


def encrypt_and_save_to_mongodb(text_message):
    global decryptedMsg
    try:
  
        message = text_message

 
        privKey = secrets.randbelow(curve.field.n)
        pubKey = privKey * curve.g

        encryptedMsg = encrypt_ECC(message, pubKey)
        encryptedMsgObj = {
            'ciphertext': binascii.hexlify(encryptedMsg[0]).decode(),
            'nonce': binascii.hexlify(encryptedMsg[1]).decode(),
            'authTag': binascii.hexlify(encryptedMsg[2]).decode()
        }

     
        collection.insert_one(encryptedMsgObj)
        print("Data Encrypted",encryptedMsg)

        decryptedMsg=decrypt_ECC(encryptedMsg,privKey)
        print(decryptedMsg)
        writeDecryptedData(decryptedMsg)

        print('Text Data encrypted and saved to MongoDB successfully')
    except Exception as e:
        print('Error:', str(e))

def writeDecryptedData(decryptedMsg):
    path = "PythonDecrypt\DecryptedFile.txt"  
    decryptedMsg=decryptedMsg.decode('utf-8')
    try:
        with open(path, "a") as file:
            file.write(decryptedMsg[1:])
        print("Decrypted data has been written to the file successfully.")
    except Exception as e:
        print("Error:", str(e))

if __name__ == '__main__':
 
    with open('PythonEncryptData\TextEncrypt\\TExt.txt', 'rb') as file:
        msg = file.read()
        encrypt_and_save_to_mongodb(msg)
   
