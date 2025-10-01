import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Classe base para requisições HTTP
 * @class HttpClient
 */
class HttpClient {
  private instance: AxiosInstance;
  private baseURL: string;

  /**
   * Cria uma instância do HttpClient
   * @param {string} baseURL - URL base da API
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  /**
   * Inicializa os interceptors da requisição e resposta
   * @private
   */
  private initializeInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      config => {
        // Adicionar token de autenticação se existir
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      response => response,
      error => {
        // Tratamento global de erros
        if (error.response) {
          // Erros 4xx/5xx
          console.error('Erro na requisição:', error.response.data);
        } else if (error.request) {
          // A requisição foi feita mas não houve resposta
          console.error('Sem resposta do servidor');
        } else {
          // Erro ao configurar a requisição
          console.error('Erro na configuração da requisição:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Realiza uma requisição GET
   * @template T - Tipo do dado esperado na resposta
   * @param {string} url - Endpoint da API
   * @param {AxiosRequestConfig} [config] - Configurações adicionais do Axios
   * @returns {Promise<T>} Promise com os dados da resposta
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  /**
   * Realiza uma requisição POST
   * @template T - Tipo do dado esperado na resposta
   * @template D - Tipo dos dados enviados no corpo da requisição
   * @param {string} url - Endpoint da API
   * @param {D} data - Dados a serem enviados no corpo da requisição
   * @param {AxiosRequestConfig} [config] - Configurações adicionais do Axios
   * @returns {Promise<T>} Promise com os dados da resposta
   */
  public async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data, config);
    return response.data;
  }

  /**
   * Realiza uma requisição PUT
   * @template T - Tipo do dado esperado na resposta
   * @template D - Tipo dos dados enviados no corpo da requisição
   * @param {string} url - Endpoint da API
   * @param {D} data - Dados a serem enviados no corpo da requisição
   * @param {AxiosRequestConfig} [config] - Configurações adicionais do Axios
   * @returns {Promise<T>} Promise com os dados da resposta
   */
  public async put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data, config);
    return response.data;
  }

  /**
   * Realiza uma requisição DELETE
   * @template T - Tipo do dado esperado na resposta
   * @param {string} url - Endpoint da API
   * @param {AxiosRequestConfig} [config] - Configurações adicionais do Axios
   * @returns {Promise<T>} Promise com os dados da resposta
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url, config);
    return response.data;
  }
}

export default HttpClient;
