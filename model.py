import re
import torch
import json 
from transformers import T5Tokenizer, T5ForConditionalGeneration

class T5_Tiny:

    def __init__(self, path, device):

        self.model = T5ForConditionalGeneration.from_pretrained(path)
        self.tokenizer = T5Tokenizer.from_pretrained(path)
        self.device = torch.device(device)

    def preProcess(self, text):
        text = text.lower()
        text = re.sub('\[.*?\]', '', text)
        text = re.sub('https?://\S+|www\.\S+', '', text)
        text = re.sub('\n', '', text)
        return text

    def getSummary(self, text):
        
        text = self.preProcess(text)
        t5_prepared_data = "summarize: "+text
        tokenized_text = self.tokenizer.encode(t5_prepared_data, return_tensors="pt").to(self.device)

        summary_ids = self.model.generate(
            tokenized_text, 
            temperature=0.6,
            num_beams=5, 
            no_repeat_ngram_size=2, 
            max_length=200)

        output = self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return output