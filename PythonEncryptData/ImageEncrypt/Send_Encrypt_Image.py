from pymongo import MongoClient
from aes_ecc_image import encrypt_ECC, curve, image_to_byte_array
import binascii
import hashlib, secrets, binascii
from PIL import Image
import io

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.Images

# Load image from file
image_path = "Ghost1.jpg"
image = Image.open(image_path)

# Convert image to byte array
image_bytes = image_to_byte_array(image)

# Generate ECC key pair
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g

# Encrypt the image data
encrypted_image = encrypt_ECC(image_bytes, pubKey)

# Convert encrypted image to MongoDB document format
encrypted_image_doc = {
    'ciphertext': binascii.hexlify(encrypted_image[0]),
    'nonce': binascii.hexlify(encrypted_image[1]),
    'authTag': binascii.hexlify(encrypted_image[2]),
    'ciphertextPubKey': hex(encrypted_image[3].x) + hex(encrypted_image[3].y % 2)[2:]
}

# Insert encrypted image document into MongoDB collection
collection.insert_one(encrypted_image_doc)

print('Image encrypted and saved to MongoDB successfully.')
