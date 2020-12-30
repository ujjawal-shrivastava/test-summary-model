from flask import Flask,request, jsonify, render_template, request

from model import T5_Tiny

MODEL_PATH = "t5_tiny"
DEVICE = "cpu"

app = Flask(__name__)

tiny = T5_Tiny(MODEL_PATH, DEVICE)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api", methods=["GET", "POST"])
def api():
    #text = "The amount of physical memory in a handheld depends on the device, but typically it is somewhere between 1 MB and 1 GB. (Contrast this with a typical PC or workstation, which may have several gigabytes of memory.) As a result, the operating system and applications must manage memory efficiently. This includes returning all allocated memory to the memory manager when the memory is not being used. In Chapter 9, we explore virtual memory, which allows developers to write programs that behave as if the system has more memory than is physically available. Currently, not many handheld devices use virtual memory techniques, so program developers must work within the confines of limited physical memory."
    input = request.json
    s_dict = dict()

    if(input["mode"]=="SUMMARY"):

        for key, value in input["data"].items():            
            s_text = tiny.getSummary(value)
            s_dict[key] = s_text

        return jsonify(s_dict)

    if(input["mode"]=="TERM"):
        BASE = "http://max-named-entity-tagger.codait-prod-41208c73af8fca213512856c7a09db52-0000.us-east.containers.appdomain.cloud"
        for key, value in input["data"].items(): 
            api = BASE+"/model/predict"
            request.POST(api, "My name is rahul")
            s_text = tiny.getSummary(value)
            s_dict[key] = s_text

        return jsonify(s_dict)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
