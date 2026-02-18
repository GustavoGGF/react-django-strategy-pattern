FROM python:3.11

# 1. Dependências de sistema (essenciais para mysqlclient)
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 2. Atualizar o PIP (Crucial para enxergar o Django 6.0.2)
# Usamos o --default-timeout para mitigar instabilidades de rede no Docker Windows
RUN pip install --upgrade pip --default-timeout=100

COPY ./Docker/requirements.txt .

# 3. Instalação com verbose para você ver exatamente onde ele falha se travar
RUN pip install --no-cache-dir -r requirements.txt --default-timeout=100

COPY ./backend .