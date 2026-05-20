const diagrams = window.EMBEDDED_DIAGRAMS || [];
const tabsEl = document.getElementById("tabs");
const titleEl = document.getElementById("diagramTitle");
const fileEl = document.getElementById("diagramFile");
const diagramEl = document.getElementById("diagram");
const sourceEl = document.getElementById("source");
const statusEl = document.getElementById("status");
const downloadEl = document.getElementById("downloadSource");
const copyBtn = document.getElementById("copySource");
const printBtn = document.getElementById("printDiagram");

let currentIndex = 0;
let currentContent = "";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "default",
  flowchart: { useMaxWidth: false, htmlLabels: true, curve: "basis" }
});

function escapeHtml(value) {
  return value.replace(/[&<>]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));
}

async function loadDiagram(item) {
  // Prefer the real file in /diagrams, then fallback to embedded text.
  try {
    const response = await fetch(`diagrams/${item.file}`, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (err) {
    return item.content;
  }
}

async function renderDiagram(index) {
  currentIndex = index;
  const item = diagrams[index];
  if (!item) return;

  document.querySelectorAll("#tabs button").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  titleEl.textContent = item.title;
  fileEl.textContent = item.file;
  downloadEl.href = `diagrams/${item.file}`;
  downloadEl.download = item.file;
  statusEl.textContent = "Rendering Mermaid diagram...";

  currentContent = await loadDiagram(item);
  sourceEl.textContent = currentContent;

  try {
    const id = `diagram-${index}-${Date.now()}`;
    const { svg } = await mermaid.render(id, currentContent);
    diagramEl.innerHTML = svg;
    statusEl.textContent = "Rendered successfully.";
  } catch (err) {
    diagramEl.innerHTML = `<pre>${escapeHtml(currentContent)}</pre>`;
    statusEl.textContent = `Mermaid render failed, showing source instead: ${err.message}`;
  }
}

function createTabs() {
  tabsEl.innerHTML = "";
  diagrams.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `${String(index + 1).padStart(2, "0")} ${item.title.replace(/^\d+ /, "")}`;
    btn.addEventListener("click", () => renderDiagram(index));
    tabsEl.appendChild(btn);
  });
}

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(currentContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy Mermaid source"), 1200);
});

printBtn.addEventListener("click", () => window.print());

createTabs();
renderDiagram(0);
