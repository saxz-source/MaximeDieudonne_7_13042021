export class Tag {
    constructor(item, color) {
        this.item = item;
        this.color = color;
    }

    createATag() {
        let choosenTags = document.getElementById("choosenTags");
        let oneTag = this.generateHTMLTag();
        choosenTags.appendChild(oneTag);
        
    }

    generateHTMLTag() {
        let divTag = document.createElement("div");
        divTag.classList.add("tag");
        divTag.style.background = this.color;
        let text = document.createElement("p");
        text.textContent = this.item;
        divTag.appendChild(text);
        let cross = document.createElement("div");
        cross.textContent = "X";
        cross.addEventListener("click", e=>{
            e.preventDefault()
            divTag.remove()
        })
        divTag.appendChild(cross);
        return divTag;
    }
}
