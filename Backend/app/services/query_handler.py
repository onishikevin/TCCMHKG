import os
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('multi-qa-distilbert-cos-v1')


#Função que seleciona as entidades da pergunta(tamanho > 3)
def get_surface_entities(query, graph):
  # Define as colunas em que deseja fazer a busca
  search_columns = ['Subject', 'Object']
  # Cria uma lista de palavras-chave a partir da pergunta
  key_word = query.split()
  key_words = []
  for element in key_word:
    if len(element) > 3:
      key_words.append(element)
  # Faz a busca no grafo pelas entidades
  results = []
  for search in search_columns:
    for index, row in graph.iterrows():
        for word in key_words:
            if word.lower() in str(row[search]).lower() or str(row[search]).lower() in  word.lower():
                results.append(row[search])

  results = list(set(results))
  return results

def get_link(surface_entity, triples):
  # Filtramos as triplas pegando apenas as que possuem as entidades como objeto ou sujeito
  filtered_triples_subject = [triple for triple in triples if (triple[0] == surface_entity )]
  filtered_triples_object = [triple[::-1] for triple in triples if (triple[2] == surface_entity)]
  filtered_triples_subject += filtered_triples_object
  # Implementação para obter o link de uma entidade de superfície
  threshold_triples = set(filtered_triples_subject)
  return threshold_triples

#Essa função retorna todas as triplas que temos no grafo
def get_triples(graph):
  #Leitura do grafo e seleção das colunas pertinentes
  triples_dataset = graph[['Subject','Relation','Object']]
  #Criação das triplas
  triples=[]
  for index, row in triples_dataset.iterrows():
      triples.append((row['Subject'], row['Relation'], row['Object']))
  return triples

# Define uma função para calcular a similaridade do cosseno
def calc_cosine_similarity_predicate(path_enc, query_enc):
  sentences = []
  if isinstance(query_enc,list):
    delimitador = " "
    query_enc = delimitador.join(query_enc)
  sentences.append(query_enc)
  sentences.append(" ".join(path_enc[1::2]))
  #sentence_embeddings = bert(sentences)
  sentence_embeddings = model.encode(sentences)
  arr = cosine_similarity(sentence_embeddings[0].reshape(1,-1), sentence_embeddings[1].reshape(1,-1))
  # print(path_enc, arr[0][0])
  return arr[0][0]

# Define uma função para podar P com base na similaridade do cosseno com um tamanho de feixe B
def prune_paths(P, qenc, beam_size):
  # Implementação para podar P com base na similaridade do cosseno com um tamanho de feixe B
  # Caso o total de caminhos B não tenha sido ultrapassado, retorna o set de caminhos sem alterações
  P = [list(t) for t in set(tuple(path) for path in P)]
  if len(P) <= beam_size:
    return P
  # Caso contrário faz a poda, armazenando as cosseno-similaridades em um dicionário
  else:
    cossimilarity = []
    for path in P:
      similarity =  (path,qenc)
      cossimilarity.append((path, similarity))
    cossimilarity = sorted(cossimilarity, key=lambda x: x[1], reverse=True)
    # Procedimento de poda,enquanto o número de feixes não for o desejado remove a menor cosseno-similaridade do Set
    while len(P) > beam_size:
        aux = cossimilarity[-1]
        P.remove(aux[0])
        cossimilarity.pop()

  return P

def get_anwser(k, beam_size, number_of_hops, seed_surface_entities, paths, query, triples):
  #Fazemos uma iteração para cada número pré definido de hops
  for hop in range(number_of_hops):
    # Se não temos caminhos, para cada entidade de superfície seed i, criamos um caminho novo
    if not(paths):
      for seed in seed_surface_entities:
        for connected_surface_entity in get_link(seed, triples):
          path = [ connected_surface_entity[0], connected_surface_entity[1], connected_surface_entity[2]]
          paths.append(path)
      paths = prune_paths(paths, query, beam_size)
    else:
      new_paths = []
      # Para cada caminho p em P, faça o seguinte:
      for path in paths:
          # Obtenha a última entidade de superfície em p
          last_surface_entity = path[-1]
          # Para cada entidade de superfície conectada a last_surface_entity, pega os links:
          for connected_surface_entity in get_link(last_surface_entity, triples):
            if(connected_surface_entity[2] != path[-3]):
                new_path = path + [ connected_surface_entity[1], connected_surface_entity[2]]
                new_paths.append(new_path)
      paths += prune_paths(new_paths, query, beam_size)

  # Retorna o conjunto de caminhos final
  top_k = sorted(paths, key=lambda path: calc_cosine_similarity_predicate(path, query), reverse=True)[:k]
  return top_k

def process_query(query, k=5, number_of_hops=2):
  grafo_path = os.path.join(os.path.dirname(__file__), '../data/grafo.csv')
  grafo = pd.read_csv(grafo_path)
  triples = get_triples(grafo)
  paths = []
  beam_size = 10
  seed_surface_entities = get_surface_entities(query, grafo)
  return get_anwser(k, beam_size, number_of_hops, seed_surface_entities, paths, query, triples)
