$port = 8086
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Output "SERVIDOR_INICIADO: http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        
        $fullPath = Join-Path "C:\Users\nixon\Documents\antigravity\nx-projetos\site" $path.TrimStart("/")
        $fullPath = $fullPath -replace '/', '\'
        
        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length
            
            if ($fullPath -match "\.html$") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($fullPath -match "\.css$") { $response.ContentType = "text/css" }
            elseif ($fullPath -match "\.js$") { $response.ContentType = "application/javascript" }
            elseif ($fullPath -match "\.jpg$") { $response.ContentType = "image/jpeg" }
            elseif ($fullPath -match "\.svg$") { $response.ContentType = "image/svg+xml" }
            
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
