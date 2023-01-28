export default (username: string) => {
    return username.slice(-1).toLowerCase() === 's' ? `${username}'` : `${username}'s`
}