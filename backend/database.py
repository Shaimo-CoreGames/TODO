from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Create a database file named 'todos.db'
SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"

# 2. Setup the Engine (connects to the file)
# 'check_same_thread' is only needed for SQLite
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# 3. Create a Session (how we talk to the DB)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create the Base (for our models to inherit from)
Base = declarative_base()

# Dependency to get a DB session for our routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()