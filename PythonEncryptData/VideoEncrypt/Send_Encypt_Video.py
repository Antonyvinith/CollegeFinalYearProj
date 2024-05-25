from pymongo import MongoClient
import binascii
import hashlib, secrets
from aes_ecc_video import encrypt_ECC, curve, video_to_binary,decrypt_ECC,binary_to_video
from datetime import datetime
import uuid
import os

client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.Video

video_file_path = "PythonEncryptData\VideoEncrypt\sample_video.mp4"
video_binary = video_to_binary(video_file_path)


privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g


encrypted_msg = encrypt_ECC(video_binary, pubKey)


encrypted_msg_doc = {
    'ciphertext': binascii.hexlify(encrypted_msg[0]),
    'nonce': binascii.hexlify(encrypted_msg[1]),
    'authTag': binascii.hexlify(encrypted_msg[2]),
    'ciphertextPubKey': hex(encrypted_msg[3].x) + hex(encrypted_msg[3].y % 2)[2:]
}


collection.insert_one(encrypted_msg_doc)

print('Video data encrypted and saved to MongoDB successfully.')

decryptedMsg = decrypt_ECC(encrypted_msg, privKey)
print("decrypted msg:", decryptedMsg)

unique_filename = f"OutputVideo_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4"
output_file_path = os.path.join("src","PythonDecrypt", "Videos", unique_filename)
binary_to_video(decryptedMsg, output_file_path)

