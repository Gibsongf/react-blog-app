const wholeFormValidator = (e) => {
    const formIds = ["post-text", "post-title", "user_name", "comment_text"];
    const valid = [];
    const checkElement = (element) => {
        if (formIds.includes(element.id)) {
            valid.push(newContentValidator(element));
        }
    };
    Array.from(e.children).forEach((el) => {
        if (el.children.length < 1 && el.hasAttribute("id")) {
            checkElement(el);
        }
        Array.from(el.children).forEach((e) => {
            checkElement(e);
        });
    });
    if (valid.includes(false)) {
        return false;
    } else {
        return true;
    }
};
export const newContentValidator = (e) => {
    const minLen = { text: 10, title: 3, user_name: 4, comment_text: 4 };

    let el = e;
    if (e.type === "change") {
        el = e.target;
    }
    if (e.nodeName === "FORM") {
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
