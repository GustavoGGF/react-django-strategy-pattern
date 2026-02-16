# Entra na pasta backend
Set-Location -Path "backend"

# Verifica e remove a pasta dist se existir
if (Test-Path -Path "dist") {
    Write-Host "A pasta 'dist' existe(backend). Removendo..."
    Remove-Item -Recurse -Force "dist"
    Write-Host "Pasta 'dist' removida com sucesso (backend)."
} else {
    Write-Host "A pasta 'dist' não existe. Nada a fazer."
}

# Volta para o diretório pai
Set-Location -Path ".."

# Entra na pasta frontend
Set-Location -Path "frontend"
if (Test-Path -Path "dist") {
    Write-Host "A pasta 'dist' existe (frontend). Removendo..."
    Remove-Item -Recurse -Force "dist"
    Write-Host "Pasta 'dist' removida com sucesso (frontend)."
} else {
    Write-Host "A pasta 'dist' não existe. Nada a fazer."
}
# Executa o npm run dist
Write-Host "Executando 'npm run dist' no frontend..."
npm run build

# Move a pasta dist gerada para a pasta backend
Write-Host "Movendo a pasta 'dist' para a pasta backend..."
Move-Item -Path "dist" -Destination "..\backend"

# Entra novamente na pasta backend
Set-Location -Path "..\backend"

# Executa o servidor Django
Write-Host "Iniciando o servidor Django..."
python .\manage.py runserver
