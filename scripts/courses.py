from bs4 import BeautifulSoup
import csv
        
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



def generate_cutoffs_csv(htmlfilename: str, collegescsvfilename: str, year: int, round_no: int, dryrun: bool = True, outdir: str = ".", start: int = 1):
    """Generate a CSV file with cutoffs for a given year and round.
    Args:
        htmlfilename (str): The name of the HTML file containing cutoff data.
        collegescsvfilename (str): The name of the CSV file containing college names and IDs.
        year (int): The year for which cutoffs are being generated.
        round_no (int): The round number for which cutoffs are being generated.
        dryrun (bool): If True, do not write to file, just print the data.
        outdir (str): Output directory for the generated CSV file.
    """
    html = open(htmlfilename).read()
    parsed_html = BeautifulSoup(html,"html.parser")

    contents = [list(filter(lambda l: not l=="\n" ,dat)) for dat in [line.contents for line in parsed_html.find_all('tr')]] # type: ignore
    contents_parsed = [[d.contents for d in content] for content in contents] # type: ignore

    college_names=[]
    college_ids=[]

    with open(collegescsvfilename, 'r') as f:
        reader = csv.reader(f, delimiter='|')
        next(reader)  # Skip header
        for row in reader:
            college_names.append(row[1].strip())
            college_ids.append(int(row[0].strip()))

    def college_id(name):
        if name.strip() in college_names:
            return college_ids[college_names.index(name.strip())]
        else:
            raise ValueError(f"College name '{name.strip()}' not found in college names list.")

    # Example of contents_parsed:
    # [['Indian Institute of Technology Bhubaneswar'], ['Civil Engineering (4 Years, Bachelor of Technology)'], ['AI'], ['Open'], ['Gender-Neutral'], ['10063'], ['13957']]

    i=start
    res=[["id","course_name","college_id","year","round","seat_type","gender","rank_type","opening_rank","closing_rank"]]
    for c in contents_parsed[1:]:
        college_name=c[0][0].strip()
        if not c[5][0].strip().endswith('P') and not c[6][0].strip().endswith('P'):
            res.append([
                i,
                c[1][0].strip(),
                college_id(college_name),
                year,
                round_no,
                seat_type(c[3][0].strip()),
                c[4][0].strip(),
                c[2][0].strip(),
                int(c[5][0].strip() if not c[5][0].strip().endswith('.0') else c[5][0].strip()[:-2]),
                int(c[6][0].strip() if not c[6][0].strip().endswith('.0') else c[6][0].strip()[:-2])
                ]) # type: ignore
            i+=1
        # else:
        #     print(f"---Skipping: {c[5][0].strip()}\t{c[6][0].strip()}")

    # print(res[:3])  # Print first 3 rows for verification

    if not dryrun:
        with open(f'{outdir}/cutoffs_{year}_{round_no}.csv', 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(res)
            
        print(f"Cutoffs data written for year {year}, round {round_no}.")

    return i