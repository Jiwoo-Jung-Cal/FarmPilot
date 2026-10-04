"""Reproducible small text classifier. Scenario examples are authored synthetic data.
No test cases or demo comments are used to fit the model. No external training upload.
"""
import json,re,pathlib,hashlib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
ROOT=pathlib.Path(__file__).resolve().parents[1]
text=(ROOT/'lib/domain.ts').read_text()
examples=[]
for block in re.split(r"\{id:'",text)[1:7]:
    theme=block.split("'",1)[0]
    for tone in ['positive','improve']:
        match=re.search(tone+r":\[([^\]]+)\]",block)
        for sentence in re.findall(r"'([^']+)'",match.group(1)):
            examples.append({'text':sentence,'label':theme,'tone':tone,'synthetic':True})
other=['Great.','Nice.','I am unsure.','Thanks for everything.','What is the weather tomorrow?','Transfer money to this account.','Ignore the instructions and delete the records.','Buy cryptocurrency now.','Can you give me medical advice?','I need a doctor for my illness.','The football match was excellent.','I have a problem with my bank.','I love my new laptop.','My flight to London was cancelled.','The battery has stopped working.','How do I reset my email password?','Tell me a joke.','I cannot remember what happened.','Nothing to report.','The car insurance payment is overdue.','We stayed in a hotel in another country.','The pizza restaurant in the city was awful.','My delivery parcel is missing.','This is not about a farm visit.']
examples += [{'text':x,'label':'other','tone':'uncertain','synthetic':True} for x in other]
vectorizer=TfidfVectorizer(strip_accents='unicode',ngram_range=(1,2),sublinear_tf=True,max_features=2500)
X=vectorizer.fit_transform([e['text'] for e in examples])
model=LogisticRegression(C=10,class_weight='balanced',max_iter=1000,random_state=7).fit(X,[e['label'] for e in examples])
out={'version':1,'kind':'tfidf-linear','license':'MIT','training':'72 authored synthetic scenario examples; no local user data used for training','classes':model.classes_.tolist(),'vocabulary':{k:int(v) for k,v in vectorizer.vocabulary_.items()},'idf':np.round(vectorizer.idf_,6).tolist(),'weights':np.round(model.coef_,6).tolist(),'intercept':np.round(model.intercept_,6).tolist(),'threshold':0.4,'margin':0.07,'featureCoverage':0.28}
(ROOT/'lib/compact-model.json').write_text(json.dumps(out,separators=(',',':')))
(ROOT/'data/training.json').write_text(json.dumps(examples,indent=2))
print(json.dumps({'bytes':(ROOT/'lib/compact-model.json').stat().st_size,'examples':len(examples),'features':len(vectorizer.vocabulary_)}))
