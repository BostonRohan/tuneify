export default (range: "long_term" | "medium_term" | "short_term") => {
  if (range === "medium_term") return "The Last 6 months";
  else if (range === "short_term") return "This Month";
  else return "All Time";
};
