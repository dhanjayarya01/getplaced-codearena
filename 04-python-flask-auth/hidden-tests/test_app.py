import pytest
from app import app, users

@pytest.fixture
def client():
    app.config['TESTING'] = True
    users.clear() # Reset DB before each test
    with app.test_client() as client:
        yield client

def test_register_creates_user(client):
    rv = client.post('/register', json={
        'username': 'testuser',
        'password': 'mypassword123'
    })
    assert rv.status_code == 201
    
    # Check if the password was hashed! (It shouldn't be plain text)
    stored_pw = users.get('testuser')
    assert stored_pw is not None
    assert stored_pw != 'mypassword123', "Password is still stored in plain text! You must hash it."
    assert stored_pw.startswith('scrypt:') or stored_pw.startswith('pbkdf2:'), "Password doesn't look like a valid hash."

def test_login_success(client):
    # Register first
    client.post('/register', json={
        'username': 'logintest',
        'password': 'securepassword'
    })
    
    # Then try to login
    rv = client.post('/login', json={
        'username': 'logintest',
        'password': 'securepassword'
    })
    
    assert rv.status_code == 200, "Login failed. Did you fix the check_password_hash logic?"
    assert b"Login successful" in rv.data

def test_login_failure(client):
    client.post('/register', json={
        'username': 'logintest',
        'password': 'securepassword'
    })
    
    rv = client.post('/login', json={
        'username': 'logintest',
        'password': 'wrongpassword'
    })
    
    assert rv.status_code == 401
    assert b"Invalid credentials" in rv.data
