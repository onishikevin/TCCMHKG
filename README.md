# TCCMHKG
Este projeto combina um **frontend em React** (para visualização de grafos, ranking de respostas e chatbot interativo) com um **backend utilizando Flask** (para servir a lógica de resposta e integração com modelos de percorrer grafos de conhecimento). O objetivo é criar um sistema de *Multi-Hop Question Answering* baseado em grafos de conhecimento.

## 🚀 Tecnologias Utilizadas  

### Frontend
- **React** com TypeScript  
- **Material-UI (MUI)**: Para o design e os componentes responsivos.  
- **Reagraph**: Uma biblioteca para visualização dinâmica de grafos.  

### Backend  
- **Flask**: Suporte para APIs REST e podem ser usados para atender às requisições do frontend. Mais leve e flexível para APIs rápidas e específicas.  
- **Python**: Para a integração com bibliotecas de NLP e lógica de perguntas e respostas.  


## 🛠️ Configuração do Ambiente  

### Pré-requisitos  
- **Node.js** (para o frontend)  
- **Python 3.9+** (para o backend)  
- Gerenciador de pacotes (npm/yarn/pip).  

### Acesso ao Backend e Frontend 

1. Clone o repositório e acesse o diretório `Backend`:  
   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd Backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   cd app
   flask run
   ```
   O backend estará disponível em localhost:5000.
2. Para o frontend, acesse o diretório `Frontend/tcc-frontend`
   ```bash
   npm install
   npm run dev
   ```
   O frontend estará disponível em http://localhost:5173/
   
## ✨ Funcionalidades
1. Visualização de Grafos: Um grafo dinâmico que responde a eventos e interações de usuário.

2. Ranking de Respostas: Permite selecionar e visualizar as melhores respostas geradas pelo backend.

3. Chatbot: Um chat interativo com carregamento dinâmico e envio de mensagens ao backend.
