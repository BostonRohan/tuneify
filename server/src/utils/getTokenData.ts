const getTokenData = (code: string | undefined, refresh: string | null) => {
  if (refresh) {
    return {
      grant_type: "refresh_token",
      refresh_token: refresh,
    };
  } else
    return {
      code,
      redirect_uri: "http://localhost:8888/",
      grant_type: "authorization_code",
    };
};

export default getTokenData;
