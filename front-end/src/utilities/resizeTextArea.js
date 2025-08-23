export function resizeTextArea(event) {
    const textArea=event.target;
    if(!textArea) return;
    textArea.style.height=""
    textArea.style.height=textArea.scrollHeight + "px"
}
