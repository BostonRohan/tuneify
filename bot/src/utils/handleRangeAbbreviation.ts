export default (subCommand: string) => {
  if (subCommand === "st") return "short_term";
  else if (subCommand === "mt") return "medium_term";
  else return "long_term";
};
