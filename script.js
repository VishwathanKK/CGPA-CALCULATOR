// Initialize an empty array to store subject data
const subjects = [];

// Function to add a subject
function addSubject() {
    const subjectName = document.getElementById('subject').value;
    const grade = document.getElementById('grade').value;
    const credit = parseFloat(document.getElementById('credit').value);

    // Validate input
    if (!subjectName || !grade || isNaN(credit) || credit <= 0) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Add subject to the array
    subjects.push({ subjectName, grade, credit });

    // Clear input fields
    document.getElementById('subject').value = '';
    document.getElementById('credit').value = '';

    // Update subject list
    updateSubjectList();
}

// Function to update the subject list
function updateSubjectList() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';

    subjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.subjectName}</td>
            <td>${subject.grade}</td>
            <td>${subject.credit}</td>
            <td><button onclick="deleteSubject(${index})">Delete</button></td>
        `;
        subjectList.appendChild(row);
    });
}

// Function to delete a subject
function deleteSubject(index) {
    subjects.splice(index, 1);
    updateSubjectList();
}

// Function to calculate CGPA
function calculateCGPA() {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credit, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => {
        switch (subject.grade) {
            case 'O': return sum + 10 * subject.credit;
            case 'A+': return sum + 9 * subject.credit;
            case 'A': return sum + 8 * subject.credit;
            case 'B+': return sum + 7 * subject.credit;
            case 'B': return sum + 6 * subject.credit;
            case 'C': return sum + 5 * subject.credit;
            default: return sum; // Ignore invalid grades
        }
    }, 0);

    const cgpa = (totalGradePoints / totalCredits).toFixed(2);
    document.getElementById('cgpa').textContent = cgpa;
}

// Function to reset the form
function resetForm() {
    subjects.length = 0; // Clear the subjects array
    updateSubjectList();
    document.getElementById('cgpa').textContent = '0.00';
}
