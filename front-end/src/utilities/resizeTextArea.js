export function resizeTextArea(event) {
    const textArea=event.target;
    textArea.style.height=""
    textArea.style.height=textArea.scrollHeight + "px"
}
