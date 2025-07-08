from bs4 import BeautifulSoup
import csv

def verify(srcdir: str, rounds: int, year: int) -> bool:
    """
    Verify the integrity of the scripts and data files.
    This function checks for the presence of required files and their expected content.
    """
    import os

    required_files = [
        'courses.py',
        'colleges.py',
        'colleges_state.csv'
    ]

    for file in required_files:
        if not os.path.exists(file):
            print(f"Missing required file: {file}")
            return False

    print("All required code files are present.")

    for i in range(1, rounds + 1):
        htmlfilename = f"{srcdir}/data_{year}_{i}.html"
        if not os.path.exists(htmlfilename):
            print(f"Missing HTML file for round {i}: {htmlfilename}")
            return False

    # Verifying colleges_state.csv
    html = open(f"{srcdir}/data_{year}_1.html").read()
    parsed_html = BeautifulSoup(html,"html.parser")

    contents = [list(filter(lambda l: not l=="\n" ,dat)) for dat in [line.contents for line in parsed_html.find_all('tr')]] # type: ignore
    contents_parsed = [[d.contents for d in content] for content in contents] # type: ignore

    quota=set()
    seat_type=set()
    gender=set()

    college_name=set()
    college_name_verified=set()
    college_state={}
    # Read college state mapping from CSV file
    for d in csv.reader(open('colleges_state.csv', 'r'), delimiter='|'):
        if len(d) != 2:
            raise ValueError(f"Invalid entry in colleges_state.csv: {d}")
        else:
            college_state[d[0].strip()] = d[1].strip()
    
    for line in contents_parsed[1:]:
        name=line[0][0]
        college_name.add(name)
        quota.add(line[2][0])
        seat_type.add(line[3][0])
        gender.add(line[4][0])

    for c in college_name:
        name=c.strip()
        if name in college_state:
            college_name_verified.add(name)
        else:
            print(f"College name '{name}' not found in college state mapping.")
            return False
    
    if not len(college_name) == len(college_state):
        print("Mismatch between number of colleges and states. Please check 'colleges_state.csv'.")
        return False

    return True