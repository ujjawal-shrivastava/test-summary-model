import requests

import re
import random
import wikipedia

BASE = "http://max-named-entity-tagger.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud"
api = BASE+"/model/predict"
def preProcess(text):
    text = text.lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('\n', '', text)
    return text

text = "Narendra Damodardas Modi (Gujarati pronunciation: [ˈnəɾendrə dɑmodəɾˈdɑs ˈmodiː] (About this soundlisten); born 17 September 1950) is an Indian politician serving as the 14th and current Prime Minister of India since 2014. He was the Chief Minister of Gujarat from 2001 to 2014 and is the Member of Parliament for Varanasi. Modi is a member of the Bharatiya Janata Party (BJP) and of the Rashtriya Swayamsevak Sangh (RSS), a Hindu nationalist volunteer organisation. He is the first prime minister outside of the Indian National Congress to win two consecutive terms with a full majority and the second to complete more than five years in office after Atal Bihari Vajpayee."

r = requests.post(api, json={
  "text": text})


tags = np.array(r.json()["prediction"]["tags"])
terms = np.array(r.json()["prediction"]["terms"])
a=[]
b=[]
#print(set(terms[np.where(tags=="I-PER") or np.where(tags=="B-PER") or np.where(tags=="B-GEO") or np.where(tags=="I-GEO") or np.where(tags=="B-GPE") or np.where(tags=="I-GPE") or np.where(tags=="I-ORG") or np.where(tags=="B-ORG")]))
for index, value in enumerate(tags):
    if (value!="O") and (value!="I-TIM")and (value!="B-TIM"):
        a.append(tags[index]) 
        b.append(terms[index]) 

for each in set(b):
    try:
       print(f"{each} : {wikipedia.summary(each, sentences=2)} : {wikipedia.page(each).url} \n")
    except wikipedia.exceptions.DisambiguationError as e:
        s = random.choice(e.options)
        try:
            print(f"{s} : {wikipedia.summary(s, sentences=2)} : {wikipedia.page(s).url}\n")
        except wikipedia.exceptions.DisambiguationError as e:
            s = random.choice(e.options)
            print(f"{s} : {wikipedia.summary(s, sentences=2)} : {wikipedia.page(s).url}\n")