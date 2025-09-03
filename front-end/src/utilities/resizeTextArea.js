export function resizeTextArea(event) {
    const textArea=event;
    if(!textArea) return;
    textArea.style.height=""
    textArea.style.height=textArea.scrollHeight + "px"
    console.log("changed heiht");
}
