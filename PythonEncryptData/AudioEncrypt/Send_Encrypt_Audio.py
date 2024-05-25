from pymongo import MongoClient
from aes_ecc_audio import encrypt_ECC, curve, audio_to_binary, binary_to_audio,decrypt_ECC
import binascii
import hashlib, secrets, binascii
import os
import uuid

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.Audios

# Load audio from file
audio_file_path = "PythonEncryptData\AudioEncrypt\sample_audio.mp3"
audio_data = audio_to_binary(audio_file_path)

# Generate ECC key pair
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g

# Encrypt the audio data
encrypted_audio = encrypt_ECC(audio_data, pubKey)

# Convert encrypted audio to MongoDB document format
encrypted_audio_doc = {
    'ciphertext': binascii.hexlify(encrypted_audio[0]),
    'nonce': binascii.hexlify(encrypted_audio[1]),
    'authTag': binascii.hexlify(encrypted_audio[2]),
    'ciphertextPubKey': hex(encrypted_audio[3].x) + hex(encrypted_audio[3].y % 2)[2:]
}

# Insert encrypted audio document into MongoDB collection
collection.insert_one(encrypted_audio_doc)

print('Audio encrypted and saved to MongoDB successfully.')

decryptedMsg = decrypt_ECC(encrypted_audio, privKey)
print("decrypted msg:", decryptedMsg)

unique_filename = f"decrypted_audio_{uuid.uuid4().hex}.mp3"
output_path = os.path.join("src", "PythonDecrypt", "Audio", unique_filename)


binary_to_audio(decryptedMsg, output_path)