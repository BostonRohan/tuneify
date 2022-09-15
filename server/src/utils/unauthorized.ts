const unauthorized = (api: "spotify" | "discord") => {
  return {
    unauthorized: api,
  };
};

export default unauthorized;
