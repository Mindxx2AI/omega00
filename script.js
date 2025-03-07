async function paraphrase() {
    const inputText = document.getElementById("inputText").value;
    if (!inputText) {
        alert("Please enter text to paraphrase.");
        return;
    }

    const response = await fetch("/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
    });

    const data = await response.json();
    document.getElementById("outputText").innerHTML = highlightChanges(inputText, data.paraphrased_text);
}

async function checkPlagiarism() {
    const inputText = document.getElementById("inputText").value;
    if (!inputText) {
        alert("Please enter text to check plagiarism.");
        return;
    }

    const response = await fetch("/plagiarism_check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
    });

    const data = await response.json();
    alert(`Plagiarism Score: ${data.score}%`);
}

function highlightChanges(original, paraphrased) {
    return `<span style="color:blue">${paraphrased}</span>`; 
}

function exportText() {
    const text = document.getElementById("outputText").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "paraphrased_text.txt";
    link.click();
}