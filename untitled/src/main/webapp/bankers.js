function runBankersAlgorithm() {
    const totalResources = document.getElementById("resources").value.trim().split(" ").map(Number);
    const allocated = document.getElementById("allocated").value.trim().split(",").map(row => row.trim().split(" ").map(Number));
    const maximum = document.getElementById("maximum").value.trim().split(",").map(row => row.trim().split(" ").map(Number));

    const numProcesses = allocated.length;
    const numResources = totalResources.length;

    // Calculate available
    const available = [...totalResources];
    for (let j = 0; j < numResources; j++) {
        for (let i = 0; i < numProcesses; i++) {
            available[j] -= allocated[i][j];
        }
    }

    const need = maximum.map((row, i) => row.map((val, j) => val - allocated[i][j]));
    const finish = new Array(numProcesses).fill(false);
    const safeSequence = [];

    let found;
    do {
        found = false;
        for (let i = 0; i < numProcesses; i++) {
            if (!finish[i]) {
                const canRun = need[i].every((n, j) => n <= available[j]);
                if (canRun) {
                    for (let j = 0; j < numResources; j++) {
                        available[j] += allocated[i][j];
                    }
                    finish[i] = true;
                    safeSequence.push("P" + i);
                    found = true;
                }
            }
        }
    } while (found);

    const outputDiv = document.getElementById("output");
    if (safeSequence.length === numProcesses) {
        outputDiv.innerHTML = `<p style="color:green;">System is in a Safe State.</p><p>Safe Sequence: ${safeSequence.join(" ➝ ")}</p>`;
    } else {
        outputDiv.innerHTML = `<p style="color:red;">System is in an Unsafe State. Deadlock may occur.</p>`;
    }
}
