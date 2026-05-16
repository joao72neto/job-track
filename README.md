# Job Track 🚀

**Job Track** é uma aplicação moderna desenvolvida com **Next.js** e **Tailwind CSS**, projetada para facilitar o gerenciamento de candidaturas a vagas de emprego de forma organizada e eficiente.

## 📋 Sobre o Projeto

Este projeto nasceu da minha necessidade pessoal de gerenciar as diversas vagas às quais eu me candidatava ao longo do tempo. O que começou como uma ferramenta simples evoluiu naturalmente: fui adicionando filtros, buscas e outras funcionalidades conforme sentia falta de novos recursos durante o uso diário.

Como última grande funcionalidade, integrei a API do Google Drive para sincronização de dados. Isso permitiu acessar o histórico de qualquer lugar de forma automática, eliminando a necessidade de importar e exportar arquivos JSON manualmente para backup.

## 🛠️ Tecnologias Principais

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Biblioteca UI:** [React 19](https://reactjs.org/)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup)
- **Autenticação & Sync:** [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) & [Google Drive API](https://developers.google.com/drive)
- **Persistência:** Browser LocalStorage

## ✨ Funcionalidades

- **Gerenciamento de Vagas:** Adicione, edite, visualize e exclua suas candidaturas de forma intuitiva.
- **Filtros Dinâmicos:** Organize suas vagas por status (Aplicado, Entrevista, Aprovado, Rejeitado, etc.).
- **Busca Integrada:** Encontre rapidamente qualquer candidatura utilizando a barra de busca combinada com os filtros.
- **Status Automático:** O sistema identifica e marca como "Sem resposta" as vagas aplicadas há mais de um mês.
- **Sincronização na Nuvem:** Backup e restauração automática através da sua própria conta do Google Drive.
- **Importação/Exportação:** Opção de exportar e importar seus dados via arquivo JSON para backups manuais.
- **PWA & Modo Escuro:** Suporte nativo a temas claro/escuro e instalação como aplicativo (PWA).

## ⚠️ Nota sobre o Google OAuth

Por ser um projeto pessoal de portfólio, a aplicação **não passou pelo processo de verificação formal do Google**. A verificação exige a propriedade de um domínio oficial e um processo de revisão que não se aplica a este contexto de desenvolvimento.

**O que isso significa na prática:**
Ao tentar fazer login com o Google para usar a sincronização, você verá um aviso informando que o "Google não verificou este app". 
- Para continuar, basta clicar em **"Avançado"** e depois em **"Ir para Job Track (inseguro)"**.
- Seus dados continuam protegidos, pois a aplicação solicita apenas o escopo `drive.file`, tendo acesso exclusivamente aos arquivos que ela mesma cria no seu Drive.

## 💻 Deploy

A aplicação é puramente front-end e o deploy foi realizado na **Vercel**. Você pode acessá-la pelo link abaixo:

🔗 [https://job-track-jsn.vercel.app/](https://job-track-jsn.vercel.app/)

*Dica: O App suporta PWA, então você pode instalá-lo diretamente através do seu navegador.*

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/job-track.git
cd job-track
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto e adicione seu Client ID do Google:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id_aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---
Desenvolvido por **João Salvador Neto**
