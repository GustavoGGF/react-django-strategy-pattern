from pymongo import MongoClient
from django.db import connection

class MacapaService:
    def import_contacts(self, contacts):

        with connection.cursor() as cursor:
            for c in contacts:
                name = c['name'].upper()
                # O seu JSON usa 'cellphone'
                phone = c['cellphone'] 
                
                sql = "INSERT INTO contacts (name, cell_phone, email) VALUES (%s, %s, %s)"
                cursor.execute(sql, [name, phone, c.get('email')])

class VarejaoService:
    def __init__(self):
        # Conecta no container 'db-mongo'
        self.client = MongoClient("mongodb://admin:password@localhost:27017/")
        self.db = self.client['varejao']

    def import_contacts(self, contacts):
        if contacts:
            # Converte os objetos do Graphene em dicionários puramente Python
            formatted_contacts = [dict(c) for c in contacts]

            self.db.contacts.insert_many(formatted_contacts)