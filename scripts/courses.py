from bs4 import BeautifulSoup
import csv

html = open("raw-round-1-2025.html").read()
parsed_html = BeautifulSoup(html,"html.parser")

contents = [list(filter(lambda l: not l=="\n" ,dat)) for dat in [line.contents for line in parsed_html.find_all('tr')]]
contents_parsed = [[d.contents for d in content] for content in contents]

college_names=[]
college_ids=[]

with open('colleges.csv', 'r') as f:
    reader = csv.reader(f, delimiter='|')
    next(reader)  # Skip header
    for row in reader:
        college_names.append(row[1].strip())
        college_ids.append(int(row[0].strip()))
def seat_type(s):
    if s == 'Open':
        return "open"
    elif s == 'Open (PwD)':
        return "open_pwd"
    elif s == 'EWS':
        return "ews"
    elif s == 'EWS (PwD)':
        return "ews_pwd"
    elif s == 'OBC-NCL':
        return "obc"
    elif s == 'OBC-NCL (PwD)':
        return "obc_pwd"
    elif s == 'SC':
        return "sc"
    elif s == 'SC (PwD)':
        return "sc_pwd"
    elif s == 'ST':
        return "st"
    elif s == 'ST (PwD)':
        return "st_pwd"
    else:
        raise ValueError(f"Unknown seat type: {s}")

def college_id(name):
    if name.strip() in college_names:
        return college_ids[college_names.index(name.strip())]
    else:
        raise ValueError(f"College name '{name.strip()}' not found in college names list.")

# Example of contents_parsed:
# [['Indian Institute of Technology Bhubaneswar'], ['Civil Engineering (4 Years, Bachelor of Technology)'], ['AI'], ['Open'], ['Gender-Neutral'], ['10063'], ['13957']]

i=1
res=[["id","course_name","college_id","year","round","seat_type","gender","rank_type","opening_rank","closing_rank"]]
for c in contents_parsed[1:]:
    college_name=c[0][0].strip()
    if not c[5][0].strip().endswith('P') and not c[6][0].strip().endswith('P'):
        res.append([
            i,
            c[1][0].strip(),
            college_id(college_name),
            2025,
            1,
            seat_type(c[3][0].strip()),
            c[4][0].strip(),
            c[2][0].strip(),
            int(c[5][0].strip() if not c[5][0].strip().endswith('.0') else c[5][0].strip()[:-2]),
            int(c[6][0].strip() if not c[6][0].strip().endswith('.0') else c[6][0].strip()[:-2])
            ])
        i+=1
    else:
        print(f"Skipping: {c[5][0].strip()}\t{c[6][0].strip()}")

print(res[:10])  # Print first 10 rows for verification

with open('cutoffs.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(res)
    
print("Colleges data written to colleges.csv")