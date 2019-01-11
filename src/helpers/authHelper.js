export function isAdminRole(userAuth) {
    return !_.isEmpty(userAuth) &&
        (userAuth.role === "Admin" ||
            (Array.isArray(userAuth.role) && userAuth.role.some(r => r === "Admin")));
}
