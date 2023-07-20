const wholeFormValidator = (e) => {
    const formIds = ["text", "title", "user_name", "comment_text"];
    const valid = Array.from(e.children).map((el) => {
        if (formIds.includes(el.id)) {
            return newContentValidator(el);
        } else {
            return el.id;
        }
    });
    if (valid.includes(false)) {
        return false;
    } else {
        return true;
    }
};
export const newContentValidator = (e) => {
    const minLen = { text: 10, title: 4, user_name: 4, comment_text: 4 };
    let el = e;
    if (e.type === "change") {
        el = e.target;
    }

    if (e.nodeName === "FORM") {
        console.log(wholeFormValidator(e));
        return wholeFormValidator(e);
    }
    if (el.hasAttribute("required") && el.value.length < minLen[el.name]) {
        el.setAttribute("style", "border-color:red");
        el.className = "invalid";
        return false;
    } else {
        el.setAttribute("style", "border-color:rgb(193, 186, 186)");
        el.classList.remove("invalid");
        return true;
    }
};
