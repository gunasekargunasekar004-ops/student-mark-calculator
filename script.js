document.addEventListener('DOMContentLoaded', () => {
    const subjectInputs = document.getElementById('subject-inputs');
    const addBtn = document.getElementById('add-btn');
    const calcBtn = document.getElementById('calc-btn');
    const resultSection = document.getElementById('result-section');

    const resTotal = document.getElementById('res-total');
    const resMaxTotal = document.getElementById('res-max-total');
    const resPercentage = document.getElementById('res-percentage');
    const resGrade = document.getElementById('res-grade');

    // Add a new row for another subject
    addBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.classList.add('subject-row');
        newRow.innerHTML = `
            <input type="text" placeholder="Subject Name" class="subject-name" required>
            <input type="number" placeholder="Marks Obtained" class="marks-obtained" min="0" required>
            <input type="number" placeholder="Total Marks" class="total-marks" min="1" value="100" required>
        `;
        subjectInputs.appendChild(newRow);
    });

    // Calculate marks, percentage, and grade
    calcBtn.addEventListener('click', () => {
        const marksObtainedNodes = document.querySelectorAll('.marks-obtained');
        const totalMarksNodes = document.querySelectorAll('.total-marks');

        let totalObtained = 0;
        let totalMax = 0;
        let isValid = true;

        for (let i = 0; i < marksObtainedNodes.length; i++) {
            const obtained = parseFloat(marksObtainedNodes[i].value);
            const max = parseFloat(totalMarksNodes[i].value);

            if (isNaN(obtained) || isNaN(max) || obtained < 0 || max <= 0) {
                isValid = false;
                break;
            }

            if (obtained > max) {
                alert("Marks obtained cannot be greater than total marks!");
                return;
            }

            totalObtained += obtained;
            totalMax += max;
        }

        if (!isValid) {
            alert("Please fill out all fields with valid numbers.");
            return;
        }

        // Calculate percentage
        const percentage = (totalObtained / totalMax) * 100;

        // Determine Grade
        let grade = '-';
        if (percentage >= 90) grade = 'A+ (Outstanding)';
        else if (percentage >= 80) grade = 'A (Excellent)';
        else if (percentage >= 70) grade = 'B (Good)';
        else if (percentage >= 60) grade = 'C (Average)';
        else if (percentage >= 50) grade = 'D (Pass)';
        else grade = 'F (Fail)';

        // Display results
        resTotal.textContent = totalObtained;
        resMaxTotal.textContent = totalMax;
        resPercentage.textContent = percentage.toFixed(2);
        resGrade.textContent = grade;

        resultSection.style.display = 'block';
    });
});