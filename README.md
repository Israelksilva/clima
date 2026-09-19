# Clima Agora

Aplicativo responsivo de previsão do tempo feito com HTML, CSS e JavaScript.

## Como abrir no VS Code

1. Extraia o arquivo ZIP.
2. Abra a pasta `clima-agora-vscode` no VS Code.
3. Confirme que o Node.js está instalado.
4. Abra o terminal do VS Code nessa pasta.
5. Execute: `node server.js`
6. Abra `http://localhost:3000` no navegador.

O servidor local é necessário para consultar com segurança os avisos oficiais
do INMET, usados como referência pela Defesa Civil. O aplicativo também utiliza
a API Open-Meteo para previsão. Não é necessário cadastrar uma chave.

## Funções

- Clima atual
- Pesquisa por cidade
- Localização do dispositivo
- Previsão para sete dias
- Alertas estimados de chuva intensa, alagamentos e elevação de rios
- Alertas de granizo, neve, ventos fortes, calor extremo e frio intenso
- Avisos oficiais ativos do INMET por município, com instruções da Defesa Civil
- Temperatura, sensação térmica, umidade, vento e probabilidade de chuva
- Layout responsivo e animações climáticas

> Os alertas são estimativas baseadas na previsão da Open-Meteo e não substituem
> os comunicados oficiais. Os avisos do INMET aparecem em uma área separada e
> incluem acesso ao comunicado original.
