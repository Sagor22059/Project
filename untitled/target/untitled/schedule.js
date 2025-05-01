function scheduleProcesses() {
    const input = document.getElementById('processes').value;
    const processes = input.split(',').map(proc => proc.trim());

    const n = processes.length;
    const ganttChart = document.getElementById('ganttChart');
    ganttChart.innerHTML = '';

    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;

    // Create Gantt chart blocks
    processes.forEach((proc, index) => {
        let processBlock = document.createElement('div');
        processBlock.classList.add('process-block');
        processBlock.innerText = proc;
        ganttChart.appendChild(processBlock);

        // Calculate Waiting Time and Turnaround Time
        if (index !== 0) {
            waitingTime += currentTime;
        }
        currentTime += 5;  // Assuming each process takes 5 time units (you can adjust this)
        turnaroundTime += currentTime;
    });

    // Display results
    document.getElementById('waitingTime').innerText = `Average Waiting Time: ${waitingTime / n}`;
    document.getElementById('turnaroundTime').innerText = `Average Turnaround Time: ${turnaroundTime / n}`;
}
