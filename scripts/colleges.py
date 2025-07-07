from bs4 import BeautifulSoup
import csv

html = open("raw-round-1-2025.html").read()
parsed_html = BeautifulSoup(html,"html.parser")

contents = [list(filter(lambda l: not l=="\n" ,dat)) for dat in [line.contents for line in parsed_html.find_all('tr')]]
contents_parsed = [[d.contents for d in content] for content in contents]

# institute|course|quota|seat_type|gender|opening|closing

quota=set()
seat_type=set()
gender=set()

college_name=set()

college_state = {
    'Indian Institute of Information Technology Design & Manufacturing Kurnool, Andhra Pradesh':'Andhra Pradesh',
    'Indian Institute of Technology Ropar':'Punjab',
    'Indian Institute of Technology Bhilai':'Chhattisgarh',
    'Indian Institute of Information Technology (IIIT)Kota, Rajasthan':'Rajasthan',
    'North-Eastern Hill University, Shillong':'Meghalaya',
    'Indian Institute of Technology Jodhpur':'Rajasthan',
    'National Institute of Technology, Jamshedpur':'Jharkhand',
    'CU Jharkhand':'Jharkhand',
    'Indian Institute of Information Technology(IIIT) Una, Himachal Pradesh':'Himachal Pradesh',
    'Punjab Engineering College, Chandigarh':'Chandigarh',
    'Institute of Chemical Technology, Mumbai: Indian Oil Odisha Campus, Bhubaneswar':'Odisha',
    'Visvesvaraya National Institute of Technology, Nagpur':'Maharashtra',
    'Indian Institute of Information Technology, Agartala':'Tripura',
    'Indian Institute of Technology Palakkad':'Kerala',
    'North Eastern Regional Institute of Science and Technology, Nirjuli-791109 (Itanagar),Arunachal Pradesh':'Arunachal Pradesh',
    'National Institute of Electronics and Information Technology, Patna (Bihar)':'Bihar',
    'Indian Institute of Information Technology Bhagalpur':'Bihar',
    'National Institute of Technology, Manipur':'Manipur',
    'National Institute of Technology Durgapur':'West Bengal',
    'National Institute of Technology Hamirpur':'Himachal Pradesh',
    'National Institute of Technology, Mizoram':'Mizoram',
    'Indian Institute of Technology Bombay':'Maharashtra',
    'National Institute of Technology, Rourkela':'Odisha',
    'Birla Institute of Technology, Deoghar Off-Campus':'Jharkhand',
    'National Institute of Technology  Agartala':'Tripura',
    'Indian Institute of Information Technology (IIIT), Sri City, Chittoor':'Andhra Pradesh',
    'Shri Mata Vaishno Devi University, Katra, Jammu & Kashmir':'Jammu & Kashmir',
    'National Institute of Technology Sikkim':'Sikkim',
    'Indian Institute of Technology Delhi':'Delhi',
    'National Institute of Technology, Uttarakhand':'Uttarakhand',
    'Indian Institute of Technology Tirupati':'Andhra Pradesh',
    'National Institute of Technology Karnataka, Surathkal':'Karnataka',
    'University of Hyderabad':'Telangana',
    'Institute of Infrastructure, Technology, Research and Management-Ahmedabad':'Gujarat',
    'Indian Institute of Information Technology(IIIT) Kilohrad, Sonepat, Haryana':'Haryana',
    'Puducherry Technological University, Puducherry':'Puducherry',
    'Indian Institute of Technology Dharwad':'Karnataka',
    'Atal Bihari Vajpayee Indian Institute of Information Technology & Management Gwalior':'Madhya Pradesh',
    'Indian Institute of Information Technology (IIIT) Nagpur':'Maharashtra',
    'Dr. B R Ambedkar National Institute of Technology, Jalandhar':'Punjab',
    'Motilal Nehru National Institute of Technology Allahabad':'Uttar Pradesh',
    'Indian Institute of Information Technology, Allahabad':'Uttar Pradesh',
    'Indian Institute of Technology Roorkee':'Uttarakhand',
    'International Institute of Information Technology, Bhubaneswar':'Odisha',
    'Central University of Jammu':'Jammu & Kashmir',
    'Indian Institute of Technology Patna':'Bihar',
    'Malaviya National Institute of Technology Jaipur':'Rajasthan',
    'Indian Institute of Technology Mandi':'Himachal Pradesh',
    'National Institute of Technology Delhi':'Delhi',
    'Indian Institute of Information Technology Lucknow':'Uttar Pradesh',
    'Indian Institute of Technology Goa':'Goa',
    'Indian Institute of Technology Indore':'Madhya Pradesh',
    'National Institute of Technology Goa':'Goa',
    'International Institute of Information Technology, Naya Raipur':'Chhattisgarh',
    'Indian Institute of Engineering Science and Technology, Shibpur':'West Bengal',
    'National Institute of Technology Puducherry':'Puducherry',
    'Institute of Engineering and Technology, Dr. H. S. Gour University. Sagar (A Central University)':'Madhya Pradesh',
    'Indian Institute of Information Technology Bhopal':'Madhya Pradesh',
    'Indian Institute of Information Technology (IIIT) Pune':'Maharashtra',
    'Indian Institute of Handloom Technology(IIHT), Varanasi':'Uttar Pradesh',
    'Birla Institute of Technology, Mesra,  Ranchi':'Jharkhand',
    'Gati Shakti Vishwavidyalaya, Vadodara':'Gujarat',
    'Indian Institute of Information Technology(IIIT) Kalyani, West Bengal':'West Bengal',
    'Central University of Rajasthan, Rajasthan':'Rajasthan',
    'Central University of Haryana':'Haryana',
    'National Institute of Technology, Kurukshetra':'Haryana',
    'Indian Institute of Information Technology(IIIT) Dharwad':'Karnataka',
    'National Institute of Technology, Warangal':'Telangana',
    'Indian Institute of Information Technology(IIIT), Vadodara, Gujrat':'Gujarat',
    'Ghani Khan Choudhary Institute of Engineering and Technology, Malda, West Bengal': 'West Bengal',
    'National Institute of Technology Calicut':'Kerala',
    'J.K. Institute of Applied Physics & Technology, Department of Electronics & Communication, University of Allahabad- Allahabad':'Uttar Pradesh',
    'Gurukula Kangri Vishwavidyalaya, Haridwar':'Uttarakhand',
    'School of Planning & Architecture: Vijayawada':'Andhra Pradesh',
    'National Institute of Electronics and Information Technology, Aurangabad (Maharashtra)':'Maharashtra',
    'National Institute of Technology Nagaland':'Nagaland',
    'National Institute of Food Technology Entrepreneurship and Management, Thanjavur':'Tamil Nadu',
    'Sardar Vallabhbhai National Institute of Technology, Surat':'Gujarat',
    'Indian Institute of Technology Hyderabad':'Telangana',
    'National Institute of Food Technology Entrepreneurship and Management, Kundli':'Haryana',
    'Central institute of Technology Kokrajar, Assam':'Assam',
    'Sant Longowal Institute of Engineering and Technology':'Punjab',
    'INDIAN INSTITUTE OF INFORMATION TECHNOLOGY SENAPATI MANIPUR':'Manipur',
    'Chhattisgarh Swami Vivekanada Technical University, Bhilai (CSVTU Bhilai)':'Chhattisgarh',
    'Indian Institute of Technology Guwahati':'Assam',
    'Indian Institute of Handloom Technology, Salem':'Tamil Nadu',
    'Indian Institute of Information Technology Tiruchirappalli':'Tamil Nadu',
    'Indian Institute of Technology Bhubaneswar':'Odisha',
    'Assam University, Silchar':'Assam',
    'Pt. Dwarka Prasad Mishra Indian Institute of Information Technology, Design & Manufacture Jabalpur':'Madhya Pradesh',
    'Indian Institute of Technology Kanpur':'Uttar Pradesh',
    'National Institute of Technology, Andhra Pradesh':'Andhra Pradesh',
    'Birla Institute of Technology, Patna Off-Campus':'Bihar',
    'School of Engineering, Tezpur University, Napaam, Tezpur':'Assam',
    'Indian Institute of Technology Gandhinagar':'Gujarat',
    'National Institute of Technology, Silchar':'Assam',
    'National Institute of Electronics and Information Technology, Gorakhpur (UP)':'Uttar Pradesh',
    'Indian Institute of Information Technology Guwahati':'Assam',
    'Indian Institute of Technology (BHU) Varanasi':'Uttar Pradesh',
    'Indian Institute of Information Technology Surat':'Gujarat',
    'Rajiv Gandhi National Aviation University, Fursatganj, Amethi (UP)':'Uttar Pradesh',
    'National Institute of Technology Patna':'Bihar',
    'Indian Institute of Technology Kharagpur':'West Bengal',
    'National Institute of Technology Raipur':'Chhattisgarh',
    'National Institute of Electronics and Information Technology, Ajmer (Rajasthan)':'Rajasthan',
    'National Institute of Technology, Srinagar':'Jammu & Kashmir',
    'Indian Institute of Carpet Technology,  Bhadohi':'Uttar Pradesh',
    'Jawaharlal Nehru University, Delhi':'Delhi',
    'Indian Institute of Information Technology, Vadodara International Campus Diu (IIITVICD)':'Diu',
    'Mizoram University, Aizawl':'Mizoram',
    'National Institute of Electronics and Information Technology, Ropar (Punjab)':'Punjab',
    'National Institute of Technology, Tiruchirappalli':'Tamil Nadu',
    'National Institute of Technology Arunachal Pradesh':'Arunachal Pradesh',
    'Indian Institute of Information Technology, Design & Manufacturing, Kancheepuram':'Tamil Nadu',
    'National Institute of Advanced Manufacturing Technology, Ranchi':'Jharkhand',
    'National Institute of Technology Meghalaya':'Meghalaya',
    'Shri G. S. Institute of Technology and Science Indore':'Madhya Pradesh',
    'Maulana Azad National Institute of Technology Bhopal':'Madhya Pradesh',
    'Indian Institute of Information Technology (IIIT) Ranchi':'Jharkhand',
    'Indian Institute of Information Technology(IIIT) Kottayam':'Kerala',
    'Islamic University of Science and Technology Kashmir':'Jammu & Kashmir',
    'Indian Institute of Technology (ISM) Dhanbad':'Jharkhand',
    'School of Planning & Architecture, New Delhi':'Delhi',
    'Indian institute of information technology, Raichur, Karnataka':'Karnataka',
    'School of Studies of Engineering and Technology, Guru Ghasidas Vishwavidyalaya, Bilaspur':'Chhattisgarh',
    'School of Planning & Architecture, Bhopal':'Bhopal',
    'Indian Institute of Technology Madras':'Tamil Nadu',
    'Indian Institute of Technology Jammu':'Jammu & Kashmir',
}

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

for name in college_name:
    type_of_college(name)

print(quota)
print(seat_type)
print(gender)

colleges = contents_parsed[1:]
i=1
print("Total Colleges: ", len(college_name))
res=[["id","name","state","type"]]
for c in college_name:
    name=c.strip()
    if name.endswith('"'):
        name = name[1:-1]
    res.append([i,name,college_state[name],type_of_college(name)])
    i+=1

with open('colleges.csv', 'w', newline='') as f:
    writer = csv.writer(f, delimiter='|')
    writer.writerows(res)

print("Colleges data written to colleges.csv")