
export function exportJSON(filename, data){
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  triggerDL(filename, blob);
}
export function exportMD(filename, blocks){
  const md = blocks.join("\n\n");
  const blob = new Blob([md],{type:"text/markdown"});
  triggerDL(filename, blob);
}
export function exportCSV(filename, rows){
  const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv],{type:"text/csv"});
  triggerDL(filename, blob);
}
export function exportHTML(filename, html){
  const blob = new Blob([html],{type:"text/html"});
  triggerDL(filename, blob);
}
function triggerDL(filename, blob){
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}
