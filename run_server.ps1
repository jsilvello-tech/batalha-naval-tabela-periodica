# Servidor Web Local Simples em PowerShell para o Batalha Naval da Tabela Periódica
# Utiliza System.Net.HttpListener do .NET nativo do Windows (sem necessidade de node/python)

param (
    [int]$Port = 8080,
    [string]$Directory = $PSScriptRoot
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host " Servidor do Batalha Naval da Tabela Periódica em Execução" -ForegroundColor Green
    Write-Host " Acesse no seu navegador: $prefix" -ForegroundColor Yellow
    Write-Host " Pressione Ctrl+C para encerrar o servidor." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($urlPath)) {
            $urlPath = "index.html"
        }

        $localPath = Join-Path $Directory $urlPath

        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "application/javascript; charset=utf-8" }
                ".json" { $response.ContentType = "application/json; charset=utf-8" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                ".png"  { $response.ContentType = "image/png" }
                Default { $response.ContentType = "application/octet-stream" }
            }

            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Arquivo nao encontrado: $urlPath")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Erro no servidor: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
}
