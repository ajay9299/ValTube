#!/bin/bash

# Setup Vault with JWT keys

echo "🔐 Setting up Vault..."

# Step 1: Copy keys to vault container
echo "📋 Copying keys to Vault container..."
docker cp /Users/vibhorsoni/Documents/youtube/ValTube/private.key vault:/tmp/private.key
docker cp /Users/vibhorsoni/Documents/youtube/ValTube/public.key vault:/tmp/public.key

# Step 2: Execute commands in Vault container
echo "🔑 Configuring Vault..."
docker exec -it vault sh -c "
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=root

# Login with root token (already authenticated in dev mode)
echo '✅ Authenticated with root token'

# Enable KV v2 engine if not already enabled
vault secrets enable -path=secret kv-v2 2>/dev/null || echo '⚠️  KV v2 already enabled'

# Store JWT keys
echo '📝 Storing JWT keys in Vault...'
vault kv put secret/jwt privateKey=@/tmp/private.key publicKey=@/tmp/public.key

# Verify
echo '✔️  Verifying stored keys...'
vault kv get secret/jwt

echo '✅ Vault setup complete!'
"

echo "🎉 Done!"
