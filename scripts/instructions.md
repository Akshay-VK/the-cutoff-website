### This is how you are supposed to generate CSV tables for different rouds/years

- **Getting raw HTML:** Query the entire list from the JOSAA webbsite, selecting "ALL" for everything.
- **Saving the raw HTML:** Open inspector and copy the table element as HTML. Save this as a HTML file with the format data_<year>_<round>.html
- **Making changes to the generators:** Run the generator.py file and pass all arguments.
- **Open the DB editor and upload the CSV files**