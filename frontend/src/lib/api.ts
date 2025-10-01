// frontend/src/lib/api.ts

// Define a interface para as opções, estendendo as opções do fetch
interface ApiFetchOptions extends RequestInit {
  // Você pode adicionar tipos personalizados aqui se necessário
}

// A URL base da sua API Django
const API_BASE_URL = "http://127.0.0.1:8000/api";

/**
 * Um wrapper para a função fetch que anexa automaticamente o token de autenticação
 * e define os cabeçalhos padrão para requisições JSON.
 * @param endpoint O endpoint da API a ser chamado (ex: '/users/me/')
 * @param options As opções da requisição (method, body, etc.)
 * @returns A promessa da resposta da API
 */
export const apiFetch = async (endpoint: string, options: ApiFetchOptions = {}) => {
  // Pega o token do localStorage
  const token = localStorage.getItem('authToken');

  // Define os cabeçalhos padrão
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers, // Permite sobrescrever os headers padrão
  };

  // Se o token existir, adiciona ao cabeçalho de Authorization
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  // Monta a URL completa e as opções finais da requisição
  const config: RequestInit = {
    ...options,
    headers,
  };

  // Realiza a chamada fetch para a API
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Lida com erros de resposta
  if (!response.ok) {
    // Tenta extrair uma mensagem de erro do corpo da resposta
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || errorData.error || `Erro ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  // Se a resposta for bem-sucedida, retorna o JSON
  // Verifica se o corpo da resposta não está vazio antes de tentar fazer o parse
  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : {};
};

/**
 * Função para fazer logout, simplesmente removendo o token.
 */
export const logout = () => {
  localStorage.removeItem('authToken');
  // Opcional: redirecionar para a página de login
  window.location.href = '/'; 
};