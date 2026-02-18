from pymongo import MongoClient
from django.db import connection

class MacapaService:
    def import_contacts(self, contacts):
        count = 0
        with connection.cursor() as cursor:
            for c in contacts:
                name = c['name'].upper()
                phone = c['cellphone'] 
                
                sql = "INSERT INTO contacts (name, cell_phone, email) VALUES (%s, %s, %s)"
                cursor.execute(sql, [name, phone, c.get('email')])
                count += 1
                
        print(f">>> SUCESSO (MySQL): {count} contatos inseridos em Macapá", flush=True)

class VarejaoService:
    def __init__(self):
        uri = "mongodb://admin:password@db-mongo:27017/varejao?authSource=admin"
        self.client = MongoClient(uri)
        self.db = self.client['varejao']

    def import_contacts(self, contacts):

        if contacts:
            formatted_contacts = [dict(c) for c in contacts]
            res = self.db.contacts.insert_many(formatted_contacts)
            print(f">>> SUCESSO: {len(res.inserted_ids)} inseridos", flush=True)