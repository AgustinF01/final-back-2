export const logout = (req, res) => {
    res.clearCookie('access_token')
        .status(200)
        .json({ success: true, message: 'Sesión cerrada' });
};