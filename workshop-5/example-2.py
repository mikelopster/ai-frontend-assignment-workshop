def process_employee_data(input_file):
    f = open(input_file, 'r')
    lines = f.readlines()
    
    output_data = []
    header = lines[0]
    
    for l in lines[1:]:
        try:
            cols = l.strip().split(',')
            employee_id = cols[0]
            name = cols[1]
            score = float(cols[3])
            
            if score > 4.5:
                bonus = 5000 
                report_line = "ID: " + employee_id + ", Name: " + name + " gets a bonus of $" + str(bonus)
                output_data.append(report_line)
        except:
            print("Skipped a bad line")

    report_file = open("bonus_report.txt", "w")
    for item in output_data:
        report_file.write("%s\n" % item)
        
    f.close()
    report_file.close()