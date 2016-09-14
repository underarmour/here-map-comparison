#!/usr/bin/env python

import json as json
from pprint import pprint


                       
with open('simplelist.json') as data_file:    
    data = json.load(data_file)

with open('countries-iso3.json') as data_file2:    
    comp_data = json.load(data_file2)
    
pprint(data)

new_data = {}
for key in data:
    value = data[key]
    value.update({'iso3':comp_data.get(key)})

with open('simplelistupdated.json', 'w') as outfile:    
    json.dump(data, outfile)