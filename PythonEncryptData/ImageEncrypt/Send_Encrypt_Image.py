from pymongo import MongoClient
from aes_ecc_image import encrypt_ECC, curve, image_to_byte_array,decrypt_ECC,decrypt_AES_GCM,byte_array_to_image
import binascii
import hashlib, secrets, binascii
from PIL import Image
import io
import os
import uuid

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client.Data
collection = db.Images

# Load image from file
image_path = "PythonEncryptData\ImageEncrypt\Ghost1.jpg"
image = Image.open(image_path)

# Convert image to byte array
image_bytes = image_to_byte_array(image)

# Generate ECC key pair
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g


encrypted_image = encrypt_ECC(image_bytes, pubKey)


encrypted_image_doc = {
    'ciphertext': binascii.hexlify(encrypted_image[0]),
    'nonce': binascii.hexlify(encrypted_image[1]),
    'authTag': binascii.hexlify(encrypted_image[2]),
    'ciphertextPubKey': hex(encrypted_image[3].x) + hex(encrypted_image[3].y % 2)[2:]
}


collection.insert_one(encrypted_image_doc)

print('Image encrypted and saved to MongoDB successfully.')


decryptedMsg = decrypt_ECC(encrypted_image, privKey)

reconstructed_image = byte_array_to_image(decryptedMsg)



unique_filename = f"decrypted_image_{uuid.uuid4().hex}.jpg"
output_path = os.path.join("src", "PythonDecrypt", "image", unique_filename)


reconstructed_image.save(output_path)
print(f'Reconstructed image saved to {output_path}')

