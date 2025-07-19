def generator(srcdir: str, year_from: int, year_to: int, rounds:int, outdir: str, dryrun: bool = True):
    """
    Generate the colleges and cutoffs CSV files.
    
    Args:
        srcdir (str): Source directory containing HTML files.
        year_from (int): Year from which to generate data.
        year_to (int): Year to which to generate data.
        rounds (int): Number of rounds to process (1-N).
        outdir (str): Output directory for generated CSV files (DO NOT USE / AT THE END).
        dryrun (bool): If set, do not write to file, just dryrun the whole thing.
    """
    from verifier import verify
    from colleges import generate_colleges_csv
    from courses import generate_cutoffs_csv

    for year in range(year_from,year_to+1):
        print(f"Processing year: {year}")
        if not verify(srcdir, rounds, year):
            print("Verification failed. Please check the required files and their content.")
            return

    print("Verification successful. Proceeding with CSV generation.")

    # Generate colleges CSV
    generate_colleges_csv(f"{srcdir}/data_{year_to}_1.html", outdir=outdir, dryrun=dryrun)

    # Generate cutoffs CSV
    index=1
    for year in range(year_from, year_to + 1):
        print(f"Generating cutoffs for year: {year}")
        for i in range(1, rounds + 1):
            htmlfilename = f"{srcdir}/data_{year}_{i}.html"
            index = generate_cutoffs_csv(htmlfilename, f"{outdir}/colleges.csv", year=year, round_no=i, dryrun=dryrun, outdir=outdir, start=index)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate colleges and cutoffs CSV files.")
    parser.add_argument('--srcdir', type=str, required=True, help='Source directory containing HTML files.')
    parser.add_argument('--outdir', type=str, default='.', help='Output directory for generated CSV files (DO NOT USE / AT THE END).')
    parser.add_argument('--year_from', type=int, required=True, help='Year from which to generate data.')
    parser.add_argument('--year_to', type=int, required=True, help='Year to which to generate data.')
    parser.add_argument('--rounds', type=int, required=True, help='Number of rounds to process (1-N).')
    parser.add_argument('--dryrun', action='store_true', help='If set, do not write to file, just dryrun the whole thing.')

    args = parser.parse_args()

    generator(args.srcdir, args.year_from, args.year_to, args.rounds, args.outdir, args.dryrun)