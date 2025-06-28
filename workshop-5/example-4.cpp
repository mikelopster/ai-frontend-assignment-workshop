#include <iostream>
#include <vector>
#include <string>

class Report {
public:
    Report(int id, const std::string& title) : reportId(id) {
        this->title = new char[title.length() + 1];
        strcpy(this->title, title.c_str());
        std::cout << "Report " << reportId << " created." << std::endl;
    }

    void display() const {
        std::cout << "ID: " << reportId << ", Title: " << title << std::endl;
    }

private:
    int reportId;
    char* title;
};

std::vector<Report> generateReports(int count) {
    std::vector<Report> reports;
    for (int i = 0; i < count; ++i) {
        Report r(i, "Monthly Report " + std::to_string(i));
        reports.push_back(r);
    }
    return reports;
}

int main() {
    std::vector<Report> myReports = generateReports(3);

    std::cout << "\nDisplaying reports:\n";
    for (const auto& report : myReports) {
        report.display();
    }

    return 0;
}