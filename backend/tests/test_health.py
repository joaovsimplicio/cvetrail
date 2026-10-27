from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok():
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_health_db_hides_error_details_when_database_is_down():
    response = client.get("/api/health/db")

    assert response.status_code == 503
    assert response.json() == {"detail": "database unavailable"}
