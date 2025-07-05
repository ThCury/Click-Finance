from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter()

@router.get("/painel", response_class=HTMLResponse)
def painel():
    return """
    <html>
        <head>
            <title>Painel de Teste</title>
        </head>
        <body>
            <h1>Rotas disponíveis</h1>
            <ul>
                <li><a href="/api/hello" target="_blank">/api/hello</a></li>
                <li><a href="/api/cotacao/AAPL" target="_blank">/api/cotacao/AAPL</a></li>
                <li><a href="/api/busca/btci" target="_blank">/api/busca/btci</a></li>

            </ul>
            <p>Abra no navegador para testar as rotas.</p>
        </body>
    </html>
    """
