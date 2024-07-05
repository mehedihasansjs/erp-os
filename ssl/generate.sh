#!/bin/bash

# Define variables
DOMAIN="localhost"
COMMON_NAME=$DOMAIN
COUNTRY="BD"
STATE="Dhaka"
LOCALITY="Dhaka"
ORGANIZATION_NAME="My Company"
ORGANIZATIONAL_UNIT_NAME="IT"
EMAIL="developer@localhost.com"

# Step 1: Generate a Private Key
openssl genrsa -out $DOMAIN.key 2048

# Step 2: Generate a CSR (Certificate Signing Request)
openssl req -new -key $DOMAIN.key -out $DOMAIN.csr -subj "/C=$COUNTRY/ST=$STATE/L=$LOCALITY/O=$ORGANIZATION_NAME/OU=$ORGANIZATIONAL_UNIT_NAME/CN=$COMMON_NAME/emailAddress=$EMAIL"

# Step 3: Generate a Self-Signed Certificate
openssl x509 -req -days 365 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt

echo "Certificate generated successfully."
