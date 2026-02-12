# Windows PowerShell 快速启动脚本

Write-Host "🚀 Starting Vidorra Blog with Docker..." -ForegroundColor Green

if (-not (Test-Path ".\docker\.env.docker")) {
    Write-Host "⚠️  .env.docker file not found. Creating from example..." -ForegroundColor Yellow
    Copy-Item ".\docker\.env.docker.example" ".\docker\.env.docker"
    Write-Host "📝 Please edit docker/.env.docker and set your configuration" -ForegroundColor Cyan
    Read-Host "Press Enter to continue..."
}

Write-Host "📦 Starting Docker containers..." -ForegroundColor Cyan
docker-compose -f .\docker\docker-compose.yml --env-file .\docker\.env.docker up -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Services started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Access URLs:" -ForegroundColor Cyan
    Write-Host "   Frontend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Admin:     http://localhost:5173" -ForegroundColor White
    Write-Host "   Server:    http://localhost:3001/api" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 View logs:" -ForegroundColor Cyan
    Write-Host "   docker-compose -f .\docker\docker-compose.yml logs -f" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Failed to start services. Check the logs above." -ForegroundColor Red
}
