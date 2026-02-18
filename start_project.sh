#!/bin/bash

# Entra na pasta backend
cd backend || exit

# Verifica e remove a pasta dist se existir
if [ -d "dist" ]; then
    echo "A pasta 'dist' existe (backend). Removendo..."
    rm -rf "dist"
    echo "Pasta 'dist' removida com sucesso (backend)."
else
    echo "A pasta 'dist' não existe. Nada a fazer."
fi

# Volta para o diretório pai
cd ..

# Entra na pasta frontend
cd frontend || exit

if [ -d "dist" ]; then
    echo "A pasta 'dist' existe (frontend). Removendo..."
    rm -rf "dist"
    echo "Pasta 'dist' removida com sucesso (frontend)."
else
    echo "A pasta 'dist' não existe. Nada a fazer."
fi

# Executa o npm run build (ajustado de dist para build conforme o script original)
echo "Executando 'npm run build' no frontend..."
npm run build

# Move a pasta dist gerada para a pasta backend
echo "Movendo a pasta 'dist' para a pasta backend..."
mv dist ../backend/

# Entra novamente na pasta backend
cd ../backend || exit

# Executa o servidor Django
echo "Iniciando o servidor Django..."
python3 manage.py runserver