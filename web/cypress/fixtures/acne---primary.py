# caliber, 2021.

import sys, csv, re

codes = ["2FG5.00","M260000","M261000","M261100","M261200","M261300","M261400","M261500","M261600","M261900","M261A00","M261B00","M261C00","M261F00","M261G00","N25..00"];
REQUIRED_CODES = 1;
with open(sys.argv[1], 'r') as file_in, open('acne-potential-cases.csv', 'w', newline='') as file_out:
    csv_reader = csv.DictReader(file_in)
    csv_writer = csv.DictWriter(file_out, csv_reader.fieldnames + ["acne---primary-identified"])
    csv_writer.writeheader();
    codes_identified = 0;
    for row in csv_reader:
        newRow = row.copy();
        for cell in row:
            # Iterate cell lists (e.g. codes)
            for item in re.findall(r'\(([^,]*)\,', row[cell]):
                if(item in codes): codes_identified+=1;
                if(codes_identified>=REQUIRED_CODES):
                    newRow["acne---primary-identified"] = "CASE";
                    break;
            if(codes_identified>=REQUIRED_CODES): break;
        if(codes_identified<REQUIRED_CODES):
            newRow["acne---primary-identified"] = "UNK";
        codes_identified=0;
        csv_writer.writerow(newRow)
