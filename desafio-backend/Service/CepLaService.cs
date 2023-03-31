using DesafioBackend.Domain;
using DesafioBackend.Domain.Interfaces.Services;
using Microsoft.Net.Http.Headers;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace DesafioBackend.Service
{
    public class CepLaService : ICepLaService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CepLaService(IHttpClientFactory httpClientFactory) => _httpClientFactory = httpClientFactory;

        public async Task<Endereco> GetEndereco(string cep)
        {
            try
            {
                var httpRequestMessage = new HttpRequestMessage(
            HttpMethod.Get,
            $"http://cep.la/{cep}")
                {
                    Headers =
                {
                    { HeaderNames.Accept, "application/json" },
                }
                };

                var httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    using var contentStream =
                        await httpResponseMessage.Content.ReadAsStreamAsync();

                    var endereco = await JsonSerializer.DeserializeAsync
                        <Endereco>(contentStream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    return endereco;
                }

                return null;
            }
            catch (JsonException)
            {
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
