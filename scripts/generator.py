def generator(srcdir: str, year: int, rounds:int, outdir: str, dryrun: bool = True):
    """
    Generate the colleges and cutoffs CSV files.
    
    Args:
        srcdir (str): Source directory containing HTML files.
        year (int): Year for which to generate data.
        rounds (int): Number of rounds to process (1-N).
        outdir (str): Output directory for generated CSV files (DO NOT USE / AT THE END).
        dryrun (bool): If set, do not write to file, just dryrun the whole thing.
    """
    from verifier import verify
    from colleges import generate_colleges_csv
    from courses import generate_cutoffs_csv

    if not verify(srcdir, rounds, year):
        print("Verification failed. Please check the required files and their content.")
        return

    print("Verification successful. Proceeding with CSV generation.")

    # Generate colleges CSV
    generate_colleges_csv(f"{srcdir}/data_{year}_1.html", year=year, outdir=outdir, dryrun=dryrun)

    # Generate cutoffs CSV
    for i in range(1, rounds + 1):
        htmlfilename = f"{srcdir}/data_{year}_{i}.html"
        generate_cutoffs_csv(htmlfilename, f"{outdir}/colleges_{year}.csv", year=year, round_no=i, dryrun=dryrun, outdir=outdir)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate colleges and cutoffs CSV files.")
    parser.add_argument('--srcdir', type=str, required=True, help='Source directory containing HTML files.')
    parser.add_argument('--outdir', type=str, default='.', help='Output directory for generated CSV files (DO NOT USE / AT THE END).')
    parser.add_argument('--year', type=int, required=True, help='Year for which to generate data.')
    parser.add_argument('--rounds', type=int, required=True, help='Number of rounds to process (1-N).')
    parser.add_argument('--dryrun', action='store_true', help='If set, do not write to file, just dryrun the whole thing.')

    args = parser.parse_args()

    generator(args.srcdir, args.year, args.rounds, args.outdir, args.dryrun)