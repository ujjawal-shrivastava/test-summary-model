from flask import Flask,request, jsonify, render_template, request
import json
from model import T5_Tiny
import random
import wikipedia
import requests
import numpy as np

MODEL_PATH = "t5-small"
DEVICE = "cpu"

app = Flask(__name__)

tiny = T5_Tiny(MODEL_PATH, DEVICE)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def api():
    #text = "The amount of physical memory in a handheld depends on the device, but typically it is somewhere between 1 MB and 1 GB. (Contrast this with a typical PC or workstation, which may have several gigabytes of memory.) As a result, the operating system and applications must manage memory efficiently. This includes returning all allocated memory to the memory manager when the memory is not being used. In Chapter 9, we explore virtual memory, which allows developers to write programs that behave as if the system has more memory than is physically available. Currently, not many handheld devices use virtual memory techniques, so program developers must work within the confines of limited physical memory."
    mode = request.form["mode"]
    data = json.loads(request.form["data"])

    summary = dict()
    highterms = dict()

    if(mode=="SUMMARY" or mode=="BOTH"):
        for key, value in data.items():           
            summary[key] = tiny.getSummary(value)
    
    if(mode=="TERMS" or mode=="BOTH"):
        BASE = "http://max-named-entity-tagger.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud"
        for key, value in data.items():
            subterms = []           #list of terms in each para
            api = BASE+"/model/predict"
            r = requests.post(api, json={"text": value})

            tags = np.array(r.json()["prediction"]["tags"])
            terms = np.array(r.json()["prediction"]["terms"])
            b=[]

            for index, value in enumerate(tags):
                if (value!="O") and (value!="I-TIM")and (value!="B-TIM"):
                    b.append(terms[index]) 

            for each in set(b):
                try:
                    subterms.append({
                        "word":each,
                        "summary":wikipedia.summary(each, sentences=2),
                        "url":wikipedia.page(each).url
                    })
                    print(f"{each} : {wikipedia.summary(each, sentences=2)} : {wikipedia.page(each).url} \n")
                except wikipedia.exceptions.DisambiguationError as e:
                    s = random.choice(e.options)
                    try:
                        subterms.append({
                        "word":s,
                        "summary":wikipedia.summary(each, sentences=2),
                        "url":wikipedia.page(each).url
                        })
                        print(f"{s} : {wikipedia.summary(s, sentences=2)} : {wikipedia.page(s).url}\n")
                    except wikipedia.exceptions.DisambiguationError as e:
                        s = random.choice(e.options)
                        subterms.append({
                        "word":s,
                        "summary":wikipedia.summary(each, sentences=2),
                        "url":wikipedia.page(each).url
                        })
                        print(f"{s} : {wikipedia.summary(s, sentences=2)} : {wikipedia.page(s).url}\n")

            highterms[key]= subterms #adding terms per para

    return jsonify({
            "original":data,
            "mode":mode,
            "summary":summary,
            "terms":highterms
        })

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8000)
