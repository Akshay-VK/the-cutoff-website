from bs4 import BeautifulSoup
import csv

def generate_colleges_csv(htmlfilename: str, year: int, outdir: str = ".", dryrun: bool = True):
    """Generate a CSV file with college names, states, and types.
    Args:
        htmlfilename (str): The name of the HTML file containing college data.
        year (int): The year for which colleges are being generated.
        outdir (str): Output directory for the generated CSV file.
        dryrun (bool): If True, do not write to file, just print the data.
    """
    html = open(htmlfilename).read()
    parsed_html = BeautifulSoup(html,"html.parser")

    contents = [list(filter(lambda l: not l=="\n" ,dat)) for dat in [line.contents for line in parsed_html.find_all('tr')]] # type: ignore
    contents_parsed = [[d.contents for d in content] for content in contents] # type: ignore

    # institute|course|quota|seat_type|gender|opening|closing

    quota=set()
    seat_type=set()
    gender=set()

    college_name=set()
    college_state={}
    # Read college state mapping from CSV file
    for d in csv.reader(open('colleges_state.csv', 'r'), delimiter='|'):
        if len(d) != 2:
            raise ValueError(f"Invalid entry in colleges_state.csv: {d}")
        else:
            college_state[d[0].strip()] = d[1].strip()
    # print(college_state)

    def type_of_college(name):
        if 'indian institute of technology' in name.lower():
            return 'IIT'
        elif 'indian institute of information technology' in name.lower():
            return 'IIIT'
        elif 'national institute of technology' in name.lower() or 'indian institute of engineering science and technology' in name.lower():
            return 'NIT'
        else:
            return 'GFTI'

    for line in contents_parsed[1:]:
        name=line[0][0]
        college_name.add(name)
        quota.add(line[2][0])
        seat_type.add(line[3][0])
        gender.add(line[4][0])
        

    print(quota)
    print(seat_type)
    print(gender)

    if not len(college_name) == len(college_state):
        raise ValueError("Mismatch between number of colleges and states. Please check 'colleges_state.csv'.")

    i=1
    print("Total Colleges: ", len(college_name))
    res=[["id","name","state","type"]]
    for c in college_name:
        name=c.strip()
        if name.endswith('"'):
            name = name[1:-1]
        res.append([i,name,college_state[name],type_of_college(name)]) # type: ignore
        i+=1

    if not dryrun:
        with open(f'{outdir}/colleges_{year}.csv', 'w', newline='') as f:
            writer = csv.writer(f, delimiter='|')
            writer.writerows(res)

        print("Colleges data written")