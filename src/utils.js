export const format_date = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const newDate = date.toLocaleString("en-US", options);
    return newDate;
};
