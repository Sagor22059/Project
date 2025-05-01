function runDiskScheduling() {
    const algorithm = document.getElementById("algorithm").value;
    const queueInput = document.getElementById("disk-queue").value.trim();
    const initialHead = parseInt(document.getElementById("initial-head").value);
    const diskSize = parseInt(document.getElementById("disk-size").value) || 200;

    if (!queueInput || isNaN(initialHead)) {
        alert("Please enter valid disk queue and initial head position.");
        return;
    }

    let requests = queueInput.split(" ").map(Number).filter(n => !isNaN(n));
    let seekSequence = [];
    let totalSeek = 0;
    let currentHead = initialHead;

    const sorted = [...requests].sort((a, b) => a - b);

    switch (algorithm) {
        case "fcfs":
            seekSequence = [...requests];
            break;

        case "sstf":
            const temp = [...requests];
            while (temp.length) {
                temp.sort((a, b) => Math.abs(a - currentHead) - Math.abs(b - currentHead));
                const next = temp.shift();
                totalSeek += Math.abs(currentHead - next);
                seekSequence.push(next);
                currentHead = next;
            }
            display(seekSequence, initialHead, totalSeek, "SSTF");
            return;

        case "scan":
            let left = sorted.filter(r => r < currentHead).reverse();
            let right = sorted.filter(r => r >= currentHead);
            seekSequence = [...right, diskSize - 1, ...left];
            break;

        case "cscan":
            left = sorted.filter(r => r < currentHead);
            right = sorted.filter(r => r >= currentHead);
            seekSequence = [...right, diskSize - 1, 0, ...left];
            break;

        case "look":
            left = sorted.filter(r => r < currentHead).reverse();
            right = sorted.filter(r => r >= currentHead);
            seekSequence = [...right, ...left];
            break;

        case "clook":
            left = sorted.filter(r => r < currentHead);
            right = sorted.filter(r => r >= currentHead);
            seekSequence = [...right, ...left];
            break;

        default:
            alert("Unknown algorithm selected.");
            return;
    }

    currentHead = initialHead;
    for (let i = 0; i < seekSequence.length; i++) {
        totalSeek += Math.abs(seekSequence[i] - currentHead);
        currentHead = seekSequence[i];
    }

    display(seekSequence, initialHead, totalSeek, algorithm.toUpperCase());
}

function display(sequence, start, total, name) {
    const output = document.getElementById("output");
    output.innerHTML = `
        <h3>${name} Disk Scheduling</h3>
        <p><strong>Seek Sequence:</strong> ${[start, ...sequence].join(" ➝ ")}</p>
        <p><strong>Total Seek Operations:</strong> ${total}</p>
    `;
}
