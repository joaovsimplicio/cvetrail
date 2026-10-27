import os

# Port 1 has nothing listening, so tests never touch a real database by accident.
os.environ["DATABASE_URL"] = "postgresql+psycopg://test:test@127.0.0.1:1/test"
