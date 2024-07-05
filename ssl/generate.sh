#!/bin/bash

# Step 1: Generate a Private Key
openssl genrsa -out server.key 2048

# Step 2: Generate a CSR (Certificate Signing Request)
openssl req -new -key server.key -out server.csr

# Step 3: Generate a Self-Signed Certificate
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

echo "Certificate generated successfully."
