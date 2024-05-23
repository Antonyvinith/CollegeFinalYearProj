from pymongo import MongoClient
import binascii
import hashlib, secrets, binascii
from aes_ecc import encrypt_ECC, curve,decrypt_ECC

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.TextData
encryptedMsg=""

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
            'authTag': binascii.hexlify(encryptedMsg[2]).decode(),
            'ciphertextPubKey': binascii.hexlify(encryptedMsg[3])
        }

     
        collection.insert_one(encryptedMsgObj)
        print("Data Encrypted",encryptedMsg)

        print("Decrypted data",str(decrypt_ECC(encryptedMsg,privKey).decode('utf-8')))
        decryptedMsg=str(decrypt_ECC(encryptedMsg,privKey).decode('utf-8'))


        print('Text Data encrypted and saved to MongoDB successfully')
    except Exception as e:
        print('Error:', str(e))


if __name__ == '__main__':
 
    msg = b'Text to be encrypted by ECC public key and ' \
      b'decrypted by its corresponding ECC private key'
    encrypt_and_save_to_mongodb(msg)
